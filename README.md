# React Masonry Gallery

> React masonry gallery component that you can add to your website/app.

![Example Masonry Gallery](/images/example-masonry-gallery.png?raw=true)

## Table of contents

- [Usage](#usage)
- [Demo](#demo)
- [Contact](#contact)

## Usage

Download **MasonryGallery** folder and add to your application (for example put in ***src*** folder):
```javascript
import MasonryGallery from './MasonryGallery';

function App(){
  const clickHandler = (item, index) => {
    console.log(item.url, item.name, item.tags);
    console.log(index);
  }

  return (
    <div>
      <MasonryGallery data={data} options={options} onClickHandler={clickHandler} />
    </div>
  );
}
```
### **Props**

The ***data*** prop is an array containing objects containing information about images. 

- ***url*** - path or url to the image, **required**
- ***name*** - name for the image, optional
- ***tags*** - an array containing tags for the image, optional

Example:

```javascript
const data = [
  {
    url: "path_or_url_to_image",
    name: "Siberian tiger",
    tags: ["nature", "wild", ...]
  },
  ...
];
```

The ***options*** prop is optional (not required).

Properties:

| Property                 |  Type          | Default         | Description |
| ------------------------ | :------------: | :-------------: | ----------- |
| ***responsive***         | Array          | [1,2,3,4,5,6]   | defines how many images are displayed in the row for the specified resolution, order of resolutions in the array: [<576px, 576px - 768px, 768px - 992px, 992px - 1200px, 1200px - 1440px, >1440px] |
| ***imageBorder***        | String         | 'none'          | border property for the images |
| ***gap***                | String         | "12px"          | gap between images  |
| ***displayTextOnHover*** | String/Boolean | false           | It takes values: 'name', 'tags', false or true. Defines what is to appear when you hover the mouse over the images. If true, 'tags' will be displayed. If false, nothing will be displayed  |
| ***cursorPointer***      | Boolean        | false            | If true, the cursor will be set to pointer. If false, the default value for cursor (auto). |

Example
```javascript
const options = {
  responsive: [1,2,2,3,3,4],
  imageBorder: "2px solid #fff",
  gap: "15px",
  displayTextOnHover: "name",
  cursorPointer: true
};
```

The ***onClickHandler*** prop is optional (not required). 

This is the function that will be call when you click on the image. The function takes two parameters: *item* (from *data*) and *index*.

Example:
```javascript
const onClickHandler = (item, index) => {
  console.log(item.url, item.tags, item.name);
  console.log(index);
}
```

Script / library for javascript + html (without react): [masonry-gallery](https://github.com/MartaZaorska/masonry-gallery)

## Demo

Example of use on the website: https://martazaorska.github.io/react-masonry-gallery/

## Contact

Created by [Marta Zaorska](https://martazaorska.github.io/portfolio/).
