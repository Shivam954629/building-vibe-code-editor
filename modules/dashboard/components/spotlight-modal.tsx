"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Zap,
  Lightbulb,
  Database,
  Compass,
  FlameIcon,
  Terminal,
  X,
} from "lucide-react";
import { createPlayground } from "@/modules/dashboard/actions";
import { toast } from "sonner";

const templates = [
  {
    id: "REACT",
    name: "React",
    icon: Zap,
    desc: "JavaScript library for building UIs",
    color: "#61DAFB",
  },
  {
    id: "NEXTJS",
    name: "Next.js",
    icon: Lightbulb,
    desc: "React framework for production",
    color: "#ffffff",
  },
  {
    id: "EXPRESS",
    name: "Express",
    icon: Database,
    desc: "Fast, minimalist web framework",
    color: "#68A063",
  },
  {
    id: "VUE",
    name: "Vue",
    icon: Compass,
    desc: "Progressive JavaScript framework",
    color: "#42b883",
  },
  {
    id: "HONO",
    name: "Hono",
    icon: FlameIcon,
    desc: "Fast, lightweight web framework",
    color: "#E93F3F",
  },
  {
    id: "ANGULAR",
    name: "Angular",
    icon: Terminal,
    desc: "Platform for building web apps",
    color: "#DD0031",
  },
];

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpotlightModal({ isOpen, onClose }: SpotlightModalProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"template" | "name">("template");

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setProjectName("");
      setSelected(null);
      setStep("template");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleTemplateSelect = (id: string) => {
    setSelected(id);
    setStep("name");
    setSearch("");
  };

  const handleCreate = async () => {
    if (!selected || !projectName.trim()) return;
    setIsLoading(true);
    try {
      const res = await createPlayground({
        title: projectName,
        template: selected as any,
      });
      toast.success("Playground created!");
      onClose();
      router.push(`/playground/${res?.id}`);
    } catch {
      toast.error("Failed to create playground");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-700">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          {step === "template" ? (
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search template..."
              className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm"
            />
          ) : (
            <input
              autoFocus
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="Enter project name..."
              className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm"
            />
          )}
          <button onClick={onClose}>
            <X className="h-4 w-4 text-zinc-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-2 max-h-80 overflow-y-auto">
          {step === "template" ? (
            <>
              <p className="text-xs text-zinc-500 px-2 py-1 mb-1">
                Select a template
              </p>
              {filtered.map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors text-left group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${template.color}20` }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: template.color }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {template.name}
                      </p>
                      <p className="text-xs text-zinc-500">{template.desc}</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-zinc-400 bg-zinc-700 px-2 py-0.5 rounded">
                        Select
                      </span>
                    </div>
                  </button>
                );
              })}
            </>
          ) : (
            <div className="px-3 py-4">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setStep("template")}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  ← Back
                </button>
                <span className="text-xs text-zinc-500">
                  Template: <span className="text-[#E93F3F]">{selected}</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-3">
                Press Enter or click Create
              </p>
              <button
                onClick={handleCreate}
                disabled={isLoading || !projectName.trim()}
                className="w-full py-2.5 bg-[#E93F3F] hover:bg-[#E93F3F]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
              >
                {isLoading ? "Creating..." : "Create Playground →"}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-zinc-700 flex justify-between items-center">
          <span className="text-xs text-zinc-500">ESC to close</span>
          <span className="text-xs text-zinc-500">↵ to confirm</span>
        </div>
      </div>
    </div>
  );
}
