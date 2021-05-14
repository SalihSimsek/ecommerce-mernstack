import React from 'react'
import { Link } from 'react-router-dom';
import './ProductCard.css'

const ProductCard = ({ data, same }) => {
    const photoUrl = "http://localhost:3001/api/photos/";

    return (
        <Link to={`/product-detail/${data._id}`} className="productCard" key={data._id}>
            <div className="productCard_photo">
                <img src={`${photoUrl}${data.cover.filename}`} alt={data.productName} />
            </div>
            <div className="productCard_info">
                <div className="productCard_infoName">{data.productName}</div>
                <div className="productCard_infoPrice">${data.price}</div>
                {!same && <div className="productCard_infoAdd">Add to cart</div>}            </div>
        </Link>
    )
}

export default ProductCard
