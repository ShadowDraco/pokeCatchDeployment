import axios from "axios"
import { useState, useContext } from "react"

import { RequestContext } from "../../../App"

import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export default function SignupForm() {
  const { setPlayingAnimation, setSpinnerVariant } = useContext(RequestContext)

  const [currentUsername, setCurrentUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [successfulSignup, setSuccessfulSignUp] = useState()

  function changeUsername(e) {
    setCurrentUsername(e.target.value)
  }

  function changePassword(e) {
    setCurrentPassword(e.target.value)
  }

  async function submitSignup(e) {
    e.preventDefault()
    setPlayingAnimation(true)

    try {
      setSpinnerVariant("success")
      await axios
        .post("https://poke-catch.herokuapp.com//user/signup", {
          username: currentUsername,
          password: currentPassword,
        })
        .then(res => {
          console.log(res.data)
          res.data.status === "Success!"
            ? setSuccessfulSignUp(true)
            : setSuccessfulSignUp(false)
          setPlayingAnimation(false)
        })
    } catch (error) {
      console.log("error signing up user", error)
      setSpinnerVariant("danger") // set spinner to red

      // allow the spinner to go for 2 seconds then stop
      setTimeout(() => {
        setPlayingAnimation(false)
      }, 2000)
    }
  }

  return (
    <Form>
      <Form.Group className="mb-2" controlId="SignupUsername">
        <Form.Label className="text-light">Username:</Form.Label>
        <Form.Control
          onChange={changeUsername}
          type="username"
          placeholder="Enter your unique username"
        />
        <Form.Text className="text-muted">
          This name is all your own creation!
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-2" controlId="SignupPassword">
        <Form.Label className="text-light">Password:</Form.Label>
        <Form.Control
          onChange={changePassword}
          type="password"
          placeholder="Enter your unique password"
        />
        <Form.Text className="text-warning">
          Do not use passwords that you use in other places!
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitSignup}>
        Submit
      </Button>

      {successfulSignup ? (
        successfulSignup === true ? (
          <p className="text-success">Success</p>
        ) : (
          <p className="text-danger">
            Something went wrong with your sign up :/
          </p>
        )
      ) : (
        ""
      )}
    </Form>
  )
}
