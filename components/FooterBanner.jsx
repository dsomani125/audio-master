import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { TbCurrencyRupee } from "react-icons/tb";

const FooterBanner = ({
  footerBanner: { image, product, title, mrp, discount, price },
}) => {
  return (
    <div className="footer-banner-container">
      <h3>{title}</h3>

      <div>
        <img src={urlFor(image)} height={370} />
      </div>

      <div className="right">
        <div>
          <span className="discount">{`-${discount}%`}</span>
          <span className="price"><TbCurrencyRupee size={38}/>{price}</span>
        </div>
        <span className="mrp"><TbCurrencyRupee size={28}/>{mrp}</span>
      
        <Link href={`/product/${product}`}>
          <button type="button" className="button">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FooterBanner;
