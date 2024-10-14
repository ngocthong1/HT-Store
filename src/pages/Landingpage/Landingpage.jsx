import CarouselComponent from '../../components/molecules/Carousel/Carousel';
import HeroHome from '../../components/molecules/HeroHome/HeroHome';
import Explore from '../../components/molecules/Explore/Explore.jsx';
import FeaturesBlock from '../../components/molecules/FeaturesBlock/FeacherBlockes.jsx';
import { useEffect } from 'react';

const Landingpage = () => {
  useEffect(() => {
    document.title = 'HTS | Landing';
  }, []);
  return (
    <>
      <HeroHome />
      <CarouselComponent />
      <Explore />
      <FeaturesBlock />
    </>
  );
};
export default Landingpage;
