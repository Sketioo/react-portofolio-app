import React from 'react';

function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="bg-white rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/300" alt="Project 1" className="rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-xl font-bold">Project 1</h3>
              <p className="mt-2">Description of project 1.</p>
              <a href="#" className="text-indigo-500 hover:underline mt-4 block">Learn More</a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/300" alt="Project 2" className="rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-xl font-bold">Project 2</h3>
              <p className="mt-2">Description of project 2.</p>
              <a href="#" className="text-indigo-500 hover:underline mt-4 block">Learn More</a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/300" alt="Project 3" className="rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-xl font-bold">Project 3</h3>
              <p className="mt-2">Description of project 3.</p>
              <a href="#" className="text-indigo-500 hover:underline mt-4 block">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
