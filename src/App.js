import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Puspadaya from './images/Puspadaya.png';
import GetHub from './images/Gethub.png';
import SistemInformasi from './images/Sistem-Informasi.png';
import profil from './images/profil.png';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-[#e0e0ff]">
      {/* Navbar */}
      <Navbar scrolled={scrolled} />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6a0dad] opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00f7ff] opacity-10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#6a0dad]"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 pt-16">
        <div id="beranda">
          <HeroSection />
        </div>
        <div id="tentang">
          <AboutSection />
        </div>
        <div id="proyek">
          <ProjectsSection />
        </div>
        <div id="kontak">
          <ContactSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Navbar Component
const Navbar = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['beranda', 'tentang', 'proyek', 'kontak'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0f0f1a]/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a0dad] to-[#00f7ff]">
            Martio Husein Samsu
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {['Beranda', 'Tentang', 'Proyek', 'Kontak'].map((item, index) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            
            return (
              <motion.a
                key={item}
                href={`#${sectionId}`}
                className={`font-medium transition-colors duration-300 relative ${
                  isActive ? 'text-[#00f7ff]' : 'hover:text-[#00f7ff]'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00f7ff]"
                    layoutId="navbar-indicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#e0e0ff] focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-[#0f0f1a]/90 backdrop-blur-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 space-y-4">
            {['Beranda', 'Tentang', 'Proyek', 'Kontak'].map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              
              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  className={`block font-medium transition-colors duration-300 py-2 ${
                    isActive ? 'text-[#00f7ff]' : 'hover:text-[#00f7ff]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// Custom Typing Animation Component
const TypingAnimation = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Backend Developer';

  useEffect(() => {
    let index = 0;
    let typingInterval;
    let cursorInterval;

    const typeText = () => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        // Pause at the end of typing
        setTimeout(() => {
          index = 0;
          setText('');
          typingInterval = setInterval(typeText, 150);
        }, 2000);
        clearInterval(typingInterval);
      }
    };

    typingInterval = setInterval(typeText, 150);

    // Blinking cursor
    cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <span>
      {text}
      <span className={`ml-1 inline-block w-1 h-8 bg-[#00f7ff] ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
    </span>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#6a0dad] to-[#00f7ff]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Martio Husein Samsu
      </motion.h1>
      <motion.p
        className="text-2xl md:text-3xl mb-4 font-semibold min-h-[2.5rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <TypingAnimation />
      </motion.p>
      <motion.p
        className="text-xl md:text-2xl mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Membangun sistem yang kuat dan skalabel dengan teknologi terkini
      </motion.p>
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.button
          className="px-8 py-3 bg-[#6a0dad] text-white font-semibold rounded-full shadow-lg hover:bg-[#00f7ff] hover:text-[#0f0f1a] transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          Lihat Proyek
        </motion.button>
        <motion.button
          className="px-8 py-3 bg-transparent border-2 border-[#00f7ff] text-[#00f7ff] font-semibold rounded-full shadow-lg hover:bg-[#00f7ff] hover:text-[#0f0f1a] transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          Hubungi Saya
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

// About Section Component
const AboutSection = () => (
  <motion.section
    className="py-20 px-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Tentang Saya
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-12 items-center">
        {/* Foto Profil */}
        <motion.div
          className="glass p-4 rounded-2xl flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#6a0dad] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a]">
              <img src={profil} alt="Profil" className="w-full h-full object-contain" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-[#00f7ff] animate-ping opacity-20"></div>
          </div>
        </motion.div>
        
        {/* Deskripsi dan Keahlian */}
        <div className="md:col-span-2">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="glass p-8 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Backend Developer</h3>
              <p className="mb-4">
                Saya adalah seorang backend developer dengan passion dalam membangun sistem yang kuat, aman, dan skalabel. 
                Dengan keahlian dalam berbagai teknologi backend modern, saya berfokus pada pembuatan API yang efisien dan database yang teroptimasi.
              </p>
              <p>
                Saya selalu berusaha untuk belajar hal-hal baru dan mengikuti perkembangan terkini dalam dunia backend development, 
                termasuk arsitektur microservices, containerization, dan cloud computing.
              </p>
            </motion.div>
            <motion.div
              className="glass p-8 rounded-2xl h-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Keahlian Teknis</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Node.js', 'NestJS', 'Laravel', 'Express', 'Python', 'Java', 'Javascript', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'GCP'].map((skill, index) => (
                  <motion.div 
                    key={skill} 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-[#00f7ff] rounded-full mr-2"></div>
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-[#00f7ff] mb-2">4+</div>
                <div className="text-xl">Tahun Pengalaman</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

// Projects Section Component
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "Puspadaya",
      description: "Puspadaya dirancang untuk membantu deteksi dini stunting pada anak serta pemantauan kehamilan ibu agar penanganan dapat dilakukan lebih cepat dan tepat.",
      technologies: ["Typescript", "MySQL", "NestJS"],
      details: "Aplikasi Puspadaya merupakan solusi digital inovatif yang dirancang untuk mengatasi dua isu kesehatan krusial: stunting pada anak dan kesehatan ibu hamil. Dengan sistem deteksi dini, aplikasi ini memungkinkan pemantauan pertumbuhan anak secara berkala, memberikan notifikasi dan rekomendasi kepada orang tua serta tenaga kesehatan jika teridentifikasi adanya risiko stunting. Selain itu, fitur pemantauan kehamilan membantu ibu hamil dalam mencatat kondisi kesehatan, jadwal pemeriksaan, dan mendapatkan informasi penting seputar kehamilan. Dengan demikian, Puspadaya berperan sebagai asisten kesehatan digital yang proaktif, memastikan penanganan yang lebih cepat dan tepat untuk ibu dan anak, serta mendukung upaya pemerintah dalam menurunkan angka stunting.",
      image: Puspadaya
    },
    {
      id: 2,
      title: "GetHub",
      description: "GetHub hadir sebagai platform pencarian talent digital berbasis AI yang mampu merekomendasikan kandidat sesuai kebutuhan perusahaan melalui analisis keahlian dan pengalaman.",
      technologies: ["typescript", "Node.js", "Express", "MongoDB"],
      details: "GetHub merevolusi proses rekrutmen talenta digital dengan memanfaatkan kekuatan kecerdasan buatan (AI). Platform ini tidak hanya berfungsi sebagai database talenta, tetapi juga sebagai sistem pencocokan cerdas yang mampu menganalisis secara mendalam keahlian, pengalaman, dan portofolio kandidat. Algoritma AI pada GetHub dapat memahami kebutuhan spesifik perusahaan dan merekomendasikan kandidat yang paling sesuai, tidak hanya berdasarkan kata kunci, tetapi juga berdasarkan potensi dan kesesuaian budaya. Hal ini secara signifikan mempersingkat waktu rekrutmen, mengurangi bias, dan meningkatkan kemungkinan menemukan talenta yang benar-benar tepat untuk mendorong inovasi di perusahaan.",
      image: GetHub
    },
    {
      id: 3,
      title: "Sistem Informasi Layanan Program Studi",
      description: "Sistem Informasi Layanan Program Studi TRPL Poliwangi dibangun untuk meningkatkan efektivitas pengelolaan data, layanan akademik, dan informasi program studi, sehingga dapat mendukung transparansi dan kualitas layanan pendidikan",
      technologies: ["PHP","Laravel", "MySQL", "Bootstrap"],
      details: "Sistem Informasi Layanan Program Studi Teknologi Rekayasa Perangkat Lunak (TRPL) di Poliwangi adalah platform terintegrasi yang dibangun untuk mentransformasi administrasi akademik. Sistem ini secara komprehensif mengelola berbagai aspek, mulai dari data mahasiswa, jadwal perkuliahan, hingga penilaian dan transkrip nilai. Dengan adanya sistem ini, layanan akademik menjadi lebih efisien, transparan, dan mudah diakses oleh mahasiswa maupun dosen. Mahasiswa dapat dengan mudah melihat informasi akademik mereka, sementara dosen dapat mengelola materi perkuliahan dan nilai dengan lebih terstruktur. Pada akhirnya, sistem ini tidak hanya meningkatkan efektivitas operasional program studi, tetapi juga mendukung peningkatan kualitas layanan pendidikan dan transparansi informasi kepada seluruh pemangku kepentingan.",
      image: SistemInformasi
    }
  ];

  return (
    <motion.section
      className="py-20 px-4 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Proyek Backend
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass rounded-2xl overflow-hidden flex flex-col h-full relative cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6a0dad]/80 to-[#00f7ff]/50 opacity-70"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <motion.h3 
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                  viewport={{ once: true }}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="mb-4 flex-grow"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.p>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span 
                        key={tech} 
                        className="px-3 py-1 bg-[#1a1a2e] text-[#00f7ff] rounded-full text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.1 + techIndex * 0.05 + 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, backgroundColor: '#00f7ff', color: '#0f0f1a' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-[#1a1a2e] text-[#00f7ff] rounded-full text-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <motion.button 
                  className="text-[#00f7ff] font-semibold hover:underline mt-auto flex items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  Lihat Detail 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Hover effect overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#6a0dad]/30 to-[#00f7ff]/30 opacity-0 rounded-2xl"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="glass rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent"></div>
                <button
                  className="absolute top-4 right-4 text-white bg-[#1a1a2e]/50 rounded-full p-2 hover:bg-[#6a0dad] transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <motion.h3 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedProject.title}
                </motion.h3>
                <motion.p 
                  className="text-lg mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {selectedProject.details}
                </motion.p>
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h4 className="text-xl font-semibold mb-3">Teknologi yang Digunakan:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.span 
                        key={tech} 
                        className="px-4 py-2 bg-[#1a1a2e] text-[#00f7ff] rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                <motion.div 
                  className="flex justify-end"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <button className="px-6 py-3 bg-[#6a0dad] text-white font-semibold rounded-lg shadow-lg hover:bg-[#00f7ff] hover:text-[#0f0f1a] transition-all duration-300">
                    Lihat Source Code
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

// Contact Section Component
const ContactSection = () => (
  <motion.section
    className="py-20 px-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Hubungi Saya
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Informasi Kontak
          </motion.h3>
          <div className="space-y-4">
            {[
              { 
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: "Email",
                content: "martiohusein27@gmail.com"
              },
              { 
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                title: "Lokasi",
                content: "Banyuwangi, Indonesia"
              },
              { 
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                ),
                title: "GitHub",
                content: "github.com/martiohusein"
              },
              { 
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
                title: "LinkedIn",
                content: (
                  <a
                    href="https://www.linkedin.com/in/martio-husein-samsu/"
                    className="text-[#00f7ff] hover:underline"
                  >
                    https://www.linkedin.com/in/martio-husein-samsu/
                  </a>
                )
              }
            ].map((item, index) => (
              <motion.div 
                className="flex items-start"
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mt-1 mr-4 text-[#00f7ff]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Koneksi Sosial</h4>
            <div className="flex space-x-4">
              {["github", "linkedin", "twitter"].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-12 h-12 rounded-full bg-[#1a1a2e] flex items-center justify-center hover:bg-[#00f7ff] hover:text-[#0f0f1a] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Kirim Pesan
          </motion.h3>
          <form className="space-y-6">
            {[
              { id: "name", label: "Nama", type: "text", placeholder: "Nama Anda" },
              { id: "email", label: "Email", type: "email", placeholder: "email@contoh.com" }
            ].map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor={field.id} className="block mb-2 font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <label htmlFor="message" className="block mb-2 font-medium">
                Pesan
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
                placeholder="Pesan Anda..."
              ></textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-[#6a0dad] text-white font-semibold rounded-lg shadow-lg hover:bg-[#00f7ff] hover:text-[#0f0f1a] transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Kirim Pesan
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

// Footer Component
const Footer = () => (
  <motion.footer 
    className="py-10 px-4 border-t border-[#2d2d44]"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <motion.div 
          className="mb-6 md:mb-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6a0dad] to-[#00f7ff]">
            Martio Husein Samsu
          </div>
          <p className="mt-2 text-[#a0a0c0]">Backend Developer</p>
        </motion.div>
        <motion.div 
          className="flex space-x-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {['github', 'linkedin', 'twitter', 'email'].map((social, index) => (
            <motion.a
              key={social}
              href="#"
              className="text-[#a0a0c0] hover:text-[#00f7ff] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            </motion.a>
          ))}
        </motion.div>
      </div>
      <motion.div 
        className="mt-8 pt-8 border-t border-[#2d2d44] text-center text-[#a0a0c0]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p>© {new Date().getFullYear()} Martio Husein Samsu. Hak Cipta Dilindungi.</p>
      </motion.div>
    </div>
  </motion.footer>
);

export default App;
