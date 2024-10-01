import { Carousel } from 'antd';

const CarouselComponent = () => {
  return (
    <Carousel
      speed={1000}
      dotPosition={'left'}
      autoplay
      effect="fade"
      infinite="true"
    >
      <div className="w-full h-[500px]">
        <img
          src="https://gapprod.a.bigcontent.io/v1/static/SP246076_NA_img_DESK"
          alt="img-1"
          className="relative w-full object-cover bg-top"
        />
      </div>
      <div className="w-full h-[500px]">
        <img
          src="https://gapprod.a.bigcontent.io/v1/static/SP246076_Linen_img_DESK"
          alt="img-2"
          className="relative w-full object-cover"
        />
      </div>
      <div className="w-full h-[500px]">
        <img
          src="https://gapprod.a.bigcontent.io/v1/static/SP246077_NA_img_DESK"
          alt="img-3"
          className="relative w-full object-cover"
        />
      </div>
      <div className="w-full h-[500px]">
        <img
          src="https://cdn.media.amplience.net/i/gapprod/SP246079_NA_img_DESK"
          alt="img-4"
          className="relative w-full object-cover"
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
