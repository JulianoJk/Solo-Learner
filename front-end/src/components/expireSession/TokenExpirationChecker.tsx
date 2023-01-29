import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Modal } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { isUserLoggedIn } from "../../lib/dist";
import Login from "../Auth/Login/Login";
import { useDisclosure } from "@mantine/hooks";
const TokenExpirationChecker = () => {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [openedModal, handlers] = useDisclosure(false);
  const location = useLocation(); // <-- get current location being accessed
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded: any = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // the exp claim is in hours, so convert it to milliseconds(for ms, remove the *60*60)
      const currentTime = Date.now();
      if (isUserLoggedIn() === true && currentTime > expirationTime) {
        setIsExpired(true);
        handlers.open();
      } else if (isUserLoggedIn() === true && currentTime < expirationTime) {
        handlers.close();
      }
    }
  }, []);

  if (isExpired) {
    return (
      <Modal
        transition="fade"
        centered
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={openedModal}
        onClose={() => {
          return;
        }}
        overlayBlur={4}
        withCloseButton={false}
      >
        <div>Session expired. Please log in again.</div>
        <Login
          switchToRegister={false}
          pathToNavigateAfterLogin={location.pathname}
          refreshPageAfterLogin={true}
        />
      </Modal>
    );
  }

  return null;
};

export default TokenExpirationChecker;
