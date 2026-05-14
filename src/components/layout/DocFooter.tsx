import type { AgencyConfig, DocumentMeta } from "@/types/presentation";

interface DocFooterProps {
  agency: AgencyConfig;
  meta: DocumentMeta;
  pageLabel?: string;
}

export function DocFooter({ agency, meta, pageLabel }: DocFooterProps) {
  return (
    <footer
      className="flex items-center justify-between px-5 sm:px-8 lg:px-14 py-5 mt-auto"
      style={{
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-semibold"
          style={{ color: "var(--primary)", fontFamily: "var(--font-body)" }}
        >
          {agency.name}
        </span>
        <span style={{ color: "var(--border)" }}>·</span>
        <a
          href={`mailto:${agency.email}`}
          className="text-xs hover:underline transition-colors"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          {agency.email}
        </a>
        {agency.website && (
          <>
            <span style={{ color: "var(--border)" }}>·</span>
            <a
              href={agency.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline transition-colors"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {agency.website.replace("https://", "")}
            </a>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {pageLabel && (
          <span
            className="text-xs"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            {pageLabel}
          </span>
        )}
        <span
          className="text-xs"
          style={{ color: "var(--border)", fontFamily: "var(--font-body)" }}
        >
          #{meta.number}
        </span>
      </div>
    </footer>
  );
}

export default DocFooter;
