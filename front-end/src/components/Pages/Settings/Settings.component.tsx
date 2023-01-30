import { Title } from "@mantine/core";
import React from "react";
import Demo from "./DeleteAccount/DeleteForm";

import DeleteAccount from "./DeleteAccount/DeleteAccount";
import UploadProfileComponent from "./profileImageSettings/UploadProfile.component";
import MantineDemo from "./DeleteAccount/DeleteAccount";

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
