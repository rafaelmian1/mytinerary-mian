const CarouselIndicators = () => {
  return (
    <div className="carousel-indicators" key="tuki">
      <button
        type="button"
        data-bs-target="#carouselToggler"
        data-bs-slide-to="0"
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselToggler"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselToggler"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
  );
};

export default CarouselIndicators;