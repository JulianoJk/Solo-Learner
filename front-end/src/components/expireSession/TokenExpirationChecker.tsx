import React, {useEffect, useState} from 'react'
import jwtDecode from 'jwt-decode'
import {Button, Center, Modal, Title} from '@mantine/core'
import {useLocation, useNavigate} from 'react-router-dom'
import {isUserLoggedIn} from '../../lib/dist'
import Login from '../Auth/Login/Login'
import {useDisclosure} from '@mantine/hooks'
import {useUserDispatch} from '../../context/UserContext'
const TokenExpirationChecker = () => {
  const [isExpired, setIsExpired] = useState<boolean>(false)
  const [openedModal, handlers] = useDisclosure(false)
  const location = useLocation() // <-- get current location being accessed
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      const decoded: any = jwtDecode(token)
      const expirationTime = decoded.exp * 1000 // the exp claim is in hours, so convert it to milliseconds(for ms, remove the *60*60)
      const currentTime = Date.now()
      if (isUserLoggedIn() === true && currentTime > expirationTime) {
        setIsExpired(true)
        handlers.open()
      } else if (isUserLoggedIn() === true && currentTime < expirationTime) {
        handlers.close()
      }
    }
  }, [])
  const logOut = () => {
    userDispatch({type: 'RESET_STATE'})
    navigate('/')
  }
  if (isExpired) {
    return (
      <Modal
        transition="fade"
        centered
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={openedModal}
        onClose={() => {
          return
        }}
        overlayBlur={4}
        withCloseButton={false}
      >
        <Center>
          <Title size="md">
            Session expired. Please log in again to continue!
          </Title>
        </Center>

        <Login
          switchToRegister={false}
          pathToNavigateAfterLogin={location.pathname}
          refreshPageAfterLogin={true}
        />
        <Button onClick={logOut}>Logout</Button>
      </Modal>
    )
  }

  return null
}

export default TokenExpirationChecker
