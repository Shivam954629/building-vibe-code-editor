"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/sidebar"
import Image from "next/image"

// Define the interface for a single playground item, icon is now a string
interface PlaygroundData {
  id: string
  name: string
  icon: string // Changed to string
  starred: boolean
}

// Map icon names (strings) to their corresponding LucideIcon components
const lucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2, // Include the default icon
  // Add any other icons you might use dynamically
}

export function DashboardSidebar({ initialPlaygroundData }: { initialPlaygroundData: PlaygroundData[] }) {
  const pathname = usePathname()
  const [starredPlaygrounds, setStarredPlaygrounds] = useState(initialPlaygroundData.filter((p) => p.starred))
  const [recentPlaygrounds, setRecentPlaygrounds] = useState(initialPlaygroundData)
  const [showStarModal, setShowStarModal] = useState(false);

  return (
    <>
      <Sidebar variant="inset" collapsible="icon" className="border-1 border-r">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-3 justify-center">
            <Image src={"/logo.svg"} alt="logo" height={60} width={60} />
          </div>
        </SidebarHeader>
        <SidebarContent>
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
                {starredPlaygrounds.length === 0 &&
                recentPlaygrounds.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4 w-full">
                    Create your playground
                  </div>
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
                            {IconComponent && (
                              <IconComponent className="h-4 w-4" />
                            )}
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

          <SidebarGroup>
            <SidebarGroupLabel>
              <History className="h-4 w-4 mr-2" />
              Recent
            </SidebarGroupLabel>
            <SidebarGroupAction title="Create new playground">
              <FolderPlus className="h-4 w-4" />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {starredPlaygrounds.length === 0 &&
                recentPlaygrounds.length === 0
                  ? null
                  : recentPlaygrounds.map((playground) => {
                      const IconComponent =
                        lucideIconMap[playground.icon] || Code2;
                      return (
                        <SidebarMenuItem key={playground.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={
                              pathname === `playground/${playground.id}`
                            }
                            tooltip={playground.name}
                          >
                            <Link href={`/playground/${playground.id}`}>
                              {IconComponent && (
                                <IconComponent className="h-4 w-4" />
                              )}
                              <span>{playground.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="View all">
                    <Link href="/playgrounds">
                      <span className="text-sm text-muted-foreground">
                        View all playgrounds
                      </span>
                    </Link>
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
                    onClick={() => {
                      setStarredPlaygrounds((prev) => [
                        ...prev,
                        { ...playground, starred: true },
                      ]);
                      setShowStarModal(false);
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
    </>
  );
}