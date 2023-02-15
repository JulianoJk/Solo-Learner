import {useState} from 'react'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import {IUserInfoContext, usersDispatchContext} from '../../../Model/UserModels'

import AuthImage from '../../../images/Auth'

import {Link} from 'react-router-dom'
import {useUserDispatch} from '../../../context/UserContext'
import {
  PasswordInput,
  Button,
  Box,
  TextInput,
  Anchor,
  Center,
} from '@mantine/core'
import {AlertComponent} from '../../AlertComponent/AlertComponent'
import {loginAPI} from '../../api/api'
import {useStyles} from '../Auth.styles'
import {useMutation} from '@tanstack/react-query'
import {isUndefinedOrNullString} from '../../../lib/dist'
import {notificationAlert} from '../../notifications/NotificationAlert'
import {IconCheck, IconMail, IconLock, IconEye, IconEyeOff} from '@tabler/icons'

interface ILoginProps {
  loginImage?: React.ReactNode
  switchToRegister?: boolean
  pathToNavigateAfterLogin?: string
  refreshPageAfterLogin?: boolean
  showNotification?: boolean
}

const Login: React.FC<ILoginProps> = props => {
  const navigate: NavigateFunction = useNavigate()
  const {classes} = useStyles()
  const [errorMessage, setErrorMessage] = useState<any>()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const userDispatch: usersDispatchContext = useUserDispatch()
  const navigateTo =
    props.pathToNavigateAfterLogin !== undefined
      ? props.pathToNavigateAfterLogin
      : '/home'
  const {mutate: login, isLoading} = useMutation(loginAPI, {
    onSuccess: data => {
      const hasToken = !isUndefinedOrNullString(data?.token)

      if (typeof data?.message === 'string' || data instanceof String) {
        setErrorMessage(data?.message)
      } else if (!hasToken) {
        setErrorMessage('Something went wrong...')
      } else if (hasToken) {
        const user: IUserInfoContext = {
          id: data?.id,
          username: data?.username,
          token: data?.token,
        }
        props.refreshPageAfterLogin === true ? window.location.reload() : ''
        userDispatch({type: 'SET_USER', user: user})
        navigate(navigateTo)
        props.showNotification === false ? (
          <></>
        ) : (
          notificationAlert({
            title: 'Login Successful!',
            message: "Great to see you! You're all set to go.",
            icon: <IconCheck size={18} />,
            iconColor: 'teal',
          })
        )
      }
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
      login({email, password})
      return
    } catch (error) {
      console.warn(error)
      return
    }
  }

  return (
    <Box sx={{maxWidth: 600}} mx="auto" className={classes.formContainer}>
      <Center>{props.loginImage ?? <AuthImage />}</Center>
      <h1 className={classes.title}>Sign-In</h1>
      <form onSubmit={handleInputs} className={classes.form}>
        <TextInput
          icon={<IconMail />}
          required
          type="email"
          label={<span className={classes.inputLabels}>Email:</span>}
          placeholder="name@example.com"
          value={email}
          onChange={onEmailChange}
          autoComplete="on"
        />

        <PasswordInput
          icon={<IconLock />}
          required
          label={<span className={classes.inputLabels}>Password:</span>}
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          visibilityToggleIcon={({reveal}) =>
            reveal ? <IconEyeOff size={16} /> : <IconEye size={16} />
          }
          autoComplete="on"
        />
        <Button
          color="cyan"
          type="submit"
          className={classes.submitButton}
          loading={isLoading}
          uppercase
        >
          Login
        </Button>

        {/*Display error message if any*/}
        <AlertComponent message={errorMessage} />
      </form>
      {props.switchToRegister === false ? (
        <></>
      ) : (
        <span className={classes.switchAuthLinks}>
          New to Solo Learner?
          <Anchor
            component={Link}
            to="/register"
            className={classes.switchAuthLinkAnchor}
          >
            Create an account
          </Anchor>
        </span>
      )}
    </Box>
  )
}
export default Login
