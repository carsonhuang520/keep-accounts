import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { Component, createContext } from 'react'
import Home from './containers/Home'
import { BrowserRouter, Route } from 'react-router-dom'
import Create from './containers/Create'
import { testCategories, testItems } from './testData'
import { flatternArray, ID, getYearAndMonth } from './utility'

export const AppContext = createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flatternArray(testItems),
      categories: flatternArray(testCategories),
    }
    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items,
        })
      },
      createItem: (item, id) => {
        const newId = ID()
        const parsedDate = getYearAndMonth(item.date)
        item.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        item.timestamp = new Date(item.date).getTime()
        const newItem = { ...item, id: newId, cid: id }
        this.setState({
          items: { [newId]: newItem, ...this.state.items },
        })
      },
      updateItem: (item, id) => {
        const newItem = {
          ...item,
          cid: id,
          timestamp: new Date(item.date).getTime(),
        }
        this.setState({
          items: { ...this.state.items, [item.id]: newItem },
        })
      },
    }
  }
  render() {
    return (
      <AppContext.Provider value={{ state: this.state, actions: this.actions }}>
        <div className="App">
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/update/:id" component={Create} />
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
