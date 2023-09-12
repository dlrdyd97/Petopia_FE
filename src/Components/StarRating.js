import styled from "styled-components";
import { useState, useEffect } from "react";

const StarRating = ({ ratingScore }) => {
  const AVR_RATE = ratingScore; // 별점 계산 식 들어가는 자리
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE * 70) / 5;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };
  useEffect(() => {
    setRatesResArr(calcStarRates);
  }, [ratingScore]);
  return (
    <StarRateWrap>
      {STAR_IDX_ARR.map((item, idx) => {
        return (
          <span className="star_icon" key={`${item}_${idx}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="19"
              viewBox="0 0 14 13"
              fill="#cacaca"
            >
              <clipPath id={`${item}StarClip`}>
                <rect width={`${ratesResArr[idx]}`} height="19" />
              </clipPath>
              <path
                id={`${item}Star`}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use
                clipPath={`url(#${item}StarClip)`}
                href={`#${item}Star`}
                fill="#537fe7"
              />
            </svg>
          </span>
        );
      })}
    </StarRateWrap>
  );
};

export default StarRating;

const StarRateWrap = styled.span`
  align-items: center;
  width: 100%;
  .star_icon {
    display: inline;
    margin-right: 3px;
  }
`;
