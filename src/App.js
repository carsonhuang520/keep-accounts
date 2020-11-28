import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { Component } from 'react'
import Home from './containers/Home'
import { BrowserRouter, Route } from 'react-router-dom'
import Create from './containers/Create'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Create} />
          <Route path="/home" component={Home} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
