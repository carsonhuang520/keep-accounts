import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import TotalPrice from './components/TotalPrice'
import MonthPicker from './components/MonthPicker'
import CreateBtn from './components/CreateBtn'
import { LIST_VIEW, CHART_VIEW } from './utility'
import React, { Component } from 'react'

const items = [
  {
    id: '1',
    title: '吃饭',
    price: 200,
    date: '2020-10-10',
    category: {
      id: '1',
      name: '消费',
      type: 'outcome',
      iconName: 'ios-construct-outline',
    },
  },
  {
    id: '2',
    title: '吃饭',
    price: 200,
    date: '2020-10-10',
    category: {
      id: '1',
      name: '消费',
      type: 'outcome',
      iconName: 'ios-construct-outline',
    },
  },
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: LIST_VIEW,
      year: 2020,
      month: 11,
    }
  }
  changeDate = (year, month) => {
    this.setState({
      year,
      month,
    })
  }
  changeTab = (view) => {
    this.setState({
      activeTab: view,
    })
  }
  render() {
    const { year, month, activeTab } = this.state
    return (
      <div>
        <PriceList
          items={items}
          onModifyItem={(item) => {
            alert(item.id)
          }}
          onDeleteItem={(item) => {
            alert(item.id)
          }}
        />
        <TotalPrice income={2000} outcome={1000} />
        <ViewTab
          activeTab={activeTab}
          onTabChange={(view) => this.changeTab(view)}
        />
        <CreateBtn
          onClick={() => {
            console.log('ll')
          }}
        />
        <MonthPicker
          year={year}
          month={month}
          onChange={(year, month) => this.changeDate(year, month)}
        />
      </div>
    )
  }
}

export default App
