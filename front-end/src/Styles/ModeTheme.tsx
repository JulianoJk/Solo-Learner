import {
  useMantineColorScheme,
  useMantineTheme,
  ActionIcon,
  Tooltip,
  ColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { checkIfPageIsReload } from "../lib/dist";

const ModeTheme = () => {
  const theme = useMantineTheme();

  const { toggleColorScheme } = useMantineColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "app-theme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const dark = colorScheme === "dark";

  const handleOnClick = (value?: ColorScheme) => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
    toggleColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const switchDescription = `${
    theme.colorScheme === "light" ? "Dark" : "Light"
  } mode`;

  return (
    <Tooltip
      label={switchDescription}
      openDelay={300}
      closeDelay={80}
      arrowSize={6}
      withArrow
      transition="fade"
    >
      <ActionIcon
        size="lg"
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => handleOnClick()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size={26} /> : <IconMoonStars size={26} />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ModeTheme;
