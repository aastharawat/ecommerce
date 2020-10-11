import React, { useEffect, useState } from "react";
import { getProductsBySlug } from "../../action/product.actions";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

export default function ProductListPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });

  const { match } = props;

  useEffect(() => {
    dispatch(getProductsBySlug(match.params.slug));
  }, [match]);

  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, item) => (
        <div className="card">
          <div className="cardHeader">
            <div>
              {props.match.params.slug} mobile under {priceRange[key]}
            </div>
            <button>view all</button>
          </div>
          <div style={{ display: "flex" }}>
            {product.productsByPrice[key].map((product) => (
              <div className="productContainer">
                <div className="productImgContainer">
                  <img
                    src={generatePublicUrl(product.productPictures[0].img)}
                  ></img>
                </div>
                <div className="productInfo">
                  <div style={{ margin: "5px 0" }}>{product.name}</div>
                  <div>
                    <div>4.3</div>
                    <div>3555</div>
                  </div>
                  <div className="productPrice">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}
