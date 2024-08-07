import React from 'react';
import { CopyButton, ActionIcon, Tooltip, Group } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import useStyles from './CopyButton.styles';

interface ICopyButtonComponentProps {
  value: string;
  isHovered: boolean;
}

export const CopyButtonComponent: React.FC<ICopyButtonComponentProps> = (
  props,
) => {
  const { value, isHovered } = props;
  const { classes } = useStyles();

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
