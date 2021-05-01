import React, { useState, useEffect } from "react";
import "./Products.css";
import axios from "../../axios";
import ProductCard from "../ProductCard/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get("product?limit=20&skip=0");
      setProducts(result.data);
      return result;
    };
    fetchProducts();
  }, []);
  return (
    <div className="products">
      {products?.map((item) => (
        <ProductCard key={item._id} data={item} />
      ))}
    </div>
  );
};

export default Products;
