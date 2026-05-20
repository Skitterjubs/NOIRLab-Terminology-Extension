import { LoaderCircle } from "lucide-react";

export function Loading({ isVisible = false }: { isVisible: boolean }) {
  return (
    <div
      className={`${
        isVisible
          ? "absolute h-full w-full flex flex-col items-center justify-center z-10 bg-white gap-10"
          : "hidden"
      }`}
    >
      <LoaderCircle className="animate-spin text-noirlab-primary-blue w-10 h-auto" />
      <div className="flex flex-col items-center tex-center text-base">
        <p>Preparing everything for you!</p>
        <p>This may take a moment</p>
      </div>
    </div>
  );
}
