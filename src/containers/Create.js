import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Tabs, Tab } from '../components/Tabs'
import CategoryList from '../components/CategoryList'
import PriceForm from '../components/PriceForm'
import withContext from '../WithContext'
import { INCOME, OUTCOME } from '../utility'
const tabsText = [OUTCOME, INCOME]
class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: OUTCOME,
      selectedCategory: null,
      validationPassed: true,
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.actions.getEditData(id).then((data) => {
      const { editItem, categories } = data
      this.setState({
        selectedTab: id && editItem ? categories[editItem.cid].type : OUTCOME,
        selectedCategory: id && editItem ? categories[editItem.cid] : null,
      })
    })
  }
  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index],
    })
  }
  changeCategory = (category) => {
    this.setState({
      selectedCategory: category,
    })
  }
  handleSubmit = (item, isEdit) => {
    if (!this.state.selectedCategory) {
      this.setState({
        validationPassed: false,
      })
      return
    }
    if (!isEdit) {
      this.props.actions.createItem(item, this.state.selectedCategory.id)
    } else {
      this.props.actions.updateItem(item, this.state.selectedCategory.id)
    }
    this.props.history.push('/')
  }
  cancelSubmit = () => {
    this.props.history.push('/')
  }
  render() {
    const { data } = this.props
    const { id } = this.props.match.params
    const { categories, items } = data
    const { selectedTab, selectedCategory, validationPassed } = this.state
    const editItem = id && items[id] ? items[id] : {}
    const tabIndex = tabsText.findIndex((text) => text === selectedTab)
    const categoriesByType = Object.keys(categories)
      .filter((id) => categories[id].type === selectedTab)
      .map((id) => categories[id])
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
          categories={categoriesByType}
          selectedCategory={selectedCategory}
          onSelectCategory={this.changeCategory}
        />
        <PriceForm
          item={editItem}
          onFormSubmit={this.handleSubmit}
          onCancelSubmit={this.cancelSubmit}
        />
        {!validationPassed && (
          <div className="alert alert-danger mt-5" role="alert">
            请选择分类信息
          </div>
        )}
      </div>
    )
  }
}

export default withContext(Create)
