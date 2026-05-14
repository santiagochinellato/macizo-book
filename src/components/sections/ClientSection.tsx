"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Building2, User } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stagger, fadeUp } from "@/lib/motion-variants";
import type { ClientConfig, DocumentMeta } from "@/types/presentation";

interface ClientSectionProps {
  client: ClientConfig;
  meta: DocumentMeta;
}

export function ClientSection({ client, meta }: ClientSectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="client"
      className="px-5 sm:px-8 lg:px-14 py-12"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel className="mb-6">Cliente</SectionLabel>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={reduced ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Client info card */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="flex flex-col gap-4 p-5 rounded-xl"
          style={{
            background: "color-mix(in srgb, var(--primary) 4%, var(--surface))",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-start gap-3">
            {client.logo ? (
              <Image
                src={client.logo}
                alt={client.name}
                width={64}
                height={64}
                className="w-12 h-12 object-contain rounded-lg flex-shrink-0"
                style={{ background: "#fff", padding: 4 }}
              />
            ) : (
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--primary)" }}
              >
                <Building2 size={22} style={{ color: "#fff" }} />
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <span
                className="font-semibold text-base leading-tight"
                style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
              >
                {client.name}
              </span>
              {client.industry && (
                <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>
                  {client.industry}
                </span>
              )}
            </div>
          </div>

          <div className="h-px" style={{ background: "var(--border)" }} />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <User size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
              <div className="flex flex-col">
                <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                  {client.contact.name}
                </span>
                {client.contact.role && (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {client.contact.role}
                  </span>
                )}
              </div>
            </div>
            {client.contact.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
                <a
                  href={`mailto:${client.contact.email}`}
                  className="text-sm hover:underline"
                  style={{ color: "var(--primary)" }}
                >
                  {client.contact.email}
                </a>
              </div>
            )}
            {client.contact.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "var(--fg)" }}>
                  {client.contact.phone}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Project card */}
        <motion.div
          variants={reduced ? undefined : fadeUp}
          className="flex flex-col gap-4 p-5 rounded-xl"
          style={{
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Proyecto
          </span>
          <h3
            className="text-xl font-bold leading-snug"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            {meta.title}
          </h3>
          {meta.subtitle && (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {meta.subtitle}
            </p>
          )}
          <div className="mt-auto">
            <div
              className="h-px w-full mb-4"
              style={{ background: "var(--border)" }}
            />
            <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
              <span>Doc #{meta.number}</span>
              <span
                className="font-semibold uppercase tracking-wider"
                style={{ color: "var(--primary)" }}
              >
                {meta.currency}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ClientSection;
