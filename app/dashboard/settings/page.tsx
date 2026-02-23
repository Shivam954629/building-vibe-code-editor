import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import { signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/sign-in");

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-800">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="flex items-center gap-4">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Avatar"
              width={60}
              height={60}
              className="rounded-full"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-zinc-700 flex items-center justify-center">
              <User className="h-6 w-6 text-zinc-300" />
            </div>
          )}
          <div>
            <p className="font-medium text-zinc-100">{session.user.name}</p>
            <p className="text-sm text-zinc-400">{session.user.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/auth/sign-in" });
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
