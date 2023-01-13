import { useContext } from "react"

import Button from "react-bootstrap/Button"

import { UserContext, RequestContext } from "../../App"

export default function SaveUserButton() {
  const { currentUser } = useContext(UserContext)

  const { setPlayingAnimation, setSpinnerVariant } = useContext(RequestContext)

  async function saveUser() {
    setPlayingAnimation(true)
    // add the current user to the session storage of the browser
    try {
      console.log("saving user")
      setSpinnerVariant("success") // change spinner to green
      sessionStorage.setItem("PLAYER", JSON.stringify(currentUser))
      // allow the spinner to go for 1 second then turn off
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 1000)
    } catch (error) {
      console.log("error while saving", error)
      setSpinnerVariant("danger") // set spinner to red
      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  return (
    <Button className="btn-info" onClick={saveUser}>
      Save!
    </Button>
  )
}
