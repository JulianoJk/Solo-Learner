import React, { useState } from 'react'
import { Dropzone, MIME_TYPES, FileWithPath } from "@mantine/dropzone";
import { useStyles } from './DropzoneComponent.styles';
import { AlertCircle, Upload } from "tabler-icons-react";
import { COMMON_WHITE, LIGHT_NAVY } from "../../Theme/Theme";
import { showNotification } from "@mantine/notifications";
import { formatBytes, isArrayUndefinedOrNull } from "../../lib/dist";
import {
  Text,
  Group,
  Title,
  Image,
} from "@mantine/core";
import { useAccountSettingsState } from '../../context/AccountSettingsContext';
const DropzoneComponent = () => {
  const [profileImage, setProfileImage] = useState<FileWithPath[]>([]);
  const accountSettings = useAccountSettingsState()

  const maxSizeImages = 3 * 1024 ** 2;
  const { classes } = useStyles();

  const rejectedUpload = (file: any) => {
    let errorMessage: string;
    file.forEach((element: any) => {
      element.errors.forEach((elements: any) => {
        console.log(elements.message);
        errorMessage = elements.message;
        if (elements.code === "file-too-large") {
          errorMessage = `File is larger than ${formatBytes(maxSizeImages)}.`;
        } else if (elements.code === "file-invalid-type") {
          errorMessage =
            "File type must be .png, .jpeg, .svg,  !";
          return;
        }

        showNotification({
          icon: <AlertCircle size={18} color={COMMON_WHITE} />,
          title: <Text color={COMMON_WHITE}>Bummer!</Text>,
          message: <Text color={COMMON_WHITE}>{errorMessage}</Text>,
          sx: { backgroundColor: LIGHT_NAVY, borderColor: LIGHT_NAVY },
          autoClose: 5000,
          color: "red",
        });
      });
    });
  };


  let imageUrl: string = "";

  const previews = profileImage.map((file, index) => {
    imageUrl = URL.createObjectURL(file);
    return (
      <div className={classes.imagePreview} key={index}>
        <Image
          src={imageUrl}
          // radius={"xl"}
          withPlaceholder
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          alt="profile image preview"
        />
      </div>
    );
  });
  return (
    <>
      <Dropzone
        activateOnDrag
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.svg]}
        onDrop={(files) => setProfileImage(files)}
        onReject={(file) => rejectedUpload(file)}
        // Max size in bytes it can be accepted
        maxSize={maxSizeImages}
        multiple={false}
        className={classes.dropzoneContainer}
      >
        <Group
          align="center"
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}
        >
          {!isArrayUndefinedOrNull(profileImage) ? (
            previews
          ) : (
            <Title order={3} className={classes.dropzoneLabel}>
              <Upload /> Drop images here
            </Title>
          )}
        </Group>
      </Dropzone></>
  )
}

export default DropzoneComponent;