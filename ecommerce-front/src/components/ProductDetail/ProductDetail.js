import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import axios from "../../axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const photoUrl = "http://localhost:3001/api/photos/";
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [photos, setPhotos] = useState([]);
  const [lastSelected, setLastSelected] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(1);

  useEffect(() => {
    axios.get(`product/${productId}/detail`).then((result) => {
      setProduct(result.data);
      setPhotos(result.data.photos);
    });
  }, [productId]);

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
          <div className="productInfo_datas"></div>
        </div>
        <div className="detail_containerProducts">{/* Same products */}</div>
      </div>
    </div>
  );
};

export default ProductDetail;
