import {
  Group,
  Button,
  Text,
  TextInput,
  NumberInput,
  PasswordInput,
  Code,
  Modal,
} from '@mantine/core'
import {openConfirmModal, closeAllModals} from '@mantine/modals'
import {IconCheck, IconMail, IconLock, IconEye, IconEyeOff} from '@tabler/icons'
import {isEmail, isInRange, useForm} from '@mantine/form'
import {notificationAlert} from '../../../notifications/NotificationAlert'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import {useStyles} from './DeleteAccount.styles'
import {useState} from 'react'
import MantineDemo from './DeleteAccount'

export default function Demo() {
  const navigate: NavigateFunction = useNavigate()
  const {classes} = useStyles()
  const [opened, setOpened] = useState<boolean>(false)

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: isEmail(),
      password: isInRange({min: 6, max: 30}, 'Value must be between 10 and 20'),
    },
  })

  const onEmailChange = (e: React.BaseSyntheticEvent): void => {
    form.setFieldValue('email', e.target.value)
  }
  const onPasswordChange = (e: React.BaseSyntheticEvent): void => {
    form.setFieldValue('password', e.target.value)
  }

  const handleInputs = (e: React.BaseSyntheticEvent) => {
    e.preventDefault()

    console.log(form.values)
  }
  const formContainer = (
    <>
      <form onSubmit={handleInputs}>
        <TextInput
          required
          mt="sm"
          icon={<IconMail />}
          label={<span className={classes.inputLabels}>Email:</span>}
          placeholder="Email"
          // onChange={onEmailChange}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          icon={<IconLock />}
          required
          label={<span className={classes.inputLabels}>Password:</span>}
          placeholder="Password"
          visibilityToggleIcon={({reveal}) =>
            reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
          }
          autoComplete="on"
          // onChange={onPasswordChange}
          {...form.getInputProps('password')}
        />
      </form>
    </>
  )
}

// openConfirmModal({
//   title: "Are you sure?",
//   closeOnConfirm: false,
//   labels: { confirm: "Yes, proceed", cancel: "Cancel" },
//   color: "red",

//   children: (
//     <Text size="md">
//       Are you sure you want to delete your account? This action is
//       invertible!
//     </Text>
//   ),
//   onConfirm: () =>
//     openConfirmModal({
//       title: "Delete Account",
//       labels: {
//         confirm: "Delete Account",
//         cancel: "No, don't delete it",
//       },
//       closeOnConfirm: true,
//       confirmProps: { color: "red" },
//       children: formContainer,
//       onConfirm: handleConfirm,
//       onCancel: closeAllModals,
//     }),
// })
// }
