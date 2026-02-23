import SignInFormClient from "@/modules/auth/components/sign-in-form-client";
import Image from "next/image";
import { Code2, Zap, Globe, Terminal, Sparkles, Star } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-6">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Logo" height={40} width={40} />
          <span className="font-extrabold text-xl text-white">
            VibeCode Editor
          </span>
        </Link>

        <div className="relative flex justify-start">
          <div className="absolute inset-0 bg-[#E93F3F]/15 blur-3xl rounded-full" />
          <Image
            src="/login.svg"
            alt="Login"
            height={180}
            width={180}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-white leading-tight mb-2">
            Build faster.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-red-400 to-pink-500">
              Ship smarter.
            </span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-sm">
            Browser-based coding. No setup — just open and start building.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { icon: Zap, text: "WebContainers" },
            { icon: Code2, text: "6+ Frameworks" },
            { icon: Globe, text: "Live Preview" },
            { icon: Terminal, text: "Terminal" },
            { icon: Star, text: "Star Projects" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full"
              >
                <Icon className="h-3 w-3 text-[#E93F3F]" />
                <span className="text-xs text-zinc-300">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-center">
        {/* Mobile Logo */}
        <Link href="/" className="lg:hidden flex items-center gap-3 mb-5">
          <Image src="/logo.svg" alt="Logo" height={40} width={40} />
          <span className="font-extrabold text-xl text-white">
            VibeCode Editor
          </span>
        </Link>

        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#E93F3F]/10 border border-[#E93F3F]/30 rounded-full mb-4">
          <Sparkles className="h-3.5 w-3.5 text-[#E93F3F]" />
          <span className="text-xs text-[#E93F3F] font-medium">
            Free • No credit card needed
          </span>
        </div>

        {/* Glass Card */}
        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-700/80 rounded-3xl p-7 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="text-center mb-5">
            <div className="w-12 h-12 rounded-2xl bg-[#E93F3F]/10 border border-[#E93F3F]/20 flex items-center justify-center mx-auto mb-3">
              <Image src="/logo.svg" alt="Logo" height={28} width={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-1">
              Welcome back
            </h1>
            <p className="text-zinc-400 text-sm">
              Sign in to your VibeCode account
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-500">continue with</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <SignInFormClient />
        </div>

        <p className="text-xs text-zinc-600 text-center mt-4">
          © 2026 VibeCode Editor. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Page;
