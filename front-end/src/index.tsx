import { createRoot } from 'react-dom/client';

import App from './App';
// import './GlobalStyles.modules.css'; // Import the global stylesheet
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/VisuallyHidden.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/Flex.css';
import '@mantine/core/styles.css';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!); // Add the non-null assertion operator (!) to the container variable
root.render(<App />);
