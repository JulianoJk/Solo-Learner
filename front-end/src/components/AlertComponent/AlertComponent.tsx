import React from 'react';
import {
  Alert,
  Center,
  Text,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconAlertCircleFilled } from '@tabler/icons-react';

import classes from './Alert.module.css';
import { isUndefinedOrNullString } from '../../utils/utils';
import { useAppState } from '../../context/AppContext';

export const AlertComponent: React.FC = () => {
  const { errorAlertMessage } = useAppState();
  const hasError: boolean = isUndefinedOrNullString(errorAlertMessage);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Center>
      {!hasError ? (
        <>
          <Alert
            radius="lg"
            className={
              colorScheme === 'light'
                ? classes.alertBoxLight
                : classes.alertBoxDark
            }
          >
            <Text
              span
              fw={600}
              size="lg"
              c={colorScheme === 'dark' ? '#FFFFFF' : theme.colors.red[9]}
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
