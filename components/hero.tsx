/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

'use client';

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Smooth gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main heading */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full border border-green-200 dark:border-green-800">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Welcome to the Future of Finance
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
              Understanding <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Blockchain</span> Technology
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Discover how blockchain is revolutionizing industries, enabling decentralization, and creating new possibilities for the digital economy.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link 
              href="#introduction" 
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 text-center"
            >
              Start Learning
            </Link>
            <Link 
              href="#tokens" 
              className="px-8 py-4 border-2 border-foreground text-foreground rounded-full font-semibold hover:bg-foreground hover:text-background transition-all duration-300 text-center"
            >
              Explore Tokens
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 w-full">
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">$2.6T+</div>
              <p className="text-sm text-muted-foreground mt-2">Market Cap</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">15K+</div>
              <p className="text-sm text-muted-foreground mt-2">Cryptocurrencies</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">500M+</div>
              <p className="text-sm text-muted-foreground mt-2">Users Worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
