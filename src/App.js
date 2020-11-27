import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/PriceList'

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
    },
  },
]

function App() {
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
    </div>
  )
}

export default App
