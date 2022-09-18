import React, { useState } from "react";
import { SliderData } from "./SliderData";
import Listing from "./Listing";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }
  
  if (!Array.isArray(slides) || slides.length <= 0){
    return null;
  }

  return (
    <>
      {SliderData.map((slide, index) => {
        return (
          <Listing
            name={slide.name}
            location={slide.location}
            image={slide.image}
            owned={slide.owned}
          />
        );
      })}
    </>
  );
};

export default ImageSlider;
