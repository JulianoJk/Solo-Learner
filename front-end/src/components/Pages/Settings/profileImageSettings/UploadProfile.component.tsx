import { useEffect, useState } from "react";
import {
  Text,
  Image,
  Avatar,
  Modal,
  Button,
  Group,
  Title,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useStyles } from "./UploadProfile.styles";
import { AlertCircle } from "tabler-icons-react";
import { COMMON_WHITE, LIGHT_NAVY } from "../../../../Theme/Theme";
import { showNotification } from "@mantine/notifications";
import { formatBytes, isArrayUndefinedOrNull } from "../../../../lib/dist";
import { useLocalStorage } from '@mantine/hooks';
const UploadProfileComponent = () => {
  const { classes } = useStyles();
  const maxSizeImages = 3 * 1024 ** 2;

  const [profileImage, setProfileImage] = useState<FileWithPath[]>([]);
  // open dialog if a file is dragged to screen and close when dragged away
  const [openModal, setOpenModal] = useState(false);
  const [saveImage, setSaveImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();
  // TODO!: Dropzone
  const [value, setValue] = useLocalStorage({ key: 'profile-image', defaultValue: '' });


  let imageUrl;
  const previews = profileImage.map((file, index) => {
    imageUrl = URL.createObjectURL(file);
    return (
      <div className={classes.imagePreview} key={index}>
        <Image
          radius="md"
          src={imageUrl}
          // imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          alt="profile image preview"
        />
      </div>
    );
  });
  // const rejectedUpload = (file: any) => {
  //   let errorMessage;
  //   const b = file.forEach((element: any) => {
  //     const a = element.errors;
  //     a.forEach((elements: any) => {
  //       showNotification({
  //         icon: <AlertCircle size={18} color={COMMON_WHITE} />,
  //         title: <Text color={COMMON_WHITE}>Bummer!</Text>,
  //         // <Text color={COMMON_WHITE}>{}</Text>
  //         message: <Text color={COMMON_WHITE}>{elements.message}</Text>,
  //         sx: { backgroundColor: LIGHT_NAVY, borderColor: LIGHT_NAVY },
  //         autoClose: 5000,
  //         color: "red",
  //       });
  //     });
  //   });
  // };
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
            "File type must be either .png or .jpeg or .svg !  ";
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


  useEffect(() => {

    setSaveImage(false)
  }, [profileImage])
  return (
    <div>
      <Modal
        title={<Title>Upload profile image</Title>}
        opened={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Dropzone
          activateOnDrag
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.svg]}
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
              <Text align="center">Drop images here</Text>
            )}
          </Group>
        </Dropzone>
        <Group
          spacing={"xl"}
          position={"right"}
          className={classes.modalButtons}
        >
          <Button
            onClick={() => {
              setProfileImage([]);
            }}
            variant="outline"
            color="red"
          >
            Clear
          </Button>

          <Button
            onClick={() => {
              setSaveImage(true);
              setOpenModal(false);
            }}
            variant="outline"
          >
            Save
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
        src={saveImage ? imageUrl : ""}
      />
      )
    </div>
  );
};

export default UploadProfileComponent;
