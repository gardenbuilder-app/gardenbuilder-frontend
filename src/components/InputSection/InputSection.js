import React from "react"
import { Input } from "./Input/Input"
import styled from "styled-components"
import { sentenceCase } from "../../libs"

const SectionWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0 auto 1rem;
  width: 100%;
`

export function InputSection({ name, value, setValue }) {
  return (
    <SectionWrapper>
      <label htmlFor={name}>{sentenceCase(name)}</label>
      <Input name={name} value={value} setValue={setValue} />
    </SectionWrapper>
  )
}
