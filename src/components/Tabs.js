import React, { Component, Fragment } from 'react'

export class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: props.activeIndex,
    }
  }
  tabChange = (event, index) => {
    event.preventDefault()
    this.setState({
      activeIndex: index,
    })
    this.props.onTabChange(index)
  }
  render() {
    const { children } = this.props
    const { activeIndex } = this.state
    return (
      <ul className="nav nav-tabs nav-fill my-4">
        {React.Children.map(children, (child, index) => {
          const activeClassName =
            activeIndex === index ? 'nav-link active' : 'nav-link'
          return (
            <li className="nav-item">
              <a
                onClick={(event) => {
                  this.tabChange(event, index)
                }}
                href="/"
                className={activeClassName}
                role="button"
              >
                {child}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
}

export const Tab = ({ children }) => <Fragment>{children}</Fragment>
