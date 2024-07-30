import React, { useEffect } from 'react';

import styles from './Loader.module.css';
import { Text, useMantineColorScheme } from '@mantine/core';
import cx from 'clsx';
import { useMediaQuery } from '@mantine/hooks';

const Preloader = () => {
  const smallScreen = useMediaQuery('(max-width: 36rem)');
  const mediumScreen = useMediaQuery('(max-width: 43.75rem)');
  const bigScreen = useMediaQuery('(min-width: 59.37rem)');
  const { colorScheme } = useMantineColorScheme();
  useEffect(() => {
    console.log(colorScheme);
    document.body.style.backgroundImage =
      colorScheme === 'dark'
        ? 'linear-gradient(180deg, #1A1B1E 0%, #1A1B1E 100%)'
        : 'linear-gradient(180deg, #64B5F6 0%, #64B5F6 100%)';
  }, [colorScheme]);
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.iconContainer}>
          <div className={cx(styles.icon, styles.book)}></div>
          <div className={cx(styles.icon, styles.pen)}></div>
          <div className={cx(styles.icon, styles.globe)}></div>
        </div>

        <Text
          size={
            smallScreen ? 'xs' : mediumScreen ? 'lg' : bigScreen ? '2rem' : 'md'
          }
          fw={900}
          variant="text"
          c="gray"
          className={styles.loading}
        >
          Loading...
        </Text>
      </div>
    </div>
  );
};

export default Preloader;
