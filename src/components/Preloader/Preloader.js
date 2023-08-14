import React from 'react'
import './Preloader.css'

const Preloader = () => {
    return (
        <section className="preloader" aria-label='Значок загрузки'>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </section>
    )
};

export default Preloader
