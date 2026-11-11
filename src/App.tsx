import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Technologies from './components/Technologies'
import Projects from './components/Projects'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-night text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
