import React, { Component, createContext } from 'react'
import Home from './containers/Home'
import { BrowserRouter, Route } from 'react-router-dom'
import Create from './containers/Create'
import { flatternArray, ID, getYearAndMonth } from './utility'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export const AppContext = createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: getYearAndMonth(),
      items: {},
      categories: {},
      isLoading: false,
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true,
        })
        return cb(...args)
      }
    }
    this.actions = {
      initData: withLoading(() => {
        const { currentDate } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const promiseArray = [
          axios.get('/categories'),
          axios.get(getURLWithData),
        ]
        Promise.all(promiseArray).then((res) => {
          const [categories, items] = res
          this.setState({
            items: flatternArray(items.data),
            isLoading: false,
            categories: flatternArray(categories.data),
          })
        })
      }),
      selectNewMonth: withLoading((year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        axios.get(getURLWithData).then((res) => {
          this.setState({
            items: flatternArray(res.data),
            currentDate: { year, month },
            isLoading: false,
          })
        })
      }),
      deleteItem: withLoading((item) => {
        axios.delete(`/items/${item.id}`).then(() => {
          delete this.state.items[item.id]
          this.setState({
            items: this.state.items,
            isLoading: false,
          })
        })
      }),
      createItem: (item, id) => {
        const newId = ID()
        const parsedDate = getYearAndMonth(item.date)
        item.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        item.timestamp = new Date(item.date).getTime()
        const newItem = { ...item, id: newId, cid: id }
        axios.post(`/items`, newItem).then(() => {
          this.setState({
            items: { [newId]: newItem, ...this.state.items },
          })
        })
      },
      updateItem: (item, id) => {
        const newItem = {
          ...item,
          cid: id,
          timestamp: new Date(item.date).getTime(),
        }
        axios.put(`/items/${item.id}`, newItem).then(() => {
          this.setState({
            items: { ...this.state.items, [item.id]: newItem },
          })
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
