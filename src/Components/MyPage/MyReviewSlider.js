import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const MyReviewSlider = ({ reviewImgList }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviewSlideChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  return (
    <>
      <div className="reviewSlideBox">
        <Slider arrows={false} beforeChange={reviewSlideChange}>
          {reviewImgList.map((data, i) => (
            <>
              <div className="reviewListImg1" key={i}>
                <img
                  className="reviewListImg2"
                  src={process.env.PUBLIC_URL + "/uploadimgs/" + data.imageUrl}
                  alt="이미지"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </>
          ))}
        </Slider>
        <div className="reviewImgNum">
          {currentSlide + 1}/{reviewImgList.length}
        </div>
      </div>
    </>
  );
};

export default MyReviewSlider;
