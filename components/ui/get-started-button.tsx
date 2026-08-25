import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface GetStartedButtonProps {
  text?: string;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}

export default function GetStartedButton({
  text = "Get started",
  href,
  className,
  target,
  rel,
}: GetStartedButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group/start btn-start inline-flex h-12 items-center justify-center gap-3 rounded-md bg-(--paper) px-3 pr-2 font-semibold no-underline transition-colors duration-200 ease-in-out hover:bg-(--ember)",
        className,
      )}
    >
      <span className="pl-2 text-[0.95rem] text-(--ember) transition-colors duration-200 ease-in-out group-hover/start:text-(--ember-text)">
        {text}
      </span>
      <span
        className={cn(
          "relative flex size-7 items-center justify-center overflow-hidden rounded-full transition-colors duration-200",
          "bg-(--ember) group-hover/start:bg-(--paper)",
        )}
        aria-hidden
      >
        <span className="absolute left-0 flex size-7 w-14 -translate-x-1/2 items-center justify-center transition-transform duration-200 ease-in-out group-hover/start:translate-x-0">
          <ArrowRight
            size={16}
            className="size-7 p-1 text-(--ember) opacity-0 group-hover/start:opacity-100"
          />
          <ArrowRight
            size={16}
            className="size-7 p-1 text-(--ember-text) opacity-100 transition-opacity duration-200 ease-in-out group-hover/start:opacity-0"
          />
        </span>
      </span>
    </a>
  );
}
