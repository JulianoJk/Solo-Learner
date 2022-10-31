// TODO!: Bug? OnDrop causes the save button to click. Check it!
import { useEffect, useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';

import {
  Text,
  Image,
  Avatar,
  Modal,
  Button,
  Group,
  Title,
  SimpleGrid,
  Center,
} from '@mantine/core';
import { useStyles } from './UploadProfile.styles';
import { useLocalStorage } from '@mantine/hooks';
import { DropzoneComponent } from '@noxyseras/react-ui-components';
import { FileWithPath } from '@mantine/dropzone';
const UploadProfileComponent = () => {
  const { classes } = useStyles();
  const [img, setImg] = useState('');

  const maxSizeImages = 2 * 1024 ** 2;
  const images = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/svg+xml',
    'image/webp',
  ];
  // open dialog if a file is dragged to screen and close when dragged away
  const [openModal, setOpenModal] = useState(false);
  const [saveImage, setSaveImage] = useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  // Might want to delete
  const ref = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<any>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      console.log('clicked!');
      imageRef.current.src = 'https://picsum.photos/200/300';
    }
  }, [ref.current]);

  const fileChangedHandler = (e: any) => {
    let fileInput = false;
    if (e) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          e,
          500,
          500,
          'png',
          100,
          0,
          (uri: any) => {
            setImg(uri);
          },
          'base64',
          70,
          70
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    fileChangedHandler(file);

    return (
      <Image
        key={index}
        src={img}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <div>
      <Modal
        title={<Title>Upload profile image</Title>}
        opened={openModal}
        onClose={() => setOpenModal(false)}
      >
        <DropzoneComponent
          onDrop={(file) => setFiles(file)}
          rejectedUpload={(file) => console.log('rejected: ' + { ...file })}
          acceptFiles={images}
        >
          <Center>
            <Text>Drop images here</Text>
          </Center>
        </DropzoneComponent>
        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: 'lg', cols: 1 }]}
          mt={previews.length > 0 ? 'xl' : 0}
        >
          {previews}
        </SimpleGrid>
        <Group
          spacing={'xl'}
          position={'right'}
          className={classes.modalButtons}
        >
          <Button
            ref={ref}
            onClick={() => {
              setOpenModal(false);
            }}
            variant="outline"
            color="red"
          >
            cancel
          </Button>

          <Button
            onClick={() => {
              setSaveImage(true);
              setOpenModal(false);
            }}
            variant="outline"
          >
            Save
          </Button>
        </Group>
      </Modal>
      <Button onClick={() => setOpenModal(true)}>Update Profile</Button>

      <Image
        ref={rootRef}
        imageRef={imageRef}
        src={''}
        width={200}
        height={120}
        alt="empty"
      />
    </div>
  );
};

export default UploadProfileComponent;
