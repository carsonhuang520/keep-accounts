import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { LIST_VIEW, INCOME } from '../utility'
import withContext from '../WithContext'
import Loader from '../components/Loader'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: LIST_VIEW,
    }
  }
  componentDidMount() {
    this.props.actions.initData()
  }
  changeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
  }
  changeTab = (view) => {
    this.setState({
      activeTab: view,
    })
  }
  addItem = () => {
    this.props.history.push('/create')
  }
  deleteItem = (item) => {
    this.props.actions.deleteItem(item)
  }
  modifyItem = (item) => {
    this.props.history.push(`/update/${item.id}`)
  }
  render() {
    const { data } = this.props
    const { items, categories, currentDate, isLoading } = data
    const { activeTab } = this.state
    const itemsWithCategory = Object.keys(items).map((id) => {
      let item = items[id]
      item.category = categories[item.cid]
      return item
    })
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
        <div className="row header">
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
        <div className="content">
          <ViewTab
            activeTab={activeTab}
            onTabChange={(view) => this.changeTab(view)}
          />
          <CreateBtn className="mb-5" onClick={this.addItem} />
          {isLoading ? (
            <Loader />
          ) : (
            <Fragment>
              {activeTab === LIST_VIEW && itemsWithCategory.length > 0 && (
                <PriceList
                  items={itemsWithCategory}
                  onModifyItem={(item) => {
                    this.modifyItem(item)
                  }}
                  onDeleteItem={(item) => {
                    this.deleteItem(item)
                  }}
                />
              )}
              {activeTab === LIST_VIEW && itemsWithCategory.length === 0 && (
                <div className="alert alert-light text-center no-record">
                  您还没有任何记账记录
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default withContext(Home)
