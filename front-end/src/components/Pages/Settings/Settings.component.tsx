import {Title} from '@mantine/core'
import React from 'react'

import DeleteAccount from './DeleteAccount/DeleteAccount'
import UploadProfileComponent from './profileImageSettings/UploadProfile.component'

const SettingsComponent = () => {
  return (
    <>
      <Title>Settings</Title>
      <UploadProfileComponent />
      <DeleteAccount />
    </>
  )
}

export default SettingsComponent
