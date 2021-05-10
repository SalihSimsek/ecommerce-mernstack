import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Search.css";
import { useParams, useLocation } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Filter from "../Filter/Filter";

const QueryFunc = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const query = QueryFunc();
  const searchParam = query.get('search')
  const minPrice = query.get('minprice')
  const maxPrice = query.get('maxprice')
  const sortBy = query.get('sortBy')
  const [products, setProducts] = useState([]);
  let { categoryId } = useParams();
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log(url)
    let isSubs = true;
    if (!categoryId) {
      setUrl(
        `product?search=${searchParam}&limit=${limit}&skip=${skip}&minprice=${minPrice}&maxprice=${maxPrice}&sortBy=${sortBy}`
      );
    }
    else {
      setUrl(
        `product/${categoryId}?search=${searchParam}&limit=${limit}&skip=${skip}&minprice=${minPrice}&maxprice=${maxPrice}&sortBy=${sortBy}`
      );
    }
    axios.get(url).then(result => {
      if (isSubs) {
        setProducts(result.data)
        return result
      }
    });
    return () => (isSubs = false);
  }, [categoryId, searchParam, minPrice, maxPrice, sortBy, url, limit, skip]);

  return (
    <div className="search">
      <Filter />
      <div className="search_resultContainer">
        {products.map((item) => (
          <ProductCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Search;
