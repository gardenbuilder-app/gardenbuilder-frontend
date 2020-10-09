import { useState } from "react"

/**
 * Update state by making a dummy state variable and updating it
 */
export function useForceUpdate() {
  //eslint-disable-next-line
  const [value, setValue] = useState(0)
  return () => setValue((value) => ++value)
}
