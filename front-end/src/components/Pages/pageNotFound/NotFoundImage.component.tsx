import React from 'react';
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  rem,
} from '@mantine/core';
import NotFound from '../../../images/NotFount';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));
interface NotFoundImageProps {
  bodyText?: string;
  navText?: string;
  statusNumber?: number;
  btnText?: string;
  navigationPath: string;
}
const NotFoundImage: React.FC<NotFoundImageProps> = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      >
        <NotFound className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => navigate(props.navigationPath ?? '/')}
          >
            Get back to home page
          </Button>
        </div>
        <NotFound className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};
export default NotFoundImage;
