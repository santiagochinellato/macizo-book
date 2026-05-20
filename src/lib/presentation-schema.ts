import { z } from "zod";
import type { PresentationConfig } from "@/types/presentation";

const slugSchema = z
  .string()
  .min(2, "El slug debe tener al menos 2 caracteres")
  .max(64, "El slug no puede superar 64 caracteres")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug debe ser kebab-case (ej: ciudad-oeste)");

const agencySchema = z.object({
  name: z.string().min(1, "Nombre de agencia requerido"),
  logoLight: z.string().optional(),
  logoDark: z.string().optional(),
  tagline: z.string().min(1, "Tagline requerido"),
  website: z.string().url("Website debe ser una URL válida"),
  email: z.string().email("Email de agencia inválido"),
  phone: z.string().optional(),
  address: z.string().optional(),
  social: z
    .object({
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      whatsapp: z.string().optional(),
    })
    .optional(),
});

const clientSchema = z.object({
  name: z.string().min(1, "Nombre del cliente requerido"),
  logo: z.string().optional(),
  industry: z.string().optional(),
  contact: z.object({
    name: z.string().min(1, "Nombre de contacto requerido"),
    role: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
  }),
});

const metaSchema = z.object({
  type: z.enum(["presupuesto", "propuesta", "informe", "estrategia"]),
  number: z.string().min(1, "Número de documento requerido"),
  title: z.string().min(1, "Título requerido"),
  subtitle: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha en formato YYYY-MM-DD"),
  validUntil: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "validUntil en formato YYYY-MM-DD")
    .optional(),
  status: z.enum(["borrador", "enviado", "aprobado", "rechazado"]),
  currency: z.enum(["ARS", "USD", "EUR"]),
  language: z.enum(["es", "en"]),
});

const cardSpanSchema = z.enum(["1x1", "half", "2x1", "3x1"]);

const imageBookCardSchema = z.object({
  type: z.literal("image"),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
  badge: z.string().optional(),
  span: cardSpanSchema.optional(),
  detail: z
    .object({
      title: z.string(),
      description: z.string(),
      bullets: z.array(z.string()).optional(),
      stack: z.array(z.string()).optional(),
    })
    .optional(),
});

const wireframeBookCardSchema = z.object({
  type: z.literal("wireframe"),
  src: z.string().min(1),
  alt: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  span: cardSpanSchema.optional(),
});

const textBookCardSchema = z.object({
  type: z.literal("text"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  body: z.string().min(1),
  span: cardSpanSchema.optional(),
  accent: z.boolean().optional(),
  bullets: z.array(z.string()).optional(),
});

const metricBookCardSchema = z.object({
  type: z.literal("metric"),
  value: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  span: cardSpanSchema.optional(),
});

const bookCardSchema = z.discriminatedUnion("type", [
  imageBookCardSchema,
  wireframeBookCardSchema,
  textBookCardSchema,
  metricBookCardSchema,
]);

const overviewScreenSchema = z.object({
  id: z.string().min(1),
  type: z.literal("overview"),
  enabled: z.boolean().optional().default(true),
  label: z.string().optional(),
  data: z.object({
    headline: z.string().min(1),
    vision: z.string().min(1),
    objectives: z
      .array(
        z.object({
          icon: z.string().min(1),
          title: z.string().min(1),
          description: z.string().min(1),
        })
      )
      .min(1),
    totalPrice: z.number(),
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
      })
      .optional(),
  }),
});

const roadmapScreenSchema = z.object({
  id: z.string().min(1),
  type: z.literal("roadmap"),
  enabled: z.boolean().optional().default(true),
  label: z.string().optional(),
  data: z.object({
    phases: z
      .array(
        z.object({
          id: z.string(),
          number: z.number(),
          title: z.string(),
          duration: z.string(),
          tasks: z.array(z.string()),
        })
      )
      .min(1),
    technologies: z
      .array(
        z.object({
          name: z.string(),
          icon: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .min(1),
    clientRequirements: z.array(z.string()).optional(),
  }),
});

const productScreenSchema = z.object({
  id: z.string().min(1),
  type: z.literal("product"),
  enabled: z.boolean().optional().default(true),
  label: z.string().optional(),
  data: z.object({
    architectureTitle: z.string().min(1),
    architectureDescription: z.string().min(1),
    features: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          imageAlt: z.string().optional(),
        })
      )
      .min(1),
  }),
});

const pricingScreenSchema = z.object({
  id: z.string().min(1),
  type: z.literal("pricing"),
  enabled: z.boolean().optional().default(true),
  label: z.string().optional(),
  data: z.object({
    items: z
      .array(
        z.object({
          id: z.string(),
          category: z.string().optional(),
          name: z.string(),
          description: z.string().optional(),
          quantity: z.number().optional(),
          unit: z.string().optional(),
          unitPrice: z.number().optional(),
          total: z.number(),
          highlight: z.boolean().optional(),
        })
      )
      .min(1),
    subtotal: z.number(),
    discount: z.number().optional(),
    total: z.number(),
    paymentPlans: z
      .array(
        z.object({
          title: z.string(),
          amount: z.string(),
          detail: z.string(),
          featured: z.boolean().optional(),
        })
      )
      .optional(),
    paymentMethods: z.array(z.string()).optional(),
    terms: z.array(z.string()).optional(),
    note: z.string().optional(),
  }),
});

const mockupsScreenSchema = z.object({
  id: z.string().min(1),
  type: z.literal("mockups"),
  enabled: z.boolean().optional().default(true),
  label: z.string().optional(),
  data: z.object({
    images: z.array(
      z.object({
        id: z.string(),
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
      })
    ),
  }),
});

const bookSectionScreenSchema = z.object({
  id: z.string().min(1),
  type: z.literal("book-section"),
  enabled: z.boolean().optional().default(true),
  label: z.string().optional(),
  data: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    cards: z.array(bookCardSchema).min(1),
  }),
});

const designSystemScreenSchema = z.object({
  id: z.string().min(1),
  type: z.literal("design-system"),
  enabled: z.boolean().optional().default(true),
  label: z.string().optional(),
  data: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    palette: z
      .array(
        z.object({
          name: z.string(),
          hex: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Color hex inválido"),
          role: z.string(),
          textLight: z.boolean().optional(),
        })
      )
      .min(1),
    typography: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          sample: z.string(),
          weights: z.string(),
          category: z.enum(["serif", "sans-serif", "display"]).optional(),
        })
      )
      .min(1),
    principles: z
      .array(
        z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),
  }),
});

const closingScreenSchema = z.object({
  id: z.string().min(1),
  type: z.literal("closing"),
  enabled: z.boolean().optional().default(true),
  label: z.string().optional(),
  data: z
    .object({
      ctaHeading: z.string().optional(),
      ctaBody: z.string().optional(),
    })
    .optional(),
});

const screenSchema = z.discriminatedUnion("type", [
  overviewScreenSchema,
  roadmapScreenSchema,
  productScreenSchema,
  pricingScreenSchema,
  mockupsScreenSchema,
  bookSectionScreenSchema,
  designSystemScreenSchema,
  closingScreenSchema,
]);

export const presentationConfigSchema = z
  .object({
    slug: slugSchema,
    version: z.literal(2),
    theme: z.object({
      accentColor: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, "accentColor debe ser hex (#rrggbb)")
        .optional(),
    }),
    agency: agencySchema,
    client: clientSchema,
    meta: metaSchema,
    screens: z.array(screenSchema).min(1, "Debe haber al menos una pantalla"),
  })
  .refine((data) => data.slug === data.slug.toLowerCase(), {
    message: "El slug debe estar en minúsculas",
    path: ["slug"],
  });

export type ParsedPresentationConfig = z.infer<typeof presentationConfigSchema>;

export function parsePresentationJson(raw: unknown): {
  success: true;
  data: PresentationConfig;
} | {
  success: false;
  errors: string[];
} {
  const result = presentationConfigSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data as PresentationConfig };
  }
  const errors = result.error.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return `${path}${issue.message}`;
  });
  return { success: false, errors };
}

export function formatZodErrors(errors: string[]): string {
  return errors.join("\n");
}
