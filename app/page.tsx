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
