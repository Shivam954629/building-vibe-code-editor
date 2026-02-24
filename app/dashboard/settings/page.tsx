import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { LogOut, User, Mail, Shield, Code2, Sparkles } from "lucide-react";
import { signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/sign-in");

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="relative h-32 bg-gradient-to-r from-[#E93F3F]/20 via-[#E93F3F]/10 to-transparent border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#E93F3F]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#E93F3F]/50 to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-12">
        {/* Profile Avatar */}
        <div className="relative -mt-12 mb-6 flex items-end justify-between">
          <div className="relative">
            {session.user.image ? (
              <div className="relative">
                <Image
                  src={session.user.image}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="rounded-2xl border-4 border-background shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-muted border-4 border-background flex items-center justify-center shadow-xl">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="mb-2 flex items-center gap-2 px-3 py-1 bg-[#E93F3F]/10 border border-[#E93F3F]/30 rounded-full">
            <Sparkles className="h-3 w-3 text-[#E93F3F]" />
            <span className="text-xs text-[#E93F3F] font-medium">Pro User</span>
          </div>
        </div>

        {/* Name & Email */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            {session.user.name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {session.user.email}
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <User className="h-4 w-4 text-[#E93F3F]" />
            <h2 className="text-sm font-semibold text-foreground">
              Profile Information
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-sm text-foreground font-medium">
                    {session.user.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="text-sm text-foreground font-medium">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Account Status
                  </p>
                  <p className="text-sm text-green-500 font-medium">
                    Active & Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Preferences Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <Code2 className="h-4 w-4 text-[#E93F3F]" />
            <h2 className="text-sm font-semibold text-foreground">Editor</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground font-medium">
                  VibeCode Editor
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Powered by WebContainers
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-[#E93F3F]/10 text-[#E93F3F] border border-[#E93F3F]/30 rounded-full">
                v1.0.0
              </span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-2xl border border-red-500/30 overflow-hidden">
          <div className="px-6 py-4 border-b border-red-500/20 flex items-center gap-2">
            <LogOut className="h-4 w-4 text-red-500" />
            <h2 className="text-sm font-semibold text-red-500">Danger Zone</h2>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground font-medium">Sign out</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                You will be redirected to login page
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/auth/sign-in" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 rounded-lg transition-all duration-200 text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
