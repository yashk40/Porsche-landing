"use client"

import { useState } from "react"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter text-black">PORSCHE</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/models" className="text-gray-800 hover:text-black font-medium transition-colors">
              Models
            </a>
            <a href="/configurator" className="text-gray-800 hover:text-black font-medium transition-colors">
              3D Configurator
            </a>
            <button className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors rounded-md">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black p-2">
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-6 px-4">
          <div className="flex flex-col space-y-4 pt-2 pb-3">
            <a href="/models" className="text-gray-800 hover:text-black py-2 border-b border-gray-200">
              Models
            </a>
            <a href="/configurator" className="text-gray-800 hover:text-black py-2 border-b border-gray-200">
              3D Configurator
            </a>
            <div className="pt-4">
              <button className="w-full px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors rounded-md">
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
