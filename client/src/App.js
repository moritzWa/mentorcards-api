import React from "react"

import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"

import "semantic-ui-css/semantic.min.css"
import "./App.css"

import { AuthProvider } from "./context/auth"
import AuthRoute from "./util/AuthRoute"

import MenuBarTop from "./components/MenuBarTop"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SingleQuote from "./pages/SingleQuote"

function App() {
  return (
    <AuthProvider>
      <Router className="App">
        {/* or <div class='ui container' ... */}
        <Container>
          <MenuBarTop />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/quotes/:quoteId" component={SingleQuote} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
