import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const MapReviewSlider = ({ review, reviewImgList, reviewListState }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  const [reviewImgUrl, setReviewImgUrl] = useState([]);

  useEffect(() => {
    setReviewImgUrl(
      reviewImgList.filter((item) => item.review.id === review.id)
    );
    setCurrentSlide(0);
  }, [reviewImgList]);

  return (
    <>
      <div className="reviewSlideBox">
        <Slider arrows={false} beforeChange={handleSlideChange}>
          {reviewImgUrl.map((data, i) => (
            <React.Fragment key={i}>
              <div className="reviewListImg1">
                <img
                  className="reviewListImg2"
                  src={process.env.PUBLIC_URL + "/uploadimgs/" + data.imageUrl}
                  alt="이미지"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </React.Fragment>
          ))}
        </Slider>
        <div className="reviewImgNum">
          {currentSlide + 1}/{reviewImgUrl.length}
        </div>
      </div>
    </>
  );
};

export default MapReviewSlider;
