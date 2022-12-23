import { Modal, Title } from "@mantine/core";
import React, { useState } from "react";

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
      <h1>Hello</h1>
    </Modal>
  );
};

export default ResizeImageModal;
