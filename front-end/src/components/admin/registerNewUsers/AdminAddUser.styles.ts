import { createStyles } from '@mantine/emotion';

const useStyles = createStyles(() => ({
  root: {
    backgroundColor: '#2c2c2c', // Darker grey background
    color: '#ffffff', // White text for better readability
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
  },
}));

export default useStyles;
