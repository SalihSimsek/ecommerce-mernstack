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
  const [products, setProducts] = useState([]);
  let { categoryId } = useParams();
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [url, setUrl] = useState("");
  useEffect(() => {
    let isSubs = true;
    if (!categoryId)
    {console.log('in')
      setUrl(
        `product?search=${query.get("search")}&limit=${limit}&skip=${skip}&minprice=${query.get('minprice')}&maxprice=${query.get('maxprice')}&sortBy=${query.get('sortBy')}`
      );}
    else
      setUrl(
        `product/${categoryId}?search=${query.get(
          "search"
        )}&limit=${limit}&skip=${skip}`
      );
      axios.get(url).then(result =>{
        if(isSubs){
          setProducts(result.data)
          return result
        }
      });
    return () => (isSubs = false);
  },[url,categoryId,limit,skip,query]);

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
