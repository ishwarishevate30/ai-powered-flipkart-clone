import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../../constants/data";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const Banner = () => (
  <Carousel
    responsive={responsive}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={2500}
    swipeable={false}
    draggable={false}
    arrows
  >
    {bannerData.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`banner-${index}`}
        style={{ width: "100%", height: "250px",objectFit: "cover" }}
      />
    ))}
  </Carousel>
);

export default Banner;
