import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatDate, DOC_TYPE_LABELS, STATUS_COLORS, STATUS_LABELS } from "@/lib/utils";
import type { AgencyConfig, DocumentMeta } from "@/types/presentation";

interface DocHeaderProps {
  agency: AgencyConfig;
  meta: DocumentMeta;
}

export function DocHeader({ agency, meta }: DocHeaderProps) {
  const statusColor = STATUS_COLORS[meta.status];
  const statusLabel = STATUS_LABELS[meta.status];
  const typeLabel = DOC_TYPE_LABELS[meta.type];

  return (
    <header className="flex items-center justify-between px-5 sm:px-8 lg:px-14 py-6">
      <div className="flex items-center gap-3">
        {agency.logoDark ? (
          <Image
            src={agency.logoDark}
            alt={agency.name}
            width={140}
            height={40}
            className="h-8 w-auto object-contain"
          />
        ) : (
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: "var(--primary)", fontFamily: "var(--font-display)" }}
          >
            {agency.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end gap-0.5">
          <span
            className="text-xs font-medium"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            {typeLabel} #{meta.number}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            {formatDate(meta.date, meta.language)}
          </span>
        </div>
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
          style={{
            background: `${statusColor}20`,
            color: statusColor,
            letterSpacing: "0.04em",
            fontFamily: "var(--font-body)",
          }}
        >
          {statusLabel}
        </span>
      </div>
    </header>
  );
}

export default DocHeader;
