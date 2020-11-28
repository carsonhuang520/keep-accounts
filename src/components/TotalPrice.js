import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TotalPrice extends Component {
  render() {
    const { income, outcome } = this.props
    return (
      <div className="row">
        <div className="col">
          <h5 className="income">
            收入：<span>{income}</span>
          </h5>
        </div>
        <div className="col">
          <h5 className="outcome">
            支出：<span>{outcome}</span>
          </h5>
        </div>
      </div>
    )
  }
}

TotalPrice.propTypes = {
  income: PropTypes.number.isRequired,
  outcome: PropTypes.number.isRequired,
}
export default TotalPrice
