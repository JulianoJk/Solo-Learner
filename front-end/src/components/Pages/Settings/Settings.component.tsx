import { Title } from "@mantine/core";
import React from "react";
import ModeTheme from "../../../Styles/ModeTheme";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import UploadProfileComponent from "./profileImageSettings/UploadProfile.component";

const SettingsComponent = () => {
  return (
    <>
      <Title>Settings</Title>
      <UploadProfileComponent />
      <DeleteAccount />
    </>
  );
};

export default SettingsComponent;
