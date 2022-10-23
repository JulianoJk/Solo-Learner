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
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { useStyles } from "./UploadProfile.styles";
import { AlertCircle, Upload } from "tabler-icons-react";
import { COMMON_WHITE, LIGHT_NAVY } from "../../../../Theme/Theme";
import { showNotification } from "@mantine/notifications";
import { formatBytes, isArrayUndefinedOrNull } from "../../../../lib/dist";
import { useLocalStorage } from "@mantine/hooks";

const UploadProfileComponent = () => {
  const { classes } = useStyles();
  const maxSizeImages = 3 * 1024 ** 2;

  const [profileImage, setProfileImage] = useState<FileWithPath[]>([]);
  // open dialog if a file is dragged to screen and close when dragged away
  const [openModal, setOpenModal] = useState(true);
  const [saveImage, setSaveImage] = useState(false);
  const [value, setValue] = useLocalStorage({
    key: "profile-Image",
    defaultValue: "",
  });

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
            "File type must be .png, .gif, .jpeg, .svg, .xml, .webp !";
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

  const imageSource = saveImage ? imageUrl : "";
  useEffect(() => {
    setValue(imageUrl);
  }, [saveImage]);
  return (
    <div>
      <Modal
        title={<Title>Upload profile image</Title>}
        opened={openModal}
        onClose={() => setOpenModal(false)}
        className={classes.modalContainer}
        size={"90%"}
        centered
      >
        <Dropzone
          activateOnDrag
          accept={IMAGE_MIME_TYPE}
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
            variant="filled"
            color="indigo"
            disabled={profileImage.length === 0 ? true : false}
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
        color={"indigo"}
        variant="filled"
        alt="profile-image"
        src={imageSource}
      />
    </div>
  );
};

export default UploadProfileComponent;
