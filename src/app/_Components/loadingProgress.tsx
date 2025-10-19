// components/ProgressBar.tsx
export default function ProgressBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-50">
      <div className="h-full bg-blue-600 animate-progress" />
    </div>
  );
}
