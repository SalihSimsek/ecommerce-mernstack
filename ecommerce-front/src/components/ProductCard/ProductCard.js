import React from 'react'
import './ProductCard.css'
const ProductCard = ({ data }) => {
    const photoUrl = "http://localhost:3001/api/photos/";

    return (
        <div className="productCard" key={data._id}>
            <div className="productCard_photo">
                <img src={`${photoUrl}${data.cover.filename}`} alt={data.productName} />
            </div>
            <div className="productCard_info">
                <div className="productCard_infoName">{data.productName}</div>
                <div className="productCard_infoPrice">${data.price}</div>
                <div className="productCard_infoAdd">Add to cart</div>
            </div>
        </div>
    )
}

export default ProductCard
