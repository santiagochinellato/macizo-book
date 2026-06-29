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
  clientRequirements?: string[];
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

export interface PaymentPlan {
  title: string;
  amount: string;
  detail: string;
  featured?: boolean;
}

export interface PricingScreenData {
  items: PriceItem[];
  subtotal: number;
  discount?: number;
  total: number;
  paymentPlans?: PaymentPlan[];
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
  /** cover = recorte en aspect ratio fijo · contain = altura natural, sin recorte (infografías) */
  fit?: "cover" | "contain";
  /** When present, card becomes clickable and opens a PageDetailModal */
  detail?: {
    title: string;
    description: string;
    bullets?: string[];
    stack?: string[];
  };
}

export interface WireframeBookCard {
  type: "wireframe";
  src: string;
  alt: string;
  title: string;
  description?: string;
  span?: CardSpan;
}

export type TextBookCardTier = "focus" | "offering" | "future";

export interface AllocationBar {
  company: string;
  pct: number;
  color: string;
}

export interface AllocationMonth {
  label: string;
  bars: AllocationBar[];
}

export interface AllocationExample {
  months: AllocationMonth[];
  footer?: string;
}

export interface TextBookCard {
  type: "text";
  eyebrow?: string;
  heading: string;
  body: string;
  span?: CardSpan;
  /** Renders with navy accent border */
  accent?: boolean;
  /** Visual tier: enfoque, oferta principal o desarrollos futuros */
  tier?: TextBookCardTier;
  /** Número de la oferta principal (1–4), para badge coloreado */
  offeringIndex?: number;
  bullets?: string[];
  /** Barras de distribución mensual de capacidad por empresa */
  allocationExample?: AllocationExample;
}

export interface ComparisonSide {
  label: string;
  icon?: string;
  steps: string[];
}

export interface ComparisonBookCard {
  type: "comparison";
  eyebrow?: string;
  heading: string;
  left: ComparisonSide;
  right: ComparisonSide;
  span?: CardSpan;
}

export interface OrgChartNode {
  label: string;
  sublabel?: string;
}

export interface OrgChartBookCard {
  type: "orgchart";
  eyebrow?: string;
  heading: string;
  root: OrgChartNode;
  children: OrgChartNode[];
  footer?: string;
  span?: CardSpan;
}

export interface ComparisonTableRow {
  individual: string;
  grupal: string;
}

export interface ComparisonTableBookCard {
  type: "comparison-table";
  eyebrow?: string;
  heading: string;
  rows: ComparisonTableRow[];
  footer?: string;
  span?: CardSpan;
}

export interface PriceComparisonItem {
  company: string;
  amount: number;
}

export interface PriceComparisonSide {
  label: string;
  tagline?: string;
  items?: PriceComparisonItem[];
  total: number;
  totalLabel: string;
  detail?: string;
  recommended?: boolean;
}

export interface PriceComparisonBookCard {
  type: "price-comparison";
  eyebrow?: string;
  heading: string;
  individual: PriceComparisonSide;
  grupal: PriceComparisonSide;
  savings?: {
    amount: number;
    label: string;
    detail?: string;
  };
  span?: CardSpan;
}

export interface ChecklistBookCard {
  type: "checklist";
  eyebrow?: string;
  heading: string;
  items: string[];
  span?: CardSpan;
}

export interface MetricBookCard {
  type: "metric";
  value: string;
  label: string;
  description?: string;
  icon?: string;
  span?: CardSpan;
}

export type ChartType = "bar" | "line" | "area" | "donut" | "radial";

export interface ChartDataPoint {
  label: string;
  value: number;
  /** Optional second series for comparison charts (e.g. BUILD vs RUN) */
  value2?: number;
}

export interface ChartBookCard {
  type: "chart";
  chartType: ChartType;
  title: string;
  subtitle?: string;
  /** Unit appended to values in tooltips/labels, e.g. "hs", "%" */
  unit?: string;
  data: ChartDataPoint[];
  /** Legend labels — [serie1, serie2?] */
  seriesLabels?: [string, string?];
  /** Override colors; defaults to theme tokens */
  colors?: string[];
  span?: CardSpan;
}

export interface DiagramLayerItem {
  label: string;
  icon?: string;
  description?: string;
}

export interface DiagramLayer {
  title: string;
  role?: string;
  items: DiagramLayerItem[];
}

export interface DiagramBookCard {
  type: "diagram";
  title: string;
  subtitle?: string;
  layers: DiagramLayer[];
  span?: CardSpan;
  /** Compact rendering: items as small label-only pills (hides descriptions) */
  compact?: boolean;
}

export type BookCard =
  | ImageBookCard
  | WireframeBookCard
  | TextBookCard
  | MetricBookCard
  | ChartBookCard
  | DiagramBookCard
  | ComparisonBookCard
  | OrgChartBookCard
  | ComparisonTableBookCard
  | PriceComparisonBookCard
  | ChecklistBookCard;

export interface InvestmentPhaseData {
  id: "build" | "run";
  title: string;
  duration: string;
  groupAmount: string;
  groupDetail: string;
  perCompanyAmount: string;
  perCompanyDetail: string;
  includes: string[];
}

export interface InvestmentLayoutData {
  heroEyebrow: string;
  heroAmount: string;
  heroBody: string;
  heroFormula: string;
  businessesCount: number;
  phases: InvestmentPhaseData[];
  contextHeading: string;
  contextBody: string;
  contextPoints: string[];
  deliverablesHeading: string;
  deliverablesBody: string;
  deliverablesStats: { value: string; label: string }[];
}

export interface BookSectionScreenData {
  title: string;
  subtitle?: string;
  /** Color de acento de la sección (hex), p. ej. por empresa */
  accentColor?: string;
  /** Layout especializado; `investment` usa `investment` + charts en `cards` */
  layout?: "default" | "investment";
  investment?: InvestmentLayoutData;
  cards: BookCard[];
}

// ─── Design system screen ──────────────────────────────────────────────────────

export interface DesignColor {
  name: string;
  hex: string;
  role: string;
  textLight?: boolean;
}

export interface DesignFont {
  name: string;
  role: string;
  sample: string;
  weights: string;
  category?: "serif" | "sans-serif" | "display";
}

export interface DesignPrinciple {
  icon: string;
  title: string;
  description: string;
}

export interface DesignSystemScreenData {
  title: string;
  subtitle?: string;
  description?: string;
  palette: DesignColor[];
  typography: DesignFont[];
  principles?: DesignPrinciple[];
}

// ─── Closing screen ────────────────────────────────────────────────────────────

export interface ClosingCompanySummary {
  name: string;
  tagline?: string;
  /** Precio asignado a la empresa (parte del abono del grupo), ej. "≈ USD 500/mes" */
  price?: string;
  /** Tres proyectos principales del ciclo BUILD */
  main: string[];
  /** Desarrollos tentativos que habilita el modelo Build & Run */
  future: string[];
}

export interface ClosingPricing {
  buildLabel: string;
  buildAmount: string;
  buildDetail: string;
  /** Desglose por empresa, ej. "≈ USD 500/empresa" */
  buildPerCompany?: string;
  runLabel: string;
  runAmount: string;
  runDetail: string;
  runPerCompany?: string;
}

export interface ClosingBuildRunNote {
  heading: string;
  body: string;
}

export interface ClosingSummary {
  intro?: string;
  companies: ClosingCompanySummary[];
  pricing: ClosingPricing;
  /** Build & Run: inversión ligada a necesidades y roadmap dinámico */
  buildRunNote?: ClosingBuildRunNote;
  /** @deprecated Usar buildRunNote */
  methodNote?: string;
}

export interface ClosingScreenData {
  ctaHeading?: string;
  ctaBody?: string;
  /** Resumen ejecutivo: listado por empresa + precio del retainer del grupo */
  summary?: ClosingSummary;
}

// ─── Screen union ──────────────────────────────────────────────────────────────

export type ScreenType = "overview" | "roadmap" | "product" | "pricing" | "mockups" | "book-section" | "design-system" | "closing";

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

export interface DesignSystemScreen {
  id: string;
  type: "design-system";
  enabled?: boolean;
  label?: string;
  data: DesignSystemScreenData;
}

export interface ClosingScreen {
  id: string;
  type: "closing";
  enabled?: boolean;
  label?: string;
  data?: ClosingScreenData;
}

export type Screen =
  | OverviewScreen
  | RoadmapScreen
  | ProductScreen
  | PricingScreen
  | MockupsScreen
  | BookSectionScreen
  | DesignSystemScreen
  | ClosingScreen;

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
