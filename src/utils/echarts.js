function createBarOption(title, xAxisDatas, seriesDatas) {
    return {
        title: {
            text: title
          },
          xAxis: {
            type: 'category',
            data: xAxisDatas
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: seriesDatas,
              type: 'bar'
            }
          ]
    }
}

const echartsUtil = { createBarOption };

export default echartsUtil