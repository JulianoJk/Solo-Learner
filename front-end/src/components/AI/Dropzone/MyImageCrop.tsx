import React, { useState, useCallback } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import "./styles.css";
interface IProps {
  imageSrc: any;
}
const MyImageCrop: React.FC<IProps> = (props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image={
            props.imageSrc ??
            "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          }
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e: any, zoom: any) => setZoom(Number(zoom))}
          classes={{ root: "slider" }}
        />
      </div>
    </div>
  );
};

export default MyImageCrop;
