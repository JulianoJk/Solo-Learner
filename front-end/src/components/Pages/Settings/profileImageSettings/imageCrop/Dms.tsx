import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import { Slider, Button, Text } from "@mantine/core";
import { useStyles } from "./Dms.styles";

const dogImg =
  "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

const Demo = () => {
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

  return (
    <div>
      <div className={classes.cropContainer}>
        <Cropper
          image={dogImg}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <Text size="md">Zoom</Text>
        <Slider
          value={zoom}
          min={1}
          aria-labelledby="Zoom"
          onChange={setZoom}
          labelAlwaysOn={false}
          showLabelOnHover={false}
          label={null}
          size="xl"
          color="indigo"
        />
        <Text size="md">Rotation</Text>
        <Slider
          value={rotation}
          min={1}
          max={360}
          step={0.1}
          showLabelOnHover={false}
          aria-labelledby="Rotation"
          onChange={setRotation}
          label={null}
          size="xl"
          color="indigo"
        />
      </div>
    </div>
  );
};
export default Demo;
