import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillMail, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2024 ICB Headphones All rights reserverd</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillFacebook/>
        <AiFillMail/>
      </p>
    </div>
  )
}

export default Footer