// import {
//   useMantineColorScheme,
//   useMantineTheme,
//   ActionIcon,
//   Tooltip,
//   ColorScheme,
// } from '@mantine/core';
// import { IconSun, IconMoonStars } from '@tabler/icons-react';
// import { useLocalStorage } from '@mantine/hooks';

// const ModeThemeButtonSmall = () => {
//   const theme = useMantineTheme();

//   const { toggleColorScheme } = useMantineColorScheme();

//   const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
//     key: 'app-theme',
//     defaultValue: 'light',
//     getInitialValueInEffect: true,
//   });
//   const dark = colorScheme === 'dark';

//   const handleOnClick = () => {
//     setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
//     toggleColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
//   };

//   const switchDescription = `${
//     theme.colorScheme === 'light' ? 'Dark' : 'Light'
//   } mode`;

//   return (
//     <Tooltip
//       label={switchDescription}
//       openDelay={300}
//       closeDelay={80}
//       arrowSize={6}
//       withArrow
//       transitionProps={{
//         transition: 'fade',
//         duration: 100,
//         timingFunction: 'ease',
//       }}
//     >
//       <ActionIcon
//         size="lg"
//         variant="outline"
//         color={dark ? 'yellow' : 'blue'}
//         onClick={() => handleOnClick()}
//         title="Toggle color scheme"
//       >
//         {dark ? <IconSun size={26} /> : <IconMoonStars size={26} />}
//       </ActionIcon>
//     </Tooltip>
//   );
// };

// export default ModeThemeButtonSmall;
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ModeThemeButtonSmall.module.css';

function ModeThemeButtonSmall() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}
export default ModeThemeButtonSmall;
