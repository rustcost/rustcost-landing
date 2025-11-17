import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  normalizeLanguageCode,
  replaceLanguageInPath,
  SUPPORTED_LANGUAGES,
} from "@/constants/language";
import type { LanguageCode } from "@/types/i18n";

type PageSEOProps = {
  titleKey: string;
  titleDefault: string;
  descriptionKey: string;
  descriptionDefault: string;
  structuredData?: Record<string, unknown>;
  titleParams?: Record<string, unknown>;
  descriptionParams?: Record<string, unknown>;
};

const FALLBACK_SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://rustcost.dev";

export default function PageSEO({
  titleKey,
  titleDefault,
  descriptionKey,
  descriptionDefault,
  titleParams,
  descriptionParams,
  structuredData,
}: PageSEOProps) {
  type LanguageParams = { ["lng"]?: LanguageCode };
  const params = useParams<LanguageParams>();
  const language = normalizeLanguageCode(params["lng"]);
  const { pathname, search } = useLocation();
  const { t } = useTranslation();

  const pageTitle =
    t(titleKey, {
      defaultValue: titleDefault,
      ...(titleParams ?? {}),
    }) || t("seo.defaultTitle");

  const pageDescription =
    t(descriptionKey, {
      defaultValue: descriptionDefault,
      ...(descriptionParams ?? {}),
    }) || t("seo.defaultDescription");

  const canonicalPath = `${pathname}${search ?? ""}`;
  const canonicalUrl = `${FALLBACK_SITE_URL}${canonicalPath}`;

  const alternateLinks = SUPPORTED_LANGUAGES.map((lng) => {
    const localizedPath = replaceLanguageInPath(pathname, lng);
    return {
      lng,
      href: `${FALLBACK_SITE_URL}${localizedPath}${search ?? ""}`,
    };
  });

  return (
    <Helmet prioritizeSeoTags>
      <html lang={language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {alternateLinks.map((link) => (
        <link
          key={link.lng}
          rel="alternate"
          hrefLang={link.lng}
          href={link.href}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${FALLBACK_SITE_URL}${replaceLanguageInPath(
          pathname,
          DEFAULT_LANGUAGE
        )}${search ?? ""}`}
      />
      <meta property="og:site_name" content={t("seo.siteName", { defaultValue: "RustCost" })} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      ) : null}
    </Helmet>
  );
}
