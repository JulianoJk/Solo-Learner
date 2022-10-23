import { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  Avatar,
  Modal,
  Button,
  Group,
  Title,
  Center,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { useStyles } from "./UploadProfile.styles";
import { AlertCircle, Upload } from "tabler-icons-react";
import { COMMON_WHITE, LIGHT_NAVY } from "../../../../Theme/Theme";
import { showNotification } from "@mantine/notifications";
import { isArrayUndefinedOrNull } from "../../../../lib/dist";

const UploadProfileComponent = () => {
  const { classes } = useStyles();

  const [profileImage, setProfileImage] = useState<FileWithPath[]>([]);
  // open dialog if a file is dragged to screen and close when dragged away
  const [openModal, setOpenModal] = useState(false);

  const previews = profileImage.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <div className={classes.imagePreview} key={index}>
        <Image
          radius="md"
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          alt="profile image preview"
        />
      </div>
    );
  });

  // const ConfirmationModal = () =>
  //   openConfirmModal({
  //     title: <Title>Upload profile image</Title>,
  //     children: (
  //       <>
  //         <Dropzone
  //           activateOnDrag
  //           accept={IMAGE_MIME_TYPE}
  //           onDrop={(files) => setProfileImage(files)}
  //           // style={{ width: "50%", height: "50%" }}
  //           // onDrop={(files) => console.log("accepted files", files)}
  //           // onDrop={ConfirmationModal}

  //           onReject={(files) => console.log("rejected files", files)}
  //           // Max size in bytes it can be accepted
  //           // maxSize={4.8 * 1024 ** 2}
  //           maxSize={10 * 1024 ** 2}
  //           // onDragEnter={() => {
  //           //   setOpenDialogWindow(true);
  //           // }}
  //           // onDragLeave={() => {
  //           //   setOpenDialogWindow(false);
  //           // }}
  //         >
  //           {previewImage ? (
  //             { profileImage }
  //           ) : (
  //             <Text align="center">Drop images here</Text>
  //           )}
  //         </Dropzone>
  //         )
  //       </>
  //     ),
  //     labels: { confirm: "Confirm", cancel: "Cancel" },
  //     onCancel: () => console.log("Cancel"),
  //     onConfirm: () => console.log("Confirmed"),
  //     confirmProps: { color: "red", disabled: !!profileImage },
  //   });

  const rejectedUpload = (errorText: any) => {
    showNotification({
      icon: <AlertCircle size={18} color={COMMON_WHITE} />,
      title: <Text color={COMMON_WHITE}>Bummer!</Text>,
      message: <Text color={COMMON_WHITE}>{errorText}</Text>,
      sx: { backgroundColor: LIGHT_NAVY, borderColor: LIGHT_NAVY },
      autoClose: 5000,
      color: "red",
    });
  };

  return (
    <div>
      <Modal
        title={<Title>Upload profile image</Title>}
        opened={openModal}
        // opened={true}
        onClose={() => setOpenModal(false)}
        sx={{
          ":root": {
            backgroundColor: "red",
            width: 900,
            height: 900,
          },
          ":modal": {
            backgroundColor: "red",
            width: 900,
            height: 900,
          },
        }}
      >
        <Dropzone
          activateOnDrag
          accept={IMAGE_MIME_TYPE}
          onDrop={(files) => setProfileImage(files)}
          style={{ width: 400, height: 400 }}
          // onDrop={(files) => console.log("accepted files", files)}
          // onDrop={ConfirmationModal}
          onReject={(file) => rejectedUpload(file[0].errors[0].message)}
          // Max size in bytes it can be accepted
          maxSize={14.8 * 1024 ** 2}
          multiple={false}
        >
          <div className={classes.imagePreviewContainer}>
            {!isArrayUndefinedOrNull(profileImage) ? (
              previews
            ) : (
              <Text align="center">Drop images here</Text>
            )}
          </div>
        </Dropzone>
        <Group
          spacing={"xl"}
          position={"right"}
          className={classes.modalButtons}
        >
          <Button
            onClick={() => {
              console.log("asdas");
            }}
            variant="outline"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setProfileImage([]);
              console.log(profileImage);
            }}
            variant="outline"
            color="red"
          >
            Clear
          </Button>
        </Group>
      </Modal>
      <Button onClick={() => setOpenModal(true)}>Update Profile</Button>
      <Text>Profile picture</Text>
      <Avatar
        className={classes.profileImage}
        radius={200}
        size={200}
        color={"cyan"}
        variant="filled"
        alt="profile-image"
      />
    </div>
  );
};

export default UploadProfileComponent;
