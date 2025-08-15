import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white fixed top-0 w-full">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">Your Name</div>
          <div className="hidden md:block">
            <ul className="flex items-center space-x-4">
              <li><a href="#about" className="hover:text-gray-300">About</a></li>
              <li><a href="#projects" className="hover:text-gray-300">Projects</a></li>
              <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
