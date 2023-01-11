import Link from "next/link";
import React, { useState } from "react";
import { urlFor } from "../lib/client";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const HeroBanner = ({ heroBanner }) => {
  const [index, setIndex] = useState(0);
  const length = heroBanner.length;

  const updateIndex = (type) => {
    if (type === "next") {
      setIndex((prev) => (prev + 1) % length);
    } else {
      setIndex((prev) => (prev - 1 + length) % length);
    }
  };

  return (
    <div className="hero-banner-container">
      <div className="icon" onClick={() => updateIndex("prev")}>
        <AiOutlineLeft size={30} />
      </div>

      <div className="hero-banner-details">
        <div className="details">
          <div className="sale-text">
            <h5 className="animate-character">{heroBanner[index].saleName}</h5>
            <h3>{heroBanner[index].product}</h3>
            <Link href={`/product/${heroBanner[index].slug}`}>
              <button type="button">{heroBanner[index].buttonText}</button>
            </Link>
          </div>
            <img
              src={urlFor(heroBanner[index].image)}
              alt="headphones"
              height={370}
              width={370}
              className="hero-banner-image"
            />
        </div>

        <div className="sale-desc">
          <h5 className="description">DESCRIPTION</h5>
          <p>{heroBanner[index].desc}</p>
        </div>
      </div>
      
      <div className="icon" onClick={() => updateIndex("next")}>
        <AiOutlineRight size={30} />
      </div>
    </div>
  );
};

export default HeroBanner;
