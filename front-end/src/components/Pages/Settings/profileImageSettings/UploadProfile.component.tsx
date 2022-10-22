import { useEffect, useRef, useState } from "react";
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
import { AlertCircle } from "tabler-icons-react";
import {
  ERROR_DARK_COLOR,
  SECONDARY_CHART_COLORS,
  COMMON_WHITE,
  LIGHT_NAVY,
} from "../../../../Theme/Theme";
import { showNotification } from "@mantine/notifications";

const UploadProfileComponent = () => {
  const { classes } = useStyles();

  const [profileImage, setProfileImage] = useState<FileWithPath[] | null>([]);
  const resetRef = useRef<() => void>(null);
  // open dialog if a file is dragged to screen and close when dragged away
  const [openModal, setOpenModal] = useState(false);

  const previews =
    profileImage === null ? (
      <></>
    ) : (
      profileImage.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
          <Image
            key={index}
            src={imageUrl}
            imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          />
        );
      })
    );

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
    <>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          ":modal": {
            color: "red",
          },
        }}
      >
        <Dropzone
          activateOnDrag
          accept={IMAGE_MIME_TYPE}
          onDrop={(files) => setProfileImage(files)}
          // style={{ width: "50%", height: "50%" }}
          // onDrop={(files) => console.log("accepted files", files)}
          // onDrop={ConfirmationModal}
          onReject={(file) => rejectedUpload(file[0].errors[0].message)}
          // Max size in bytes it can be accepted
          maxSize={14.8 * 1024 ** 2}
          // maxSize={1}
          multiple={false}
          // onDragEnter={() => {
          //   setOpenDialogWindow(true);
          // }}
          // onDragLeave={() => {
          //   setOpenDialogWindow(false);
          // }}
        >
          {previews ? (
            <Text align="center">Drop images here</Text>
          ) : (
            <>{previews}</>
          )}
          {/* {previewImage ? (
            { profileImage }
          ) : (
          )} */}
        </Dropzone>
        <Group>
          <Button
            onClick={() => {
              console.log("open");
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
    </>
  );
};

export default UploadProfileComponent;
