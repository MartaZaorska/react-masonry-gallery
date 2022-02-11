import { useCallback, useEffect, useState, memo } from 'react';
import styles from './index.module.css';

const defaultOptions = {
  background: "rgb(18 24 31)",
  fontColor: "#eee",
  controls: true,
  displayText: "tags",
  displayNumeration: true,
};

const FullscreenSlideshow = ({data, isOpen, setIsOpen, activeIndex = -1, setActiveIndex, options = defaultOptions}) => {
  const [optionsData, setOptionsData] = useState({...defaultOptions, ...options});
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [touchesData, setTouchesData] = useState({ isDragging: false, start: 0, current: 0 });

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
    setPrevTranslate(0);
  }, [setIsOpen, setActiveIndex]);

  useEffect(() => {
    const keyUpHandler = (e) => {
      if(e.code === "ArrowRight"){
        setActiveIndex(prev => prev === data.length - 1 ? 0 : prev + 1);
      }else if(e.code === "ArrowLeft"){
        setActiveIndex(prev => prev === 0 ? data.length - 1 : prev - 1);
      }else if(e.code === "Escape") close();
    }

    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keyup", keyUpHandler);
    }
  }, [data.length, setActiveIndex, close]);

  useEffect(() => setOptionsData(prev => ({...prev, ...options})), [options]);

  useEffect(() => {
    if(activeIndex >= 0){
      const activeElement = document.querySelector(`.${styles.active}`);
      const translate = ((window.innerWidth - activeElement.getBoundingClientRect().width) / 2) - activeElement.getBoundingClientRect().left;
      setPrevTranslate(prev => prev + translate);
    }
  }, [activeIndex]);

  useEffect(() => {
    const content = document.querySelector(`.${styles.content}`);
    if(content) content.style.transform = `translateX(${prevTranslate}px)`;
  }, [prevTranslate]);


  const getText = ({name = "", tags = ""}) => {
    if(optionsData.displayText === "name") return name;
    if(!Array.isArray(tags) && typeof tags !== "string") return "";
  
    const tagsArray = Array.isArray(tags) ? tags : [tags];
    return tagsArray.reduce((prev, curr) => prev + (curr === "" ? "" : ` #${curr.toLowerCase().split(" ").join("")}`), "");
  }

  const touchStartHandler = (e) => {
    setTouchesData(prev => ({ ...prev, isDragging: true, start: e.touches[0].clientX }));
  }

  const touchMoveHandler = (e) => {
    if(touchesData.isDragging) setTouchesData(prev => ({ ...prev, current: e.touches[0].clientX }));
  }

  const touchEndHandler = () => {
    const movedBy = touchesData.start - touchesData.current;
    setTouchesData({ isDragging: false, start: 0, current: 0 });

    if(movedBy > 50 && activeIndex < data.length - 1){
      setActiveIndex(prev => prev + 1);
    }else if(movedBy < -50 && activeIndex > 0){
      setActiveIndex(prev => prev - 1);
    }
  }

  const clickHandler = (index) => setActiveIndex(index);

  const nextItemHandler = () => setActiveIndex(prev => prev === data.length - 1 ? 0 : prev + 1);
  
  const prevItemHandler = () => setActiveIndex(prev => prev === 0 ? data.length - 1 : prev - 1);

  return (
    <div className={styles.container} style={{display: isOpen ? "flex" : "none", background: optionsData.background, color: optionsData.fontColor }}>
      <button className={styles.close} onClick={close}><span style={{background: optionsData.fontColor}}></span></button>
      <div className={styles.content}>
        {data.map((item, index) => (
          <div 
            className={`${styles.item} ${activeIndex === index ? styles.active : ''}`} 
            key={`fullscreen_slideshow_${index}`}
            onTouchStart={touchStartHandler}
            onTouchMove={touchMoveHandler}
            onTouchEnd={touchEndHandler}
            onClick={() => clickHandler(index)}
          >
            <img src={item.url} alt={item.name || ""} />
            {optionsData.displayNumeration || optionsData.displayText ? (
              <p className={styles.text}>
                {optionsData.displayNumeration && <span className={styles.number}>{index + 1}/{data.length}</span>}
                {optionsData.displayText && <span>{getText(item)}</span>}
              </p>
            ) : ""}
          </div>
        ))}
      </div>
      {optionsData.controls && (
        <div className={styles.controls}>
          <button onClick={prevItemHandler}>
            <svg width="30px" height="30px">
              <line x1="3" y1="15" x2="27" y2="15" strokeLinecap="round" stroke={optionsData.fontColor} strokeWidth="2"></line>
              <line x1="3" y1="15" x2="12" y2="7" strokeLinecap="round" stroke={optionsData.fontColor} strokeWidth="2"></line>
              <line x1="3" y1="15" x2="12" y2="23" strokeLinecap="round" stroke={optionsData.fontColor} strokeWidth="2"></line>
            </svg>
          </button>
          <button onClick={nextItemHandler}>
            <svg width="30px" height="30px">
              <line x1="3" y1="15" x2="27" y2="15" strokeLinecap="round" stroke={optionsData.fontColor} strokeWidth="2"></line>
              <line x1="27" y1="15" x2="19" y2="7" strokeLinecap="round" stroke={optionsData.fontColor} strokeWidth="2"></line>
              <line x1="27" y1="15" x2="19" y2="23" strokeLinecap="round" stroke={optionsData.fontColor} strokeWidth="2"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default memo(FullscreenSlideshow);