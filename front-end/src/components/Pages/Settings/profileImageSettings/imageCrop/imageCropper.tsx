import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Text } from "@mantine/core";
import { useStyles } from "./ImageCropper.styles";
interface IMyImageCrop {
  imageFile: any;
}
const MyImageCrop: React.FC<IMyImageCrop> = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const { classes } = useStyles();

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
