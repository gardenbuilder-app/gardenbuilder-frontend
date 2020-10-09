import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const ProfileIconWrapper = styled(Link)`
  align-items: center;
  background-color: white;
  border 3px solid black;
  border-radius: 50%;
  color: black;
  display: flex;
  height: 50px;
  justify-content: center;
  text-decoration: none;
  width: 50px;
  &:hover {
    opacity: .8;
  }
`

export const ProfileIcon = () => {
  return <ProfileIconWrapper to="/profile">Profile</ProfileIconWrapper>
}
