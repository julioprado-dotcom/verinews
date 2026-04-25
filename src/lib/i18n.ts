export type Locale = 'es' | 'en' | 'pt' | 'fr' | 'ar' | 'zh';

export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  ar: 'العربية',
  zh: '中文',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  pt: '🇧🇷',
  fr: '🇫🇷',
  ar: '🇸🇦',
  zh: '🇨🇳',
};

export const LOCALE_DIRS: Record<Locale, string> = {
  es: 'ltr',
  en: 'ltr',
  pt: 'ltr',
  fr: 'ltr',
  ar: 'rtl',
  zh: 'ltr',
};

export type TranslationKeys = {
  // Header
  appName: string;
  appSubtitle: string;
  history: string;
  darkMode: string;
  lightMode: string;
  // Hero
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  badgeApproach: string;
  // Input form
  verifyAnything: string;
  inputSubtitle: string;
  tabFullText: string;
  tabUrl: string;
  tabClaim: string;
  textPlaceholder: string;
  urlPlaceholder: string;
  urlHint: string;
  claimPlaceholder: string;
  verifyButton: string;
  verifying: string;
  // Features
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  // Results
  newVerification: string;
  filters: string;
  clear: string;
  category: string;
  region: string;
  orientation: string;
  all: string;
  showing: string;
  of: string;
  sources: string;
  analysisResult: string;
  keyClaims: string;
  dimensions: string;
  // Dimension short titles
  dimCredibility: string;
  dimCoherence: string;
  dimCorroboration: string;
  dimSensationalism: string;
  dimAccuracy: string;
  dimBias: string;
  dimHigh: string;
  dimMedium: string;
  dimLow: string;
  dimLowRisk: string;
  dimModerate: string;
  dimHighRisk: string;
  // Silenced voices
  silencedVoices: string;
  noSilencedVoices: string;
  // Source summary
  summary: string;
  perspectives: string;
  relationToNews: string;
  confirms: string;
  contradicts: string;
  nuances: string;
  noRelation: string;
  // Footer
  footerMission: string;
  footerDisclaimer: string;
  footerAbout: string;
  footerMethodology: string;
  footerContact: string;
  footerContribute: string;
  footerDonate: string;
  footerCommunity: string;
  // Modals
  aboutTitle: string;
  aboutMission: string;
  aboutApproach: string;
  aboutApproachDesc: string;
  aboutDimensions: string;
  aboutDimensionsDesc: string;
  aboutSources: string;
  aboutSourcesDesc: string;
  aboutSilenced: string;
  aboutSilencedDesc: string;
  contactTitle: string;
  contactDesc: string;
  contactEmail: string;
  contactSocial: string;
  contactSuggest: string;
  // Ko-fi
  supportProject: string;
  buyCoffee: string;
  // Errors
  errorTitle: string;
  errorDesc: string;
  retry: string;
  diagnostics: string;
  noSources: string;
};

const es: TranslationKeys = {
  appName: 'VeriNews',
  appSubtitle: 'Verificación Crítico-Pluralista',
  history: 'Historial',
  darkMode: 'Cambiar a modo claro',
  lightMode: 'Cambiar a modo oscuro',
  heroTitle1: 'Desenmascara la',
  heroTitle2: 'desinformación',
  heroDescription: 'Verifica noticias con un análisis que no solo detecta datos falsos, sino que visibiliza sesgos, omisiones y voces silenciadas por las narrativas hegemónicas.',
  badgeApproach: 'Enfoque Crítico-Pluralista',
  verifyAnything: 'Verifica cualquier información',
  inputSubtitle: 'Ingresa una noticia, URL o afirmación y obtén un análisis crítico-pluralista',
  tabFullText: 'Texto completo',
  tabUrl: 'URL',
  tabClaim: 'Afirmación',
  textPlaceholder: 'Pega aquí el texto completo de la noticia que deseas verificar...',
  urlPlaceholder: 'https://ejemplo.com/noticia',
  urlHint: 'Extraeremos automáticamente el contenido de la URL para su análisis',
  claimPlaceholder: "Escribe la afirmación específica que deseas verificar (ej: 'Las sanciones económicas no afectan a la población civil')",
  verifyButton: 'Verificar con enfoque Crítico-Pluralista',
  verifying: 'Verificando...',
  feature1Title: '6 Dimensiones',
  feature1Desc: 'Credibilidad, coherencia, corroboración, sensacionalismo, veracidad y sesgo',
  feature2Title: 'Fuentes Diversas',
  feature2Desc: 'Colectivo Occidental, Sur Global, independientes, académicos y resistencia',
  feature3Title: 'Voces Silenciadas',
  feature3Desc: 'Detectamos qué perspectivas se omiten y qué contexto falta',
  newVerification: 'Nueva verificación',
  filters: 'Filtros',
  clear: 'Limpiar',
  category: 'Categoría:',
  region: 'Región:',
  orientation: 'Orientación:',
  all: 'Todas',
  showing: 'Mostrando',
  of: 'de',
  sources: 'fuentes',
  analysisResult: 'Resultado del Análisis',
  keyClaims: 'Afirmaciones clave:',
  dimensions: 'Dimensiones',
  dimCredibility: 'Credibilidad',
  dimCoherence: 'Coherencia',
  dimCorroboration: 'Corroboración',
  dimSensationalism: 'Sensacionalismo',
  dimAccuracy: 'Veracidad',
  dimBias: 'Sesgo',
  dimHigh: 'Alto',
  dimMedium: 'Medio',
  dimLow: 'Bajo',
  dimLowRisk: 'Bajo riesgo',
  dimModerate: 'Moderado',
  dimHighRisk: 'Riesgo alto',
  silencedVoices: 'Voces Silenciadas',
  noSilencedVoices: 'No se detectaron voces silenciadas significativas',
  summary: 'Resumen',
  perspectives: 'Perspectivas:',
  relationToNews: 'Relación con la noticia:',
  confirms: 'Confirman',
  contradicts: 'Contradicen',
  nuances: 'Matizan',
  noRelation: 'Sin relación',
  footerMission: 'Visibiliza sesgos, omisiones y voces silenciadas por las narrativas hegemónicas.',
  footerDisclaimer: 'Análisis desde 6 dimensiones con fuentes diversas. No reemplaza el juicio crítico — lo amplifica.',
  footerAbout: 'Quiénes somos',
  footerMethodology: 'Metodología',
  footerContact: 'Contacto',
  footerContribute: 'Contribuir',
  footerDonate: 'Donar',
  footerCommunity: 'Comunidad',
  aboutTitle: 'Quiénes Somos',
  aboutMission: 'VeriNews es un proyecto de verificación de noticias con enfoque crítico-pluralista. Nuestra misión es ir más allá del fact-checking tradicional: no solo verificamos datos, sino que visibilizamos los sesgos, omisiones y voces que las narrativas hegemónicas silencian sistemáticamente.',
  aboutApproach: 'Enfoque Crítico-Pluralista',
  aboutApproachDesc: 'Analizamos cada noticia desde 6 dimensiones que revelan tanto la calidad de la información como las perspectivas ausentes. Incorporamos fuentes del Colectivo Occidental, Sur Global, medios independientes, académicos y de resistencia para ofrecer una visión verdaderamente plural.',
  aboutDimensions: '6 Dimensiones de Análisis',
  aboutDimensionsDesc: 'Credibilidad de fuentes, coherencia interna, corroboración externa, sensacionalismo, veracidad factual y sesgo/manipulación — cada dimensión con métricas objetivas y evidencia.',
  aboutSources: 'Diversidad de Fuentes',
  aboutSourcesDesc: 'Categorizamos fuentes por perspectiva geopolítica (OTAN, no alineados, críticos del orden global), orientación (estatal, corporativo, comunitario, independiente, académico) y relación con la noticia (confirma, contradice, matiza).',
  aboutSilenced: 'Voces Silenciadas',
  aboutSilencedDesc: 'Nuestra función más importante: identificar qué perspectivas se omiten deliberadamente, qué contexto falta y qué voces deberían estar presentes para una cobertura equilibrada.',
  contactTitle: 'Contacto',
  contactDesc: '¿Tienes preguntas, sugerencias o quieres colaborar con VeriNews? Nos encantaría escucharte.',
  contactEmail: 'Correo electrónico',
  contactSocial: 'Redes sociales',
  contactSuggest: 'Sugerir una fuente o mejora',
  supportProject: 'Apoya este proyecto',
  buyCoffee: 'Invítanos un café',
  errorTitle: 'Error en la verificación',
  errorDesc: 'Revisa el registro arriba para ver dónde falló el análisis.',
  retry: 'Volver a intentar',
  diagnostics: 'Diagnóstico del servidor',
  noSources: 'No se encontraron fuentes con los filtros seleccionados',
};

const en: TranslationKeys = {
  appName: 'VeriNews',
  appSubtitle: 'Critical-Pluralist Verification',
  history: 'History',
  darkMode: 'Switch to light mode',
  lightMode: 'Switch to dark mode',
  heroTitle1: 'Unmask',
  heroTitle2: 'disinformation',
  heroDescription: 'Verify news with an analysis that not only detects false data, but also makes biases, omissions, and voices silenced by hegemonic narratives visible.',
  badgeApproach: 'Critical-Pluralist Approach',
  verifyAnything: 'Verify any information',
  inputSubtitle: 'Enter a news article, URL, or claim and get a critical-pluralist analysis',
  tabFullText: 'Full text',
  tabUrl: 'URL',
  tabClaim: 'Claim',
  textPlaceholder: 'Paste the full text of the news article you want to verify...',
  urlPlaceholder: 'https://example.com/news',
  urlHint: 'We will automatically extract the content from the URL for analysis',
  claimPlaceholder: "Type the specific claim you want to verify (e.g.: 'Economic sanctions do not affect civilians')",
  verifyButton: 'Verify with Critical-Pluralist Approach',
  verifying: 'Verifying...',
  feature1Title: '6 Dimensions',
  feature1Desc: 'Credibility, coherence, corroboration, sensationalism, factual accuracy, and bias',
  feature2Title: 'Diverse Sources',
  feature2Desc: 'Western Collective, Global South, independents, academics, and resistance',
  feature3Title: 'Silenced Voices',
  feature3Desc: 'We detect which perspectives are omitted and what context is missing',
  newVerification: 'New verification',
  filters: 'Filters',
  clear: 'Clear',
  category: 'Category:',
  region: 'Region:',
  orientation: 'Orientation:',
  all: 'All',
  showing: 'Showing',
  of: 'of',
  sources: 'sources',
  analysisResult: 'Analysis Result',
  keyClaims: 'Key claims:',
  dimensions: 'Dimensions',
  dimCredibility: 'Credibility',
  dimCoherence: 'Coherence',
  dimCorroboration: 'Corroboration',
  dimSensationalism: 'Sensationalism',
  dimAccuracy: 'Accuracy',
  dimBias: 'Bias',
  dimHigh: 'High',
  dimMedium: 'Medium',
  dimLow: 'Low',
  dimLowRisk: 'Low risk',
  dimModerate: 'Moderate',
  dimHighRisk: 'High risk',
  silencedVoices: 'Silenced Voices',
  noSilencedVoices: 'No significant silenced voices detected',
  summary: 'Summary',
  perspectives: 'Perspectives:',
  relationToNews: 'Relation to news:',
  confirms: 'Confirm',
  contradicts: 'Contradict',
  nuances: 'Nuance',
  noRelation: 'No relation',
  footerMission: 'Make biases, omissions, and voices silenced by hegemonic narratives visible.',
  footerDisclaimer: 'Analysis from 6 dimensions with diverse sources. Does not replace critical judgment — it amplifies it.',
  footerAbout: 'About us',
  footerMethodology: 'Methodology',
  footerContact: 'Contact',
  footerContribute: 'Contribute',
  footerDonate: 'Donate',
  footerCommunity: 'Community',
  aboutTitle: 'About Us',
  aboutMission: 'VeriNews is a news verification project with a critical-pluralist approach. Our mission goes beyond traditional fact-checking: we not only verify data, but we also make visible the biases, omissions, and voices that hegemonic narratives systematically silence.',
  aboutApproach: 'Critical-Pluralist Approach',
  aboutApproachDesc: 'We analyze each news item from 6 dimensions that reveal both the quality of information and the absent perspectives. We incorporate sources from the Western Collective, Global South, independent media, academics, and resistance to offer a truly plural view.',
  aboutDimensions: '6 Dimensions of Analysis',
  aboutDimensionsDesc: 'Source credibility, internal coherence, external corroboration, sensationalism, factual accuracy, and bias/manipulation — each dimension with objective metrics and evidence.',
  aboutSources: 'Source Diversity',
  aboutSourcesDesc: 'We categorize sources by geopolitical perspective (NATO-aligned, non-aligned, critical of the global order), orientation (state, corporate, community, independent, academic), and relation to the news (confirms, contradicts, nuances).',
  aboutSilenced: 'Silenced Voices',
  aboutSilencedDesc: 'Our most important function: identifying which perspectives are deliberately omitted, what context is missing, and which voices should be present for balanced coverage.',
  contactTitle: 'Contact',
  contactDesc: 'Do you have questions, suggestions, or want to collaborate with VeriNews? We would love to hear from you.',
  contactEmail: 'Email',
  contactSocial: 'Social media',
  contactSuggest: 'Suggest a source or improvement',
  supportProject: 'Support this project',
  buyCoffee: 'Buy us a coffee',
  errorTitle: 'Verification error',
  errorDesc: 'Check the log above to see where the analysis failed.',
  retry: 'Try again',
  diagnostics: 'Server diagnostics',
  noSources: 'No sources found with the selected filters',
};

const pt: TranslationKeys = {
  appName: 'VeriNews',
  appSubtitle: 'Verificação Crítico-Pluralista',
  history: 'Histórico',
  darkMode: 'Mudar para modo claro',
  lightMode: 'Mudar para modo escuro',
  heroTitle1: 'Desmascare a',
  heroTitle2: 'desinformação',
  heroDescription: 'Verifique notícias com uma análise que não apenas detecta dados falsos, mas também torna visíveis vieses, omissões e vozes silenciadas pelas narrativas hegemônicas.',
  badgeApproach: 'Abordagem Crítico-Pluralista',
  verifyAnything: 'Verifique qualquer informação',
  inputSubtitle: 'Insira uma notícia, URL ou afirmação e obtenha uma análise crítico-pluralista',
  tabFullText: 'Texto completo',
  tabUrl: 'URL',
  tabClaim: 'Afirmação',
  textPlaceholder: 'Cole aqui o texto completo da notícia que deseja verificar...',
  urlPlaceholder: 'https://exemplo.com/noticia',
  urlHint: 'Extrairemos automaticamente o conteúdo da URL para análise',
  claimPlaceholder: "Escreva a afirmação específica que deseja verificar (ex: 'Sanções econômicas não afetam civis')",
  verifyButton: 'Verificar com abordagem Crítico-Pluralista',
  verifying: 'Verificando...',
  feature1Title: '6 Dimensões',
  feature1Desc: 'Credibilidade, coerência, corroboração, sensacionalismo, veracidade e viés',
  feature2Title: 'Fontes Diversas',
  feature2Desc: 'Coletivo Ocidental, Sul Global, independentes, acadêmicos e resistência',
  feature3Title: 'Vozes Silenciadas',
  feature3Desc: 'Detectamos quais perspectivas são omitidas e qual contexto falta',
  newVerification: 'Nova verificação',
  filters: 'Filtros',
  clear: 'Limpar',
  category: 'Categoria:',
  region: 'Região:',
  orientation: 'Orientação:',
  all: 'Todas',
  showing: 'Mostrando',
  of: 'de',
  sources: 'fontes',
  analysisResult: 'Resultado da Análise',
  keyClaims: 'Afirmações-chave:',
  dimensions: 'Dimensões',
  dimCredibility: 'Credibilidade',
  dimCoherence: 'Coerência',
  dimCorroboration: 'Corroboração',
  dimSensationalism: 'Sensacionalismo',
  dimAccuracy: 'Veracidade',
  dimBias: 'Viés',
  dimHigh: 'Alto',
  dimMedium: 'Médio',
  dimLow: 'Baixo',
  dimLowRisk: 'Baixo risco',
  dimModerate: 'Moderado',
  dimHighRisk: 'Alto risco',
  silencedVoices: 'Vozes Silenciadas',
  noSilencedVoices: 'Nenhuma voz silenciada significativa detectada',
  summary: 'Resumo',
  perspectives: 'Perspectivas:',
  relationToNews: 'Relação com a notícia:',
  confirms: 'Confirmam',
  contradicts: 'Contradizem',
  nuances: 'Matizam',
  noRelation: 'Sem relação',
  footerMission: 'Torne visíveis vieses, omissões e vozes silenciadas pelas narrativas hegemônicas.',
  footerDisclaimer: 'Análise de 6 dimensões com fontes diversas. Não substitui o juízo crítico — amplifica-o.',
  footerAbout: 'Quem somos',
  footerMethodology: 'Metodologia',
  footerContact: 'Contato',
  footerContribute: 'Contribuir',
  footerDonate: 'Doar',
  footerCommunity: 'Comunidade',
  aboutTitle: 'Quem Somos',
  aboutMission: 'VeriNews é um projeto de verificação de notícias com abordagem crítico-pluralista. Nossa missão vai além do fact-checking tradicional: não apenas verificamos dados, mas também tornamos visíveis os vieses, omissões e vozes que as narrativas hegemônicas silenciam sistematicamente.',
  aboutApproach: 'Abordagem Crítico-Pluralista',
  aboutApproachDesc: 'Analisamos cada notícia de 6 dimensões que revelam tanto a qualidade da informação quanto as perspectivas ausentes. Incorporamos fontes do Coletivo Ocidental, Sul Global, mídia independente, acadêmicos e resistência para oferecer uma visão verdadeiramente plural.',
  aboutDimensions: '6 Dimensões de Análise',
  aboutDimensionsDesc: 'Credibilidade das fontes, coerência interna, corroboração externa, sensacionalismo, veracidade factual e viés/manipulação — cada dimensão com métricas objetivas e evidência.',
  aboutSources: 'Diversidade de Fontes',
  aboutSourcesDesc: 'Categorizamos fontes por perspectiva geopolítica (alinhados à OTAN, não alinhados, críticos da ordem global), orientação (estatal, corporativo, comunitário, independente, acadêmico) e relação com a notícia (confirma, contradiz, matiza).',
  aboutSilenced: 'Vozes Silenciadas',
  aboutSilencedDesc: 'Nossa função mais importante: identificar quais perspectivas são deliberadamente omitidas, qual contexto falta e quais vozes deveriam estar presentes para uma cobertura equilibrada.',
  contactTitle: 'Contato',
  contactDesc: 'Tem perguntas, sugestões ou quer colaborar com o VeriNews? Adoraríamos ouvir você.',
  contactEmail: 'E-mail',
  contactSocial: 'Redes sociais',
  contactSuggest: 'Sugerir uma fonte ou melhoria',
  supportProject: 'Apoie este projeto',
  buyCoffee: 'Nos convide para um café',
  errorTitle: 'Erro na verificação',
  errorDesc: 'Verifique o registro acima para ver onde a análise falhou.',
  retry: 'Tentar novamente',
  diagnostics: 'Diagnóstico do servidor',
  noSources: 'Nenhuma fonte encontrada com os filtros selecionados',
};

const fr: TranslationKeys = {
  appName: 'VeriNews',
  appSubtitle: 'Vérification Critique-Pluraliste',
  history: 'Historique',
  darkMode: 'Passer en mode clair',
  lightMode: 'Passer en mode sombre',
  heroTitle1: 'Démasquez la',
  heroTitle2: 'désinformation',
  heroDescription: 'Vérifiez les actualités avec une analyse qui ne se contente pas de détecter les fausses données, mais rend visibles les biais, les omissions et les voix étouffées par les narratifs hégémoniques.',
  badgeApproach: 'Approche Critique-Pluraliste',
  verifyAnything: 'Vérifiez toute information',
  inputSubtitle: 'Entrez un article, une URL ou une affirmation et obtenez une analyse critique-pluraliste',
  tabFullText: 'Texte complet',
  tabUrl: 'URL',
  tabClaim: 'Affirmation',
  textPlaceholder: 'Collez ici le texte complet de l\'article que vous souhaitez vérifier...',
  urlPlaceholder: 'https://exemple.com/actualite',
  urlHint: 'Nous extrairons automatiquement le contenu de l\'URL pour analyse',
  claimPlaceholder: 'Écrivez l\'affirmation spécifique que vous souhaitez vérifier (ex : "Les sanctions économiques n\'affectent pas les civils")',
  verifyButton: 'Vérifier avec l\'approche Critique-Pluraliste',
  verifying: 'Vérification...',
  feature1Title: '6 Dimensions',
  feature1Desc: 'Crédibilité, cohérence, corroboration, sensationnalisme, exactitude et biais',
  feature2Title: 'Sources Diverses',
  feature2Desc: 'Collectif Occidental, Sud Global, indépendants, académiques et résistance',
  feature3Title: 'Voix Étouffées',
  feature3Desc: 'Nous détectons quelles perspectives sont omises et quel contexte manque',
  newVerification: 'Nouvelle vérification',
  filters: 'Filtres',
  clear: 'Effacer',
  category: 'Catégorie :',
  region: 'Région :',
  orientation: 'Orientation :',
  all: 'Toutes',
  showing: 'Affichage',
  of: 'de',
  sources: 'sources',
  analysisResult: 'Résultat de l\'Analyse',
  keyClaims: 'Affirmations clés :',
  dimensions: 'Dimensions',
  dimCredibility: 'Crédibilité',
  dimCoherence: 'Cohérence',
  dimCorroboration: 'Corroboration',
  dimSensationalism: 'Sensationnalisme',
  dimAccuracy: 'Exactitude',
  dimBias: 'Biais',
  dimHigh: 'Élevé',
  dimMedium: 'Moyen',
  dimLow: 'Faible',
  dimLowRisk: 'Faible risque',
  dimModerate: 'Modéré',
  dimHighRisk: 'Risque élevé',
  silencedVoices: 'Voix Étouffées',
  noSilencedVoices: 'Aucune voix étouffée significative détectée',
  summary: 'Résumé',
  perspectives: 'Perspectives :',
  relationToNews: 'Relation avec l\'actualité :',
  confirms: 'Confirment',
  contradicts: 'Contredisent',
  nuances: 'Nuancent',
  noRelation: 'Sans relation',
  footerMission: 'Rendre visibles les biais, omissions et voix étouffées par les narratifs hégémoniques.',
  footerDisclaimer: 'Analyse de 6 dimensions avec des sources diverses. Ne remplace pas le jugement critique — l\'amplifie.',
  footerAbout: 'Qui sommes-nous',
  footerMethodology: 'Méthodologie',
  footerContact: 'Contact',
  footerContribute: 'Contribuer',
  footerDonate: 'Faire un don',
  footerCommunity: 'Communauté',
  aboutTitle: 'Qui Sommes-Nous',
  aboutMission: 'VeriNews est un projet de vérification des actualités avec une approche critique-pluraliste. Notre mission va au-delà du fact-checking traditionnel : nous ne vérifions pas seulement les données, nous rendons visibles les biais, les omissions et les voix que les narratifs hégémoniques étouffent systématiquement.',
  aboutApproach: 'Approche Critique-Pluraliste',
  aboutApproachDesc: 'Nous analysons chaque actualité selon 6 dimensions qui révèlent tant la qualité de l\'information que les perspectives absentes. Nous incorporons des sources du Collectif Occidental, du Sud Global, des médias indépendants, des académiques et de la résistance pour offrir une vision véritablement plurielle.',
  aboutDimensions: '6 Dimensions d\'Analyse',
  aboutDimensionsDesc: 'Crédibilité des sources, cohérence interne, corroboration externe, sensationnalisme, exactitude factuelle et biais/manipulation — chaque dimension avec des métriques objectives et des preuves.',
  aboutSources: 'Diversité des Sources',
  aboutSourcesDesc: 'Nous catégorisons les sources par perspective géopolitique (alignés OTAN, non-alignés, critiques de l\'ordre mondial), orientation (étatique, corporate, communautaire, indépendant, académique) et relation avec l\'actualité (confirme, contredit, nuance).',
  aboutSilenced: 'Voix Étouffées',
  aboutSilencedDesc: 'Notre fonction la plus importante : identifier les perspectives délibérément omises, le contexte manquant et les voix qui devraient être présentes pour une couverture équilibrée.',
  contactTitle: 'Contact',
  contactDesc: 'Vous avez des questions, des suggestions ou souhaitez collaborer avec VeriNews ? Nous serions ravis de vous entendre.',
  contactEmail: 'E-mail',
  contactSocial: 'Réseaux sociaux',
  contactSuggest: 'Suggérer une source ou une amélioration',
  supportProject: 'Soutenez ce projet',
  buyCoffee: 'Offrez-nous un café',
  errorTitle: 'Erreur de vérification',
  errorDesc: 'Consultez le journal ci-dessus pour voir où l\'analyse a échoué.',
  retry: 'Réessayer',
  diagnostics: 'Diagnostics du serveur',
  noSources: 'Aucune source trouvée avec les filtres sélectionnés',
};

const ar: TranslationKeys = {
  appName: 'VeriNews',
  appSubtitle: 'تحقيق نقدي-تعددي',
  history: 'السجل',
  darkMode: 'التبديل إلى الوضع الفاتح',
  lightMode: 'التبديل إلى الوضع الداكن',
  heroTitle1: 'اكشف',
  heroTitle2: 'المعلومات المضللة',
  heroDescription: 'تحقق من الأخبار بتحليل لا يكتشف البيانات المزيفة فحسب، بل يجعل التحيزات والإغفالات والأصوات المكتومة من قبل السرديات المهيمنة مرئية.',
  badgeApproach: 'منهج نقدي-تعددي',
  verifyAnything: 'تحقق من أي معلومة',
  inputSubtitle: 'أدخل خبراً أو رابطاً أو ادعاءً واحصل على تحليل نقدي-تعددي',
  tabFullText: 'نص كامل',
  tabUrl: 'رابط',
  tabClaim: 'ادعاء',
  textPlaceholder: 'الصق هنا النص الكامل للخبر الذي تريد التحقق منه...',
  urlPlaceholder: 'https://example.com/news',
  urlHint: 'سنستخرج تلقائياً محتوى الرابط للتحليل',
  claimPlaceholder: 'اكتب الادعاء المحدد الذي تريد التحقق منه (مثال: "العقوبات الاقتصادية لا تؤثر على المدنيين")',
  verifyButton: 'تحقق بالمنهج النقدي-التعددي',
  verifying: 'جاري التحقق...',
  feature1Title: '6 أبعاد',
  feature1Desc: 'المصداقية، التماسك، التوثيق، الإثارة، الدقة، والتحيز',
  feature2Title: 'مصادر متنوعة',
  feature2Desc: 'المجموع الغربي، الجنوب العالمي، مستقلون، أكاديميون، ومقاومة',
  feature3Title: 'أصوات مكتومة',
  feature3Desc: 'نكتشف أي المنظورات مغيبة وأي سياق مفقود',
  newVerification: 'تحقق جديد',
  filters: 'فلاتر',
  clear: 'مسح',
  category: 'الفئة:',
  region: 'المنطقة:',
  orientation: 'التوجه:',
  all: 'الكل',
  showing: 'عرض',
  of: 'من',
  sources: 'مصادر',
  analysisResult: 'نتيجة التحليل',
  keyClaims: 'الادعاءات الرئيسية:',
  dimensions: 'الأبعاد',
  dimCredibility: 'المصداقية',
  dimCoherence: 'التماسك',
  dimCorroboration: 'التوثيق',
  dimSensationalism: 'الإثارة',
  dimAccuracy: 'الدقة',
  dimBias: 'التحيز',
  dimHigh: 'عالي',
  dimMedium: 'متوسط',
  dimLow: 'منخفض',
  dimLowRisk: 'خطر منخفض',
  dimModerate: 'معتدل',
  dimHighRisk: 'خطر عالي',
  silencedVoices: 'أصوات مكتومة',
  noSilencedVoices: 'لم يتم اكتشاف أصوات مكتومة كبيرة',
  summary: 'ملخص',
  perspectives: 'المنظورات:',
  relationToNews: 'العلاقة بالخبر:',
  confirms: 'تؤكد',
  contradicts: 'تناقض',
  nuances: 'تفصّل',
  noRelation: 'بدون علاقة',
  footerMission: 'اجعل التحيزات والإغفالات والأصوات المكتومة من السرديات المهيمنة مرئية.',
  footerDisclaimer: 'تحليل من 6 أبعاد بمصادر متنوعة. لا يحل محل الحكم النقدي — بل يعززه.',
  footerAbout: 'من نحن',
  footerMethodology: 'المنهجية',
  footerContact: 'اتصل بنا',
  footerContribute: 'ساهم',
  footerDonate: 'تبرع',
  footerCommunity: 'المجتمع',
  aboutTitle: 'من نحن',
  aboutMission: 'VeriNews هو مشروع للتحقق من الأخبار بمنهج نقدي-تعددي. مهمتنا تتجاوز التحقق التقليدي من الحقائق: لا نتحقق من البيانات فحسب، بل نجعل التحيزات والإغفالات والأصوات التي تكتمها السرديات المهيمنة مرئية بشكل منهجي.',
  aboutApproach: 'المنهج النقدي-التعددي',
  aboutApproachDesc: 'نحلل كل خبر من 6 أبعاد تكشف عن جودة المعلومات والمنظورات الغائبة. ندمج مصادر من المجموع الغربي والجنوب العالمي والإعلام المستقل والأكاديميين والمقاومة لتقديم رؤية حقاً متعددة.',
  aboutDimensions: '6 أبعاد للتحليل',
  aboutDimensionsDesc: 'مصداقية المصادر، التماسك الداخلي، التوثيق الخارجي، الإثارة، الدقة الواقعية، والتحيز/التلاعب — كل بُعد بمقاييس موضوعية وأدلة.',
  aboutSources: 'تنوع المصادر',
  aboutSourcesDesc: 'نصنف المصادر حسب المنظور الجيوسياسي (حلف الناتو، غير المنحازين، المنتقدين للنظام العالمي)، والتوجه (حكومي، مؤسسي، مجتمعي، مستقل، أكاديمي)، والعلاقة بالخبر (يؤكد، يناقض، يفصّل).',
  aboutSilenced: 'أصوات مكتومة',
  aboutSilencedDesc: 'وظيفتنا الأهم: تحديد المنظورات المحذوفة عمداً، والسياق المفقود، والأصوات التي يجب أن تكون حاضرة لتغطية متوازنة.',
  contactTitle: 'اتصل بنا',
  contactDesc: 'هل لديك أسئلة أو اقتراحات أو ترغب في التعاون مع VeriNews؟ يسعدنا سماعك.',
  contactEmail: 'البريد الإلكتروني',
  contactSocial: 'وسائل التواصل',
  contactSuggest: 'اقترح مصدراً أو تحسيناً',
  supportProject: 'ادعم هذا المشروع',
  buyCoffee: 'اشتر لنا قهوة',
  errorTitle: 'خطأ في التحقق',
  errorDesc: 'تحقق من السجل أعلاه لمعرفة أين فشل التحليل.',
  retry: 'حاول مجدداً',
  diagnostics: 'تشخيص الخادم',
  noSources: 'لم يتم العثور على مصادر بالفلاتر المحددة',
};

const zh: TranslationKeys = {
  appName: 'VeriNews',
  appSubtitle: '批判多元主义验证',
  history: '历史',
  darkMode: '切换到浅色模式',
  lightMode: '切换到深色模式',
  heroTitle1: '揭露',
  heroTitle2: '虚假信息',
  heroDescription: '通过不仅检测虚假数据，而且揭示被霸权叙事压制的偏见、遗漏和沉默声音的分析来验证新闻。',
  badgeApproach: '批判多元主义方法',
  verifyAnything: '验证任何信息',
  inputSubtitle: '输入新闻、URL或声明，获取批判多元主义分析',
  tabFullText: '全文',
  tabUrl: 'URL',
  tabClaim: '声明',
  textPlaceholder: '在此粘贴您要验证的新闻全文...',
  urlPlaceholder: 'https://example.com/news',
  urlHint: '我们将自动提取URL内容进行分析',
  claimPlaceholder: '输入您要验证的具体声明（例："经济制裁不影响平民"）',
  verifyButton: '使用批判多元主义方法验证',
  verifying: '验证中...',
  feature1Title: '6个维度',
  feature1Desc: '可信度、一致性、佐证、耸人听闻、事实准确性和偏见',
  feature2Title: '多元来源',
  feature2Desc: '西方集体、全球南方、独立媒体、学者和抵抗运动',
  feature3Title: '被沉默的声音',
  feature3Desc: '我们发现哪些观点被忽略，哪些背景缺失',
  newVerification: '新验证',
  filters: '筛选',
  clear: '清除',
  category: '类别：',
  region: '地区：',
  orientation: '取向：',
  all: '全部',
  showing: '显示',
  of: '/',
  sources: '来源',
  analysisResult: '分析结果',
  keyClaims: '关键声明：',
  dimensions: '维度',
  dimCredibility: '可信度',
  dimCoherence: '一致性',
  dimCorroboration: '佐证',
  dimSensationalism: '耸人听闻',
  dimAccuracy: '准确性',
  dimBias: '偏见',
  dimHigh: '高',
  dimMedium: '中',
  dimLow: '低',
  dimLowRisk: '低风险',
  dimModerate: '中等',
  dimHighRisk: '高风险',
  silencedVoices: '被沉默的声音',
  noSilencedVoices: '未检测到显著的被沉默声音',
  summary: '摘要',
  perspectives: '观点：',
  relationToNews: '与新闻的关系：',
  confirms: '确认',
  contradicts: '矛盾',
  nuances: '细化',
  noRelation: '无关系',
  footerMission: '揭示被霸权叙事压制的偏见、遗漏和沉默声音。',
  footerDisclaimer: '来自6个维度的多元来源分析。不取代批判性判断——而是增强它。',
  footerAbout: '关于我们',
  footerMethodology: '方法论',
  footerContact: '联系方式',
  footerContribute: '贡献',
  footerDonate: '捐赠',
  footerCommunity: '社区',
  aboutTitle: '关于我们',
  aboutMission: 'VeriNews是一个采用批判多元主义方法的新闻验证项目。我们的使命超越传统的事实核查：我们不仅验证数据，还揭示霸权叙事系统性地压制的偏见、遗漏和声音。',
  aboutApproach: '批判多元主义方法',
  aboutApproachDesc: '我们从6个维度分析每条新闻，揭示信息质量和缺失的观点。我们整合西方集体、全球南方、独立媒体、学者和抵抗运动的来源，提供真正多元的视角。',
  aboutDimensions: '6个分析维度',
  aboutDimensionsDesc: '来源可信度、内部一致性、外部佐证、耸人听闻程度、事实准确性和偏见/操纵——每个维度都有客观指标和证据。',
  aboutSources: '来源多样性',
  aboutSourcesDesc: '我们按地缘政治立场（北约对齐、不结盟、批评全球秩序）、取向（官方、企业、社区、独立、学术）和与新闻的关系（确认、矛盾、细化）对来源进行分类。',
  aboutSilenced: '被沉默的声音',
  aboutSilencedDesc: '我们最重要的功能：识别哪些观点被故意省略，缺失了哪些背景，哪些声音应该在场以实现平衡报道。',
  contactTitle: '联系方式',
  contactDesc: '您有问题、建议或想与VeriNews合作吗？我们期待听到您的声音。',
  contactEmail: '电子邮件',
  contactSocial: '社交媒体',
  contactSuggest: '建议来源或改进',
  supportProject: '支持这个项目',
  buyCoffee: '请我们喝杯咖啡',
  errorTitle: '验证错误',
  errorDesc: '查看上方日志了解分析失败的位置。',
  retry: '重试',
  diagnostics: '服务器诊断',
  noSources: '未找到符合所选筛选条件的来源',
};

export const translations: Record<Locale, TranslationKeys> = { es, en, pt, fr, ar, zh };

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] || translations.es;
}
