// ─── Shared primitives ────────────────────────────────────────────────────────

export interface AgencyConfig {
  name: string;
  logoLight?: string;
  logoDark?: string;
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

export interface ThemeConfig {
  accentColor?: string;
}

// ─── Screen data types ─────────────────────────────────────────────────────────

export interface OverviewObjective {
  icon: string;
  title: string;
  description: string;
}

export interface OverviewScreenData {
  headline: string;
  vision: string;
  objectives: OverviewObjective[];
  totalPrice: number;
  heroImage?: { src: string; alt: string; caption?: string };
}

export interface TimelinePhase {
  id: string;
  number: number;
  title: string;
  duration: string;
  tasks: string[];
}

export interface Technology {
  name: string;
  icon?: string;
  description?: string;
}

export interface RoadmapScreenData {
  phases: TimelinePhase[];
  technologies: Technology[];
}

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface ProductScreenData {
  architectureTitle: string;
  architectureDescription: string;
  features: ProductFeature[];
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

export interface PricingScreenData {
  items: PriceItem[];
  subtotal: number;
  discount?: number;
  total: number;
  paymentMethods?: string[];
  terms?: string[];
  note?: string;
}

export interface MockupImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface MockupsScreenData {
  images: MockupImage[];
}

// ─── Book-section card types ───────────────────────────────────────────────────

/** 1x1 = 4 cols · half = 6 cols · 2x1 = 8 cols · 3x1 = 12 cols (full) */
export type CardSpan = "1x1" | "half" | "2x1" | "3x1";

export interface ImageBookCard {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  /** Short badge shown over the image, e.g. "Sitio actual" or "Render fotorrealista" */
  badge?: string;
  span?: CardSpan;
}

export interface WireframeBookCard {
  type: "wireframe";
  src: string;
  alt: string;
  title: string;
  description?: string;
  span?: CardSpan;
}

export interface TextBookCard {
  type: "text";
  eyebrow?: string;
  heading: string;
  body: string;
  span?: CardSpan;
  /** Renders with navy accent border */
  accent?: boolean;
  bullets?: string[];
}

export interface MetricBookCard {
  type: "metric";
  value: string;
  label: string;
  description?: string;
  icon?: string;
  span?: CardSpan;
}

export type BookCard = ImageBookCard | WireframeBookCard | TextBookCard | MetricBookCard;

export interface BookSectionScreenData {
  title: string;
  subtitle?: string;
  cards: BookCard[];
}

// ─── Screen union ──────────────────────────────────────────────────────────────

export type ScreenType = "overview" | "roadmap" | "product" | "pricing" | "mockups" | "book-section";

export interface OverviewScreen {
  id: string;
  type: "overview";
  enabled: boolean;
  label?: string;
  data: OverviewScreenData;
}

export interface RoadmapScreen {
  id: string;
  type: "roadmap";
  enabled: boolean;
  label?: string;
  data: RoadmapScreenData;
}

export interface ProductScreen {
  id: string;
  type: "product";
  enabled: boolean;
  label?: string;
  data: ProductScreenData;
}

export interface PricingScreen {
  id: string;
  type: "pricing";
  enabled: boolean;
  label?: string;
  data: PricingScreenData;
}

export interface MockupsScreen {
  id: string;
  type: "mockups";
  enabled: boolean;
  label?: string;
  data: MockupsScreenData;
}

export interface BookSectionScreen {
  id: string;
  type: "book-section";
  enabled: boolean;
  label?: string;
  data: BookSectionScreenData;
}

export type Screen =
  | OverviewScreen
  | RoadmapScreen
  | ProductScreen
  | PricingScreen
  | MockupsScreen
  | BookSectionScreen;

// ─── Root config ───────────────────────────────────────────────────────────────

export interface PresentationConfig {
  slug: string;
  version: 2;
  theme: ThemeConfig;
  agency: AgencyConfig;
  client: ClientConfig;
  meta: DocumentMeta;
  screens: Screen[];
}

export interface PresentationListItem {
  slug: string;
  client: ClientConfig;
  meta: DocumentMeta;
  agency: AgencyConfig;
}
