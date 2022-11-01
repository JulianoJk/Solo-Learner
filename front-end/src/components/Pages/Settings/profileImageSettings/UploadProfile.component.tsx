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
import { DropzoneComponent } from '@noxyseras/react-ui-components';
import { FileWithPath } from '@mantine/dropzone';
import {
  useAccountSettingsDispatch,
  useAccountSettingsState,
} from '../../../../context/AccountSettingsContext';
import { saveProfileImageAfterReload } from '../../../../lib/dist';
const UploadProfileComponent = () => {
  const { classes } = useStyles();
  const [img, setImg] = useState('');
  const accountSettingsDispatch = useAccountSettingsDispatch();
  const { profileImage } = useAccountSettingsState();
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

  const fileChangedHandler = (file: any) => {
    let fileInput = false;
    if (file) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          file,
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
  useEffect(() => {
    saveProfileImageAfterReload(accountSettingsDispatch);
  }, []);
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
          maxSize={maxSizeImages}
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
            onClick={() => {
              setOpenModal(false);
              setFiles([]);
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
              accountSettingsDispatch({
                type: 'SET_PROFILE_IMAGE',
                profileImage: img,
              });
            }}
            disabled={files.length === 0 ? true : false}
            variant="filled"
            color="green"
          >
            Save
          </Button>
        </Group>
      </Modal>
      <Button onClick={() => setOpenModal(true)}>Update Profile</Button>
      <Button
        onClick={() => {
          console.log(profileImage);
        }}
        variant="outline"
      >
        Check context
      </Button>
      <Avatar
        className={classes.profileImage}
        radius={200}
        size={300}
        color={'cyan'}
        variant="filled"
        alt="profile-image"
        src={profileImage}
      />
    </div>
  );
};

export default UploadProfileComponent;
