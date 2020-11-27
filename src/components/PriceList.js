import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'

function PriceList(props) {
  const { items, onModifyItem, onDeleteItem } = props
  return (
    <ul className="list-group list-group-flush mt-4">
      {items.map((item) => {
        return (
          <li
            key={item.id}
            className="list-group-item d-flex 
          justify-content-between align-items-center"
          >
            <span className="col-1">
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#347eff', padding: '5px' }}
                color={'#fff'}
                icon={item.category.iconName}
              />
            </span>
            <span className="col-5">{item.title}</span>
            <span className="col-2 font-weight-bold">
              {item.category.type === 'outcome' ? '-' : ''}
              {item.price}元
            </span>
            <span className="col-2">{item.date}</span>
            <a
              className="col-1"
              role="button"
              href="/"
              onClick={(event) => {
                event.preventDefault()
                onModifyItem(item)
              }}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#28a745', padding: '5px' }}
                color={'#fff'}
                icon="ios-create-outline"
              />
            </a>
            <a
              className="col-1"
              role="button"
              href="/"
              onClick={(event) => {
                event.preventDefault()
                onDeleteItem(item)
              }}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#dc3545', padding: '5px' }}
                color={'#fff'}
                icon="ios-close"
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}
export default PriceList
