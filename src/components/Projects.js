import React from 'react';
import puspadayaImage from '../images/Puspadaya.png';
import gethubImage from '../images/Gethub.png';
import sistemInformasiImage from '../images/Sistem-Informasi.png';

function Projects() {
  const projects = [
    {
      title: "Puspadaya",
      description: "Aplikasi untuk membantu deteksi dini stunting pada anak serta pemantauan kehamilan ibu agar penanganan dapat dilakukan lebih cepat dan tepat.",
      image: puspadayaImage,
      alt: "Puspadaya"
    },
    {
      title: "GetHub",
      description: "Platform pencarian talent digital berbasis AI yang mampu merekomendasikan kandidat sesuai kebutuhan perusahaan melalui analisis keahlian dan pengalaman.",
      image: gethubImage,
      alt: "GetHub"
    },
    {
      title: "Sistem Informasi TRPL Poliwangi",
      description: "Sistem informasi untuk meningkatkan efektivitas pengelolaan data, layanan akademik, dan informasi program studi, sehingga dapat mendukung transparansi dan kualitas layanan pendidikan.",
      image: sistemInformasiImage,
      alt: "Sistem Informasi"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Projects</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Berikut adalah beberapa proyek yang telah saya kembangkan dengan fokus pada pemecahan masalah melalui teknologi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.alt} 
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
