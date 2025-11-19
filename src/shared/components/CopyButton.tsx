import { useState } from "react";
import CommonButton from "@/shared/components/CommonButton";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <CommonButton
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          // ignore
        }
      }}
    >
      {copied ? "Copied" : "Copy"}
    </CommonButton>
  );
}
