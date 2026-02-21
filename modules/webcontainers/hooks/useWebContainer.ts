import { useState, useEffect, useCallback, useRef } from "react";
import { WebContainer } from "@webcontainer/api";
import { TemplateFolder } from "@/modules/playground/lib/path-to-json";

interface UseWebContainerProps {
  templateData: TemplateFolder;
}

interface UseWebContaierReturn {
  serverUrl: string | null;
  isLoading: boolean;
  error: string | null;
  instance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  destory: () => void;
}

// Global instance - sirf ek baar boot hoga
let globalInstance: WebContainer | null = null;
let globalIsBooting = false;

export const useWebContainer = ({
  templateData,
}: UseWebContainerProps): UseWebContaierReturn => {
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [instance, setInstance] = useState<WebContainer | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeWebContainer() {
      if (globalInstance) {
        setInstance(globalInstance);
        setIsLoading(false);
        return;
      }

      if (globalIsBooting) {
        const interval = setInterval(() => {
          if (globalInstance) {
            clearInterval(interval);
            if (mounted) {
              setInstance(globalInstance);
              setIsLoading(false);
            }
          }
        }, 100);
        return;
      }

      try {
        globalIsBooting = true;
        const webcontainerInstance = await WebContainer.boot();

        if (!mounted) return;

        globalInstance = webcontainerInstance;
        globalIsBooting = false;
        setInstance(webcontainerInstance);
        setIsLoading(false);
      } catch (error) {
        globalIsBooting = false;
        console.error("Failed to initialize WebContainer:", error);
        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to initialize WebContainer",
          );
          setIsLoading(false);
        }
      }
    }

    initializeWebContainer();

    return () => {
      mounted = false;
      // Global instance teardown mat karo - reuse hoga
    };
  }, []);

  const writeFileSync = useCallback(
    async (path: string, content: string): Promise<void> => {
      if (!instance) {
        throw new Error("WebContainer instance is not available");
      }

      try {
        const pathParts = path.split("/");
        const folderPath = pathParts.slice(0, -1).join("/");

        if (folderPath) {
          await instance.fs.mkdir(folderPath, { recursive: true });
        }

        await instance.fs.writeFile(path, content);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to write file";
        console.error(`Failed to write file at ${path}:`, err);
        throw new Error(`Failed to write file at ${path}: ${errorMessage}`);
      }
    },
    [instance],
  );

  const destory = useCallback(() => {
    if (instance) {
      instance.teardown();
      globalInstance = null;
      setInstance(null);
      setServerUrl(null);
    }
  }, [instance]);

  return { serverUrl, isLoading, error, instance, writeFileSync, destory };
};
