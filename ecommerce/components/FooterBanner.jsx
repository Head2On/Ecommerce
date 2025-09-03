import React from 'react';
import Link from 'next/link';


const FooterBanner = ({ footer}) => {

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>Discount : {footer.discount}%</p>
          <h3>{footer.largetxt}</h3>
          <h3>{footer.largetxt2}</h3>
          <p>{footer.saleTime}</p>
        </div>
        <div className="right">
          <p>{footer.smalltxt}</p>
          <h3>{footer.midtxt}</h3>
          <p>{footer.descrip}</p>
          <Link href={`/product/${footer.product}`}>
            <button type="button">{footer.buttontxt}</button>
          </Link>
        </div>
        <img 
          src={footer.image} className="footer-banner-image"
        />
      </div>
    </div>
  )
}

export default FooterBanner