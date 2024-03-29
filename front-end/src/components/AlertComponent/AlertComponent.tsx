import React from 'react'
import {Alert, Center, Text, Title} from '@mantine/core'
import {IconAlertCircle} from '@tabler/icons'

import {useStyles} from './Alert.styles'
import {isUndefinedOrNullString} from '../../lib/dist'

interface IProps {
  message: string | null | undefined
}
export const AlertComponent: React.FC<IProps> = ({message}) => {
  const hasError: boolean = isUndefinedOrNullString(message)

  const {classes} = useStyles()
  return (
    <Center>
      {!hasError ? (
        <>
          <Alert
            icon={<IconAlertCircle strokeWidth={3} />}
            title={<Title order={4}>Oh no!</Title>}
            radius="lg"
            className={classes.alertBox}
          >
            <Text weight={500} size="lg">
              {message}
            </Text>
          </Alert>
        </>
      ) : (
        <></>
      )}
    </Center>
  )
}
