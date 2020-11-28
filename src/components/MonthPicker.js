import React, { Component } from 'react'
import { padLeft, range } from '../utility'
import PropTypes from 'prop-types'

class MonthPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year,
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }
  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      return
    }
    this.setState({
      isOpen: false,
    })
  }
  toggleDropdown = (event) => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  selectYear = (event, year) => {
    event.preventDefault()
    this.setState({
      selectedYear: year,
    })
  }
  selectMonth = (event, month) => {
    event.preventDefault()
    this.setState({
      isOpen: false,
    })
    this.props.onChange(this.state.selectedYear, month)
  }
  render() {
    const { year, month } = this.props
    const { isOpen, selectedYear } = this.state
    const yearRange = range(9, -4).map((item) => year + item)
    const monthRange = range(12, 1)
    return (
      <div
        className="dropdown month-picker-component"
        ref={(node) => (this.node = node)}
      >
        {/* <p style={{ margin: 0 }}>选择月份</p> */}
        <span>选择月份</span>
        <button
          className="btn btn-lg btn-primary dropdown-toggle"
          onClick={this.toggleDropdown}
        >
          {`${year}年 ${padLeft(month)}月`}
        </button>
        {isOpen && (
          <div className="dropdown-menu" style={{ display: 'block' }}>
            <div className="row">
              <div className="col border-right years-range">
                {yearRange.map((yearNumber, index) => (
                  <a
                    key={index}
                    href="/"
                    role="button"
                    className={
                      yearNumber === selectedYear
                        ? 'dropdown-item active text-white'
                        : 'dropdown-item'
                    }
                    onClick={(event) => this.selectYear(event, yearNumber)}
                  >
                    {yearNumber} 年
                  </a>
                ))}
              </div>
              <div className="col months-range">
                {monthRange.map((monthNumber, index) => (
                  <a
                    key={index}
                    role="button"
                    href="/"
                    className={
                      monthNumber === month
                        ? 'dropdown-item active'
                        : 'dropdown-item'
                    }
                    onClick={(event) => this.selectMonth(event, monthNumber)}
                  >
                    {padLeft(monthNumber)} 月
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MonthPicker
