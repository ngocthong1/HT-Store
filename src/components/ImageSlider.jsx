const ImageSlider = ({ imageList, setImgIndex, imgIndex }) => {
  if (!imageList || imageList.length === 0) {
    return (
      <div className="flex lg:flex-row flex-col-reverse justify-around items-center h-96">
        <div className="flex flex-row lg:flex-col justify-around lg:w-20 h-full">
          {/* Empty space to maintain layout */}
        </div>
        <div className="flex justify-center items-center lg:w-4/6 max-sm:w-full h-full bg-gray-100 rounded-xl">
          <p className="text-gray-500 text-lg">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-around items-center h-96">
      <div className="flex flex-row lg:flex-col justify-around lg:w-20 h-full">
        {imageList.map((image, index) => (
          <img
            className={`lg:w-20 md:w-16 w-14 my-5 max-md:mx-2 max-lg:mx-5 rounded-xl cursor-pointer ${
              imgIndex === index ? 'opacity-30' : ''
            }`}
            key={index}
            src={image.url}
            onClick={() => setImgIndex(index)}
            alt=""
          />
        ))}
      </div>
      <img
        className="lg:w-4/6 max-sm:w-full h-full rounded-xl object-contain"
        src={imageList[imgIndex].url}
        alt=""
      />
    </div>
  );
};

export default ImageSlider;
