"use client";

export default function AuthLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Big Planora Text */}
      <h1 className="!text-4xl sm:!text-6xl xl:!text-8xl font-bold lg:mt-8 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
        Planora
      </h1>

      {/* Authentication Text with bouncing dots */}
      <p className="mt-4 text-blue-900 text-lg flex items-center gap-2">
        Authenticating
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-blue-700 rounded-full animate-bounce delay-300"></span>
        </span>
      </p>
    </div>
  );
}
