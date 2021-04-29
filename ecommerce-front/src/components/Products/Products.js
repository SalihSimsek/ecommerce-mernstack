import React, { useState, useEffect } from "react";
import "./Products.css";
import axios from "../../axios";

const Products = () => {
  const photoUrl = "http://localhost:3001/api/photos/";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get("product?limit=20&skip=0");
      setProducts(result.data);
      return result;
    };
    fetchProducts();
  }, []);
  console.log(products.length)
  return (
    <div className="products">
      {products?.map((item) => (
        <div className="productCard" key={item._id}>
          <div className="productCard_photo">
            <img src={`${photoUrl}${item.cover.filename}`} alt={item.productName} />
          </div>
          <div className="productCard_info">
          <div className="productCard_infoName">{item.productName}</div>
          <div className="productCard_infoPrice">${item.price}</div>
          <div className="productCard_infoAdd">Add to cart</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
