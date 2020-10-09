import React from "react"
import { Input } from "./Input/Input"
import styled from "styled-components"
import { sentenceCase } from "libs"

const SectionWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0 auto 1rem;
  width: 100%;
`

export const InputSection = React.forwardRef(
  ({ autofocus, name, value, setValue, type }, ref) => (
    <SectionWrapper>
      <label htmlFor={name}>{sentenceCase(name)}</label>
      <Input ref={ref} name={name} value={value} setValue={setValue} type={type} />
    </SectionWrapper>
  )
)
