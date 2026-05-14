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

// ─── Screen union ──────────────────────────────────────────────────────────────

export type ScreenType = "overview" | "roadmap" | "product" | "pricing" | "mockups";

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

export type Screen =
  | OverviewScreen
  | RoadmapScreen
  | ProductScreen
  | PricingScreen
  | MockupsScreen;

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
