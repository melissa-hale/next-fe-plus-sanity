export function LocalBusinessSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Wallcoverings By Don Dye",
    "description": "Professional wallpaper installation specialist serving Austin and Central Texas",
    "url": "https://www.wallcoveringsbydondye.com",
    "telephone": "(832)788-3667",
    "priceRange": "$$",
    "image": "https://www.wallcoveringsbydondye.com/bg-maybe-edit.jpg",
    "paymentAccepted": "Cash, Check, Credit Card",
    "hasMap": "https://maps.google.com/?q=Wallcoverings+By+Don+Dye+Austin+TX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.2672",
      "longitude": "-97.7431"
    },
    "areaServed": [
      { "@type": "City", "name": "Austin", "addressRegion": "TX" },
      { "@type": "City", "name": "Round Rock", "addressRegion": "TX" },
      { "@type": "City", "name": "Cedar Park", "addressRegion": "TX" },
      { "@type": "City", "name": "Georgetown", "addressRegion": "TX" },
      { "@type": "City", "name": "Pflugerville", "addressRegion": "TX" },
      { "@type": "City", "name": "Kyle", "addressRegion": "TX" },
      { "@type": "City", "name": "Buda", "addressRegion": "TX" },
      { "@type": "City", "name": "San Marcos", "addressRegion": "TX" }
    ],
    "serviceType": [
      "Wallpaper Installation",
      "Wall Covering Installation",
      "Wallpaper Removal",
      "Custom Wall Treatments"
    ],
    "openingHours": "Mo-Fr 08:00-17:00",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Accreditation",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Wallcovering Installers Association"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export function ServiceSchema() {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Professional Wallpaper Installation",
    "description": "Expert wallpaper and wall covering installation services for residential and commercial properties in Austin and Central Texas",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Wallcoverings By Don Dye",
      "telephone": "(832)788-3667"
    },
    "areaServed": {
      "@type": "State", 
      "name": "Texas"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Wallcovering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wallpaper Installation",
            "description": "Professional installation of residential and commercial wallpaper"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Wallpaper Removal",
            "description": "Safe and efficient removal of existing wallpaper"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Custom Wall Treatments",
            "description": "Specialty wall covering and custom decorative treatments"
          }
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceData)
      }}
    />
  )
}