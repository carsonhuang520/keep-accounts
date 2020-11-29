import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import TotalPrice from '../components/TotalPrice'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import { LIST_VIEW, CHART_VIEW, INCOME, OUTCOME } from '../utility'
import withContext from '../WithContext'
import Loader from '../components/Loader'
import PieChart from '../components/PieChart'

const generateChartDataByCategory = (items, type) => {
  let chartData = {}
  items
    .filter((item) => item.category.type === type)
    .forEach((item) => {
      if (chartData[item.cid]) {
        chartData[item.cid].price += item.price * 1
        chartData[item.cid].items.push([item.id])
      } else {
        chartData[item.cid] = {
          name: item.category.name,
          price: item.price * 1,
          items: [item.id],
        }
      }
    })
  const legendData = Object.keys(chartData).map((item) => chartData[item].name)
  const seriesData = Object.keys(chartData).map((item) => ({
    name: chartData[item].name,
    value: chartData[item].price,
  }))
  return {
    legendData,
    seriesData,
  }
}

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
    const outcomeData = generateChartDataByCategory(itemsWithCategory, OUTCOME)
    const incomeData = generateChartDataByCategory(itemsWithCategory, INCOME)
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
              {activeTab === CHART_VIEW && itemsWithCategory.length > 0 && (
                <Fragment>
                  {outcomeData.seriesData.length === 0 ? (
                    <h3
                      style={{ textAlign: 'center', fontSize: '24px' }}
                      className="mx-3"
                    >
                      本月没有支出
                    </h3>
                  ) : (
                    <PieChart
                      el="outcome"
                      title="本月支出"
                      name="支出"
                      legendData={outcomeData.legendData}
                      seriesData={outcomeData.seriesData}
                    />
                  )}
                  {incomeData.seriesData.length === 0 ? (
                    <h3
                      style={{ textAlign: 'center', fontSize: '24px' }}
                      className="mx-3"
                    >
                      本月没有收入
                    </h3>
                  ) : (
                    <PieChart
                      el="income"
                      title="本月收入"
                      name="收入"
                      legendData={incomeData.legendData}
                      seriesData={incomeData.seriesData}
                    />
                  )}
                </Fragment>
              )}
              {activeTab === CHART_VIEW && itemsWithCategory.length === 0 && (
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
