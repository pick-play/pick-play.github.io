"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

const categories = [
  {
    id: "life",
    name: "Herramientas",
    tagline: "Decisiones del día a día, rápidas e inteligentes",
    services: [
      {
        title: "¿Qué Comer?",
        description: "Más de 130 opciones de menú. Elige según tu estado de ánimo con el mapa de sabores.",
        href: "/es/food",
        emoji: "🍽️",
        gradient: "from-orange-400 to-red-500",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        stat: "130+ menús",
      },
      {
        title: "Dividir Cuenta",
        description: "Divide cuentas sin complicaciones. Exclusiones por ítem, división diferencial y transferencia mínima.",
        href: "/es/settlement",
        emoji: "💰",
        gradient: "from-green-400 to-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "Pago justo",
      },
      {
        title: "Ideas para Citas",
        description: "10 ciudades, 200 rutas. Encuentra el plan perfecto para tu cita en el mapa de ambiente.",
        href: "/es/date-course",
        emoji: "💑",
        gradient: "from-pink-400 to-purple-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "10 ciudades",
      },
      {
        title: "Ruleta Aleatoria",
        description: "¿No puedes decidir qué comer o quién va primero? ¡Gira la ruleta y decide!",
        href: "/es/roulette",
        emoji: "🎯",
        gradient: "from-cyan-400 to-blue-500",
        bg: "bg-cyan-50 dark:bg-cyan-950/20",
        stat: "Personalizable",
      },
      {
        title: "Calculadora D-Day",
        description: "Cuenta regresiva para fechas importantes. Exámenes, cumpleaños, aniversarios.",
        href: "/es/d-day",
        emoji: "📅",
        gradient: "from-sky-400 to-indigo-500",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        stat: "D-Day",
      },
      {
        title: "Sorteo",
        description: "¡Sorteo aleatorio completamente justo! Revela a los ganadores con volteo dramático de cartas.",
        href: "/es/draw",
        emoji: "🎫",
        gradient: "from-yellow-400 to-amber-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "Volteo de cartas",
      },
      {
        title: "Asignación de Asientos",
        description: "Asigna asientos aleatoriamente para aulas, salas de reuniones o cafés de estudio.",
        href: "/es/seat",
        emoji: "💺",
        gradient: "from-slate-400 to-zinc-500",
        bg: "bg-slate-50 dark:bg-slate-950/20",
        stat: "Plantillas",
      },
      {
        title: "Generador de Apodos",
        description: "Genera apodos aleatorios en 6 estilos: tierno, genial, gracioso y más.",
        href: "/es/nickname",
        emoji: "✏️",
        gradient: "from-lime-400 to-green-500",
        bg: "bg-lime-50 dark:bg-lime-950/20",
        stat: "6 estilos",
      },
      {
        title: "Herramientas PDF",
        description: "Une, divide, convierte a JPG y comprime PDFs. Todo en tu navegador, de forma segura.",
        href: "/es/pdf",
        emoji: "📄",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "7 funciones",
      },
      {
        title: "Herramientas de Imagen",
        description: "Convierte, comprime, redimensiona y recorta imágenes. Procesamiento múltiple de una vez.",
        href: "/es/image",
        emoji: "🖼️",
        gradient: "from-blue-400 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "6 funciones",
      },
      {
        title: "Juego de Escalera",
        description: "¿Quién será el elegido? ¡Animación emocionante de seguimiento de rutas!",
        href: "/es/ladder",
        emoji: "🪜",
        gradient: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "Seguimiento",
      },
    ],
  },
  {
    id: "party",
    name: "Juegos de Fiesta",
    tagline: "Juegos en tiempo real para disfrutar con amigos",
    services: [
      {
        title: "Juego del Mentiroso",
        description: "¡Juego de fiesta con amigos! Encuentra al mentiroso escondido entre el grupo.",
        href: "/es/liar-game",
        emoji: "🎭",
        gradient: "from-violet-500 to-fuchsia-500",
        bg: "bg-violet-50 dark:bg-violet-950/20",
        stat: "8 temas",
      },
      {
        title: "Formar Equipos",
        description: "Divide en equipos de forma aleatoria y justa. ¡Con animaciones llenas de emoción!",
        href: "/es/random-team",
        emoji: "🎲",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "Asignación aleatoria",
      },
      {
        title: "Esto o Aquello",
        description: "¡Esto vs aquello! Disfruta de debates divertidos con múltiples temas de juego.",
        href: "/es/balance-game",
        emoji: "⚖️",
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-amber-50 dark:bg-amber-950/20",
        stat: "50+ preguntas",
      },
      {
        title: "Quiz de Palabras",
        description: "¡Adivina la palabra a partir de las iniciales! Con pistas y temporizador para más emoción.",
        href: "/es/chosung-quiz",
        emoji: "🔤",
        gradient: "from-teal-400 to-green-500",
        bg: "bg-teal-50 dark:bg-teal-950/20",
        stat: "100+ palabras",
      },
      {
        title: "Verdad o Reto",
        description: "¡392 preguntas y misiones! El juego de fiesta esencial con niveles de intensidad.",
        href: "/es/truth-dare",
        emoji: "🔥",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "392 misiones",
      },
      {
        title: "Torneo del Tipo Ideal",
        description: "6 categorías, 96 candidatos. ¡Encuentra tu tipo ideal en un torneo de eliminación!",
        href: "/es/worldcup",
        emoji: "🏆",
        gradient: "from-yellow-400 to-orange-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "96 candidatos",
      },
    ],
  },
  {
    id: "test",
    name: "Tests",
    tagline: "Análisis de personalidad para conocerte mejor",
    services: [
      {
        title: "Test Teto vs Egen",
        description: "¿Eres tipo Teto o Egen? Descúbrelo con este análisis de personalidad.",
        href: "/es/teto-egen",
        emoji: "🧠",
        gradient: "from-rose-400 to-pink-500",
        bg: "bg-rose-50 dark:bg-rose-950/20",
        stat: "Análisis de carácter",
      },
      {
        title: "Test MBTI",
        description: "Descubre tu tipo de personalidad MBTI y compatibilidad con solo 20 preguntas.",
        href: "/es/mbti",
        emoji: "✨",
        gradient: "from-indigo-400 to-purple-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/20",
        stat: "16 tipos",
      },
      {
        title: "Compatibilidad de Pareja",
        description: "¡Prueba tu compatibilidad por nombre! Análisis detallado en 5 categorías.",
        href: "/es/couple-test",
        emoji: "💕",
        gradient: "from-pink-400 to-red-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "5 análisis",
      },
      {
        title: "Test de Color",
        description: "¿Qué color te representa? Descubre tu personalidad a través del color en 10 preguntas.",
        href: "/es/color-test",
        emoji: "🎨",
        gradient: "from-fuchsia-400 to-purple-500",
        bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
        stat: "8 colores",
      },
      {
        title: "Tarot Sí o No",
        description: "¿Tienes una duda? ¡Consúltalo a las cartas del tarot! 22 Arcanos Mayores.",
        href: "/es/tarot",
        emoji: "🔮",
        gradient: "from-purple-500 to-indigo-600",
        bg: "bg-purple-50 dark:bg-purple-950/20",
        stat: "22 cartas",
      },
    ],
  },
];

const floatingEmoji = [
  { emoji: "🍕", x: "10%", y: "20%", delay: 0, duration: 6 },
  { emoji: "🍜", x: "85%", y: "15%", delay: 1.5, duration: 7 },
  { emoji: "☕", x: "75%", y: "65%", delay: 0.8, duration: 5.5 },
  { emoji: "🎮", x: "15%", y: "70%", delay: 2.2, duration: 6.5 },
  { emoji: "💸", x: "90%", y: "45%", delay: 0.5, duration: 7.5 },
  { emoji: "🗺️", x: "5%", y: "45%", delay: 1.8, duration: 6.2 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function EsHome() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-20 text-center overflow-hidden">
        {/* Floating decorative emoji */}
        {floatingEmoji.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl opacity-[0.12] dark:opacity-[0.08] pointer-events-none select-none"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -18, 0, 18, 0],
              rotate: [0, 8, 0, -8, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 text-sm font-medium"
        >
          22 Herramientas · Juegos de Fiesta · Tests de Personalidad
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Menos dudas,
          <br />
          <span className="bg-gradient-to-r from-primary-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            decisiones rápidas
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          ¿Qué comer, adónde ir, quién es el mentiroso?
          <br className="hidden md:block" />
          — Un clic y listo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/es/food"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
          >
            🍽️ ¿Qué Comer?
          </Link>
          <Link
            href="/es/liar-game"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:-translate-y-0.5"
          >
            🎭 Juego del Mentiroso
          </Link>
          <Link
            href="/es/mbti"
            className="px-7 py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5"
          >
            ✨ Test MBTI
          </Link>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
      </div>

      {/* Categorized Service Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-24 space-y-16">
        {categories.map((category, categoryIndex) => (
          <div key={category.id}>
            {/* Category Header */}
            <motion.div
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex items-center gap-4 mb-6"
            >
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {category.name}
                </h2>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                  {category.tagline}
                </p>
              </div>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/60" />
            </motion.div>

            {/* Service Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {category.services.map((service) => (
                <motion.div key={service.href} variants={itemVariants}>
                  <Link href={service.href} className="block group h-full">
                    <div
                      className={`relative h-full p-7 rounded-2xl ${service.bg} border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
                    >
                      {/* Subtle gradient accent */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.gradient} opacity-[0.06] rounded-bl-full`}
                      />

                      <div className="relative">
                        <div className="text-4xl mb-4">{service.emoji}</div>
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-xl font-bold group-hover:text-primary-500 transition-colors">
                            {service.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-[11px] font-bold rounded-full bg-gradient-to-r ${service.gradient} text-white`}
                          >
                            {service.stat}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-1 text-sm font-medium text-primary-500 translate-x-0 group-hover:translate-x-1 transition-all">
                          Comenzar
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {categoryIndex === 1 && (
              <div className="mt-10">
                <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
              </div>
            )}
          </div>
        ))}
      </section>

      <div className="max-w-4xl mx-auto px-4 mb-8">
        <AdBanner format="horizontal" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
      </div>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-center">PickPlay te ayuda a decidir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">¿Qué comer hoy?</h3>
              <p>Olvídate del dilema diario del menú. PickPlay te recomienda entre más de 130 opciones: comida coreana, japonesa, china, occidental y más, según tu estado de ánimo.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Juegos de Fiesta</h3>
              <p>Juego del mentiroso, esto o aquello, quiz de palabras, verdad o reto, juego de escalera, torneo del tipo ideal y más. ¡7 juegos para disfrutar con tus amigos!</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Herramientas del Día a Día</h3>
              <p>Divide cuentas, calcula días, realiza sorteos, asigna asientos y genera apodos. Todas las herramientas que necesitas en un solo lugar.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Tests de Personalidad</h3>
              <p>Test MBTI, Teto vs Egen, compatibilidad de pareja, test de color y tarot. ¡Conócete mejor a ti mismo con tests divertidos!</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Rutas de Cita</h3>
              <p>Más de 200 rutas de cita en 10 ciudades. Planes personalizados según tus gustos, disponibles tanto de día como de noche.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Decisiones Aleatorias</h3>
              <p>Ruleta, sorteo, escalera, formación de equipos — cuando no puedes decidir, ¡deja que el azar lo haga de forma justa y divertida!</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
