// src/utils/seoHelpers.js

export const generateBreadcrumbSchema = (locationName, locationSlug) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://superemas.id';
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Harga Emas ${locationName}`,
        "item": `${siteUrl}/harga-emas-${locationSlug}`
      }
    ]
  };
};

export const generateWebPageSchema = (locationData) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://superemas.id';
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": locationData.seo.h1,
    "description": locationData.seo.metaDescription,
    "url": `${siteUrl}/harga-emas-${locationData.slug}`
  };
};

export const generateFAQSchema = (faqItems) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateStructuredData = (locationData) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateBreadcrumbSchema(locationData.name, locationData.slug),
      generateWebPageSchema(locationData),
      generateFAQSchema(locationData.content.faq)
    ]
  };
};
