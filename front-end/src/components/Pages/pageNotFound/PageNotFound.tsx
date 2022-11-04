import { useState } from "react";
import styles from "./PageNotFound.module.css";
import stop_sign from "../../../images/stop_sign.png";
import { Button, Group, Image, Modal, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
interface IPops {
  bodyText?: string;
  navText?: string;
  statusNumber?: number;
  btnText?: string;
  navigationPath: string;
}

const PageNotFound: React.FC<IPops> = ({
  bodyText: text,
  navText,
  btnText,
  navigationPath,
}) => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <div>
      <Modal
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        withCloseButton={false}
        onClose={() => setOpened(true)}
        title={
          <Title order={1} className={`${styles.nav_bg}`}>
            {navText}
          </Title>
        }
        size="lg"
        radius={30}
      >
        <Image radius="md" src={stop_sign} alt="stop_sign" />
        <Text align="center">{text}</Text>
        <Group position="center">
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
            radius="md"
            size="lg"
            fullWidth
            onClick={() => navigate(`${navigationPath}`)}
          >
            {btnText}
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default PageNotFound;
