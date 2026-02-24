"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, GitBranch, Sparkles } from "lucide-react";
import Image from "next/image";

const AddRepo = () => {
  return (
    <div
      className="group relative px-6 py-6 flex flex-row justify-between items-center border border-border rounded-xl bg-muted/50 cursor-not-allowed
      transition-all duration-300 ease-in-out
      hover:border-[#E93F3F]/50
      hover:shadow-[0_10px_30px_rgba(233,63,63,0.08)]
      overflow-hidden"
    >
      {/* Coming Soon Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-[#E93F3F]/10 border border-[#E93F3F]/30 rounded-full z-10">
        <Sparkles className="h-3 w-3 text-[#E93F3F]" />
        <span className="text-xs font-semibold text-[#E93F3F]">
          Coming Soon
        </span>
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-background/30 pointer-events-none" />

      <div className="flex flex-row justify-center items-start gap-4 relative z-10">
        <Button
          variant={"outline"}
          className="flex justify-center items-center border-border opacity-60"
          size={"icon"}
          disabled
        >
          <ArrowDown size={18} />
        </Button>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-[#E93F3F]" />
            <h1 className="text-xl font-bold text-[#E93F3F]">
              Open Github Repository
            </h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-[220px]">
            Work with your repositories directly in the editor
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Clone, edit and run any GitHub repo in browser
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden opacity-50 relative z-10">
        <Image
          src={"/github.svg"}
          alt="Open GitHub repository"
          width={120}
          height={120}
        />
      </div>
    </div>
  );
};

export default AddRepo;
