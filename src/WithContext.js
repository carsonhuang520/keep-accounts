import React from 'react'
import { AppContext } from './App'

const withContext = (Component) => {
  return (props) => {
    return (
      <AppContext.Consumer>
        {({ state, actions }) => {
          return <Component {...props} data={state} actions={actions} />
        }}
      </AppContext.Consumer>
    )
  }
}

export default withContext
