import { Modal, Title } from "@mantine/core";
import React, { useState } from "react";
import MyImageCrop from "./imageCrop/MyImageCrop";

const ResizeImageModal = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <Modal
      opened={isOpen}
      onClose={() => setisOpen(false)}
      size={600}
      title={<Title>Upload profile image</Title>}
      overflow="inside"
    >
      <MyImageCrop></MyImageCrop>
    </Modal>
  );
};

export default ResizeImageModal;
