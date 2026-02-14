/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

import Header from '@/components/header'
import Hero from '@/components/hero'
import Introduction from '@/components/introduction'
import TokensSection from '@/components/tokens-section'
import ArticlesSection from '@/components/articles-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
        <TokensSection />
        <ArticlesSection />
      </main>
      <Footer />
    </>
  )
}
