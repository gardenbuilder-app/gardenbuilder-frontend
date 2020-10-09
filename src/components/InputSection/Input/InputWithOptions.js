import React, { useState } from "react"
import styled from "styled-components"
import { colors } from "styles/global"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

const StyledInput = styled.input`
  font-family: inherit;
  font-size: 100%;
  height: 3rem;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  padding: 0 0 0 1rem;
`

const StyledUl = styled.ul`
  border: 1px solid #999;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 250px;
  overflow-y: auto;
  padding: 0.5rem 1rem 1rem;
  transform: translate(-2px);
  margin-right: -1rem;
`

const StyledLi = styled.li`
  padding-top: 0.5rem;
`

const StyledArrowIconDown = styled(FaAngleDown)`
  color: ${colors.black};
  font-size: 120%;
  margin-left: -2rem;
  margin-bottom: -0.25rem;
`
const StyledArrowIconUp = styled(FaAngleUp)`
  color: ${colors.black};
  font-size: 120%;
  margin-left: -2rem;
  margin-bottom: -0.25rem;
`

const InputWrapper = styled.div``

/**
 * Input
 * @param { options } list of items that will auto-populate as suggestions
 */
export function InputWithOptions({ options }) {
  const [userInput, setUserInput] = useState(undefined)
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState([])
  const [activeOption, setActiveOption] = useState(0)
  const [arrowIconDirection, setArrowIconDirection] = useState("down")

  /**
   * Event that's fired when input changes
   */
  function onChange(event) {
    const userInput = event.target.value
    setShowDropdown(true)

    // filter out suggestions that don't contain input
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )
    setFilteredOptions(filteredOptions)
    setUserInput(userInput)
  }

  /**
   *  Event fired when the user clicks on a suggestion
   */
  function onClick(event) {
    setActiveOption(0)
    setFilteredOptions([])
    setUserInput(event.target.innerText)
    setShowDropdown(false)
  }

  /**
   * Event fired when user clicks on input
   */
  function onArrowClick(event) {
    if (userInput === undefined || userInput.length === 0) {
      setUserInput("")
    }
    if (filteredOptions.length === 0) {
      setFilteredOptions(options)
    }
    setShowDropdown(!showDropdown)
    setArrowIconDirection(arrowIconDirection === "up" ? "down" : "up")
  }

  // Event fired when the user presses a key down
  function onKeyDown(event) {
    // Don't let component rerender
    // User pressed the enter key, update the input and close the
    // suggestions
    if (event.keyCode === 13) {
      event.preventDefault()
      setActiveOption(0)
      setShowDropdown(false)
      setUserInput(filteredOptions[activeOption])
    }
    // User pressed the up arrow, decrement the index
    else if (event.keyCode === 38) {
      if (activeOption === 0) {
        return
      }
      setActiveOption(activeOption - 1)
    }
    // User pressed the down arrow, increment the index
    else if (event.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return
      }

      setActiveOption(activeOption + 1)
    }
  }

  /**
   * Dropdown component
   */
  let dropdown

  if (userInput !== undefined && showDropdown) {
    // define element
    dropdown = (
      <StyledUl>
        {filteredOptions.map((option, index) => {
          /**
           * Conditionally add style to element
           */
          if (index === activeOption) {
            const ActiveLi = styled(StyledLi)`
              color: pink;
            `
            return (
              <ActiveLi key={option} onClick={onClick}>
                {option}
              </ActiveLi>
            )
          } else {
            return (
              <StyledLi key={option} onClick={onClick}>
                {option}
              </StyledLi>
            )
          }
        })}
      </StyledUl>
    )
  }

  /**
   * Get icon which is appropriately up or down
   */
  const arrowIcon =
    arrowIconDirection === "down" ? (
      <StyledArrowIconDown onClick={onArrowClick} />
    ) : (
      <StyledArrowIconUp onClick={onArrowClick} />
    )

  return (
    <InputWrapper>
      <StyledInput
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {arrowIcon}
      {dropdown}
    </InputWrapper>
  )
}
