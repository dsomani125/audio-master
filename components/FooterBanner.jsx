import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { TbCurrencyRupee } from "react-icons/tb";

const FooterBanner = ({
  footerBanner: { image, product, slug, title, mrp, discount, price },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="left">
        <h3 className="animate-character">{title}</h3>
        <h3 className="product-name">{product}</h3>
      </div>
      <img src={urlFor(image)} height={370} />
      <div className="right">
        <div>
          <span className="discount">{`-${discount}%`}</span>
          <span className="price">
            <TbCurrencyRupee size={38} />
            {price}
          </span>
        </div>
        <span className="mrp">
          <TbCurrencyRupee size={28} />
          {mrp}
        </span>
        <Link href={`/product/${slug}`}>
          <button type="button" className="button">
            BUY NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FooterBanner;
