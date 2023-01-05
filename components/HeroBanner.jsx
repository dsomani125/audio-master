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
        <AiOutlineLeft size={40} />
      </div>

      <div className="details">
        <div className="sale-text">
          <p className="beats-solo">{heroBanner[index].smallText}</p>
          <h3>{heroBanner[index].midText}</h3>
          <h1>{heroBanner[index].largeText1}</h1>
          <Link href={`/product/${heroBanner[index].product}`}>
            <button type="button">{heroBanner[index].buttonText}</button>
          </Link>
        </div>
        <div>
          <img
            src={urlFor(heroBanner[index].image)}
            alt="headphones"
            height={400}
            width={400}
            // className="hero-banner-image"
          />
        </div>
      </div>

      <div className="sale-desc">
        <h5>DESCRIPTION</h5>
        <p>{heroBanner[index].desc}</p>
      </div>

      <div className="icon" onClick={() => updateIndex("next")}>
      <AiOutlineRight size={40}/>
      </div>
    </div>
  );
};

export default HeroBanner;
