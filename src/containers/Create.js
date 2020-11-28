import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Tabs, Tab } from '../components/Tabs'
import CategoryList from '../components/CategoryList'
import PriceForm from '../components/PriceForm'

const categories = [
  {
    name: '旅行',
    iconName: 'ios-plane',
    id: '1',
    type: 'outcome',
  },
  {
    name: '餐饮',
    iconName: 'ios-restaurant',
    id: '2',
    type: 'outcome',
  },
  {
    name: '购物',
    iconName: 'ios-basket',
    id: '3',
    type: 'outcome',
  },
  {
    name: '数码',
    iconName: 'ios-phone-portrait',
    id: '4',
    type: 'outcome',
  },
  {
    name: '交通',
    iconName: 'ios-train',
    id: '5',
    type: 'outcome',
  },
  {
    name: '娱乐',
    iconName: 'ios-beer',
    id: '6',
    type: 'outcome',
  },
  {
    name: '汽车',
    iconName: 'ios-car',
    id: '7',
    type: 'outcome',
  },
  {
    name: '医疗',
    iconName: 'ios-medkit',
    id: '8',
    type: 'outcome',
  },
  {
    name: '体育',
    iconName: 'ios-football',
    id: '16',
    type: 'outcome',
  },
  {
    name: '宠物',
    iconName: 'ios-paw',
    id: '9',
    type: 'outcome',
  },
  {
    name: '其他',
    iconName: 'ios-apps',
    id: '14',
    type: 'outcome',
  },
  {
    name: '工资',
    iconName: 'ios-card',
    id: '10',
    type: 'income',
  },
  {
    name: '兼职',
    iconName: 'ios-cash',
    id: '11',
    type: 'income',
  },
  {
    name: '理财',
    iconName: 'logo-yen',
    id: '12',
    type: 'income',
  },
  {
    name: '礼金',
    iconName: 'logo-yen',
    id: '13',
    type: 'income',
  },
  {
    name: '其他',
    iconName: 'ios-apps',
    id: '15',
    type: 'income',
  },
]

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
      selectedCategory: {
        name: '其他',
        iconName: 'ios-apps',
        id: '15',
        type: 'income',
      },
    }
  }
  tabChange = (index) => {
    this.setState({
      tabIndex: index,
    })
  }
  changeCategory = (category) => {
    this.setState({
      selectedCategory: category,
    })
  }
  render() {
    const { tabIndex } = this.state
    return (
      <div>
        <Tabs
          activeIndex={tabIndex}
          onTabChange={(index) => this.tabChange(index)}
        >
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategoryList
          categories={categories}
          selectedCategory={this.state.selectedCategory}
          onSelectCategory={this.changeCategory}
        />
        <PriceForm
          item={{}}
          onFormSubmit={() => {}}
          onCancelSubmit={() => {}}
        />
      </div>
    )
  }
}

export default Create
