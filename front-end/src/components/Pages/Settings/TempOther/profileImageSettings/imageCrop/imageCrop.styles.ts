import { createStyles } from '@mantine/core';
export const useStyles = createStyles(() => ({
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: '#333',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  profileImage: {
    margin: 30,
  },
  modalButtons: {
    marginTop: 10,
  },
  imagePreview: {
    width: 240,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalRoot: {
    maxHeight: 700,
  },
}));
