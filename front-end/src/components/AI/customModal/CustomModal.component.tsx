import React from "react";
import { Modal, Button } from "@mantine/core";

function CustomModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal opened onClose={handleClose}>
        <div
          style={{
            width: "400px",
            backgroundColor: "red",
            height: "400px",
          }}
        >
          asdas
        </div>
      </Modal>
    </>
  );
}
export default CustomModal;
