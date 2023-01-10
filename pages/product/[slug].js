import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { TbCurrencyRupee } from "react-icons/tb";
import { TiPlus, TiMinus } from "react-icons/ti";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>

      <div className="product-detail-container">
        <div className="images-container">
          <img src={urlFor(image[index])} className="product-detail-image" />
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(4.5k)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">
            <TbCurrencyRupee size={22} />
            {price}
          </p>

          <div className="quantity">
            <h3>Quantity</h3>
            <div className="quantity-desc">
              <span onClick={decQty}>
                <TiMinus />
              </span>
              <span className="num">{qty}</span>
              <span onClick={incQty}>
                <TiPlus />
              </span>
            </div>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>Similar Products</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products &&
              products.map((item) => {
                const productSlug = product.slug.current.split("-")[0];
                return (
                  item.slug.current.startsWith(productSlug) &&
                  JSON.stringify(item) !== JSON.stringify(product) && (
                    <Product key={item._id} product={item} />
                  )
                );
              })}
          </div>
        </div>
      </div>

    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const product = await client.fetch(query);
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
