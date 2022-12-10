import React, { useState, useCallback } from "react";
import { Slider } from "@mantine/core";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { useStyles } from "./imageCrop.styles";

const MyImageCrop = () => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { classes } = useStyles();

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
            "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          }
          aspect={1}
          cropShape="round"
          crop={crop}
          zoom={zoom}
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
          onChange={setZoom}
        />
      </div>
    </div>
  );
};

export default MyImageCrop;
