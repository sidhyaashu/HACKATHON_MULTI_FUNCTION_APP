import Download from "../section/Download"
import Features from "../section/Features"
import Footer from "../section/Footer"
import Header from "../section/Header"
import Hero from "../section/Hero"

const LandingPage = () => {
  return (
    <div className='overflow-hidden'>
      <Header/>
      <Hero/>
      <Features/>
      <Download/>
      <Footer/>
    </div>
  )
}

export default LandingPage
