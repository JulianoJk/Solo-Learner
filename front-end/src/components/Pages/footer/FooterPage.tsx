import { Container, Group, ActionIcon, Box, Footer } from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from '@tabler/icons-react';

import { useStyles } from './FooterPage.styles';
import LogoImage from '../../../images/Logo';

const FooterPage = () => {
  const { classes } = useStyles();

  return (
    <Footer className={classes.footer} height={'100'}>
      <Container className={classes.inner}>
        <Box style={{ width: 70, height: 60, marginTop: '0.4rem' }}>
          <LogoImage />
        </Box>
        <Group spacing={0} className={classes.links} position="right" noWrap>
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
    </Footer>
  );
};
export default FooterPage;
