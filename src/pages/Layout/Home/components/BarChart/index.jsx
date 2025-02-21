import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
export default function BarChart({option}) {
  // 图标dom元素的ref
  const chartRef = useRef();
  // 在首次渲染后执行
  useEffect(() => {
    // 获取图表dom元素
    const chartDom = chartRef.current;
    // 初始化图表
    const myChart = echarts.init(chartDom);
    // 设置参数到图表并渲染
    myChart.setOption(option);
  }, [option])
  return (
    <div ref={chartRef} style={{ width: '500px', height: "400px" }}></div>
  )
}
