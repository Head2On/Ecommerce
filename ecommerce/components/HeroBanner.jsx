import React from 'react';
import Link from 'next/link';



const HeroBanner = ({ banner }) => {

  if (!banner) return null;
  
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{banner.smalltxt}</p>
        <h3>{banner.midtxt}</h3>
        <h1>{banner.largetxt}</h1>
        <img src={banner.image} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${banner.product}`}>
            <button type="button">{banner.buttontxt}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{banner.descrip}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner