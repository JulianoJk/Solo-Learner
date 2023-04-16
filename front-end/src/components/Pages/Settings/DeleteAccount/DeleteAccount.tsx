import React from 'react'
import {useForm, isEmail, hasLength} from '@mantine/form'
import {
  Button,
  Group,
  TextInput,
  Box,
  PasswordInput,
  Modal,
} from '@mantine/core'
import {AppDispatch} from '../../../../context/AppContext'
import {useState} from 'react'
import {notificationAlert} from '../../../notifications/NotificationAlert'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import {deleteAccountAPI} from '../../../api/api'
import {useUserDispatch} from '../../../../context/UserContext'
import {IconLock, IconEye, IconEyeOff, IconMoodSad} from '@tabler/icons'
import {IApiError, IDeleteAccount} from '../../../../Model/UserModels'

export default function MantineDemo() {
  const navigate: NavigateFunction = useNavigate()
  const appDispatch = AppDispatch()
  const [opened, setOpened] = useState<boolean>(false)
  const userDispatch = useUserDispatch()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({min: 6, max: 30}, 'Value must be between 6 and 30'),
    },
  })

  const logOut = (messageToUser: string) => {
    notificationAlert({
      title: 'Account Deleted.',
      message: messageToUser,
      iconColor: 'red',
      closeAfter: 5000,
      icon: <IconMoodSad color="yellow" size={18} />,
    })
    userDispatch({type: 'RESET_STATE'})
    navigate('/')
  }
  // const {mutate: deleteAccount, isLoading} = useMutation(deleteAccountAPI, {
  const {mutate: deleteAccount} = useMutation(deleteAccountAPI, {
    onSuccess: (data: IDeleteAccount | IApiError) => {
      if (typeof data === 'object' && 'error' in data) {
        // handle the error case
        appDispatch({
          type: 'SET_ERROR_ALERT_MESSAGE',
          errorAlertMessage: data.error.message,
        })
      } else {
        logOut(data.message)
      }
    },
  })

  const handleInput = async (email: string, password: string) => {
    try {
      const token = localStorage.getItem('jwtToken')

      if (!form.validate().hasErrors) {
        deleteAccount({token, email, password})
      }
      return
    } catch (error) {
      console.warn(error)
      return
    }
  }

  return (
    <>
      <Modal
        title="Delete your profile"
        transition="fade"
        centered
        transitionDuration={100}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => {
          setOpened(false)
        }}
        overlayBlur={4}
        withCloseButton={false}
      >
        <Box maw={300} mx="auto">
          <form
            onSubmit={form.onSubmit(values => {
              handleInput(values.email, values.password)
            })}
          >
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              icon={<IconLock />}
              required
              label={<span>Password:</span>}
              placeholder="Password"
              visibilityToggleIcon={({reveal}) =>
                reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
              }
              autoComplete="on"
              // onChange={onPasswordChange}
              {...form.getInputProps('password')}
            />

            <Group position="right" mt="md">
              <Button onClick={() => setOpened(false)} color={'gray'}>
                No don't delete it
              </Button>
              <Button type="submit" color={'red'}>
                Confirm
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)} color={'red'}>
          Delete Account
        </Button>
      </Group>
    </>
  )
}
