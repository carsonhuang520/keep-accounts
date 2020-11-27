import React from 'react'

function PriceList(props) {
  const { items, onModifyItem, onDeleteItem } = props
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <span>{item.category.name}</span>
            <span>{item.title}</span>
            <span>
              {item.category.type === 'outcome' ? '-' : ''}
              {item.price}
            </span>
            <span>{item.date}</span>
            <button
              onClick={() => {
                onModifyItem(item)
              }}
            >
              编辑
            </button>
            <button
              onClick={() => {
                onDeleteItem(item)
              }}
            >
              删除
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default PriceList
