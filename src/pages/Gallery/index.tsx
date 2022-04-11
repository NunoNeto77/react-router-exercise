import React, { useEffect, useState } from "react";
import "./Gallery.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const url = "https://shouldyoudoit.herokuapp.com/all";

  const initialState: string[][] = [];
  const [images, setImages] = useState(initialState);


  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element: any) => {
          setImages((actualArray: string[][]) =>
            [[element.msg, element.img]].concat(actualArray)
          );
        });
      });
  }, []);

  return (
    <>
      <div className="firstContainer">
        <div className="containerGallery">Gallery</div>
        <div className="gifContainer">
          {images == initialState ? (
            <p style={{ margin: "300px" }}>Loading...</p>
          ) : (
            images.map((element: any) => (
              <LazyLoadImage
                effect="blur"
                key={element}
                src={element[1]}
                alt={element[0]}
                className="gifs"
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
