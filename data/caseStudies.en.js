// Casos de éxito en inglés, traducidos de data/caseStudies.js (documento
// "Resultados de clientes reales", 21/09/2026). Mismas cifras, mismos casos y
// mismo orden; no agregar datos que no estén en el original. El `id` es el del
// español (identificador estable); el slug en inglés sale de caseStudySlugs.js.
// Sin guiones largos en el copy visible (misma regla que el blog).

export const CASE_STUDIES_EN = {
  eyebrow: "Case studies",
  title: "Case studies",
  tagline: "KLIV Agency · Since 2014",
  intro: "Results that speak for themselves.",
  description:
    "Performance marketing case studies: Rolicred went from 3x to 15x return, a developer sold its last 5 units and Saniito added online sales and new countries.",
  cases: [
    {
      id: "rolicred",
      name: "Rolicred",
      logo: "/logos/Logo Rolicred (Color).png",
      sector: "Personal loans",
      location: "Córdoba, Argentina",
      website: "https://rolicred.com",
      profile:
        "Personal loan company that serves clients in person at its branch and gets most of its applicants through WhatsApp.",
      metric: { value: "15x", label: "return on ad spend, up from 3x" },
      summary:
        "From 1 qualified inquiry in every 50 to 99% qualified inquiries, with return on ad spend rising from 3x to 15x.",
      challenge:
        "The campaigns generated a high volume of WhatsApp inquiries, but the vast majority did not meet Rolicred's lending requirements: out of every 50 messages received, only 1 was a viable case. The team spent most of its time answering, processing and discarding inquiries that would never turn into an approved loan.",
      solution: [
        "Design and launch of a dedicated landing page (rolicred.com) with a dynamic form that qualifies each applicant on the spot, based on the business's actual lending requirements.",
        "An internal dashboard that lists every applicant in a table, organized by status and qualification details, instead of relying on a cluttered WhatsApp inbox.",
        "Implementation of the Meta Conversions API, so the platform learns which users actually qualified and optimizes campaign delivery based on that, not just on who sends a message.",
      ],
      resultsTitle: "Results",
      results: [
        { metric: "Qualified inquiries out of all WhatsApp inquiries", before: "1 in 50", after: "99%" },
        { metric: "Return on ad spend", before: "3x", after: "15x" },
        { metric: "New clients per month", before: "~10", after: "~100" },
        { metric: "Staff dedicated to answering inquiries", before: "2 employees", after: "1 salesperson (only schedules the signing)" },
      ],
      outcome:
        "Before, the ceiling for scaling ad spend was neither the market nor the budget: it was the team's capacity to respond. With automatic qualification in place, Rolicred scales its investment month after month, and the only limit is the number of appointments available to sign the loan file at the branch.",
      note: {
        label: "Next step, in progress",
        text: "Implementing a CRM to fully automate appointment scheduling, without relying on a salesperson to do it manually. The goal is to free up that capacity to open new branches in other towns across Córdoba.",
      },
    },
    {
      id: "desarrolladora-departamentos-de-lujo",
      name: "Luxury apartment developer",
      sector: "Real estate",
      location: "Mexico",
      profile:
        "Builder of luxury apartments with units priced between USD 500,000 and 900,000, an in-house sales team of 10 and a CRM already in place.",
      metric: { value: "5 of 5", label: "last units sold in 3 months" },
      summary:
        "No previous agency had closed a single unit through advertising. In 3 months, the last 5 available units were sold.",
      challenge:
        "With previous agencies, the brand had never closed the sale of a single unit through its ad campaigns, despite having a large sales team and management tools already in place.",
      solution: [
        "Landing page improvements to raise the quality of the first impression and of lead capture.",
        "Campaigns connected to the client's CRM, prioritizing delivery based on the leads the sales team itself flagged as most qualified.",
        "Testing of different affluent audiences, instead of generic targeting.",
        "Real creative diversity: different messaging angles to find the one that best connected with a purchase decision at that level.",
        "Coordination with a local video production company to film the development's facilities at professional quality.",
        "The most effective angle turned out to be positioning the purchase as an investment opportunity, with real appreciation data (increase in value) and future projections, complemented by ads inviting people to book a guided tour of the property.",
      ],
      resultsTitle: "Results (3 months)",
      results: [
        { metric: "Units sold through advertising", before: "0 (with previous agencies)", after: "The last 5 available units" },
        { metric: "Lead quality", before: "Random, with no defined purchasing power", after: "Genuine interest and real income to buy" },
      ],
      note: {
        label: "Result",
        text: "In 3 months, the developer sold the last 5 available units in the development, something its team of 10 salespeople had never achieved through advertising with any previous agency.",
      },
    },
    {
      id: "saniito",
      name: "Saniito",
      logo: "/logos/Logo Saniito (Color).png",
      sector: "Food manufacturing",
      location: "Chile → Peru → Spain",
      profile:
        "Manufacturer of corn tortillas and chips that started operating in Chile and has historically sold wholesale.",
      metric: { value: "3 countries", label: "with its own factory: Chile, Peru and Spain" },
      summary:
        "From selling only wholesale in Chile to adding online sales, new retailers and its own factories in Peru and Spain.",
      challenge:
        "Almost all of Saniito's sales were wholesale, through a small number of supermarkets. The brand couldn't sell from its own website, and it also wanted to reach new retailers and specialty food stores within Chile.",
      solution: [
        "Website optimization to enable and sustain online sales.",
        "A new advertising structure with an online sales objective, working different stages of the conversion funnel to nurture potential customers and build regular repeat purchases.",
        "B2B (business to business) campaigns running in parallel, designed specifically to generate leads from new retailers.",
      ],
      resultsTitle: "Results",
      resultsHeading: "Area",
      results: [
        { metric: "Sales channel", before: "Wholesale only", after: "Wholesale + online sales + new retailers" },
        { metric: "Online sales", before: "None", after: "Steady growth month after month" },
        { metric: "Geographic presence", before: "Chile", after: "Chile, Peru and Spain" },
      ],
      note: {
        label: "Result",
        text: "The B2B campaigns built new commercial partnerships with retailers, and the steady growth of online sales drove Saniito's expansion, with its own factory, to Peru and later to Spain, adapting the messaging to each country's customs while keeping the same advertising logic. The brand is already planning its next entry into Argentina.",
      },
    },
    {
      id: "instituto-educativo",
      name: "Educational institute",
      sector: "Education",
      location: "Latin America",
      profile: "Educational institute offering in-person and online programs, with its own sales team.",
      metric: { value: "More students", label: "with profitability measurable from the first month" },
      summary:
        "From not knowing whether campaigns were profitable to measuring each one and each salesperson, and growing enrollment month after month.",
      challenge:
        "The institute came to KLIV with disorganized lead management: it had no real visibility into whether its campaigns were profitable, or how to organize and measure its sales team.",
      solution: [
        "Development of a proprietary CRM, 100% tailored to its requirements and to the way its sales team works.",
        "Integration of that CRM with the ad platforms, feeding them real data on which leads turned out to be good quality.",
      ],
      resultsTitle: "Results",
      resultsHeading: "Area",
      results: [
        { metric: "Visibility into profitability per campaign", before: "None", after: "Measurable from the first month" },
        { metric: "Performance per salesperson", before: "Not tracked", after: "Identified individually" },
        { metric: "Lead quality and sales rate", before: "Low", after: "Steadily improved" },
      ],
      outcome:
        "With that information in order, the institute was able to scale its campaigns gradually, increasing the number of students month after month, a scaling process that is still active today.",
    },
  ],
  others: {
    title: "Other industries and business models",
    items: [
      {
        name: "Political parties",
        location: "Argentina and Italy",
        text: "Management of digital advertising for political campaigns in local and national elections. The stated goal was reached in every election managed except one, working with each team on content, political ad authorization on the platforms and database cleanup to optimize distribution.",
      },
      {
        name: "Coaches and mentors",
        location: "Multiple countries",
        text: "Management of one-on-one consulting coaches and online course sellers, with custom structures that feed the algorithms real conversion data. Every account grew its sales month after month, without the coach having to spend time filtering leads manually.",
      },
      {
        name: "Women's fashion e-commerce",
        location: "Argentina",
        text: "Management of multiple footwear, lingerie and clothing brands. The work covered creative diversity, organizing web data tracking, setting CPA and ROAS targets, progressive nationwide scaling, adapting to the country's economic crises and seasonality, making the most of dates like Cyber Monday, and bringing in content creators.",
      },
      {
        name: "Agencies (white-label service)",
        location: "Across Latin America",
        text: "For years, KLIV managed ad campaigns on an outsourced basis for multiple agencies across the region, which relied on its expertise to serve their own clients under a white-label model: hundreds of accounts managed under the same performance marketing philosophy.",
      },
    ],
  },
  cta: {
    title: "Has your brand hit a ceiling?",
    text: "Tell us about your case and we'll assess whether we can help you break through it.",
  },
};
