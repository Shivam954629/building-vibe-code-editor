"use client";

import { SpotlightModal } from "./spotlight-modal";

import { createPlayground } from "@/modules/dashboard/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toggleStarMarked } from "@/modules/dashboard/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code2,
  Compass,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  type LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
  Database,
  FlameIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

interface PlaygroundData {
  id: string;
  name: string;
  icon: string;
  starred: boolean;
}

const lucideIconMap: Record<string, LucideIcon> = {
  Zap,
  Lightbulb,
  Database,
  Compass,
  FlameIcon,
  Terminal,
  Code2,
};

export function DashboardSidebar({
  initialPlaygroundData,
}: {
  initialPlaygroundData: PlaygroundData[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const starredPlaygrounds = initialPlaygroundData.filter((p) => p.starred);
  const recentPlaygrounds = initialPlaygroundData;
  const { setOpen } = useSidebar();
  const [showStarModal, setShowStarModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    // Initial check
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  return (
    <>
      <Sidebar variant="inset" collapsible="icon" className="border-1 border-r">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-3 justify-center">
            <Image src={"/logo.svg"} alt="logo" height={60} width={60} />
          </div>
        </SidebarHeader>
        <SidebarContent>
          {/* Home & Dashboard */}
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/"}
                  tooltip="Home"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  tooltip="Dashboard"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {/* Starred */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <Star className="h-4 w-4 mr-2" />
              Starred
            </SidebarGroupLabel>
            <SidebarGroupAction
              title="Add starred playground"
              onClick={() => setShowStarModal(true)}
            >
              <Plus className="h-4 w-4" />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {starredPlaygrounds.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-2 py-2">
                    No starred projects
                  </p>
                ) : (
                  starredPlaygrounds.map((playground) => {
                    const IconComponent =
                      lucideIconMap[playground.icon] || Code2;
                    return (
                      <SidebarMenuItem key={playground.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === `/playground/${playground.id}`}
                          tooltip={playground.name}
                        >
                          <Link href={`/playground/${playground.id}`}>
                            <IconComponent className="h-4 w-4" />
                            <span>{playground.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Recent */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                Recent
              </div>
              <button
                onClick={() => setShowNewModal(true)}
                className="hover:text-white text-zinc-400 transition-colors"
              >
                <FolderPlus className="h-4 w-4" />
              </button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentPlaygrounds.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-2 py-2">
                    No recent projects
                  </p>
                ) : (
                  recentPlaygrounds.map((playground) => {
                    const IconComponent =
                      lucideIconMap[playground.icon] || Code2;
                    return (
                      <SidebarMenuItem key={playground.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === `/playground/${playground.id}`}
                          tooltip={playground.name}
                        >
                          <Link href={`/playground/${playground.id}`}>
                            <IconComponent className="h-4 w-4" />
                            <span>{playground.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="View all"
                    onClick={() => router.push("/dashboard")}
                  >
                    <span className="text-sm text-muted-foreground">
                      View all playgrounds
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Star Modal */}
      {showStarModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setShowStarModal(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Star a Project</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentPlaygrounds
                .filter((p) => !p.starred)
                .map((playground) => (
                  <button
                    key={playground.id}
                    onClick={async () => {
                      await toggleStarMarked(playground.id, true);
                      setShowStarModal(false);
                      router.refresh();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm text-zinc-300 transition-colors"
                  >
                    {playground.name}
                  </button>
                ))}
              {recentPlaygrounds.filter((p) => !p.starred).length === 0 && (
                <p className="text-zinc-500 text-sm">
                  Sare projects already starred hain
                </p>
              )}
            </div>
            <button
              onClick={() => setShowStarModal(false)}
              className="mt-4 text-sm text-zinc-500 hover:text-zinc-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* New Playground Modal */}
      <SpotlightModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
      />
    </>
  );
}
