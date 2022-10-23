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
import {
  COMMON_WHITE,
  DEEP_BLUE,
  LIGHTER_GRAY,
  LIGHT_BEIGE,
  LIGHT_NAVY,
  TRANSPARENT_LIGHT_COLORS,
} from "../../../../Theme/Theme";
import { showNotification } from "@mantine/notifications";
import { formatBytes, isArrayUndefinedOrNull } from "../../../../lib/dist";

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
  const errorsArray = ["too-many-files", "file-too-small", "file-invalid-type"];
  const rejectedUpload = (
    // errorText: any,
    // errorType: string,
    fileError: any,
    fileSize: any
  ) => {
    let errorMessage = () => {
      if (fileError.code === "file-too-large") {
        console.log(`File is larger than ${formatBytes(fileSize)}`);
      } else if (errorsArray.includes(fileError)) {
        console.log(fileError.message);
      }
    };
    // showNotification({
    //   icon: <AlertCircle size={18} color={COMMON_WHITE} />,
    //   title: <Text color={COMMON_WHITE}>Bummer!</Text>,
    //   // <Text color={COMMON_WHITE}>{}</Text>
    //   message: <Text color={COMMON_WHITE}>{fileError}</Text>,
    //   sx: { backgroundColor: LIGHT_NAVY, borderColor: LIGHT_NAVY },
    //   autoClose: 5000,
    //   color: "red",
    // });
  };

  return (
    <div>
      <Modal
        title={<Title>Upload profile image</Title>}
        opened={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Dropzone
          activateOnDrag
          accept={IMAGE_MIME_TYPE}
          // onDrop={(files) => setProfileImage(files)}
          onDrop={(files) => console.log(isArrayUndefinedOrNull(files))}
          sx={{
            width: 400,
            height: 400,
            border: 0,
            backgroundColor: LIGHTER_GRAY,
            ":hover": {
              backgroundColor: TRANSPARENT_LIGHT_COLORS[0],
            },
          }}
          onReject={(file) => {
            // rejectedUpload(
            //   file[0].errors[0].message,
            //   file[0].errors[0].code,
            //   file[0].file.size
            // );
            // TODO!: Check alternatives | how to map an object inside another object
            rejectedUpload(
              file.map((e) => e.errors.map((a) => a)),
              file.map((k) => k.file.size)
            );
          }}
          // onReject={(file) => rejectedUpload(file)}
          // Max size in bytes it can be accepted
          maxSize={1 * 1024 ** 2}
          multiple={false}
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
              console.log("asdas");
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
      />
    </div>
  );
};

export default UploadProfileComponent;
