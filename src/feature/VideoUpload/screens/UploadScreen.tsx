import useNavigation from "@/navigation/use-navigation";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

const UploadScreen = () => {
    const navigation = useNavigation()
  const [currentScreen, setCurrentScreen] = useState('/video-upload/movie');

  const handleCarouselChange = (index) => {
    setCurrentScreen(index);
  };

  const handlePrev = () => {
    navigation.navigate('/video-upload/episode')
    setCurrentScreen('/video-upload/episode')
};

const handleNext = () => {
      navigation.navigate('/video-upload/trailer')
      setCurrentScreen('/video-upload/trailer')
  };

  const screens = [
    "Movie",
    "Episode",
    "Trailer",
    // Add more upload modals as needed
  ];

  return (
    <>
      <Carousel animation="slide" value={currentScreen} onChange={handleCarouselChange}>
        {screens.map((screen, index) => (
          <div key={index}>{screen}</div>
        ))}
      </Carousel>

      {/* Navigation Buttons */}
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </>
  );
};

export default UploadScreen;
