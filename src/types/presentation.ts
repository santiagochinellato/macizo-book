export interface ThemeConfig {
  colors: {
    background: string;
    foreground: string;
    surface: string;
    primary: string;
    accent: string;
    muted: string;
    border: string;
    success: string;
  };
  typography: {
    fontDisplay: string;
    fontBody: string;
    fontDisplayUrl: string;
    fontBodyUrl: string;
  };
  radius: string;
  shadow: string;
}

export interface AgencyConfig {
  name: string;
  logoLight: string;
  logoDark: string;
  tagline: string;
  website: string;
  email: string;
  phone?: string;
  address?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

export interface ClientConfig {
  name: string;
  logo?: string;
  industry?: string;
  contact: {
    name: string;
    role?: string;
    email?: string;
    phone?: string;
  };
}

export interface DocumentMeta {
  type: "presupuesto" | "propuesta" | "informe" | "estrategia";
  number: string;
  title: string;
  subtitle?: string;
  date: string;
  validUntil?: string;
  status: "borrador" | "enviado" | "aprobado" | "rechazado";
  currency: "ARS" | "USD" | "EUR";
  language: "es" | "en";
}

export interface ScopeItem {
  id: string;
  icon?: string;
  title: string;
  description: string;
  tags?: string[];
  included: boolean;
}

export interface TimelinePhase {
  id: string;
  number: number;
  title: string;
  duration: string;
  tasks: string[];
  color?: string;
}

export interface PriceItem {
  id: string;
  category?: string;
  name: string;
  description?: string;
  quantity?: number;
  unit?: string;
  unitPrice: number;
  total: number;
  highlight?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

export interface CTAButton {
  label: string;
  icon?: string;
  href: string;
  variant: "primary" | "outline" | "ghost";
}

export interface SummaryHighlight {
  icon: string;
  text: string;
}

export interface SummaryData {
  intro: string;
  highlights: SummaryHighlight[];
  problem?: string;
}

export interface ScopeData {
  items: ScopeItem[];
}

export interface TimelineData {
  phases: TimelinePhase[];
}

export interface InvestmentData {
  items: PriceItem[];
  subtotal: number;
  discount?: number;
  total: number;
  note?: string;
}

export interface GalleryData {
  images: GalleryImage[];
  layout?: "grid" | "masonry";
}

export interface TestimonialsData {
  items: TestimonialItem[];
}

export interface CTAData {
  message: string;
  subtext?: string;
  buttons: CTAButton[];
}

export type SectionData =
  | SummaryData
  | ScopeData
  | TimelineData
  | InvestmentData
  | GalleryData
  | TestimonialsData
  | CTAData
  | Record<string, unknown>;

export interface Section {
  id: string;
  type:
    | "cover"
    | "client"
    | "summary"
    | "scope"
    | "timeline"
    | "investment"
    | "gallery"
    | "testimonials"
    | "cta";
  enabled: boolean;
  label?: string;
  data: SectionData;
}

export interface PresentationConfig {
  slug: string;
  theme: ThemeConfig;
  agency: AgencyConfig;
  client: ClientConfig;
  meta: DocumentMeta;
  sections: Section[];
}

export interface PresentationListItem {
  slug: string;
  client: ClientConfig;
  meta: DocumentMeta;
  agency: AgencyConfig;
}
