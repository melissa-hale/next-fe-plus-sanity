const faqs = [
  {
    question: 'How long does professional wallpaper installation take?',
    answer: 'Most rooms take 4–8 hours depending on size, wall condition, and wallpaper type. Larger spaces or intricate pattern-matching may take a full day. Don Dye will give you a time estimate during your free consultation.',
  },
  {
    question: 'How much does professional wallpaper installation cost in Austin?',
    answer: 'Pricing depends on the room size, number of walls, wallpaper type, and any removal needed. Contact Wallcoverings By Don Dye for a free, no-obligation estimate tailored to your project.',
  },
  {
    question: 'Do you remove old wallpaper before installing new?',
    answer: 'Yes. Don Dye offers wallpaper removal as part of the installation process. Proper removal and wall preparation are essential for a smooth, long-lasting result.',
  },
  {
    question: 'What types of wallpaper can you install?',
    answer: 'We install all types of residential and commercial wallcoverings, including grasscloth, vinyl, fabric-backed, peel-and-stick, hand-printed, and specialty textured wallpapers.',
  },
  {
    question: 'Do you offer free estimates?',
    answer: 'Yes. Contact us through the website or call (832) 788-3667 to schedule a free, no-obligation estimate for your Austin-area wallpaper installation project.',
  },
  {
    question: 'Do you serve areas outside of Austin?',
    answer: 'Yes. We serve all of Central Texas including Round Rock, Cedar Park, Georgetown, Pflugerville, Kyle, Buda, and San Marcos.',
  },
]

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
