// components/LoadingDots.tsx
export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center min-h-[100px]">
      <div className="relative w-16 h-16 animate-spin">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-900 rounded-full"
            style={{
              transform: `rotate(${i * 60}deg) translate(24px) rotate(-${
                i * 60
              }deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
