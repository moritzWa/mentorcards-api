import React from "react"

import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"

import "semantic-ui-css/semantic.min.css"
import "./App.css"

import MenuBarTop from "./components/MenuBarTop"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <Router className="App">
      {/* or <div class='ui container' ... */}
      <Container>
        <MenuBarTop />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Container>
    </Router>
  )
}

export default App
