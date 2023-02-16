import React, {useState} from 'react'
import {Button, Group, Modal, Text, Title, useMantineTheme} from '@mantine/core'
import {useNavigate} from 'react-router-dom'
import PageNotFoundImage from '../../../images/PageNotFoundImage'
import {useStyles} from './PageNotFound.styles'
interface IPops {
  bodyText?: string
  navText?: string
  statusNumber?: number
  btnText?: string
  navigationPath: string
}

const PageNotFound: React.FC<IPops> = ({
  bodyText: text,
  navText,
  btnText,
  navigationPath,
}) => {
  const navigate = useNavigate()
  const [opened, setOpened] = useState<boolean>(true)
  const {classes} = useStyles()
  const theme = useMantineTheme()

  return (
    <div>
      <Modal
        styles={{
          modal: {
            backgroundColor:
              theme.colorScheme === 'light' ? '#FFFFFF' : '#444654',
            color: 'red',
          },
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        withCloseButton={false}
        onClose={() => setOpened(true)}
        title={
          <Title order={1} className={classes.navigation}>
            {navText}
          </Title>
        }
        size="lg"
        radius={30}
      >
        <PageNotFoundImage />
        <Text align="center">{text}</Text>
        <Group position="center">
          <Button
            className={classes.goBackButton}
            radius="md"
            size="lg"
            fullWidth
            onClick={() => navigate(navigationPath)}
          >
            {btnText}
          </Button>
        </Group>
      </Modal>
    </div>
  )
}

export default PageNotFound
