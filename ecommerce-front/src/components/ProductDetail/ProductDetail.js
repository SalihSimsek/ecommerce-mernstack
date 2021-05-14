import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";

const ProductDetail = () => {
  const photoUrl = "http://localhost:3001/api/photos/";
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [photos, setPhotos] = useState([]);
  const [lastSelected, setLastSelected] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [sameProducts, setSameProducts] = useState([]);

  useEffect(() => {
    setPhotos([]);
    setSelectedPhoto(0)
    axios.get(`product/${productId}/detail`).then((result) => {
      setProduct(result.data);
      setPhotos(result.data.photos);
    });
    axios.get(`product/${product.category}?limit=4&skip=0`).then((result) => {
      setSameProducts(result.data);
    });
  }, [productId, product.category]);

  return (
    <div className="productDetail">
      <div className="detail_container">
        <div className="detail_containerInfos">
          <div className="productInfo_images">
            <div className="productInfo_imagesCover">
              <img
                src={
                  photos.length !== 0
                    ? `${photoUrl}${photos[selectedPhoto].filename}`
                    : null
                }
                alt=""
              />
            </div>
            <div className="productInfo_imagesList">
              {photos.map((photo, i) => (
                <img
                  key={photo.filename}
                  src={`${photoUrl}${photo.filename}`}
                  alt=""
                  id={i}
                  onMouseEnter={(e) => {
                    setSelectedPhoto(i);
                    if (!e.target.classList.contains("selected_photo")) {
                      e.target.classList.add("selected_photo");
                      const element = document.getElementById(lastSelected);
                      element.classList.remove("selected_photo");
                    }
                    setLastSelected(i);
                  }}
                  className="image_galleryPhoto "
                />
              ))}
            </div>
          </div>
          <div className="productInfo_datas">
            <div className="productInfo_datasContainer">
              <div className="product_name">{product.productName}</div>
              <div className="product_description">
                <h2>Product Description:</h2>
                <p>
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                  {product.description}
                </p>
              </div>
              <div className="price_and_count">
                <h2>Price: {product.price}$</h2>
                <h2>Total Count: {product.count}</h2>
              </div>
              <div className="add_cart_and_fav">
                <div className="add_favorite_button">Add to Favorite</div>
                <div className="add_to_cart">Add to Cart</div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail_containerProducts">
          <h2>Same Products</h2>
          <div className="same_products">
            {sameProducts.map((sameProduct) => (
              <ProductCard data={sameProduct} same/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
