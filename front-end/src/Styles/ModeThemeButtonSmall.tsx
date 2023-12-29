import {
  ActionIcon,
  getGradient,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ModeThemeButtonSmall.module.css';

function ModeThemeButtonSmall() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    document.body.style.backgroundImage =
      colorScheme === 'dark'
        ? getGradient({ deg: 7, from: '#F8BBD0', to: '#64B5F6' }, theme)
        : getGradient({ deg: 7, from: '#1A1B1E', to: '#1A1B1E' }, theme);
    document.body.style.color =
      colorScheme === 'dark'
        ? 'var(--mantine-color-black)'
        : 'var(--mantine-color-dark-0)';
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
