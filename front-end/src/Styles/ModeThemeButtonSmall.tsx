import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ModeThemeButtonSmall.module.css';

function ModeThemeButtonSmall() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="xl"
      variant="outline"
      color={colorScheme === 'dark' ? 'yellow' : '#0c8599'}
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'dark' ? (
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      ) : (
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={2} />
      )}
    </ActionIcon>
  );
}
export default ModeThemeButtonSmall;
