import BarChart from "./components/BarChart"
import { echartsUtil } from "@/utils"

const satisfiedOption = echartsUtil.createBarOption('三大框架满意度', ['vue', 'react', 'angular'], [10, 40, 70]);
const useOption = echartsUtil.createBarOption('三大框架使用度', ['vue', 'react', 'angular'], [20, 30, 50]);
export default function Home() {
  return (
    <div>
      <BarChart option={satisfiedOption} />
      <BarChart option={useOption} />
    </div>
  )
}
