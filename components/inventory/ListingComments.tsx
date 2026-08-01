type Block =
  | { type: "stats"; items: { label: string; value: string }[] }
  | { type: "disclaimer"; text: string }
  | { type: "paragraph"; text: string };

// Free-text CMS field — dealers write plain paragraphs, occasionally a
// " | "-delimited "Label: value" quote summary line, and a "**"-prefixed
// small-print disclaimer paragraph (no markdown renderer on the other end,
// so those markers show up literally unless we parse for them here).
function isStatLine(text: string) {
  return (
    !text.includes("\n") &&
    text.includes(" | ") &&
    text.split(" | ").every((part) => part.includes(":"))
  );
}

function parseStatLine(text: string): { label: string; value: string }[] {
  return text.split(" | ").map((part) => {
    const [label, ...rest] = part.split(":");
    return { label: label.trim(), value: rest.join(":").trim() };
  });
}

// A single trailing "*" on a word (not "**") marks that word for italics,
// e.g. "three years*" — the asterisk itself isn't shown, just the emphasis.
function renderWithEmphasis(text: string) {
  const parts = text.split(/(\w[\w'-]*)\*(?!\*)/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <em key={i}>{part}</em> : part,
  );
}

function parseComments(raw: string): Block[] {
  const paragraphs = raw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph) => {
    if (isStatLine(paragraph)) {
      return { type: "stats", items: parseStatLine(paragraph) };
    }
    if (paragraph.startsWith("**")) {
      return { type: "disclaimer", text: paragraph.replace(/\*\*/g, "").trim() };
    }
    return { type: "paragraph", text: paragraph };
  });
}

export default function ListingComments({ comments }: { comments: string }) {
  const blocks = parseComments(comments);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "stats") {
          return (
            <div
              key={i}
              className="flex flex-wrap gap-x-8 gap-y-4 rounded-lg border border-rosso/30 bg-rosso/5 p-5"
            >
              {block.items.map((item) => (
                <div key={item.label}>
                  <dt className="font-serif text-[11px] uppercase tracking-wide text-muted">
                    {item.label}
                  </dt>
                  <dd className="font-display text-lg text-bianco">
                    {item.value}
                  </dd>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === "disclaimer") {
          return (
            <p
              key={i}
              className="border-t border-white/10 pt-5 font-serif text-xs leading-relaxed text-muted/70"
            >
              {block.text}
            </p>
          );
        }

        return (
          <p
            key={i}
            className="font-serif text-base leading-relaxed whitespace-pre-line text-bianco/85"
          >
            {renderWithEmphasis(block.text)}
          </p>
        );
      })}
    </div>
  );
}
