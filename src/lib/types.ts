export type InputType = "text" | "url" | "claim";

export type VeracityLevel = "verified" | "dubious" | "false";

export type GeopoliticalPerspective =
  | "alineado_otan"
  | "alineado_usa"
  | "alineado_ue"
  | "no_alineado"
  | "critico_orden_global"
  | "multipolar";

export type SourceOrientation =
  | "estatal"
  | "corporativo"
  | "comunitario"
  | "independiente"
  | "academico";

export type SourceCategory =
  | "colectivo_occidental"
  | "sur_global"
  | "independiente"
  | "academico"
  | "resistencia";

export type SourceRelation = "confirma" | "contradice" | "matiza" | "sin_relacion";

export interface SourceResult {
  name: string;
  url: string;
  snippet: string;
  category: SourceCategory;
  orientation: SourceOrientation;
  geopoliticalPerspective: GeopoliticalPerspective;
  relationToNews: SourceRelation;
  hostName: string;
  date?: string;
}

export interface DimensionDetail {
  score: number;
  level: "high" | "medium" | "low";
  title: string;
  description: string;
  evidence: string[];
}

export interface SilencedVoice {
  perspective: string;
  description: string;
  context: string;
}

export interface VerificationResult {
  overallScore: number;
  veracityLevel: VeracityLevel;
  sourceCredibility: DimensionDetail;
  internalCoherence: DimensionDetail;
  externalCorroboration: DimensionDetail;
  sensationalism: DimensionDetail;
  factualAccuracy: DimensionDetail;
  biasManipulation: DimensionDetail;
  sourcesFound: SourceResult[];
  silencedVoices: SilencedVoice[];
  summary: string;
  keyClaims: string[];
}

export interface VerificationRequest {
  inputType: InputType;
  content: string;
}

export type AnalysisStage =
  | "idle"
  | "extracting"
  | "searching"
  | "classifying"
  | "analyzing"
  | "generating"
  | "saving"
  | "complete"
  | "error";

export const STAGE_LABELS: Record<AnalysisStage, string> = {
  idle: "Listo para verificar",
  extracting: "Extrayendo contenido...",
  searching: "Buscando fuentes diversas...",
  classifying: "Clasificando fuentes por perspectiva...",
  analyzing: "Analizando con enfoque crítico-pluralista...",
  generating: "Generando reporte final...",
  saving: "Guardando resultados...",
  complete: "Análisis completado",
  error: "Error en el análisis",
};

export interface LogEntry {
  id: string;
  timestamp: number;
  stage: AnalysisStage;
  message: string;
  detail?: string;
  status: "running" | "done" | "error";
}

export const STAGE_ICONS: Record<AnalysisStage, string> = {
  idle: "⏳",
  extracting: "📄",
  searching: "🔍",
  classifying: "🏷️",
  analyzing: "🧠",
  generating: "📊",
  saving: "💾",
  complete: "✅",
  error: "❌",
};

export const SOURCE_CATEGORY_LABELS: Record<SourceCategory, string> = {
  colectivo_occidental: "Colectivo Occidental",
  sur_global: "Sur Global",
  independiente: "Independiente",
  academico: "Académico",
  resistencia: "Resistencia",
};

export const SOURCE_CATEGORY_ICONS: Record<SourceCategory, string> = {
  colectivo_occidental: "🏛️",
  sur_global: "🌎",
  independiente: "🔍",
  academico: "🎓",
  resistencia: "✊",
};

export const ORIENTATION_LABELS: Record<SourceOrientation, string> = {
  estatal: "Estatal",
  corporativo: "Corporativo",
  comunitario: "Comunitario",
  independiente: "Independiente",
  academico: "Académico",
};

export const GEOPOLITICAL_LABELS: Record<GeopoliticalPerspective, string> = {
  alineado_otan: "Alineado OTAN",
  alineado_usa: "Alineado USA",
  alineado_ue: "Alineado UE",
  no_alineado: "No-alineado",
  critico_orden_global: "Crítico del orden global",
  multipolar: "Multipolar",
};

export const RELATION_LABELS: Record<SourceRelation, string> = {
  confirma: "Confirma",
  contradice: "Contradice",
  matiza: "Matiza",
  sin_relacion: "Sin relación directa",
};

export const VERACITY_CONFIG: Record<VeracityLevel, { label: string; color: string; bgColor: string; description: string }> = {
  verified: {
    label: "Verificada",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500",
    description: "Información corroborada por múltiples fuentes diversas",
  },
  dubious: {
    label: "Dudosa",
    color: "text-amber-600",
    bgColor: "bg-amber-500",
    description: "No se puede confirmar o desmentir completamente",
  },
  false: {
    label: "Falsa/Engañosa",
    color: "text-red-600",
    bgColor: "bg-red-500",
    description: "Contradicciones detectadas o sin respaldo factual",
  },
};
