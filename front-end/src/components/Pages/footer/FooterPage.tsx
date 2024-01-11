import { Container, Group, ActionIcon, Box } from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from '@tabler/icons-react';
import classes from './FooterPage.module.css';
import LogoImage from '../../../images/Logo';

const FooterPage = () => {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Box style={{ width: 70, height: 60, marginTop: '0.4rem' }}>
          <LogoImage />
        </Box>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};
export default FooterPage;
