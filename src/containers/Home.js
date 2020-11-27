import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { LIST_VIEW, INCOME, getYearAndMonth, padLeft } from '../utility'

const items = [
  {
    id: '1',
    title: '吃饭',
    price: 200,
    date: '2020-08-10',
    cid: '1',
  },
  {
    id: '2',
    title: '吃饭',
    price: 200,
    date: '2020-09-10',
    cid: '1',
  },
  {
    id: '3',
    title: '工资',
    price: 1200,
    date: '2020-11-10',
    cid: '2',
  },
]

const categories = {
  1: {
    id: '1',
    name: '消费',
    type: 'outcome',
    iconName: 'ios-construct-outline',
  },
  2: {
    id: '1',
    name: '收入',
    type: 'income',
    iconName: 'ios-construct-outline',
  },
}

const newItem = {
  id: '4',
  title: '理发',
  price: 30,
  date: '2020-11-10',
  cid: '1',
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items,
      activeTab: LIST_VIEW,
      currentDate: getYearAndMonth(),
    }
  }
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month },
    })
  }
  changeTab = (view) => {
    this.setState({
      activeTab: view,
    })
  }
  addItem = () => {
    this.setState({
      items: [newItem, ...this.state.items],
    })
  }
  deleteItem = (item) => {
    const newItems = this.state.items.filter((e) => e.id !== item.id)
    this.setState({
      items: newItems,
    })
  }
  modifyItem = (item) => {
    const newItems = this.state.items.map((e) => {
      if (e.id === item.id) {
        return { ...e, title: '更新后的item' }
      } else {
        return e
      }
    })
    this.setState({
      items: newItems,
    })
  }
  render() {
    const { currentDate, activeTab, items } = this.state
    const itemsWithCategory = items
      .map((item) => {
        item.category = categories[item.cid]
        return item
      })
      .filter((item) =>
        item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
      )
    let outcome = 0
    let income = 0
    itemsWithCategory.forEach((item) => {
      if (item.category.type === INCOME) {
        income += item.price
      } else {
        outcome += item.price
      }
    })
    return (
      <div>
        <div className="row">
          <div className="col">
            <MonthPicker
              year={currentDate.year}
              month={currentDate.month}
              onChange={(year, month) => this.changeDate(year, month)}
            />
          </div>
          <div className="col">
            <TotalPrice income={income} outcome={outcome} />
          </div>
        </div>
        <ViewTab
          activeTab={activeTab}
          onTabChange={(view) => this.changeTab(view)}
        />
        <CreateBtn className="mb-5" onClick={this.addItem} />
        <PriceList
          items={itemsWithCategory}
          onModifyItem={(item) => {
            this.modifyItem(item)
          }}
          onDeleteItem={(item) => {
            this.deleteItem(item)
          }}
        />
      </div>
    )
  }
}

export default Home
