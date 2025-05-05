import React from 'react'
// import {ChevronRight} from "lucide"
export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 md:py-32">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-gray-200 opacity-50"></div>
      <div className="absolute -left-16 bottom-20 h-40 w-40 rounded-full border border-gray-200 opacity-30"></div>
      <div className="absolute right-1/4 top-1/3 h-24 w-24 rounded-full border border-gray-200 opacity-70"></div>

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-black px-4 py-1 text-xs font-medium uppercase tracking-widest text-white">
            Automotive Legend
          </div>

          <h1 className="mb-8 text-center font-serif">
            <span className="block text-lg font-light uppercase tracking-[0.3em] text-gray-500 md:text-xl">
              The Iconic
            </span>
            <span className="block text-6xl font-bold tracking-tight text-black sm:text-7xl md:text-8xl">
              1973 Porsche
            </span>
            <span className="mt-2 block text-5xl font-extrabold tracking-tight text-black sm:text-6xl md:text-7xl">
              911 Carrera RS
            </span>
          </h1>

          <div className="mb-12 h-0.5 w-24 bg-black mx-auto"></div>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-700 md:text-xl">
            The purest expression of the 911 philosophy. A motorsport icon that redefined performance, handling, and
            design for generations to come.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#specifications"
              className="group inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-gray-900"
            >
              Specifications
              {/* <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /> */}
            </a>
            <a
              href="#history"
              className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-gray-100"
            >
              Discover History
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-gray-200 pt-10 text-center sm:grid-cols-4">
          <div className="group cursor-pointer space-y-2 transition-transform hover:-translate-y-1">
            <h3 className="text-3xl font-bold text-black">210</h3>
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Horsepower</p>
          </div>
          <div className="group cursor-pointer space-y-2 transition-transform hover:-translate-y-1">
            <h3 className="text-3xl font-bold text-black">
              6.3<span className="text-xl">s</span>
            </h3>
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">0-60 mph</p>
          </div>
          <div className="group cursor-pointer space-y-2 transition-transform hover:-translate-y-1">
            <h3 className="text-3xl font-bold text-black">1,580</h3>
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Units Made</p>
          </div>
          <div className="group cursor-pointer space-y-2 transition-transform hover:-translate-y-1">
            <h3 className="text-3xl font-bold text-black">
              2.7<span className="text-xl">L</span>
            </h3>
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Flat-Six</p>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-black opacity-20"></div>
      <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-black opacity-20"></div>
    </section>

    </>
  )
}
