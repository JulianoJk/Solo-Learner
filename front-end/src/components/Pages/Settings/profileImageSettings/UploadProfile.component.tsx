import { useEffect, useState } from 'react';
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
} from '@mantine/core';
import { useStyles } from './UploadProfile.styles';
import { Dropzone } from '@mantine/dropzone';
import { FileRejection, FileWithPath } from 'react-dropzone';
import {
  useAccountSettingsDispatch,
  useAccountSettingsState,
} from '../../../../context/AccountSettingsContext';
import { saveProfileImageAfterReload } from '../../../../lib/dist';
import { useUserState } from '../../../../context/UserContext';
import { sendImageToServerAPI } from '../../../api/api';
import { IconPhoto, IconX, IconUpload } from '@tabler/icons';
import { LIGHTER_GRAY } from '../../../../Theme/Theme';
import { NotificationsComponent } from '../../../notifications/Notifications.component';
const UploadProfileComponent = () => {
  const { classes } = useStyles();
  const [img, setImg] = useState('');
  const accountSettingsDispatch = useAccountSettingsDispatch();
  const { profileImage } = useAccountSettingsState();
  const user = useUserState();
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
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [rejectedFile, setRejectedFile] = useState<FileRejection[]>([]);
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
    console.log(rejectedFile);

    console.log(user.user.id);
  });
  return (
    <div>
      <Modal
        size={600}
        title={<Title>Upload profile image</Title>}
        opened={openModal}
        onClose={() => setOpenModal(false)}
        className={classes.modalRoot}
        overflow="inside"
      >
        <Dropzone
          onDrop={file => setFiles(file)}
          onReject={file => {
            setRejectedFile(file);
          }}
          accept={images}
          maxSize={maxSizeImages}
          useFsAccessApi={false}
          multiple={false}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 70, pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload size={50} stroke={1.5} color={LIGHTER_GRAY} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} stroke={1.5} color={LIGHTER_GRAY} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={50} stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
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
              setOpenModal(false);
              accountSettingsDispatch({
                type: 'SET_PROFILE_IMAGE',
                profileImage: img,
              });
              sendImageToServerAPI(files, user.user.id);
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
      {/* <Button onClick={() => NotificationsComponent()}>Update Profile</Button> */}
      <Avatar
        className={classes.profileImage}
        radius={200}
        size={200}
        color={'cyan'}
        variant="filled"
        alt="profile-image"
        src={profileImage}
      />
    </div>
    // TODO!: Add a notification alert to inform user of the status
  );
};

export default UploadProfileComponent;
