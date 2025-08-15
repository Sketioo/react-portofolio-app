import React from 'react';

function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">About Me</h2>
        <div className="flex flex-col md:flex-row items-center mt-10">
          <div className="md:w-1/2">
            <img src="https://via.placeholder.com/400" alt="Your Name" className="rounded-full mx-auto" />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
            <p className="text-lg">
              A brief description about yourself, your skills, and your experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
