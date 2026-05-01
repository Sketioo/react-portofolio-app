import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Puspadaya from './images/Puspadaya.png';
import GetHub from './images/Gethub.png';
import SistemInformasi from './images/Sistem-Informasi.png';
import LamarFit from './images/Lamarfit.png';
import profil from './images/profil.png';

const NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'proyek', label: 'Proyek' },
  { id: 'kontak', label: 'Kontak' },
];

const TECH_STACK = [
  'React',
  'Next.js',
  'Vue.js',
  'Tailwind CSS',
  'Bootstrap',
  'Node.js',
  'NestJS',
  'Laravel',
  'Express',
  'Python',
  'Java',
  'JavaScript',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'GCP',
];

const PROJECTS = [
  {
    id: 1,
    title: 'Puspadaya',
    year: '2025',
    category: 'HealthTech',
    role: 'Fullstack Engineer',
    duration: '1.8 tahun',
    team: '4 orang',
    summary:
      'Platform kesehatan ibu dan anak dengan deteksi dini risiko stunting dan pemantauan kehamilan terintegrasi.',
    challenge:
      'Membangun backend yang mampu menangani data kesehatan secara aman sambil memberikan notifikasi risiko secara cepat untuk tenaga kesehatan.',
    details:
      'Aplikasi Puspadaya berfokus pada dua misi utama: monitoring tumbuh kembang anak dan kesehatan ibu hamil. Sistem ini membantu tenaga kesehatan memantau indikator penting, mengirim notifikasi berbasis risiko, dan mempercepat keputusan intervensi agar penanganan bisa dilakukan lebih awal.',
    approach: [
      'Merancang struktur API modular untuk data kehamilan, tumbuh kembang anak, dan alert medis.',
      'Menerapkan validasi data berlapis untuk menjaga konsistensi input dari banyak sumber.',
      'Membangun mekanisme penilaian risiko agar sistem bisa memprioritaskan kasus penting lebih cepat.',
    ],
    impact: 'Mempercepat proses identifikasi risiko kesehatan keluarga melalui monitoring berkala dan notifikasi proaktif.',
    outcomes: [
      'Alur input dan verifikasi data kesehatan jadi lebih terstruktur.',
      'Petugas dapat memantau kondisi ibu dan anak dalam satu dashboard terintegrasi.',
      'Keputusan intervensi bisa dilakukan lebih awal berbasis sinyal risiko.',
    ],
    technologies: ['TypeScript', 'NestJS', 'MySQL'],
    image: Puspadaya,
  },
  {
    id: 2,
    title: 'GetHub',
    year: '2024',
    category: 'AI Platform',
    role: 'Fullstack Engineer',
    duration: '6 bulan',
    team: '5 orang',
    summary:
      'Platform pencarian talenta digital berbasis AI untuk merekomendasikan kandidat paling relevan sesuai kebutuhan perusahaan.',
    challenge:
      'Menyediakan fondasi backend yang mampu melayani proses pencocokan kandidat secara cepat tanpa mengorbankan kualitas rekomendasi.',
    details:
      'GetHub mengoptimalkan proses hiring dengan mesin rekomendasi AI yang menilai skill, pengalaman, dan kecocokan kandidat terhadap kebutuhan tim. Pendekatan ini membantu tim rekrutmen bergerak lebih cepat, lebih akurat, dan mengurangi bias seleksi berbasis kata kunci semata.',
    approach: [
      'Mendesain endpoint pencarian dan scoring kandidat agar respons tetap cepat di berbagai skenario query.',
      'Mengoptimalkan model data profil kandidat untuk memudahkan proses ranking oleh modul AI.',
      'Menerapkan logging terstruktur untuk memonitor performa pencarian dan akurasi rekomendasi.',
    ],
    impact: 'Memotong waktu screening kandidat dan meningkatkan kualitas short-list rekrutmen teknis.',
    outcomes: [
      'Pipeline pencarian kandidat menjadi lebih stabil dan mudah di-scale.',
      'Tim rekrutmen bisa menyaring kandidat dengan proses yang lebih terukur.',
      'Integrasi backend dan engine AI menjadi lebih rapi untuk iterasi fitur berikutnya.',
    ],
    technologies: ['TypeScript', 'Node.js', 'Express', 'MongoDB'],
    image: GetHub,
  },
  {
    id: 4,
    title: 'Lamar Fit',
    year: '2026',
    category: 'AI Platform',
    role: 'Fullstack Developer',
    duration: 'Ongoing',
    team: 'Solo Product',
    summary:
      'Produk digital berbasis AI untuk analisis CV dan generate CV dari nol secara cepat, terstruktur, dan relevan dengan posisi yang dituju.',
    challenge:
      'Membangun alur end-to-end yang bisa menganalisis CV existing sekaligus membuat CV baru dari input pengguna dengan hasil yang tetap personal dan siap pakai.',
    details:
      'Lamar Fit adalah aplikasi AI yang membantu pengguna meningkatkan kualitas CV melalui dua jalur utama: analisis CV existing dan generate CV dari nol. Sistem dirancang untuk memetakan gap profil kandidat terhadap posisi target, lalu menghasilkan struktur CV yang lebih kuat, terarah, dan ATS-friendly.',
    approach: [
      'Membangun arsitektur fullstack dengan Next.js untuk pengalaman UI yang cepat dan alur interaktif.',
      'Mendesain schema PostgreSQL untuk menyimpan profil, versi CV, histori analisis, dan preferensi pengguna.',
      'Mengintegrasikan pipeline AI untuk scoring, saran perbaikan konten, dan penyusunan CV baru berbasis konteks.',
    ],
    impact:
      'Mempermudah proses persiapan dokumen karier dengan insight otomatis dan draft CV yang lebih relevan dengan kebutuhan rekrutmen modern.',
    outcomes: [
      'Pengguna bisa mengetahui kekuatan dan kelemahan CV secara instan.',
      'Proses membuat CV dari nol menjadi lebih cepat dan terarah.',
      'Struktur data mendukung iterasi produk AI dan personalisasi lanjutan.',
    ],
    technologies: ['Next.js', 'PostgreSQL', 'AI Integration'],
    image: LamarFit,
  },
  {
    id: 3,
    title: 'Sistem Informasi Layanan Program Studi',
    year: '2023',
    category: 'Education',
    role: 'Fullstack Developer',
    duration: '2 bulan',
    team: '3 orang',
    summary:
      'Platform administrasi akademik terpusat untuk layanan data, jadwal, nilai, dan informasi program studi TRPL Poliwangi.',
    challenge:
      'Mengintegrasikan banyak alur administrasi akademik manual ke sistem yang konsisten, mudah dipakai, dan minim duplikasi data.',
    details:
      'Sistem ini dibangun untuk menyederhanakan proses layanan akademik agar mahasiswa dan dosen mendapatkan akses informasi yang lebih cepat, transparan, dan terstruktur. Pengelolaan data akademik menjadi lebih efisien sekaligus mengurangi proses manual yang berulang.',
    approach: [
      'Menyusun skema data layanan akademik yang terpusat untuk mencegah inkonsistensi antar modul.',
      'Membangun API layanan internal untuk jadwal, nilai, dan administrasi dokumen.',
      'Meningkatkan struktur query dan relasi data agar proses pencarian data akademik lebih efisien.',
    ],
    impact: 'Meningkatkan transparansi layanan akademik dan efisiensi operasional program studi.',
    outcomes: [
      'Proses layanan akademik menjadi lebih cepat dan mudah dilacak.',
      'Mahasiswa serta dosen mendapat akses informasi yang lebih konsisten.',
      'Beban proses administratif manual menurun secara signifikan.',
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    image: SistemInformasi,
  },
];

const FILTERS = ['Semua', 'HealthTech', 'AI Platform', 'Education'];

const SOCIALS = [
  {
    name: 'GitHub',
    href: 'https://github.com/martiohusein',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12 .5a12 12 0 00-3.79 23.39c.6.1.82-.26.82-.58v-2.23c-3.34.72-4.04-1.41-4.04-1.41-.55-1.4-1.34-1.77-1.34-1.77-1.1-.74.08-.73.08-.73 1.21.09 1.84 1.25 1.84 1.25 1.08 1.84 2.83 1.31 3.52 1 .1-.79.42-1.31.76-1.61-2.67-.31-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.56.12-3.25 0 0 1-.32 3.3 1.23a11.52 11.52 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.69.24 2.94.12 3.25.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.61-5.48 5.91.43.37.81 1.11.81 2.24v3.33c0 .32.22.69.83.58A12 12 0 0012 .5z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/martio-husein-samsu/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.46a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.33V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:martiohusein27@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75h18v10.5H3V6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5L12 13.5l8.25-6" />
      </svg>
    ),
  },
];

function App() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('beranda');
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      style={{ '--spot-x': `${spotlight.x}px`, '--spot-y': `${spotlight.y}px` }}
      onMouseMove={(event) => setSpotlight({ x: event.clientX, y: event.clientY })}
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
        <section id="beranda" className="px-4 pb-20 pt-28 sm:px-6 lg:px-10">
          <HeroSection fadeInUp={fadeInUp} scrollTo={scrollTo} shouldReduceMotion={shouldReduceMotion} />
        </section>

        <section className="px-4 sm:px-6 lg:px-10">
          <ExperienceRail shouldReduceMotion={shouldReduceMotion} />
        </section>

        <section id="tentang" className="px-4 py-24 sm:px-6 lg:px-10">
          <AboutSection fadeInUp={fadeInUp} shouldReduceMotion={shouldReduceMotion} />
        </section>

        <section id="proyek" className="px-4 py-24 sm:px-6 lg:px-10">
          <ProjectsSection
            fadeInUp={fadeInUp}
            setSelectedProject={setSelectedProject}
            shouldReduceMotion={shouldReduceMotion}
          />
        </section>

        <section id="kontak" className="px-4 py-24 sm:px-6 lg:px-10">
          <ContactSection fadeInUp={fadeInUp} shouldReduceMotion={shouldReduceMotion} />
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {showIntro && <IntroOverlay />}
      </AnimatePresence>

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
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });

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
        <div className="text-xs uppercase tracking-[0.24em] text-zinc-400">Portfolio Experience</div>
        <div className="display-font mt-4 text-4xl font-semibold text-white sm:text-5xl">Martio Husein Samsu</div>
      </motion.div>
    </motion.div>
  );
}

function Navbar({ activeSection, isMenuOpen, scrolled, setIsMenuOpen, scrollTo }) {
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
            ? 'border-zinc-200 bg-white/95 shadow-[0_12px_40px_rgba(24,24,27,0.12)] backdrop-blur'
            : 'border-zinc-200/70 bg-white/80 backdrop-blur'
        }`}
      >
        <button
          type="button"
          onClick={() => scrollTo('beranda')}
          className="group cursor-pointer text-left"
          aria-label="Ke beranda"
        >
          <div className="display-font text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">Martio Husein</div>
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 transition group-hover:text-blue-600">Fullstack Engineer</div>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  active ? 'text-zinc-950' : 'text-zinc-500 hover:text-zinc-950'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-xl bg-zinc-100"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="2">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
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
                  activeSection === item.id ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
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
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
          Open to Fullstack Collaboration
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
          className="display-font text-balance text-4xl font-bold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl lg:text-7xl"
        >
          Membangun Sistem
          <span className="block text-zinc-400">yang Andal dan Siap Scale</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg"
        >
          Saya fokus pada pengembangan fullstack yang bersih, aman, dan berorientasi performa untuk produk digital yang butuh stabilitas jangka panjang.
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
            onClick={() => scrollTo('proyek')}
            className="cursor-pointer rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Jelajahi Proyek
          </button>
          <button
            type="button"
            onClick={() => scrollTo('kontak')}
            className="cursor-pointer rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-950 hover:text-zinc-950"
          >
            Diskusi Kolaborasi
          </button>
        </motion.div>
      </div>

      <motion.aside
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, delay: 0.25 }}
        whileHover={{ rotateX: shouldReduceMotion ? 0 : -2, rotateY: shouldReduceMotion ? 0 : 2 }}
        className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-gradient-to-br from-zinc-950 to-zinc-800 p-7 text-zinc-100 shadow-[0_24px_56px_rgba(9,9,11,0.35)]"
      >
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Current Focus</div>
          <div className="display-font mt-3 text-2xl font-semibold">Fullstack Architecture</div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            API design, database modeling, security hardening, and cloud-ready deployment pipeline.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              ['4+', 'Tahun pengalaman'],
              ['15+', 'Sistem dikembangkan'],
              ['99.9%', 'Target uptime'],
              ['24/7', 'Mindset reliability'],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.5 + index * 0.08 }}
                className="rounded-2xl border border-zinc-700 bg-zinc-900/65 p-4"
              >
                <div className="display-font text-xl font-semibold text-white">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.08em] text-zinc-400">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

function ExperienceRail({ shouldReduceMotion }) {
  const metrics = [
    ['Production mindset', 'Reliability first approach'],
    ['API architecture', 'Maintainable and secure design'],
    ['Data modeling', 'Performance-aware queries'],
    ['Team velocity', 'Clear structure and documentation'],
  ];

  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <motion.div
        className="flex gap-3 p-3"
        animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 26, ease: 'linear' }}
      >
        {[...metrics, ...metrics].map(([title, subtitle], index) => (
          <div key={`${title}-${index}`} className="min-w-[240px] rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">{title}</div>
            <div className="mt-1 text-sm text-zinc-600">{subtitle}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AboutSection({ fadeInUp, shouldReduceMotion }) {
  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45 }}
        className="mb-12 max-w-2xl"
      >
        <div className="section-kicker">Tentang Saya</div>
        <h2 className="display-font mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Engineer yang fokus pada kualitas fondasi produk.</h2>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.article
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_18px_36px_rgba(9,9,11,0.08)]"
        >
          <div className="absolute -right-14 -top-12 h-44 w-44 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="relative">
            <div className="mx-auto w-56 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 p-2">
              <img src={profil} alt="Foto profil Martio Husein" className="h-72 w-full rounded-2xl object-cover" loading="lazy" />
            </div>
            <h3 className="display-font mt-6 text-2xl font-semibold text-zinc-950">Martio Husein Samsu</h3>
            <p className="mt-2 text-sm text-zinc-500">Fullstack Developer | Web App and API System Design</p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Saya percaya arsitektur fullstack yang rapi akan membuat tim produk bergerak lebih cepat dan lebih tenang.
            </p>
          </div>
        </motion.article>

        <motion.article
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-[0_18px_36px_rgba(9,9,11,0.08)]"
        >
          <div className="grid gap-8">
            <div>
              <h3 className="display-font text-2xl font-semibold text-zinc-950">Nilai kerja saya</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ['Reliable', 'Sistem stabil dalam trafik tinggi.'],
                  ['Scalable', 'Mudah dikembangkan tanpa rewrite besar.'],
                  ['Maintainable', 'Codebase rapi dan mudah diteruskan tim.'],
                ].map(([title, desc], index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">{title}</div>
                    <p className="mt-2 text-sm text-zinc-600">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">Tech Stack Inti</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {TECH_STACK.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.3 + index * 0.025 }}
                    className="cursor-default rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

function ProjectsSection({ fadeInUp, setSelectedProject, shouldReduceMotion }) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const filteredProjects = useMemo(
    () => PROJECTS.filter((project) => activeFilter === 'Semua' || project.category === activeFilter),
    [activeFilter]
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
          <h2 className="display-font mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">Solusi fullstack yang berdampak nyata.</h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-zinc-600">
          Tiap proyek dibangun dengan fokus ke reliabilitas sistem, observability, dan efisiensi workflow developer.
        </p>
      </motion.div>

      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`relative cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition ${
              activeFilter === filter
                ? 'border-zinc-900 text-white'
                : 'border-zinc-300 bg-white text-zinc-600 hover:border-zinc-900 hover:text-zinc-900'
            }`}
          >
            {activeFilter === filter && (
              <motion.span
                layoutId="filter-active"
                className="absolute inset-0 -z-10 rounded-full bg-zinc-900"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            {filter}
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
              className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.7rem] border border-zinc-200 bg-white shadow-[0_18px_34px_rgba(9,9,11,0.08)]"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Preview ${project.title}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-zinc-950/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {project.year}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 text-[11px] uppercase tracking-[0.14em] text-blue-700">{project.category}</div>
                <h3 className="display-font text-2xl font-semibold text-zinc-950">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">{project.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={`${project.id}-${tech}`} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-700">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center text-sm font-semibold text-blue-700">
                  Lihat detail
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 h-4 w-4 transition group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
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

function ContactSection({ fadeInUp, shouldReduceMotion }) {
  return (
    <div className="mx-auto max-w-6xl rounded-[2rem] border border-zinc-200 bg-zinc-950 p-8 text-zinc-100 shadow-[0_28px_60px_rgba(9,9,11,0.45)] sm:p-12">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <div className="section-kicker !border-zinc-700 !bg-zinc-900 !text-zinc-300">Hubungi Saya</div>
          <h2 className="display-font mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Siap membangun produk yang lebih tangguh bersama tim Anda.</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Jika Anda butuh fullstack engineer untuk membangun produk end-to-end, merapikan arsitektur data, atau meningkatkan keandalan sistem, saya siap berdiskusi.
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
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
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
          className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <h3 className="display-font text-2xl font-semibold text-white">Kirim pesan cepat</h3>
          <p className="mt-2 text-sm text-zinc-400">Isi form di bawah untuk memulai percakapan kolaborasi.</p>

          <div className="mt-6 space-y-4">
            <Field id="name" label="Nama" type="text" placeholder="Nama Anda" />
            <Field id="email" label="Email" type="email" placeholder="email@contoh.com" />
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-200">
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
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-zinc-200">
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
      <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">{title}</div>
      <div className="mt-1 text-sm font-medium text-zinc-100">{value}</div>
    </div>
  );
}

function ProjectModal({ onClose, project, shouldReduceMotion }) {
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
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
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24, scale: shouldReduceMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 24, scale: shouldReduceMotion ? 1 : 0.98 }}
        transition={{ duration: 0.25 }}
        className="max-h-[88vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-zinc-200 bg-white shadow-[0_24px_58px_rgba(9,9,11,0.3)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden sm:h-[22rem]">
          <img src={project.image} alt={`Detail visual ${project.title}`} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <div className="rounded-full border border-white/30 bg-zinc-950/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
              {project.category}
            </div>
            <div className="rounded-full border border-white/30 bg-zinc-950/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
              {project.year}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-zinc-950/70 text-white backdrop-blur transition hover:bg-zinc-800"
            aria-label="Tutup modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="display-font text-3xl font-semibold text-zinc-950 sm:text-4xl">{project.title}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">{project.summary}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <MetaPill label="Role" value={project.role} />
            <MetaPill label="Durasi" value={project.duration} />
            <MetaPill label="Tim" value={project.team} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6">
              <DetailSection title="Gambaran Proyek" number="01">
                <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">{project.details}</p>
              </DetailSection>

              <DetailSection title="Tantangan Utama" number="02">
                <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">{project.challenge}</p>
              </DetailSection>

              <DetailSection title="Pendekatan Teknis" number="03">
                <ul className="space-y-3">
                  {project.approach.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 sm:text-base">
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
                    <li key={item} className="text-sm leading-relaxed text-zinc-700 sm:text-base">
                      - {item}
                    </li>
                  ))}
                </ul>
              </DetailSection>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Impact</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">{project.impact}</p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Tech Stack</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={`${project.id}-${tech}`} className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-900 p-5 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">CTA</div>
                <p className="mt-2 text-sm text-zinc-300">Butuh implementasi sistem serupa untuk produk Anda?</p>
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
        <h4 className="display-font text-xl font-semibold text-zinc-900">{title}</h4>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function MetaPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
      <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-zinc-900">{value}</div>
    </div>
  );
}

function BackgroundDecor({ shouldReduceMotion }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-blue-300/25 blur-3xl"
        animate={shouldReduceMotion ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-zinc-300/25 blur-3xl"
        animate={shouldReduceMotion ? undefined : { x: [0, -50, 0], y: [0, 35, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.42),rgba(250,250,250,0.98)_48%)]" />
      <div className="spotlight-layer absolute inset-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.35]" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-zinc-200 px-4 pb-10 pt-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="display-font font-semibold text-zinc-900">Martio Husein Samsu</span>
          <span className="ml-2 text-zinc-500">Fullstack Developer</span>
        </div>
        <div className="text-zinc-500">(c) {new Date().getFullYear()} All rights reserved.</div>
      </div>
    </footer>
  );
}

export default App;
