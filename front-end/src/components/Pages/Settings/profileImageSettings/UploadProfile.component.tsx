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
  Center,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
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
import {
  COMMON_WHITE,
  LIGHTER_GRAY,
  LIGHT_NAVY,
} from '../../../../Theme/Theme';
import { AlertCircle } from 'tabler-icons-react';

const UploadProfileComponent = () => {
  const { classes } = useStyles();
  const [img, setImg] = useState('');
  const accountSettingsDispatch = useAccountSettingsDispatch();
  const { profileImage } = useAccountSettingsState();
  const user = useUserState();
  // TODO! Change this!
  // const maxSizeImages = 2 * 1024 ** 2;
  const maxSizeImages = 2;

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
      <Center key={index}>
        <Image
          src={img}
          width={200}
          height={250}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      </Center>
    );
  });

  useEffect(() => {
    saveProfileImageAfterReload(accountSettingsDispatch);
    // If multiple images uploaded, push it to array (it doesn't by default)
  }, []);

  const rejectedUpload = (rejectedFile: FileRejection[]) => {
    let errorsArray: string[] = [];
    let notificationMessage: string[] = [];
    let notificationTitle: string[] = [];

    rejectedFile.forEach(element => {
      element.errors.forEach(errorCode => {
        if (!errorsArray.includes(errorCode.code)) {
          errorsArray.push(errorCode.code);
        }
      });
    });
    if (rejectedFile.length > 1) {
      errorsArray.push('too-many-files');
    }

    errorsArray.forEach((code: any) => {
      if (code === 'file-invalid-type') {
        notificationTitle.push('Invalid file type.');
        notificationMessage.push(
          `Try uploading only .png, .jpg, .svg, .gif, .webp!`
        );
      } else if (code === 'file-too-large') {
        notificationTitle.push(`File too big.`);
        notificationMessage.push(`Image must not exceed ${maxSizeImages} MB!`);
      } else if (code === 'too-many-files') {
        notificationTitle.push(`Too many files.`);
        notificationMessage.push(`Upload only 1 image!`);
      }
    });

    for (let i = 0; errorsArray.length > i; i++) {
      showNotification({
        icon: <AlertCircle size={18} color={COMMON_WHITE} />,
        title: <Text color={COMMON_WHITE}>{notificationTitle[i]}</Text>,
        message: <Text color={COMMON_WHITE}>{notificationMessage[i]}</Text>,
        sx: { backgroundColor: LIGHT_NAVY, borderColor: LIGHT_NAVY },
        autoClose: 5000,
        color: 'red',
      });
    }
  };
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
            rejectedUpload(file);
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
  );
};

export default UploadProfileComponent;
function formatBytes(maxSizeImages: number) {
  throw new Error('Function not implemented.');
}
