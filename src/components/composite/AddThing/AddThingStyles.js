import styled from "styled-components"
import { colors } from "styles/global"

const AddGardenStyles = styled.div`
  #visible-toggler {
    transition: all 1s;
  }
  .add-form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media (max-width: 700px) {
      padding: 0 0 0 1rem;
    }
  }
  #desktop-submit {
    border: none;
    width: 5rem;
    height: 50px;
    border-radius: 5px;
    background: ${colors.accent};
    margin: 21px 1rem 1rem 2rem;
    padding: 1rem;
    @media (max-width: 700px) {
      display: none;
    }
  }
  #mobile-submit {
    border: none;
    background-color: inherit;
    width: 5rem;
    height: 50px;
    margin: 21px 0 1rem 1rem;
    display: none;
    @media (max-width: 700px) {
      display: block;
    }
  }
`

export default AddGardenStyles
