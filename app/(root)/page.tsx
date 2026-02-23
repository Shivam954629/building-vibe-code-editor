"use client";

import {
  ArrowUpRight,
  Code2,
  Zap,
  Globe,
  Terminal,
  Sparkles,
  GitBranch,
  Play,
  Settings,
  Eye,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Code2,
    title: "Multi-Framework",
    desc: "React, Next.js, Vue, Express, Hono, Angular — all supported out of the box",
    color: "#61DAFB",
  },
  {
    icon: Globe,
    title: "Live Preview",
    desc: "See your changes in real-time with instant hot reload via WebContainers",
    color: "#42b883",
  },
  {
    icon: Terminal,
    title: "Built-in Terminal",
    desc: "Full terminal access inside the browser — zero setup needed",
    color: "#a78bfa",
  },
  {
    icon: Star,
    title: "Star & Organize",
    desc: "Star your favourite playgrounds and organize them in sidebar",
    color: "#f59e0b",
  },
];

const steps = [
  {
    icon: Play,
    step: "01",
    title: "Create Playground",
    desc: "Choose your framework and create a new playground in seconds",
  },
  {
    icon: Code2,
    step: "02",
    title: "Write Code",
    desc: "Use our powerful editor with syntax highlighting and AI assistance",
  },
  {
    icon: Eye,
    step: "03",
    title: "Live Preview",
    desc: "See your changes instantly with real-time hot reload preview",
  },
  {
    icon: Settings,
    step: "04",
    title: "Deploy & Share",
    desc: "Share your playground URL with anyone, anywhere",
  },
];

const techStack = [
  { name: "React", color: "#61DAFB", icon: "/react.svg" },
  { name: "Next.js", color: "#ffffff", icon: "/next.svg" },
  { name: "Vue", color: "#42b883", icon: "/vuejs-icon.svg" },
  { name: "Express", color: "#68A063", icon: "/expressjs-icon.svg" },
  { name: "Hono", color: "#E93F3F", icon: "/hono.svg" },
  { name: "Angular", color: "#DD0031", icon: "/angular-2.svg" },
];

const typingWords = ["React", "Next.js", "Vue", "Express", "Hono", "Angular"];

function TypingEffect() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = typingWords[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        100,
      );
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 60);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % typingWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="text-[#E93F3F]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#E93F3F]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center pt-16 pb-20 px-6 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#E93F3F]/10 border border-[#E93F3F]/30 rounded-full mb-8">
          <Sparkles className="h-3.5 w-3.5 text-[#E93F3F]" />
          <span className="text-xs text-[#E93F3F] font-medium">
            AI-Powered Browser Code Editor
          </span>
        </div>

        {/* Hero Image */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#E93F3F]/10 blur-3xl rounded-full scale-150" />
          <Image
            src={"/hero.svg"}
            alt="Hero"
            height={280}
            width={280}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Heading with typing effect */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-center tracking-tight leading-[1.2] max-w-4xl mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-red-500 to-pink-500">
            Code in{" "}
          </span>
          <TypingEffect />
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-red-500 to-pink-500">
            Right in Browser
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mb-10 mt-4">
          A powerful browser-based code editor with real-time preview,
          multi-framework support, and AI assistance. No setup. Just code.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 mb-16">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-8 py-3.5 bg-[#E93F3F] hover:bg-[#E93F3F]/90 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#E93F3F]/25 hover:shadow-[#E93F3F]/40 hover:scale-[1.02]">
              Start Coding Now
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-12 mb-20 border border-zinc-800 rounded-2xl px-10 py-5 bg-zinc-900/50">
          {[
            { label: "Frameworks", value: "6+" },
            { label: "Setup Time", value: "0ms" },
            { label: "WebContainer", value: "✓" },
            { label: "Open Source", value: "✓" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack Floating Logos */}
        <div className="w-full max-w-3xl mb-20">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">
            Supported Frameworks
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-800/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer w-20"
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="w-full max-w-4xl mb-20">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            How it works
          </p>
          <h2 className="text-2xl font-bold text-white mb-10">
            From idea to running code in seconds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative flex flex-col items-center text-center p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl hover:border-[#E93F3F]/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E93F3F]/10 flex items-center justify-center mb-3 group-hover:bg-[#E93F3F]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#E93F3F]" />
                  </div>
                  <span className="text-xs text-[#E93F3F] font-mono font-bold mb-1">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {step.desc}
                  </p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-zinc-700 text-lg z-10">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full max-w-4xl mb-16">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Features
          </p>
          <h2 className="text-2xl font-bold text-white mb-10">
            Everything you need to code
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl hover:border-zinc-600 transition-all duration-300 text-left hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        

        {/* Footer text */}
        <p className="text-xs text-zinc-600 mt-12">
          Built with Next.js • WebContainers • Prisma • NextAuth
        </p>
      </div>
    </div>
  );
}
