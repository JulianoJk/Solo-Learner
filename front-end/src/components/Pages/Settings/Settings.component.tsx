import { Title } from "@mantine/core";
import React from "react";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import ResizeImageModal from "./profileImageSettings/ResizeImageModal";
import UploadProfileComponent from "./profileImageSettings/UploadProfile.component";

const SettingsComponent = () => {
  return (
    <>
      <Title>Settings</Title>
      <UploadProfileComponent />
      <DeleteAccount />
      <ResizeImageModal></ResizeImageModal>
    </>
  );
};

export default SettingsComponent;
