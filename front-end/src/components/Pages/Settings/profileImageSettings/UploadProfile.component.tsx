import { useEffect, useState } from 'react';
import {
  Text,
  Image,
  Avatar,
  Modal,
  Button,
  Group,
  Title,
  SimpleGrid,
} from '@mantine/core';
import { useStyles } from './UploadProfile.styles';
import { useLocalStorage } from '@mantine/hooks';
import { DropzoneComponent } from '@noxyseras/react-ui-components';
import { FileWithPath } from '@mantine/dropzone';
const UploadProfileComponent = () => {
  const { classes } = useStyles();
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

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Image
        key={index}
        src={imageUrl}
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
          <Text>Drop images here</Text>
        </DropzoneComponent>
        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
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
      <Text>Profile picture</Text>
      {/* <Avatar
        className={classes.profileImage}
        radius={200}
        size={200}
        color={"cyan"}
        variant="filled"
        alt="profile-image"
        src={value}
      /> */}
      )
    </div>
  );
};

export default UploadProfileComponent;
