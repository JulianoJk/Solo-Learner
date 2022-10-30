import { useState } from 'react';
import Resizer from 'react-image-file-resizer';

export const ImageResizerComponent = () => {
  const [img, setImg] = useState('');

  const fileChangedHandler = (e: any) => {
    let fileInput = false;
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          500,
          500,
          'png',
          100,
          0,
          (uri: any) => {
            console.log(uri);
            setImg(uri);
          },
          'base64',
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={fileChangedHandler} />
      <img src={img} alt="" />
    </div>
  );
};
