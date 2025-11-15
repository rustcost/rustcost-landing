import type { LanguageCode, LanguageOption } from "@/types/i18n";

/**
 * The default language used when no valid language code is provided.
 * Ensures a consistent fallback for routing and UI initialization.
 */
export const DEFAULT_LANGUAGE: LanguageCode = "en";

/**
 * Display-ready language options used by UI components.
 * Contains both the internal language code and the label shown to users.
 * Acts as the single source of truth for language selection UIs.
 */
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
];

/**
 * A derived list of supported languages extracted from LANGUAGE_OPTIONS.
 * Used primarily for validation and type narrowing.
 */
export const SUPPORTED_LANGUAGES: readonly LanguageCode[] =
  LANGUAGE_OPTIONS.map((option) => option.code);

/**
 * Type-safe validator that checks whether a given value is a valid LanguageCode.
 * Uses a type predicate so that TypeScript will narrow the type in conditionals.
 *
 * @param value - The string to validate.
 * @returns True if the value is a recognized LanguageCode.
 */
export const isLanguageCode = (value?: string | null): value is LanguageCode =>
  !!value && SUPPORTED_LANGUAGES.includes(value as LanguageCode);

/**
 * Normalizes any input into a valid LanguageCode.
 * Invalid, null, or undefined values are automatically replaced with DEFAULT_LANGUAGE.
 *
 * @param value - The raw language input.
 * @returns A guaranteed valid LanguageCode.
 */
export const normalizeLanguageCode = (value?: string | null): LanguageCode =>
  isLanguageCode(value) ? value : DEFAULT_LANGUAGE;

/**
 * Builds a URL prefix (e.g., "/en", "/ko") from the given language.
 * Ensures the resulting value always contains a valid language code.
 *
 * @param value - The language input.
 * @returns A normalized language path segment including the leading slash.
 */
export const buildLanguagePrefix = (value?: string | null): string =>
  `/${normalizeLanguageCode(value)}`;

/**
 * Replaces the language segment of a given pathname with the next language.
 * Safely handles edge cases:
 * - Non-prefixed paths fallback to a normalized prefix.
 * - Empty path returns a valid language prefix.
 *
 * @param pathname - The current URL path.
 * @param nextLanguage - The target language code to inject.
 * @returns The updated path with the new language applied.
 */
export const replaceLanguageInPath = (
  pathname: string,
  nextLanguage: LanguageCode
): string => {
  if (!pathname.startsWith("/")) {
    return buildLanguagePrefix(nextLanguage);
  }

  const segments = pathname.split("/");
  segments[1] = nextLanguage;

  const candidate = segments.join("/");
  return candidate === "" ? buildLanguagePrefix(nextLanguage) : candidate;
};
