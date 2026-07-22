"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ShareButtonProps {
  title: string;
  className?: string;
}

export default function ShareButton({ title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User dismissed the native share sheet — nothing to do.
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      type="button"
      className={cn(
        "gap-2 bg-bianco hover:bg-bianco/80 text-night hover:text-rosso",
        className,
      )}
      onClick={handleShare}
    >
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? "Link copied" : "Share"}
    </Button>
  );
}
