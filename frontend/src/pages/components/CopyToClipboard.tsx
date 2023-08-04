import { useState } from "react";

export default function CopyToClipboard() {
  const [copied, setCopied] = useState(false);
  return !copied ? (
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
      }}
      className="px-4 py-2 text-text-grey rounded-lg border border-text-grey text-[14px] hover:text-white hover:border-white active:text-text-grey active:border-text-grey"
    >
      Copy channel link to invite
    </button>
  ) : (
    <button
      disabled
      className="px-4 py-2 text-text-grey rounded-lg border border-text-grey text-[14px]"
    >
      Copied to clipboard
    </button>
  );
}
