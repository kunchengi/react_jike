import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
export default function Home() {
  // 图标dom元素的ref
  const chartRef = useRef();
  // 在首次渲染后执行
  useEffect(() => {
    // 获取图表dom元素
    const chartDom = chartRef.current;
    // 初始化图表
    const myChart = echarts.init(chartDom);
    // 图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: ['vue', 'react', 'angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar'
        }
      ]
    };
    // 设置参数到图表并渲染
    myChart.setOption(option);
  }, [])
  return (
    <div>
      {/* 渲染图标的dom元素 */}
      <div ref={chartRef} style={{ width: '500px', height: "400px" }}></div>
    </div>
  )
}
