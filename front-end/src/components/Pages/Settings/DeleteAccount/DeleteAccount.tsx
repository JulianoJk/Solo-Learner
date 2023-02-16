import React, {useState} from 'react'
import {
  Modal,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Center,
  Text,
} from '@mantine/core'
import {Mail, Lock, MoodSad} from 'tabler-icons-react'
import {deleteAccountAPI} from '../../../api/api'
import {useMutation} from '@tanstack/react-query'
import {isUndefinedOrNullString} from '../../../../lib/dist'
import {useStyles} from './DeleteAccount.styles'
import {LIGHT_NAVY} from '../../../../Theme/Styles'
import {useUserDispatch, useUserState} from '../../../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import {showNotification} from '@mantine/notifications'
import {openConfirmModal, closeAllModals} from '@mantine/modals'

const DeleteAccount = () => {
  const {classes} = useStyles()
  const [opened, setOpened] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {user} = useUserState()
  const navigate = useNavigate()
  const userDispatch = useUserDispatch()

  const id = !isUndefinedOrNullString(user.id) ? user.id : undefined

  const {mutate: deleteAccount, isLoading} = useMutation(deleteAccountAPI, {
    onSuccess: data => {
      showNotification({
        id: 'deletedAccount',
        message: data,
        autoClose: 6000,
        // style: { backgroundColor: LIGHT_NAVY, border: "1px solid black" },
        className: classes.notification,
        icon: <MoodSad />,
      })

      userDispatch({type: 'RESET_STATE'})
      navigate('/')
    },
  })
  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    setEmail(e.target.value)
  }
  const onPasswordChange = (e: React.BaseSyntheticEvent): void => {
    setPassword(e.target.value)
  }

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    try {
      deleteAccount({id, email, password})
    } catch (error) {
      console.warn(error)
    }
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete account"
        styles={{modal: {backgroundColor: LIGHT_NAVY}}}
      >
        <Center>
          <h1>
            Are you sure you want to delete your account? If yes, please fill
          </h1>
        </Center>
        <form onSubmit={handleInputs} className={classes.form}>
          <TextInput
            icon={<Mail />}
            required
            type="email"
            label={<span className={classes.inputLabels}>Email:</span>}
            placeholder="name@example.com"
            value={email}
            onChange={onEmailChange}
            autoComplete="on"
          />

          <PasswordInput
            icon={<Lock />}
            required
            label={<span className={classes.inputLabels}>Password:</span>}
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            autoComplete="on"
          />
          <Button
            color="cyan"
            type="submit"
            className={classes.submitButton}
            loading={isLoading}
            uppercase
          >
            Delete
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button
          onClick={() =>
            openConfirmModal({
              title: 'Are you sure?',
              closeOnConfirm: false,
              labels: {confirm: 'Yes, proceed', cancel: 'Cancel'},
              color: 'red',

              children: (
                <Text size="md">
                  Are you sure you want to delete your account? This action is
                  invertible!
                </Text>
              ),
              onConfirm: () =>
                openConfirmModal({
                  title: 'Delete Account',
                  labels: {
                    confirm: 'Delete Account',
                    cancel: "No, don't delete it",
                  },
                  closeOnConfirm: true,
                  confirmProps: {color: 'red'},
                  children: (
                    <>
                      <TextInput
                        icon={<Mail />}
                        required
                        type="email"
                        label={
                          <span className={classes.inputLabels}>Email:</span>
                        }
                        placeholder="name@example.com"
                        value={email}
                        onChange={onEmailChange}
                        autoComplete="on"
                      />

                      <PasswordInput
                        icon={<Lock />}
                        required
                        label={
                          <span className={classes.inputLabels}>Password:</span>
                        }
                        placeholder="Password"
                        value={password}
                        onChange={onPasswordChange}
                        autoComplete="on"
                      />

                      <Text size="sm">
                        Are you sure you want to delete your profile? This
                        action is destructive!
                      </Text>
                    </>
                  ),
                  onConfirm: closeAllModals,
                  onCancel: closeAllModals,
                }),
            })
          }
          color={'red'}
        >
          Delete Account
        </Button>
      </Group>
    </>
  )
}
export default DeleteAccount
