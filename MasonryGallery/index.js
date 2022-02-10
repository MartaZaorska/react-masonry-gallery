import { useEffect, useState, memo } from 'react';
import styles from './index.module.css';

const defaultOptions = {
  responsive: [1,2,3,4,5,6],
  imageBorder: "none",
  gap: "12px",
  displayTextOnHover: false,
  cursorPointer: false
}

function MasonryGallery({data, options = defaultOptions, onClickHandler = (item, index) => {}}) {
  const [opts, setOpts] = useState({...defaultOptions, ...options});

  useEffect(() => setOpts(prev => ({...prev, ...options})), [options]);

  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`);
    if(container){
      container.style.setProperty("--gap", opts.gap);
      container.style.setProperty("--imageBorder", opts.imageBorder);
      opts.responsive.forEach((value, index) => container.style.setProperty(`--items${index}`, value <= 0 ? index + 1 : value));
    }
  }, [opts]);

  const getText = ({name = "", tags = ""}) => {
    if(opts.displayTextOnHover === "name") return name;
    if(!Array.isArray(tags) && typeof tags !== "string") return "";

    const tagsArray = Array.isArray(tags) ? tags : [tags];
    return tagsArray.reduce((prev, curr) => prev + (curr !== "" ? ` #${curr.toLowerCase().split(" ").join("")}` : ""), "");
  }

  return (
    <div className={`${styles.container} ${opts.cursorPointer ? styles.pointer : ""}`}>
      {data.map((item, index) => {
        const text = getText(item);
        return (
          <div className={styles.item} key={`masonry_gallery_${index}`} onClick={() => onClickHandler(item, index)}>
            <img src={item.url} alt={item.name || ""} />
            {opts.displayTextOnHover && text !== "" && (
              <p>{text}</p>
            )}
          </div>
        )
      })}
    </div>
  );
}

export default memo(MasonryGallery);