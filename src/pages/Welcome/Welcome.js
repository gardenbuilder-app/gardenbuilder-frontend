import React from "react"
import {Link} from 'react-router-dom'
// import styled from 'styled-components'


// const Center = styled.div`
//   margin-left: 4rem;
// `;

export function Welcome() {
  return (
    <div>
      <h2>Welcome to Gardenbuilder</h2>
      <p>In order to get started, please 
          <Link to="/gardens">make a garden</Link> 
      </p>
    </div>
  )
}
