import React from "react"
import styled from "styled-components"
import useUser from "../../../hooks/useUser"

const ProfileIconWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 50%;
  display: flex;
  height: 50px;
  justify-content: center;
  width: 50px;
`

export const ProfileIcon = () => {
  const loggedInUser = useUser()
  return (
    <ProfileIconWrapper>
      {loggedInUser.email.substring(0, 1).toUpperCase()}
    </ProfileIconWrapper>
  )
}
