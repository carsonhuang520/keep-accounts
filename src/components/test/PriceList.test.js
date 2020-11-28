import { shallow } from 'enzyme'
import React from 'react'
import Ionicon from 'react-ionicons'
import { items, categories } from '../../containers/Home'
import PriceList from '../PriceList'

const itemsWithCategory = items.map((item) => {
  item.category = categories[item.cid]
  return item
})

const props = {
  items: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn(),
}

let wrapper
describe('test PriceList component', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />)
  })
  it('should render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should render correct prices length', () => {
    expect(wrapper.find('.list-group-item').length).toEqual(
      itemsWithCategory.length
    )
  })
  it('should render correct icon and price for each item', () => {
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
    expect(iconList.length).toEqual(3)
    expect(iconList.first().props().icon).toEqual(
      itemsWithCategory[0].category.iconName
    )
  })
  it('should trigger the correct function callbacks', () => {
    const firstItem = wrapper.find('.list-group-item').first()
    firstItem
      .find('a')
      .first()
      .simulate('click', { preventDefault: () => {} })
    expect(props.onModifyItem).toHaveBeenCalled()
    firstItem
      .find('a')
      .last()
      .simulate('click', { preventDefault: () => {} })
    expect(props.onDeleteItem).toHaveBeenCalled()
  })
})
