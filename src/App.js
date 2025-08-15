import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

      <main className="relative z-10 pt-16">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

// Navbar Component
const Navbar = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {['Beranda', 'Tentang', 'Proyek', 'Kontak'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-medium hover:text-[#00f7ff] transition-colors duration-300"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {item}
            </motion.a>
          ))}
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
            {['Beranda', 'Tentang', 'Proyek', 'Kontak'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block font-medium hover:text-[#00f7ff] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// Hero Section Component
const HeroSection = () => (
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
      className="text-2xl md:text-3xl mb-4 font-semibold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      Backend Developer
    </motion.p>
    <motion.p
      className="text-xl md:text-2xl mb-10 max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      Membangun sistem yang kuat dan skalabel dengan teknologi terkini
    </motion.p>
    <motion.button
      className="px-8 py-3 bg-[#6a0dad] text-white font-semibold rounded-full shadow-lg hover:bg-[#00f7ff] hover:text-[#0f0f1a] transition-all duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Lihat Proyek
    </motion.button>
  </motion.section>
);

// About Section Component
const AboutSection = () => (
  <motion.section
    className="py-20 px-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center">Tentang Saya</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
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
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Keahlian Teknis</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS'].map((skill) => (
              <div key={skill} className="flex items-center">
                <div className="w-2 h-2 bg-[#00f7ff] rounded-full mr-2"></div>
                <span>{skill}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <div className="text-5xl font-bold text-[#00f7ff] mb-2">3+</div>
            <div className="text-xl">Tahun Pengalaman</div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

// Projects Section Component
const ProjectsSection = () => (
  <motion.section
    className="py-20 px-4 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center">Proyek Backend</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Sistem Manajemen API",
            description: "Platform untuk mengelola dan memonitor API dengan rate limiting, autentikasi, dan analitik penggunaan.",
            technologies: ["Node.js", "Express", "MongoDB", "Redis"]
          },
          {
            title: "Aplikasi E-commerce Backend",
            description: "Backend untuk toko online dengan fitur keranjang belanja, pembayaran, dan manajemen inventaris.",
            technologies: ["Python", "Django", "PostgreSQL", "Docker"]
          },
          {
            title: "Microservices Architecture",
            description: "Arsitektur layanan terdistribusi untuk aplikasi skala besar dengan message queue dan load balancing.",
            technologies: ["Java", "Spring Boot", "Kafka", "Kubernetes"]
          }
        ].map((project, index) => (
          <motion.div
            key={project.title}
            className="glass rounded-2xl overflow-hidden flex flex-col h-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="h-48 bg-gradient-to-r from-[#6a0dad] to-[#00f7ff] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-30" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="mb-4 flex-grow">
                {project.description}
              </p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-[#1a1a2e] text-[#00f7ff] rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button className="text-[#00f7ff] font-semibold hover:underline mt-auto">
                Lihat Detail →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

// Contact Section Component
const ContactSection = () => (
  <motion.section
    className="py-20 px-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center">Hubungi Saya</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mt-1 mr-4 text-[#00f7ff]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>martio.husein@example.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mt-1 mr-4 text-[#00f7ff]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Lokasi</h4>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mt-1 mr-4 text-[#00f7ff]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">GitHub</h4>
                <p>github.com/martiohusein</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="font-semibold mb-4">Koneksi Sosial</h4>
            <div className="flex space-x-4">
              {['github', 'linkedin', 'twitter'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-12 h-12 rounded-full bg-[#1a1a2e] flex items-center justify-center hover:bg-[#00f7ff] hover:text-[#0f0f1a] transition-all duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">Nama</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
                placeholder="email@contoh.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">Pesan</label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
                placeholder="Pesan Anda..."
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-[#6a0dad] text-white font-semibold rounded-lg shadow-lg hover:bg-[#00f7ff] hover:text-[#0f0f1a] transition-all duration-300"
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
  <footer className="py-10 px-4 border-t border-[#2d2d44]">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6a0dad] to-[#00f7ff]">
            Martio Husein Samsu
          </div>
          <p className="mt-2 text-[#a0a0c0]">Backend Developer</p>
        </div>
        <div className="flex space-x-6">
          {['github', 'linkedin', 'twitter', 'email'].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="text-[#a0a0c0] hover:text-[#00f7ff] transition-colors duration-300"
              whileHover={{ y: -3 }}
            >
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            </motion.a>
          ))}
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-[#2d2d44] text-center text-[#a0a0c0]">
        <p>© {new Date().getFullYear()} Martio Husein Samsu. Hak Cipta Dilindungi.</p>
      </div>
    </div>
  </footer>
);

export default App;
