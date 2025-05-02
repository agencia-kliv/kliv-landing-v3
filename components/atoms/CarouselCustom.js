import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const CarouselCustom = (props) => {
  return (
    <Carousel
      //   autoPlay={true}
      infiniteLoop={true}
      //   interval={6000}
      showArrows={false}
      // showIndicators={false}
      showStatus={false}
      showThumbs={false}
      preventMovementUntilSwipeScrollTolerance={true}
      // swipeScrollTolerance={50}
      centerMode={false}
      emulateTouch={true}
      renderIndicator={(clickHandler, isSelected, index, label) => {
        //return dots in gray non-selected and in kliv-primary selected
        return (
          <span
            onClick={clickHandler}
            key={index}
            title={label}
            className={`inline-block w-[8px] h-[8px] cursor-pointer rounded-full mx-[5px] transition-transform duration-200 ${
              isSelected ? "bg-kliv-text-3 scale-[150%]" : "bg-kliv-text-5"
            }`}
          ></span>
        );
      }}
    >
      {props.children}
    </Carousel>
  );
};

export default CarouselCustom;
