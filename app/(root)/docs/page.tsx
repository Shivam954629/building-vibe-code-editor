import { Code2, Globe, Terminal, Star, Play, ChevronRight, BookOpen, Zap } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    id: "create-playground",
    icon: Play,
    color: "#E93F3F",
    title: "Creating a Playground",
    steps: [
      "Go to Dashboard — click 'Dashboard' in the sidebar or navigate to /dashboard",
      "Click the 'Add New' card — a template selection modal will open",
      "Select your framework — React, Next.js, Vue, Express, Hono, or Angular",
      "Enter a project name and click 'Create'",
      "Your playground will automatically open with the editor ready to use",
    ],
  },
  {
    id: "file-editor",
    icon: Code2,
    color: "#61DAFB",
    title: "File Editor",
    steps: [
      "All project files are listed in the left sidebar file explorer",
      "Click any file to open it in the code editor",
      "Start writing code — syntax highlighting is applied automatically",
      "Changes are saved and applied instantly via WebContainers",
      "You can open multiple files simultaneously using tabs",
    ],
  },
  {
    id: "terminal",
    icon: Terminal,
    color: "#a78bfa",
    title: "Using the Terminal",
    steps: [
      "The Terminal panel is located at the bottom of the editor",
      "Run any command — npm install, npm run dev, and more",
      "A real Node.js environment runs inside the browser via WebContainers",
      "You can open multiple terminal sessions simultaneously",
      "Press Ctrl+C to stop any running process",
    ],
  },
  {
    id: "live-preview",
    icon: Globe,
    color: "#42b883",
    title: "Live Preview",
    steps: [
      "Start your dev server in the terminal — run npm run dev",
      "The Preview panel on the right will open automatically",
      "Every code change is reflected instantly in the preview",
      "You can open the preview in a separate tab for a larger view",
      "The port is automatically detected and forwarded by WebContainers",
    ],
  },
  {
    id: "star-favorite",
    icon: Star,
    color: "#f59e0b",
    title: "Star & Favorites",
    steps: [
      "On the Dashboard, click the '...' (Actions) menu on any project",
      "Select 'Add to Favorite' — the project will be starred",
      "Starred projects appear in the 'Starred' section of the sidebar",
      "You can also star projects using the '+' icon in the sidebar",
      "To remove, click '...' again and select 'Remove Favorite'",
    ],
  },
];
export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative border-b border-zinc-800 bg-zinc-900/50">
        <div className="absolute inset-0 bg-[#E93F3F]/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 py-16 relative">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#E93F3F]/10 border border-[#E93F3F]/30 rounded-full w-fit mb-6">
            <BookOpen className="h-3.5 w-3.5 text-[#E93F3F]" />
            <span className="text-xs text-[#E93F3F] font-medium">Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            VibeCode Editor <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
              Documentation
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Everything you need to know about using VibeCode Editor — from creating your first playground to advanced features.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#E93F3F] hover:bg-[#E93F3F]/90 text-white rounded-xl font-semibold text-sm transition-all">
                <Zap className="h-4 w-4" />
                Start Coding
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Quick Nav */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex flex-col items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-all text-center group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${section.color}20` }}
                >
                  <Icon className="h-4 w-4" style={{ color: section.color }} />
                </div>
                <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors leading-tight">
                  {section.title}
                </span>
              </a>
            );
          })}
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${section.color}20` }}>
                    <Icon className="h-5 w-5" style={{ color: section.color }} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-500">0{index + 1}</span>
                    <h2 className="text-xl font-bold text-white">{section.title}</h2>
                  </div>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
                  {section.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex items-start gap-4 px-6 py-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                        style={{ backgroundColor: `${section.color}20`, color: section.color }}
                      >
                        {stepIndex + 1}
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-[#E93F3F]/10 to-transparent border border-[#E93F3F]/20 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to start?</h2>
          <p className="text-zinc-400 text-sm mb-6">Create your first playground and start coding in seconds</p>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-8 py-3 bg-[#E93F3F] hover:bg-[#E93F3F]/90 text-white rounded-xl font-semibold text-sm transition-all mx-auto">
              Open Dashboard
              <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
