import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#E93F3F]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#E93F3F]/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E93F3F]/5 rounded-full blur-[150px]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative z-10 w-full">{children}</div>
    </main>
  );
};

export default AuthLayout;
