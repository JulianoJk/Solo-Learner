import { useRef, useState } from "react";
import { Text, Image, SimpleGrid, Center } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { openConfirmModal } from "@mantine/modals";
const UploadProfileComponent = () => {
  const [profileImage, setProfileImage] = useState<FileWithPath[]>([]);
  const resetRef = useRef<() => void>(null);
  // open dialog if a file is dragged to screen and close when dragged away
  const [openDialogWindow, setOpenDialogWindow] = useState(false);

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

  const openModal = () =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  return (
    <Center>
      <Dropzone.FullScreen
        activateOnDrag
        accept={IMAGE_MIME_TYPE}
        // onDrop={setFiles}
        // style={{ width: "50%", height: "50%" }}
        // onDrop={(files) => console.log("accepted files", files)}
        onDrop={openModal}
        onReject={(files) => console.log("rejected files", files)}
        // Max size in bytes it can be accepted
        maxSize={4.8 * 1024 ** 2}
        onDragEnter={() => {
          setOpenDialogWindow(true);
        }}
        onDragLeave={() => {
          setOpenDialogWindow(false);
        }}
      >
        <Text align="center">Drop images here</Text>
      </Dropzone.FullScreen>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </Center>
  );
};

export default UploadProfileComponent;
