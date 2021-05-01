import React, { useState, useEffect } from "react";
import "./Filter.css";
import { useHistory, useParams, useLocation } from "react-router-dom";

const QueryFunc = () => {
  return new URLSearchParams(useLocation().search);
};

const Filter = () => {
  const query = QueryFunc();
  let { categoryId } = useParams();
  const history = useHistory();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortWith, setSortWith] = useState("");
  const [sortType, setSortType] = useState("");
  useEffect(() => { });

  const filterProduct = (e) => {
    if(!categoryId) categoryId = ''
    if (categoryId === '' || categoryId === 'none') {
      history.push(`/search?search=${query.get('search')}&minprice=${minPrice}&maxprice=${maxPrice}&sortBy=${sortWith}:${sortType}`)
    }
    else {
      history.push(`/search/${categoryId}?search=${query.get('search')}`)
    }
  };

  // &minprice=${query.get('minprice')}&maxprice=${query.get('maxprice')}&sortBy=${query.get('sortBy')}
  return (
    <div className="filter">
      <div className="filter_container">
        <div className="filter_containerTop">
          <div className="filter_containerPrice">
            <div className="filter_title">
              <h2>Price:</h2>
            </div>
            <input
              onChange={(e) => setMinPrice(e.target.value)}
              value={minPrice}
              type="text"
              className="price_input"
              placeholder="min"
            />
            <input
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
              type="text"
              className="price_input"
              placeholder="max"
            />
          </div>
          <div className="filter_containerSortWith">
            <h2>Sort:</h2>
            <div className="sort_with">
              <input
                onChange={(e) => setSortWith("price")}
                type="radio"
                name="sortWith"
                value="price"
              />
              <span>Price</span>
            </div>
            <div className="sort_with">
              <input
                onChange={(e) => setSortWith("productName")}
                type="radio"
                name="sortWith"
                value="productName"
              />
              <span>Productname</span>
            </div>
          </div>
          <div className="filter_containerSort">
            <h2>Sort Type:</h2>
            <div className="sort_type">
              <input
                onChange={(e) => setSortType("asc")}
                type="radio"
                name="sortType"
                value="price"
              />
              <span>incresing</span>
            </div>
            <div className="sort_type">
              <input
                onChange={(e) => setSortType("desc")}
                type="radio"
                name="sortType"
                value="productName"
              />
              <span>Decreasing</span>
            </div>
          </div>
        </div>
        <div className="filter_containerBottom">
          <button onClick={filterProduct} className="filter_button">
            Save Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
