import { Carousel, Typography } from 'antd';

const CarouselComponent = () => {
  return (
    <Carousel dotPosition={'left'} autoplay effect="fade" infinite="true">
      <div className="w-full">
        <img
          src="https://gapprod.a.bigcontent.io/v1/static/SP246076_NA_img_DESK"
          alt="img-1"
          className="relative h-[32rem] w-full object-cover bg-top"
        />
        <Typography.Title
          level={3}
          className="absolute w-fit top-2/3 md:left-[42%] p-4 rounded-lg bg-slate-50"
        >
          The Summer Lookbook
        </Typography.Title>
      </div>
      <div className="w-full">
        <img
          src="https://gapprod.a.bigcontent.io/v1/static/SP246076_Linen_img_DESK"
          alt="img-2"
          className="relative h-[32rem] w-full object-cover"
        />
        <Typography.Title
          level={3}
          className="absolute w-fit top-2/3 md:left-[42%] p-4 rounded-lg bg-slate-50"
        >
          All Linen Everything
        </Typography.Title>
      </div>
      <div className="w-full">
        <img
          src="https://gapprod.a.bigcontent.io/v1/static/SP246077_NA_img_DESK"
          alt="img-3"
          className="relative h-[32rem] w-full object-cover"
        />
        <Typography.Title
          level={3}
          className="absolute w-fit top-2/3 md:left-[42%] p-4 rounded-lg bg-slate-50"
        >
          Women’s Lifestyles
        </Typography.Title>
      </div>
      <div className="w-full">
        <img
          src="https://cdn.media.amplience.net/i/gapprod/SP246079_NA_img_DESK"
          alt="img-4"
          className="relative h-[32rem] w-full object-cover"
        />
        <Typography.Title
          level={3}
          className="absolute w-fit top-2/3 md:left-[42%] p-4 rounded-lg bg-slate-50"
        >
          Summer Essentials
        </Typography.Title>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
