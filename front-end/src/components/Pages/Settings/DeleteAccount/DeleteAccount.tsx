import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from '@mantine/form'
import {
  Button,
  Group,
  TextInput,
  NumberInput,
  Box,
  PasswordInput,
  Modal,
} from '@mantine/core'
import {AppDispatch} from '../../../../context/AppContext'
import {useState} from 'react'
import {notificationAlert} from '../../../notifications/NotificationAlert'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import {isUndefinedOrNullString} from '../../../../lib/dist'
import {deleteAccountAPI} from '../../../api/api'
import {IUserInfoContext} from '../../../../Model/UserModels'
import {useUserDispatch, useUserState} from '../../../../context/UserContext'

export default function MantineDemo() {
  const navigate: NavigateFunction = useNavigate()
  const appDispatch = AppDispatch()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [opened, setOpened] = useState<boolean>(false)
  const {user} = useUserState()
  const userDispatch = useUserDispatch()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      password: hasLength(
        {min: 6, max: 60},
        'Password must be at least 6 characters!',
      ),
    },
  })
  const logOut = () => {
    notificationAlert({
      title: 'Account Deleted.',
      message: "We're sorry to see you go:(. ",
      iconColor: 'red',
      closeAfter: 3000,
    })
    userDispatch({type: 'RESET_STATE'})
    navigate('/')
  }
  const {mutate: deleteAccount, isLoading} = useMutation(deleteAccountAPI, {
    onSuccess: data => {
      const hasToken = !isUndefinedOrNullString(data?.token)

      if (typeof data?.message === 'string' || data instanceof String) {
        setErrorMessage(data?.message)
      } else if (!hasToken) {
        setErrorMessage('Something went wrong...')
      } else {
        logOut()
      }
    },
  })

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    try {
      const {email, password} = form.values
      const {token} = user
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
        <Box component="form" maw={400} mx="auto">
          <form onSubmit={handleInputs}>
            <TextInput
              label="Email: "
              placeholder="test@email.com"
              withAsterisk
              mt="md"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password: "
              withAsterisk
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
