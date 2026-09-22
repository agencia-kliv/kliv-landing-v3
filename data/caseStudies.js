// Casos de éxito en español, transcritos del documento "Resultados de clientes
// reales" entregado el 21/09/2026. Rolicred y Saniito se publican con nombre
// real por autorización del cliente; el resto va sin marca por política de
// privacidad. No agregar cifras que no estén en el documento original.
//
// `metric` es el dato que se destaca en las tarjetas del índice; `results` es
// la tabla antes/después completa de la página de cada caso. `id` es el slug
// de la página del caso. Sin guiones largos en el copy visible (misma regla
// que el blog).

export const CASE_STUDIES_PATH_ES = "casos-de-exito";

export const CASE_STUDIES_ES = {
  eyebrow: "Casos de éxito",
  title: "Casos de éxito",
  tagline: "Agencia KLIV · Desde 2014",
  intro: "Resultados que hablan por sí solos.",
  description:
    "Casos de performance marketing: cómo Rolicred pasó de 3x a 15x de retorno, una desarrolladora vendió sus últimas 5 unidades y Saniito abrió venta online y nuevos países.",
  cases: [
    {
      id: "rolicred",
      name: "Rolicred",
      logo: "/logos/Logo Rolicred (Color).png",
      sector: "Créditos personales",
      location: "Córdoba, Argentina",
      website: "https://rolicred.com",
      profile:
        "Empresa de créditos personales con atención presencial en sucursal, captación principal a través de WhatsApp.",
      metric: { value: "15x", label: "de retorno publicitario, antes 3x" },
      summary:
        "De 1 consulta calificada cada 50 a un 99% de consultas calificadas, con el retorno publicitario de 3x a 15x.",
      challenge:
        "Las campañas generaban un volumen alto de consultas por WhatsApp, pero la gran mayoría no calificaba según los requisitos crediticios de Rolicred: de cada 50 mensajes recibidos, solo 1 correspondía a un caso viable. El equipo perdía la mayor parte de su tiempo respondiendo, procesando y descartando consultas que nunca iban a convertirse en un crédito otorgado.",
      solution: [
        "Desarrollo e implementación de una landing page propia (rolicred.com) con un formulario dinámico que califica a cada solicitante en el momento, según los requisitos crediticios reales del negocio.",
        "Panel interno que muestra a todos los solicitantes en una tabla, organizados por estado e información de calificación, en vez de depender de una bandeja de WhatsApp desordenada.",
        "Implementación de la API de Conversiones de Meta, para que la plataforma reciba la información de qué usuarios calificaron realmente y optimice la entrega de las campañas en base a ese aprendizaje, no solo en base a quién envía un mensaje.",
      ],
      resultsTitle: "Resultado",
      results: [
        { metric: "Consultas calificadas sobre el total de WhatsApp", before: "1 de cada 50", after: "99%" },
        { metric: "Retorno de la inversión publicitaria", before: "3x", after: "15x" },
        { metric: "Clientes nuevos por mes", before: "~10", after: "~100" },
        { metric: "Personal dedicado a responder consultas", before: "2 empleados", after: "1 vendedor (solo agenda la firma)" },
      ],
      outcome:
        "Antes, el techo para escalar la inversión publicitaria no era el mercado ni el presupuesto: era la capacidad operativa del equipo para responder. Con el filtro automático resuelto, Rolicred escala su inversión mes a mes, con el único límite siendo la disponibilidad de turnos para firmar el legajo en la sucursal.",
      note: {
        label: "Próximo paso en curso",
        text: "Implementación de un CRM para automatizar por completo el agendamiento de citas, sin depender de que un vendedor lo haga manualmente. El objetivo es liberar esa capacidad para abrir nuevas sucursales en otras localidades de Córdoba.",
      },
    },
    {
      id: "desarrolladora-departamentos-de-lujo",
      name: "Desarrolladora de departamentos de lujo",
      sector: "Real estate",
      location: "México",
      profile:
        "Constructora de departamentos de lujo con unidades de entre USD 500.000 y 900.000, con equipo comercial propio de 10 vendedores y un CRM ya implementado.",
      metric: { value: "5 de 5", label: "últimas unidades vendidas en 3 meses" },
      summary:
        "Ninguna agencia anterior había cerrado una unidad por publicidad. En 3 meses se vendieron las últimas 5 disponibles.",
      challenge:
        "Con agencias anteriores, la marca nunca había logrado cerrar la venta de una sola unidad a través de sus campañas publicitarias, a pesar de contar con un equipo comercial numeroso y herramientas de gestión ya en funcionamiento.",
      solution: [
        "Mejora de la landing page para elevar la calidad de la primera impresión y la captura de datos.",
        "Campañas conectadas al CRM del cliente, priorizando la entrega según los leads que el propio equipo comercial marcaba como más calificados.",
        "Testeo de distintas audiencias de alto poder adquisitivo, en vez de una segmentación genérica.",
        "Diversidad creativa real: distintos ángulos de comunicación para encontrar cuál conectaba mejor con una decisión de compra de ese nivel.",
        "Coordinación con una productora audiovisual local para filmar las instalaciones del desarrollo con calidad profesional.",
        "El ángulo más efectivo resultó ser posicionar la compra como una oportunidad de inversión, con datos reales de plusvalía (aumento de valor) y proyección a futuro, complementado con anuncios que invitaban a agendar una visita guiada a las instalaciones.",
      ],
      resultsTitle: "Resultado (3 meses)",
      results: [
        { metric: "Unidades vendidas a través de publicidad", before: "0 (con agencias previas)", after: "Las 5 últimas unidades disponibles" },
        { metric: "Calidad de los leads", before: "Aleatoria, sin poder adquisitivo definido", after: "Con interés e ingresos reales para la compra" },
      ],
      note: {
        label: "Resultado",
        text: "En 3 meses, la constructora vendió las últimas 5 unidades disponibles del desarrollo, algo que su equipo de 10 vendedores no había logrado a través de publicidad con ninguna agencia anterior.",
      },
    },
    {
      id: "saniito",
      name: "Saniito",
      logo: "/logos/Logo Saniito (Color).png",
      sector: "Fábrica de alimentos",
      location: "Chile → Perú → España",
      profile:
        "Fábrica de tortillas y chips de maíz, con inicio de operaciones en Chile y venta históricamente mayorista.",
      metric: { value: "3 países", label: "con fábrica propia: Chile, Perú y España" },
      summary:
        "De vender solo a mayoristas en Chile a sumar venta online, nuevos retailers y fábrica propia en Perú y España.",
      challenge:
        "Casi la totalidad de las ventas de Saniito eran mayoristas, a través de un número reducido de supermercados. No lograban vender desde su propio sitio web, y buscaban además expandir su alcance a nuevos retailers y emporios dentro de Chile.",
      solution: [
        "Optimización del sitio web para habilitar y sostener la venta online.",
        "Nueva estructura publicitaria con objetivo de ventas online, trabajando distintas fases del embudo de conversión para nutrir a los clientes potenciales y lograr recompra habitual.",
        "Campañas B2B (Negocio a Negocio) en paralelo, diseñadas específicamente para generar leads de nuevos retailers.",
      ],
      resultsTitle: "Resultado",
      resultsHeading: "Frente",
      results: [
        { metric: "Canal de venta", before: "Mayorista únicamente", after: "Mayorista + venta online + nuevos retailers" },
        { metric: "Ventas online", before: "Inexistentes", after: "Crecimiento mes a mes sostenido" },
        { metric: "Presencia geográfica", before: "Chile", after: "Chile, Perú y España" },
      ],
      note: {
        label: "Resultado",
        text: "Las campañas B2B generaron nuevas alianzas comerciales con retailers, y el crecimiento sostenido de las ventas online impulsó la expansión de Saniito con fábrica propia a Perú y, más tarde, a España, adaptando la comunicación a las costumbres de cada país, pero manteniendo la misma lógica publicitaria. La marca ya planea su próxima entrada a Argentina.",
      },
    },
    {
      id: "instituto-educativo",
      name: "Instituto educativo",
      sector: "Educación",
      location: "Latinoamérica",
      profile: "Instituto educativo con propuesta presencial y digital, equipo comercial propio.",
      metric: { value: "Más alumnos", label: "con rentabilidad medible desde el primer mes" },
      summary:
        "De no saber si las campañas eran rentables a medir cada una y a cada vendedor, y escalar alumnos mes a mes.",
      challenge:
        "El instituto llegó a KLIV con desorden en la gestión de sus leads: no tenían visibilidad real de si sus campañas eran rentables, ni cómo organizar y medir a su equipo de vendedores.",
      solution: [
        "Desarrollo de un CRM propio, 100% a medida de sus requerimientos y de la forma de trabajar de su equipo comercial.",
        "Integración de ese CRM con las plataformas publicitarias, para retroalimentarlas con información real de qué leads terminaban siendo de calidad.",
      ],
      resultsTitle: "Resultado",
      resultsHeading: "Frente",
      results: [
        { metric: "Visibilidad de rentabilidad por campaña", before: "Nula", after: "Medible desde el primer mes" },
        { metric: "Desempeño por vendedor", before: "Sin seguimiento", after: "Identificado individualmente" },
        { metric: "Calidad de leads y tasa de venta", before: "Baja", after: "Mejorada de forma sostenida" },
      ],
      outcome:
        "Con esa información ordenada, el instituto pudo escalar sus campañas de forma gradual, aumentando la cantidad de alumnos mes a mes, un proceso de escalamiento que continúa activo hoy.",
    },
  ],
  others: {
    title: "Otros rubros y modelos de negocio",
    items: [
      {
        name: "Partidos políticos",
        location: "Argentina e Italia",
        text: "Gestión del área de publicidad digital de campañas políticas en elecciones locales y nacionales. Se alcanzó el objetivo planteado en todas las elecciones gestionadas menos una, trabajando junto a cada equipo en contenidos, habilitación política en las plataformas y depuración de bases de datos para optimizar la distribución.",
      },
      {
        name: "Coaches y mentores",
        location: "Multipaís",
        text: "Gestión de coaches de consultoría 1 a 1 y de venta de cursos online, con estructuras a medida que retroalimentan a los algoritmos con datos reales de conversión. Cada cuenta escaló sus ventas mes a mes, sin que el coach tuviera que destinar tiempo a filtrar leads manualmente.",
      },
      {
        name: "E-commerce de indumentaria femenina",
        location: "Argentina",
        text: "Gestión de múltiples marcas de calzado, lencería y ropa. Se trabajó la diversidad creativa, el ordenamiento del seguimiento de datos web, la definición de objetivos de CPA y ROAS, la escala progresiva a nivel nacional, la adaptación a las crisis económicas del país y a la estacionalidad, el aprovechamiento de fechas como CyberMonday, y la incorporación de creadores de contenido.",
      },
      {
        name: "Agencias (servicio white-label)",
        location: "Toda Latinoamérica",
        text: "Durante años, KLIV gestionó de forma tercerizada las campañas publicitarias de múltiples agencias en toda la región, que recurrían a su expertise para atender a sus propios clientes bajo una dinámica white-label: cientos de cuentas gestionadas bajo la misma filosofía de performance marketing.",
      },
    ],
  },
  cta: {
    title: "¿Tu marca encontró un techo?",
    text: "Contanos tu caso y evaluamos si podemos ayudarte a romperlo.",
  },
};
