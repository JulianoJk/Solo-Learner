import { Overlay, Paper, useMantineTheme, Text } from '@mantine/core';
import { SocialButtons } from '../SocialButtons/SocialButtons';

export function SocialButtonsUnavailable() {
  const theme = useMantineTheme();

  return (
    <Paper shadow="sm" radius="md" p="md" sx={{ position: 'relative' }}>
      <SocialButtons disableFacebook disableGoogle></SocialButtons>
      <Overlay
        color={theme.colorScheme === 'light' ? '#000' : '#fff'}
        opacity={theme.colorScheme === 'light' ? 0.65 : 0.2}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        radius={10}
      />
      <Text ta={'center'} fw={500}>
        Comming soon!
      </Text>
    </Paper>
  );
}
