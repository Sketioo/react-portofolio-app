import React, { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import profil from "./images/profil.jpeg";

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang" },
  { id: "proyek", label: "Proyek" },
  { id: "kontak", label: "Kontak" },
];

const TECH_STACK = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "NestJS",
  "Express",
  "Laravel",
  "REST API",
  "JWT Auth",
  "Python",
  "Java",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "TypeORM",
  "Docker",
  "Linux Server",
  "VPS",
  "Nginx",
  "PM2",
  "GCP",
  "Cloud Computing",
];

const projectImageContext = require.context(
  "./images/projects",
  true,
  /\.(png|jpe?g|webp|avif)$/,
);

const toImageLabel = (path) => {
  const fileName =
    path
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, "") ?? "Preview";
  if (fileName.toLowerCase() === "preview") return "Preview utama";

  return fileName
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getProjectImages = (folder) =>
  projectImageContext
    .keys()
    .filter((path) => path.startsWith(`./${folder}/`))
    .sort((first, second) => {
      const firstIsPreview = /\/preview\.(png|jpe?g|webp|avif)$/i.test(first);
      const secondIsPreview = /\/preview\.(png|jpe?g|webp|avif)$/i.test(second);
      if (firstIsPreview && !secondIsPreview) return -1;
      if (!firstIsPreview && secondIsPreview) return 1;
      return first.localeCompare(second);
    })
    .map((path) => ({
      src: projectImageContext(path),
      label: toImageLabel(path),
    }));

const PUSPADAYA_GALLERY = getProjectImages("puspadaya");
const GETHUB_GALLERY = getProjectImages("gethub");
const LAMAR_FIT_GALLERY = getProjectImages("lamar-fit");
const SISTEM_INFORMASI_GALLERY = getProjectImages("sistem-informasi");

const PROJECTS = [
  {
    id: 1,
    title: "Puspadaya",
    year: "2024",
    category: "HealthTech",
    role: "Fullstack Engineer",
    duration: "1.8 tahun",
    team: "6 orang",
    summary:
      "Platform kesehatan ibu dan anak dengan deteksi dini risiko stunting dan pemantauan kehamilan terintegrasi.",
    challenge:
      "Membangun backend yang mampu menangani data kesehatan secara aman sambil memberikan notifikasi risiko secara cepat untuk tenaga kesehatan.",
    details:
      "Aplikasi Puspadaya berfokus pada dua misi utama: monitoring tumbuh kembang anak dan kesehatan ibu hamil. Sistem ini membantu tenaga kesehatan memantau indikator penting, mengirim notifikasi berbasis risiko, dan mempercepat keputusan intervensi agar penanganan bisa dilakukan lebih awal.",
    approach: [
      "Merancang struktur API modular untuk data kehamilan, tumbuh kembang anak, dan alert medis.",
      "Menerapkan validasi data berlapis untuk menjaga konsistensi input dari banyak sumber.",
      "Membangun mekanisme penilaian risiko agar sistem bisa memprioritaskan kasus penting lebih cepat.",
    ],
    impact:
      "Mempercepat proses identifikasi risiko kesehatan keluarga melalui monitoring berkala dan notifikasi proaktif.",
    outcomes: [
      "Alur input dan verifikasi data kesehatan jadi lebih terstruktur.",
      "Petugas dapat memantau kondisi ibu dan anak dalam satu dashboard terintegrasi.",
      "Keputusan intervensi bisa dilakukan lebih awal berbasis sinyal risiko.",
    ],
    technologies: [
      "TypeScript",
      "NestJS",
      "Node.js",
      "REST API",
      "MySQL",
      "TypeORM",
      "JWT Auth",
      "Swagger",
      "Docker",
      "Nginx",
    ],
    image: PUSPADAYA_GALLERY[0].src,
    gallery: PUSPADAYA_GALLERY,
  },
  {
    id: 2,
    title: "GetHub",
    year: "2024",
    category: "AI Platform",
    role: "Fullstack Engineer",
    duration: "6 bulan",
    team: "5 orang",
    summary:
      "Platform pencarian talenta digital berbasis AI untuk merekomendasikan kandidat paling relevan sesuai kebutuhan perusahaan.",
    challenge:
      "Menyediakan fondasi backend yang mampu melayani proses pencocokan kandidat secara cepat tanpa mengorbankan kualitas rekomendasi.",
    details:
      "GetHub mengoptimalkan proses hiring dengan mesin rekomendasi AI yang menilai skill, pengalaman, dan kecocokan kandidat terhadap kebutuhan tim. Pendekatan ini membantu tim rekrutmen bergerak lebih cepat, lebih akurat, dan mengurangi bias seleksi berbasis kata kunci semata.",
    approach: [
      "Mendesain endpoint pencarian dan scoring kandidat agar respons tetap cepat di berbagai skenario query.",
      "Mengoptimalkan model data profil kandidat untuk memudahkan proses ranking oleh modul AI.",
      "Menerapkan logging terstruktur untuk memonitor performa pencarian dan akurasi rekomendasi.",
    ],
    impact:
      "Memotong waktu screening kandidat dan meningkatkan kualitas short-list rekrutmen teknis.",
    outcomes: [
      "Pipeline pencarian kandidat menjadi lebih stabil dan mudah di-scale.",
      "Tim rekrutmen bisa menyaring kandidat dengan proses yang lebih terukur.",
      "Integrasi backend dan engine AI menjadi lebih rapi untuk iterasi fitur berikutnya.",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "Express",
      "REST API",
      "MongoDB",
      "Mongoose",
      "AI Matching",
      "JWT Auth",
      "Redis",
      "Docker",
    ],
    image: GETHUB_GALLERY[0].src,
    gallery: GETHUB_GALLERY,
  },
  {
    id: 4,
    title: "Lamar Fit",
    year: "2026",
    category: "AI Platform",
    role: "Fullstack Developer",
    duration: "Ongoing",
    team: "Solo Product",
    summary:
      "Produk digital berbasis AI untuk analisis CV dan generate CV dari nol secara cepat, terstruktur, dan relevan dengan posisi yang dituju.",
    challenge:
      "Membangun alur end-to-end yang bisa menganalisis CV existing sekaligus membuat CV baru dari input pengguna dengan hasil yang tetap personal dan siap pakai.",
    details:
      "Lamar Fit adalah aplikasi AI yang membantu pengguna meningkatkan kualitas CV melalui dua jalur utama: analisis CV existing dan generate CV dari nol. Sistem dirancang untuk memetakan gap profil kandidat terhadap posisi target, lalu menghasilkan struktur CV yang lebih kuat, terarah, dan ATS-friendly.",
    approach: [
      "Membangun arsitektur fullstack dengan Next.js untuk pengalaman UI yang cepat dan alur interaktif.",
      "Mendesain schema PostgreSQL untuk menyimpan profil, versi CV, histori analisis, dan preferensi pengguna.",
      "Mengintegrasikan pipeline AI untuk scoring, saran perbaikan konten, dan penyusunan CV baru berbasis konteks.",
    ],
    impact:
      "Mempermudah proses persiapan dokumen karier dengan insight otomatis dan draft CV yang lebih relevan dengan kebutuhan rekrutmen modern.",
    outcomes: [
      "Pengguna bisa mengetahui kekuatan dan kelemahan CV secara instan.",
      "Proses membuat CV dari nol menjadi lebih cepat dan terarah.",
      "Struktur data mendukung iterasi produk AI dan personalisasi lanjutan.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "AI Integration",
      "VPS",
      "Nginx",
      "PM2",
    ],
    image: LAMAR_FIT_GALLERY[0].src,
    gallery: LAMAR_FIT_GALLERY,
  },
  {
    id: 3,
    title: "Sistem Informasi Layanan Program Studi",
    year: "2023",
    category: "Education",
    role: "Fullstack Developer",
    duration: "2 bulan",
    team: "Solo Project",
    summary:
      "Platform administrasi akademik terpusat untuk layanan data, jadwal, nilai, dan informasi program studi TRPL Poliwangi.",
    challenge:
      "Mengintegrasikan banyak alur administrasi akademik manual ke sistem yang konsisten, mudah dipakai, dan minim duplikasi data.",
    details:
      "Sistem ini dibangun untuk menyederhanakan proses layanan akademik agar mahasiswa dan dosen mendapatkan akses informasi yang lebih cepat, transparan, dan terstruktur. Pengelolaan data akademik menjadi lebih efisien sekaligus mengurangi proses manual yang berulang.",
    approach: [
      "Menyusun skema data layanan akademik yang terpusat untuk mencegah inkonsistensi antar modul.",
      "Membangun API layanan internal untuk jadwal, nilai, dan administrasi dokumen.",
      "Meningkatkan struktur query dan relasi data agar proses pencarian data akademik lebih efisien.",
    ],
    impact:
      "Meningkatkan transparansi layanan akademik dan efisiensi operasional program studi.",
    outcomes: [
      "Proses layanan akademik menjadi lebih cepat dan mudah dilacak.",
      "Mahasiswa serta dosen mendapat akses informasi yang lebih konsisten.",
      "Beban proses administratif manual menurun secara signifikan.",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "Blade",
      "Bootstrap",
      "MySQL",
      "Eloquent ORM",
      "REST API",
      "Role Access",
      "Apache",
      "Shared Hosting",
    ],
    image: SISTEM_INFORMASI_GALLERY[0].src,
    gallery: SISTEM_INFORMASI_GALLERY,
  },
];

const FILTERS = ["Semua", "HealthTech", "AI Platform", "Education"];

const CAPABILITIES = [
  {
    title: "Product Engineering",
    kicker: "01",
    description:
      "Menerjemahkan kebutuhan bisnis ke alur produk, data model, dan interface yang bisa dipakai tim operasional setiap hari.",
    points: ["Requirement mapping", "Workflow design", "Frontend system"],
  },
  {
    title: "Backend Architecture",
    kicker: "02",
    description:
      "Merancang API, validasi, autentikasi, dan struktur data yang stabil untuk produk yang terus berkembang.",
    points: ["REST API", "Database modeling", "Security layer"],
  },
  {
    title: "Deployment Readiness",
    kicker: "03",
    description:
      "Menyiapkan aplikasi agar siap jalan di server produksi dengan proses build, reverse proxy, dan monitoring dasar.",
    points: ["VPS setup", "Nginx routing", "PM2/Docker flow"],
  },
];

const HERO_SIGNALS = [
  ["4+", "Tahun pengalaman"],
  ["15+", "Sistem dikembangkan"],
  ["Fullstack", "Frontend sampai deployment"],
];

const getProjectGallery = (project) =>
  project.gallery?.length
    ? project.gallery
    : [
        {
          src: project.image,
          label: "Preview utama",
        },
      ];

const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com/martiohusein",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 .5a12 12 0 00-3.79 23.39c.6.1.82-.26.82-.58v-2.23c-3.34.72-4.04-1.41-4.04-1.41-.55-1.4-1.34-1.77-1.34-1.77-1.1-.74.08-.73.08-.73 1.21.09 1.84 1.25 1.84 1.25 1.08 1.84 2.83 1.31 3.52 1 .1-.79.42-1.31.76-1.61-2.67-.31-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.56.12-3.25 0 0 1-.32 3.3 1.23a11.52 11.52 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.69.24 2.94.12 3.25.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.61-5.48 5.91.43.37.81 1.11.81 2.24v3.33c0 .32.22.69.83.58A12 12 0 0012 .5z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/martio-husein-samsu/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.46a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.33V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:martiohusein27@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 6.75h18v10.5H3V6.75z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 7.5L12 13.5l8.25-6"
        />
      </svg>
    ),
  },
];

function App() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("beranda");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showIntro, setShowIntro] = useState(!shouldReduceMotion);
  const [spotlight, setSpotlight] = useState({ x: -9999, y: -9999 });

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setShowIntro(false);
      return undefined;
    }

    const timer = window.setTimeout(() => setShowIntro(false), 1500);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const checkpoint = scrollY + window.innerHeight * 0.3;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;
        if (checkpoint >= top && checkpoint < bottom) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="app-shell relative min-h-screen overflow-hidden bg-zinc-50 text-zinc-950"
      style={{ "--spot-x": `${spotlight.x}px`, "--spot-y": `${spotlight.y}px` }}
      onMouseMove={(event) =>
        setSpotlight({ x: event.clientX, y: event.clientY })
      }
      onMouseLeave={() => setSpotlight({ x: -9999, y: -9999 })}
    >
      <ScrollProgress />
      <BackgroundDecor shouldReduceMotion={shouldReduceMotion} />

      <Navbar
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        scrolled={scrolled}
        setIsMenuOpen={setIsMenuOpen}
        scrollTo={scrollTo}
      />

      <main className="relative z-10">
        <section id="beranda" className="px-4 pb-16 pt-28 sm:px-6 lg:px-10">
          <HeroSection
            fadeInUp={fadeInUp}
            scrollTo={scrollTo}
            shouldReduceMotion={shouldReduceMotion}
          />
        </section>

        <section className="px-4 sm:px-6 lg:px-10">
          <ExperienceRail shouldReduceMotion={shouldReduceMotion} />
        </section>

        <section className="px-4 pb-12 pt-20 sm:px-6 lg:px-10">
          <CapabilitySection
            fadeInUp={fadeInUp}
            shouldReduceMotion={shouldReduceMotion}
          />
        </section>

        <section id="tentang" className="px-4 pb-12 pt-8 sm:px-6 lg:px-10">
          <AboutSection
            fadeInUp={fadeInUp}
            shouldReduceMotion={shouldReduceMotion}
          />
        </section>

        <section id="proyek" className="px-4 pb-12 pt-16 sm:px-6 lg:px-10">
          <ProjectsSection
            fadeInUp={fadeInUp}
            setSelectedProject={setSelectedProject}
            shouldReduceMotion={shouldReduceMotion}
          />
        </section>

        <section id="kontak" className="px-4 pb-24 pt-8 sm:px-6 lg:px-10">
          <ContactSection
            fadeInUp={fadeInUp}
            shouldReduceMotion={shouldReduceMotion}
          />
        </section>
      </main>

      <Footer />

      <AnimatePresence>{showIntro && <IntroOverlay />}</AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            shouldReduceMotion={shouldReduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-blue-600 via-zinc-900 to-blue-400"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

function IntroOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-zinc-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="text-xs uppercase tracking-[0.24em] text-zinc-400">
          Portfolio Experience
        </div>
        <div className="display-font mt-4 text-4xl font-semibold text-white sm:text-5xl">
          Martio Husein Samsu
        </div>
      </motion.div>
    </motion.div>
  );
}

function Navbar({
  activeSection,
  isMenuOpen,
  scrolled,
  setIsMenuOpen,
  scrollTo,
}) {
  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 px-3 py-3 sm:px-6"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-zinc-200 bg-white/95 shadow-[0_12px_40px_rgba(24,24,27,0.12)] backdrop-blur"
            : "border-zinc-200/70 bg-white/80 backdrop-blur"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollTo("beranda")}
          className="group cursor-pointer text-left"
          aria-label="Ke beranda"
        >
          <div className="display-font text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
            Martio Husein
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 transition group-hover:text-blue-600">
            Fullstack Engineer
          </div>
        </button>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navigasi utama"
        >
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  active ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-xl bg-zinc-100"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 md:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Buka menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-5 w-5"
            strokeWidth="2"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="mx-auto mt-3 w-full max-w-6xl rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-[0_16px_32px_rgba(24,24,27,0.12)] backdrop-blur md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            aria-label="Navigasi mobile"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`block w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function HeroSection({ fadeInUp, scrollTo, shouldReduceMotion }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
      <div className="relative">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600 shadow-sm backdrop-blur"
        >
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Open to Fullstack Collaboration
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
          className="display-font text-balance text-5xl font-extrabold leading-[0.98] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl"
        >
          Fullstack system
          <span className="block text-zinc-400">
            built with calm precision.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg"
        >
          Saya membantu tim membangun web app, API, database, dan deployment
          flow yang terasa rapi dari pengalaman pengguna sampai operasional
          produksi.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo("proyek")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(9,9,11,0.22)] transition hover:bg-blue-700"
          >
            Jelajahi Proyek
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("kontak")}
            className="cursor-pointer rounded-2xl border border-zinc-300 bg-white/85 px-6 py-3 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur transition hover:border-zinc-950 hover:text-zinc-950"
          >
            Diskusi Kolaborasi
          </button>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.42 }}
          className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3"
        >
          {HERO_SIGNALS.map(([value, label]) => (
            <div key={label} className="glass-panel rounded-2xl px-4 py-3">
              <div className="display-font text-xl font-bold text-zinc-950">
                {value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <HeroShowcase shouldReduceMotion={shouldReduceMotion} />
    </div>
  );
}

function HeroShowcase({ shouldReduceMotion }) {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <motion.aside
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 28,
        rotate: shouldReduceMotion ? 0 : 1,
      }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div
        className="absolute inset-x-8 -bottom-6 h-12 rounded-full bg-zinc-950/20 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 p-3 shadow-[0_30px_80px_rgba(9,9,11,0.35)]">
        <div className="flex items-center justify-between border-b border-white/10 px-3 pb-3 text-white">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
              Selected work
            </div>
            <div className="display-font mt-1 text-xl font-bold">
              Production portfolio
            </div>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
        </div>

        <div className="grid gap-3 pt-3">
          {featuredProjects.map((project, index) => {
            const gallery = getProjectGallery(project);
            return (
              <motion.div
                key={`hero-${project.id}`}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.35 + index * 0.1 }}
                className={`group/showcase grid gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-2 transition hover:bg-white/[0.1] ${
                  index === 0
                    ? "grid-cols-[1fr_0.9fr]"
                    : "grid-cols-[5.5rem_1fr]"
                }`}
              >
                <div
                  className={`${index === 0 ? "h-44" : "h-20"} overflow-hidden rounded-xl bg-zinc-800`}
                >
                  <img
                    src={gallery[0].src}
                    alt={`Preview ${project.title}`}
                    className="h-full w-full object-cover transition duration-500 group-hover/showcase:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 self-center px-1">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">
                    {project.category}
                  </div>
                  <div className="display-font mt-1 truncate text-lg font-bold text-white">
                    {project.title}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.technologies
                      .slice(0, index === 0 ? 4 : 3)
                      .map((tech) => (
                        <span
                          key={`hero-${project.id}-${tech}`}
                          className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}

function ExperienceRail({ shouldReduceMotion }) {
  const metrics = [
    ["Production mindset", "Reliability first approach", "M12 3v18M3 12h18"],
    [
      "API architecture",
      "Maintainable and secure design",
      "M4 7h16M4 12h16M4 17h16",
    ],
    [
      "Data modeling",
      "Performance-aware queries",
      "M4 6c0 1.66 3.58 3 8 3s8-1.34 8-3M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6",
    ],
    [
      "Self-hosted deploy",
      "VPS, Nginx, PM2 ready",
      "M12 3l8 4v5c0 5-3.4 8.5-8 9-4.6-.5-8-4-8-9V7l8-4z",
    ],
    [
      "AI product flow",
      "Prompt, data, and UX pipeline",
      "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
    ],
  ];
  const tickerItems = [...metrics, ...metrics];

  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.6rem] border border-zinc-200 bg-white/80 shadow-[0_18px_50px_rgba(24,24,27,0.09)] backdrop-blur">
      <div className="flex flex-col gap-3 border-b border-zinc-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4.5 w-4.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5v14"
              />
            </svg>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Engineering loop
            </div>
            <div className="text-sm font-bold text-zinc-950">
              Capabilities yang berjalan dari design sampai production
            </div>
          </div>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Active stack
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white via-white/90 to-transparent" />
        <motion.div
          className="flex w-max gap-3 p-3"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { repeat: Infinity, duration: 36, ease: "linear" }
          }
        >
          {tickerItems.map(([title, subtitle, iconPath], index) => (
            <div
              key={`${title}-${index}`}
              className="group/ticker grid min-w-[300px] grid-cols-[2.75rem_1fr] gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/90 p-3 transition hover:border-zinc-300 hover:bg-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm ring-1 ring-zinc-200 transition group-hover/ticker:bg-blue-600 group-hover/ticker:text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={iconPath}
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-950">
                  {title}
                </div>
                <div className="mt-1 text-sm text-zinc-600">{subtitle}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CapabilitySection({ fadeInUp, shouldReduceMotion }) {
  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="mb-8 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <div className="section-kicker">Cara Saya Membangun</div>
          <h2 className="display-font mt-3 max-w-3xl text-balance text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
            Dari ide produk sampai aplikasi berjalan stabil di production.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-600">
          Saya menyatukan product thinking, engineering discipline, dan
          deployment readiness agar hasil kerja tidak berhenti di prototype.
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        {CAPABILITIES.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-[1.6rem] border border-zinc-200 bg-white p-6 shadow-[0_18px_42px_rgba(24,24,27,0.08)] transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_28px_64px_rgba(24,24,27,0.13)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-zinc-950 via-blue-600 to-zinc-300" />
            <div className="flex items-start justify-between gap-4">
              <div className="display-font text-3xl font-extrabold text-zinc-200 transition group-hover:text-blue-100">
                {item.kicker}
              </div>
              <div className="rounded-full border border-zinc-200 bg-zinc-50 p-2 text-zinc-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M8 6h10v10"
                  />
                </svg>
              </div>
            </div>
            <h3 className="display-font mt-8 text-2xl font-bold text-zinc-950">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {item.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.points.map((point) => (
                <span
                  key={point}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-600"
                >
                  {point}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function AboutSection({ fadeInUp, shouldReduceMotion }) {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="mb-16 text-center"
      >
        <div className="section-kicker">Tentang Saya</div>
        <h2 className="display-font mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          Engineer yang fokus pada kualitas fondasi produk.
        </h2>
      </motion.div>

      {/* Profile intro */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mb-16 flex flex-col items-center gap-8 sm:flex-row sm:items-start"
      >
        <div className="shrink-0">
          <div className="h-48 w-48 overflow-hidden rounded-full bg-[#eff6ff]">
            <img
              src={profil}
              alt="Foto profil Martio Husein"
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="display-font text-2xl font-semibold text-zinc-950">
            Martio Husein Samsu
          </h3>
          <p className="mt-1 text-base font-medium text-blue-700">
            Fullstack Developer
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Web App & API System Design
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-600">
            Saya percaya arsitektur fullstack yang rapi akan membuat tim produk
            bergerak lebih cepat dan lebih tenang.
          </p>
        </div>
      </motion.div>

      {/* Values */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <h3 className="display-font text-xl font-semibold text-zinc-950">
          Nilai Kerja
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Reliable", "Sistem stabil dalam trafik tinggi."],
            ["Scalable", "Mudah dikembangkan tanpa rewrite besar."],
            ["Maintainable", "Codebase rapi dan mudah diteruskan tim."],
          ].map(([title, desc], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="text-sm font-semibold text-blue-700">{title}</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h3 className="display-font text-xl font-semibold text-zinc-950">
          Tech Stack Inti
        </h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {TECH_STACK.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.3 + index * 0.025 }}
              className="cursor-default rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-sm text-zinc-700 shadow-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ProjectsSection({ fadeInUp, setSelectedProject, shouldReduceMotion }) {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const filteredProjects = useMemo(
    () =>
      PROJECTS.filter(
        (project) =>
          activeFilter === "Semua" || project.category === activeFilter,
      ),
    [activeFilter],
  );
  const filterCounts = useMemo(
    () =>
      FILTERS.reduce((counts, filter) => {
        counts[filter] =
          filter === "Semua"
            ? PROJECTS.length
            : PROJECTS.filter((project) => project.category === filter).length;
        return counts;
      }, {}),
    [],
  );
  const totalGalleryImages = useMemo(
    () =>
      PROJECTS.reduce(
        (total, project) => total + getProjectGallery(project).length,
        0,
      ),
    [],
  );

  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="mb-8 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="section-kicker">Portofolio Proyek</div>
          <h2 className="display-font mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            Solusi fullstack yang berdampak nyata.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-zinc-600">
          Tiap proyek dibangun dengan fokus ke reliabilitas sistem,
          observability, dan efisiensi workflow developer.
        </p>
      </motion.div>

      <ProjectSectionStats totalGalleryImages={totalGalleryImages} />

      <div className="mb-8 mt-6 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`relative inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition ${
              activeFilter === filter
                ? "border-zinc-900 text-white"
                : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
            }`}
          >
            {activeFilter === filter && (
              <motion.span
                layoutId="filter-active"
                className="absolute inset-0 -z-10 rounded-full bg-zinc-900"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {filter}
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${activeFilter === filter ? "bg-white/15 text-white" : "bg-zinc-100 text-zinc-500"}`}
            >
              {filterCounts[filter]}
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              transition={{ duration: 0.32, delay: index * 0.03 }}
              whileHover={{ y: shouldReduceMotion ? 0 : -8 }}
              className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.7rem] border border-zinc-200 bg-white/92 shadow-[0_18px_34px_rgba(9,9,11,0.08)] transition-colors hover:border-zinc-300 hover:bg-white hover:shadow-[0_28px_70px_rgba(9,9,11,0.13)]"
              onClick={() => setSelectedProject(project)}
            >
              <ProjectCardPreview project={project} />

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700">
                    {project.category}
                  </div>
                  <div className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                    {project.role}
                  </div>
                </div>
                <h3 className="display-font text-2xl font-bold text-zinc-950">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
                  {project.summary}
                </p>

                <ProjectCardMeta project={project} />

                <ProjectTechStack project={project} />

                <div className="mt-6 inline-flex items-center text-sm font-bold text-blue-700">
                  Lihat detail
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-1 h-4 w-4 transition group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M13 6l6 6-6 6"
                    />
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ProjectCardPreview({ project }) {
  const gallery = getProjectGallery(project);
  const hasMultipleImages = gallery.length > 1;

  if (hasMultipleImages) {
    const previewImages = gallery.slice(0, 3);
    const secondaryImages = previewImages.slice(1);

    return (
      <div className="relative h-52 overflow-hidden bg-zinc-950 p-2">
        <div className="grid h-full grid-cols-[1fr_5rem] gap-2">
          <div className="relative min-w-0 overflow-hidden rounded-[1.15rem] bg-zinc-800">
            <img
              src={previewImages[0].src}
              alt={`${previewImages[0].label} ${project.title}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="grid min-w-0 gap-2">
            {secondaryImages.map((item) => (
              <div
                key={`${project.id}-card-collage-${item.label}`}
                className="overflow-hidden rounded-xl bg-zinc-800"
              >
                <img
                  src={item.src}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
            {secondaryImages.length === 1 && gallery.length > 2 && (
              <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80">
                +{gallery.length - 2}
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/55 via-transparent to-zinc-950/25" />
        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {project.year}
        </div>
        <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-950 shadow-lg shadow-zinc-950/20 backdrop-blur">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h16v12H4z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7l1.4-2h5.2L16 7"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13a3 3 0 106 0 3 3 0 00-6 0z"
            />
          </svg>
          {gallery.length} gambar
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-52 overflow-hidden bg-zinc-100">
      <img
        src={gallery[0].src}
        alt={`${gallery[0].label} ${project.title}`}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
      <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-zinc-950/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        {project.year}
      </div>
    </div>
  );
}

function ProjectSectionStats({ totalGalleryImages }) {
  const stats = [
    ["04", "Case study"],
    [
      String(
        new Set(PROJECTS.map((project) => project.category)).size,
      ).padStart(2, "0"),
      "Domain produk",
    ],
    [String(totalGalleryImages).padStart(2, "0"), "Visual proyek"],
    ["Fullstack", "Scope kontribusi"],
  ];

  return (
    <div className="grid gap-3 rounded-[1.5rem] border border-zinc-200 bg-white/80 p-3 shadow-[0_18px_44px_rgba(24,24,27,0.08)] backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(([value, label]) => (
        <div
          key={label}
          className="rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 py-3"
        >
          <div className="display-font text-2xl font-extrabold text-zinc-950">
            {value}
          </div>
          <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectCardMeta({ project }) {
  const items = [
    ["Tahun", project.year],
    ["Durasi", project.duration],
    ["Tim", project.team],
  ];

  return (
    <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
      {items.map(([label, value]) => (
        <div
          key={`${project.id}-${label}`}
          className="border-r border-zinc-200 px-3 py-2 last:border-r-0"
        >
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400">
            {label}
          </div>
          <div className="mt-1 truncate text-xs font-bold text-zinc-800">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectTechStack({ project }) {
  return (
    <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
          Tech Stack
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-700">
          {project.technologies.length} tools
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={`${project.id}-${tech}`}
            className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-700 shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactSection({ fadeInUp, shouldReduceMotion }) {
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-[0_28px_70px_rgba(9,9,11,0.45)]">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.16),transparent_32%,rgba(255,255,255,0.05)_68%,transparent)]"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="section-kicker !border-zinc-700 !bg-zinc-900 !text-zinc-300">
            Hubungi Saya
          </div>
          <h2 className="display-font mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Siap membangun produk yang lebih tangguh bersama tim Anda.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Jika Anda butuh fullstack engineer untuk membangun produk
            end-to-end, merapikan arsitektur data, atau meningkatkan keandalan
            sistem, saya siap berdiskusi.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ContactInfo title="Email" value="martiohusein27@gmail.com" />
            <ContactInfo title="Lokasi" value="Banyuwangi, Indonesia" />
            <ContactInfo title="Fokus" value="Fullstack Engineering" />
            <ContactInfo title="Ketersediaan" value="Freelance and Full-time" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {SOCIALS.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.22 + index * 0.08 }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-blue-500 hover:text-white"
              >
                {social.icon}
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="relative z-10 rounded-3xl border border-zinc-700 bg-zinc-900/75 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur"
          onSubmit={(event) => event.preventDefault()}
        >
          <h3 className="display-font text-2xl font-semibold text-white">
            Kirim pesan cepat
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Isi form di bawah untuk memulai percakapan kolaborasi.
          </p>

          <div className="mt-6 space-y-4">
            <Field id="name" label="Nama" type="text" placeholder="Nama Anda" />
            <Field
              id="email"
              label="Email"
              type="email"
              placeholder="email@contoh.com"
            />
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Pesan
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Ceritakan kebutuhan project Anda..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full cursor-pointer rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Kirim Pesan
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}

function Field({ id, label, placeholder, type }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-zinc-200"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />
    </div>
  );
}

function ContactInfo({ title, value }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
        {title}
      </div>
      <div className="mt-1 text-sm font-medium text-zinc-100">{value}</div>
    </div>
  );
}

function ProjectModal({ onClose, project, shouldReduceMotion }) {
  const gallery = getProjectGallery(project);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = gallery[activeImageIndex] ?? gallery[0];
  const hasMultipleImages = gallery.length > 1;

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail proyek ${project.title}`}
    >
      <motion.article
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : 24,
          scale: shouldReduceMotion ? 1 : 0.98,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : 24,
          scale: shouldReduceMotion ? 1 : 0.98,
        }}
        transition={{ duration: 0.25 }}
        className="max-h-[88vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-zinc-200 bg-white shadow-[0_24px_58px_rgba(9,9,11,0.3)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden bg-zinc-100">
          <div className="relative h-64 overflow-hidden bg-zinc-950 sm:h-[24rem]">
            <img
              src={activeImage.src}
              alt=""
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35 blur-xl"
              loading="lazy"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.img
                key={`${project.id}-${activeImageIndex}`}
                src={activeImage.src}
                alt={`${activeImage.label} ${project.title}`}
                className="relative z-10 h-full w-full object-contain"
                loading="lazy"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.99 }}
                transition={{ duration: 0.24 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <div className="rounded-full border border-white/30 bg-zinc-950/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
                  {project.category}
                </div>
                <div className="rounded-full border border-white/30 bg-zinc-950/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
                  {project.year}
                </div>
              </div>
              <div className="max-w-full rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-900 shadow-lg shadow-zinc-950/10 backdrop-blur">
                {activeImage.label}
              </div>
            </div>
          </div>

          {hasMultipleImages && (
            <div className="border-t border-zinc-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex gap-3 overflow-x-auto pb-1">
                {gallery.map((item, index) => {
                  const isActive = activeImageIndex === index;
                  return (
                    <button
                      key={`${project.id}-gallery-${item.label}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`group/thumb flex min-w-[9rem] cursor-pointer items-center gap-3 rounded-xl border p-2 text-left transition ${
                        isActive
                          ? "border-zinc-950 bg-zinc-950 text-white shadow-[0_12px_28px_rgba(9,9,11,0.18)]"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:bg-white"
                      }`}
                      aria-label={`Tampilkan ${item.label}`}
                    >
                      <span className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-200">
                        <img
                          src={item.src}
                          alt=""
                          className="h-full w-full bg-white object-contain transition duration-300 group-hover/thumb:scale-105"
                          loading="lazy"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-0.5 block truncate text-xs font-semibold">
                          {item.label}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-zinc-950/70 text-white backdrop-blur transition hover:bg-zinc-800"
            aria-label="Tutup modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="display-font text-3xl font-semibold text-zinc-950 sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            {project.summary}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <MetaPill label="Role" value={project.role} />
            <MetaPill label="Durasi" value={project.duration} />
            <MetaPill label="Tim" value={project.team} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6">
              <DetailSection title="Gambaran Proyek" number="01">
                <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {project.details}
                </p>
              </DetailSection>

              <DetailSection title="Tantangan Utama" number="02">
                <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {project.challenge}
                </p>
              </DetailSection>

              <DetailSection title="Pendekatan Teknis" number="03">
                <ul className="space-y-3">
                  {project.approach.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 sm:text-base"
                    >
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-3.5 w-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection title="Outcome" number="04">
                <ul className="space-y-2">
                  {project.outcomes.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-zinc-700 sm:text-base"
                    >
                      - {item}
                    </li>
                  ))}
                </ul>
              </DetailSection>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Impact
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {project.impact}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Tech Stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-900 p-5 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                  CTA
                </div>
                <p className="mt-2 text-sm text-zinc-300">
                  Butuh implementasi sistem serupa untuk produk Anda?
                </p>
                <a
                  href="#kontak"
                  onClick={onClose}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Diskusi Project Serupa
                </a>
              </div>
            </aside>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function DetailSection({ number, title, children }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
          {number}
        </span>
        <h4 className="display-font text-xl font-semibold text-zinc-900">
          {title}
        </h4>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function MetaPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-zinc-900">{value}</div>
    </div>
  );
}

function BackgroundDecor({ shouldReduceMotion }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(115deg,rgba(9,9,11,0.08),transparent_34%,rgba(37,99,235,0.12)_58%,transparent_78%)]"
        animate={shouldReduceMotion ? undefined : { opacity: [0.75, 1, 0.75] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#fafafa_0%,rgba(250,250,250,0.86)_44%,#f4f4f5_100%)]" />
      <div className="spotlight-layer absolute inset-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.35]" />
      <div className="grain-layer absolute inset-0 opacity-70" />
    </div>
  );
}

function Footer() {
  const footerLinks = [
    ["Beranda", "#beranda"],
    ["Tentang", "#tentang"],
    ["Proyek", "#proyek"],
    ["Kontak", "#kontak"],
  ];
  const focusAreas = [
    "Fullstack Web App",
    "API Architecture",
    "Database Design",
    "Cloud Deployment",
  ];

  return (
    <footer className="relative z-10 border-t border-zinc-200 bg-white/72 px-4 pb-8 pt-12 backdrop-blur sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available for collaboration
            </div>
            <h2 className="display-font mt-5 max-w-xl text-3xl font-extrabold leading-tight text-zinc-950 sm:text-4xl">
              Let's build a reliable product foundation.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600">
              Saya membantu membangun web app, API, database, dan deployment
              flow yang rapi untuk produk yang butuh stabilitas jangka panjang.
            </p>
            <a
              href="mailto:martiohusein27@gmail.com"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_32px_rgba(9,9,11,0.2)] transition hover:bg-blue-700"
            >
              Mulai Diskusi
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </a>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Navigasi
            </div>
            <div className="mt-4 grid gap-2">
              {footerLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-zinc-700 transition hover:text-blue-700"
                >
                  <span className="h-px w-5 bg-zinc-300 transition group-hover:w-8 group-hover:bg-blue-600" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Fokus
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-bold text-zinc-600"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:border-blue-500 hover:text-blue-700"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 pt-5 text-xs font-semibold text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="display-font text-zinc-900">
              Martio Husein Samsu
            </span>
            <span className="ml-2">Fullstack Developer + Cloud Computing</span>
          </div>
          <div>
            (c) {new Date().getFullYear()} Built with React, motion, and
            production mindset.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
