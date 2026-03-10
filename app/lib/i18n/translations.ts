export type LanguageCode =
  | "en"
  | "fr"
  | "es"
  | "de"
  | "ar"
  | "sw"
  | "no"
  | "pl"
  | "ru"
  | "fil"
  | "ti"
  | "so"
  | "hi"
  | "th"
  | "zh";

export const LANGUAGES: Array<{ code: LanguageCode; label: string }> = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
  { code: "sw", label: "Kiswahili" },
  { code: "no", label: "Norsk" },
  { code: "pl", label: "Polski" },
  { code: "ru", label: "Русский" },
  { code: "fil", label: "Filipino" },
  { code: "ti", label: "ትግርኛ" },
  { code: "so", label: "Soomaali" },
  { code: "hi", label: "हिन्दी" },
  { code: "th", label: "ไทย" },
  { code: "zh", label: "中文" },
];

type Dict = Record<string, string>;
export const defaultLanguage: LanguageCode = "en";

export const translations: Partial<Record<LanguageCode, Dict>> = {
  en: {
    "nav.pricing": "Pricing",
    "nav.docs": "Docs",
    "nav.contact": "Contact",
    "nav.createAccount": "Create account",
    "nav.signIn": "Sign in",
    "nav.menu": "Menu",
    "lang.label": "Language",
    "search.label": "Search",
  },
  no: {
    "nav.pricing": "Priser",
    "nav.docs": "Dokumentasjon",
    "nav.contact": "Kontakt",
    "nav.createAccount": "Opprett konto",
    "nav.signIn": "Logg inn",
    "nav.menu": "Meny",
    "lang.label": "Språk",
    "search.label": "Søk",
  },
  es: {
    "nav.pricing": "Precios",
    "nav.docs": "Documentos",
    "nav.contact": "Contacto",
    "nav.createAccount": "Crear cuenta",
    "nav.signIn": "Iniciar sesión",
    "nav.menu": "Menú",
    "lang.label": "Idioma",
    "search.label": "Buscar",
  },
  de: {
    "nav.pricing": "Preise",
    "nav.docs": "Dokumente",
    "nav.contact": "Kontakt",
    "nav.createAccount": "Konto erstellen",
    "nav.signIn": "Anmelden",
    "nav.menu": "Menü",
    "lang.label": "Sprache",
    "search.label": "Suche",
  },
  fr: {
    "nav.pricing": "Tarifs",
    "nav.docs": "Docs",
    "nav.contact": "Contact",
    "nav.createAccount": "Créer un compte",
    "nav.signIn": "Se connecter",
    "nav.menu": "Menu",
    "lang.label": "Langue",
    "search.label": "Recherche",
  },
  ar: {
    "nav.pricing": "الأسعار",
    "nav.docs": "الوثائق",
    "nav.contact": "اتصال",
    "nav.createAccount": "إنشاء حساب",
    "nav.signIn": "تسجيل الدخول",
    "nav.menu": "القائمة",
    "lang.label": "اللغة",
    "search.label": "بحث",
  },
  sw: {
    "nav.pricing": "Bei",
    "nav.docs": "Nyaraka",
    "nav.contact": "Mawasiliano",
    "nav.createAccount": "Fungua akaunti",
    "nav.signIn": "Ingia",
    "nav.menu": "Menyu",
    "lang.label": "Lugha",
    "search.label": "Tafuta",
  },
  pl: {
    "nav.pricing": "Cennik",
    "nav.docs": "Dokumenty",
    "nav.contact": "Kontakt",
    "nav.createAccount": "Utwórz konto",
    "nav.signIn": "Zaloguj się",
    "nav.menu": "Menu",
    "lang.label": "Język",
    "search.label": "Szukaj",
  },
  ru: {
    "nav.pricing": "Цены",
    "nav.docs": "Документы",
    "nav.contact": "Контакт",
    "nav.createAccount": "Создать аккаунт",
    "nav.signIn": "Войти",
    "nav.menu": "Меню",
    "lang.label": "Язык",
    "search.label": "Поиск",
  },
  fil: {
    "nav.pricing": "Presyo",
    "nav.docs": "Docs",
    "nav.contact": "Contact",
    "nav.createAccount": "Gumawa ng account",
    "nav.signIn": "Mag-sign in",
    "nav.menu": "Menu",
    "lang.label": "Wika",
    "search.label": "Search",
  },
  ti: {
    "nav.pricing": "ዋጋ",
    "nav.docs": "ሰነዳት",
    "nav.contact": "ርክብ",
    "nav.createAccount": "ኣካውንት ፍጠር",
    "nav.signIn": "እቶ",
    "nav.menu": "ሜኑ",
    "lang.label": "ቋንቋ",
    "search.label": "ፈልግ",
  },
  so: {
    "nav.pricing": "Qiimeyn",
    "nav.docs": "Dukumentiyo",
    "nav.contact": "La xiriir",
    "nav.createAccount": "Samee akoon",
    "nav.signIn": "Soo gal",
    "nav.menu": "Menu",
    "lang.label": "Luqad",
    "search.label": "Raadi",
  },
  hi: {
    "nav.pricing": "मूल्य",
    "nav.docs": "दस्तावेज़",
    "nav.contact": "संपर्क",
    "nav.createAccount": "खाता बनाएं",
    "nav.signIn": "साइन इन",
    "nav.menu": "मेनू",
    "lang.label": "भाषा",
    "search.label": "खोजें",
  },
  th: {
    "nav.pricing": "ราคา",
    "nav.docs": "เอกสาร",
    "nav.contact": "ติดต่อ",
    "nav.createAccount": "สร้างบัญชี",
    "nav.signIn": "เข้าสู่ระบบ",
    "nav.menu": "เมนู",
    "lang.label": "ภาษา",
    "search.label": "ค้นหา",
  },
  zh: {
    "nav.pricing": "价格",
    "nav.docs": "文档",
    "nav.contact": "联系",
    "nav.createAccount": "创建账户",
    "nav.signIn": "登录",
    "nav.menu": "菜单",
    "lang.label": "语言",
    "search.label": "搜索",
  },
};

export function t(lang: LanguageCode, key: string): string {
  return translations[lang]?.[key] || translations.en?.[key] || key;
}
