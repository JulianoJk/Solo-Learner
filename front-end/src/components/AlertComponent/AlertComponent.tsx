import React from 'react';
import { Alert, Center, Text, useMantineTheme } from '@mantine/core';
import { IconAlertCircleFilled } from '@tabler/icons-react';

import { useStyles } from './Alert.styles';
import { isUndefinedOrNullString } from '../../lib/dist';
import { AppState } from '../../context/AppContext';

export const AlertComponent: React.FC = () => {
  const { errorAlertMessage } = AppState();
  const hasError: boolean = isUndefinedOrNullString(errorAlertMessage);
  const theme = useMantineTheme();

  const { classes } = useStyles();
  return (
    <Center>
      {!hasError ? (
        <>
          <Alert radius="lg" className={classes.alertBox}>
            <Text
              span
              weight={600}
              size="lg"
              color={
                theme.colorScheme === 'dark' ? '#FFFFFF' : theme.colors.red[9]
              }
            >
              <>
                <IconAlertCircleFilled
                  strokeWidth={1}
                  className={classes.alertIcon}
                  size={25}
                />
              </>
              {errorAlertMessage}
            </Text>
          </Alert>
        </>
      ) : (
        <></>
      )}
    </Center>
  );
};
