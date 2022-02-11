import { useState } from 'react';
import { images } from './data';
import MasonryGallery from './MasonryGallery';
import FullscreenSlideshow from './FullscreenSlideshow';

function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const optionsFullscreenSlideshow = {
    background: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)", 
    fontColor: "#333"
  };
  
  const optionsMasonryGallery = {
    gap: '15px', 
    displayTextOnHover: "name", 
    cursorPointer: true
  };

  const clickHandler = (item, index) => {
    setActiveIndex(index);
    setIsOpen(true);
  }

  return (
    <>
      <FullscreenSlideshow data={images} options={optionsFullscreenSlideshow} activeIndex={activeIndex} isOpen={isOpen} setIsOpen={setIsOpen} setActiveIndex={setActiveIndex} />
      <div className="container">
        <header>
          <h1>Want to create amazing masonry gallery?</h1>
          <a className="first-link" rel="noreferrer" href="https://github.com/MartaZaorska/react-masonry-gallery" target="_blank">See documentation for <span>Masonry Gallery</span> on Github</a>
          <a className="second-link" rel="noreferrer" href="https://github.com/MartaZaorska/react-fullscreen-slideshow" target="_blank">See the documentation for <span>Fullscreen Slideshow</span> on Github</a>
        </header>
        <MasonryGallery data={images} options={optionsMasonryGallery} onClickHandler={clickHandler} />
      </div>
    </>
  );
}

export default App;
