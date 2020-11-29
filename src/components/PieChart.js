import React, { Component } from 'react'
import echarts from 'echarts'

class PieChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const { el, title, name, legendData, seriesData } = this.props
    var myChart = echarts.init(document.getElementById(el))
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: title,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: legendData,
      },
      series: [
        {
          name: name,
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    myChart.setOption(option)
  }
  render() {
    const { el } = this.props
    return (
      <div
        id={el}
        style={{ width: '600px', height: '400px', margin: '10px auto 0' }}
      ></div>
    )
  }
}

export default PieChart
