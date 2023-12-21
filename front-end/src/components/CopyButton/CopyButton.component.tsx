import React from 'react';
import { CopyButton, ActionIcon, Tooltip, Group } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { createStyles } from '@mantine/core';

interface ICopyButtonComponentProps {
  value: string;
  isHovered: boolean;
}

const useStyles = createStyles(() => ({
  wrapper: {
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',

    '&:hover': {
      opacity: 1,
    },
  },
}));

export const CopyButtonComponent: React.FC<ICopyButtonComponentProps> = (
  props,
) => {
  const { classes } = useStyles();
  const { value, isHovered } = props;

  return (
    <div className={classes.wrapper} style={{ opacity: isHovered ? 1 : 0 }}>
      {isHovered && (
        <Group>
          <CopyButton value={value} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? 'Copied' : 'Copy'}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      )}
    </div>
  );
};
