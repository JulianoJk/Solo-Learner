import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import { Slider, Button, Text } from "@mantine/core";
import { useStyles } from "./ImageCropper.styles";

const dogImg =
  "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";
interface IMyImageCrop {
  imageFile: any;
}
const MyImageCrop: React.FC<IMyImageCrop> = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const { classes } = useStyles();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);
  const onZoomChange = (e: React.BaseSyntheticEvent): void => {
    setZoom(e.target.value);
  };
  return (
    <div>
      <div className={classes.cropContainer}>
        <Cropper
          objectFit="auto-cover"
          image={props.imageFile.preview}
          crop={crop}
          zoom={zoom}
          aspect={1}
          maxZoom={3}
          cropShape="round"
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <Text size="md">Zoom</Text>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={onZoomChange}
          color="red"
        />
      </div>
    </div>
  );
};
export default MyImageCrop;
