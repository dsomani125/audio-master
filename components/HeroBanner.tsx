import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { BannerDataType } from "../types";
import { urlFor } from "../lib/client";

interface MainBannerDataType {
  heroBanner: BannerDataType;
}

const HeroBanner = ({ heroBanner }: MainBannerDataType) => {
  return (
    <div className="hero-banner-container">
      {/* <div> */}
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          height={400}
          className="hero-banner-image"
        />

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>DESCRIPTION</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default HeroBanner;
