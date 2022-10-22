import { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  SimpleGrid,
  Center,
  Avatar,
  Modal,
  Button,
  Title,
  Grid,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { useStyles } from "./UploadProfile.styles";
import { openConfirmModal } from "@mantine/modals";

const UploadProfileComponent = () => {
  const { classes } = useStyles();

  const [profileImage, setProfileImage] = useState<FileWithPath[]>([]);
  const resetRef = useRef<() => void>(null);
  // open dialog if a file is dragged to screen and close when dragged away
  const [openModal, setOpenModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<boolean>(false);

  const previews = profileImage.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  useEffect(() => {
    setPreviewImage(!previewImage);
    console.log(profileImage);
  }, [profileImage]);
  const ConfirmationModal = () =>
    openConfirmModal({
      title: <Title>Upload profile image</Title>,
      children: (
        <>
          <Dropzone
            activateOnDrag
            accept={IMAGE_MIME_TYPE}
            onDrop={(files) => setProfileImage(files)}
            // style={{ width: "50%", height: "50%" }}
            // onDrop={(files) => console.log("accepted files", files)}
            // onDrop={ConfirmationModal}

            onReject={(files) => console.log("rejected files", files)}
            // Max size in bytes it can be accepted
            // maxSize={4.8 * 1024 ** 2}
            maxSize={10 * 1024 ** 2}
            // onDragEnter={() => {
            //   setOpenDialogWindow(true);
            // }}
            // onDragLeave={() => {
            //   setOpenDialogWindow(false);
            // }}
          >
            {previewImage ? (
              { profileImage }
            ) : (
              <Text align="center">Drop images here</Text>
            )}
          </Dropzone>
          )
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
      confirmProps: { color: "red", disabled: !!profileImage },
    });

  return (
    <>
      <Button onClick={ConfirmationModal}>Update Profile</Button>
      <Text>Profile picture</Text>
      <Avatar
        className={classes.profileImage}
        radius={200}
        size={200}
        color={"cyan"}
        variant="filled"
        alt="profile-image"
      />
    </>
  );
};

export default UploadProfileComponent;
