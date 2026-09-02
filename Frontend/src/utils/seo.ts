export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'service';
  structuredData?: Record<string, any>;
}

export function updateSeo({
  title,
  description,
  canonical,
  ogType = 'website',
  structuredData
}: SeoProps) {
  const brandSuffix = ' | Insight Pest Solutions';
  const fullTitle = title ? `${title}${brandSuffix}` : 'Insight Pest Solutions | Professional Pest Control & Management';

  document.title = fullTitle;

  // Update Meta Description
  let metaDesc = document.querySelector("meta[name='description']");
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description || 'Professional pest control you can trust. Family-safe residential & commercial pest management.');

  // Update Canonical
  let linkCanonical = document.querySelector("link[rel='canonical']");
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonical || window.location.href);

  // Update OG Type
  let ogTypeTag = document.querySelector("meta[property='og:type']");
  if (ogTypeTag) {
    ogTypeTag.setAttribute('content', ogType);
  }

  // Inject Structured Data (Schema.org JSON-LD)
  if (structuredData) {
    let scriptTag = document.getElementById('json-ld-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-structured-data';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }
}
