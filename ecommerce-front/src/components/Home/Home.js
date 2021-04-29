import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Products from '../Products/Products'
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <Header />
            <Products />
            <Footer />
        </div>
    )
}

export default Home
