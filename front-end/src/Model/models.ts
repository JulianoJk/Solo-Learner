import React from 'react'

// *** State ***
export interface AccountSettingsInterface {
  profileImage: string
}

// Interface for the ContextProvider children
export interface IChildrenProvider {
  children: React.ReactNode
}

export interface ISvgImages {
  width?: number | string
  height?: number | string
  className?: string
  radius?: number | string
}
