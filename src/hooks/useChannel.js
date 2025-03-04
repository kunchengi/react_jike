// 自定义hook
// 封装获取频道列表的逻辑
import { useEffect, useState } from "react";
import { getChannelAPI } from "@/apis/article";
function useChannel() {
    // 1. 获取频道列表的所有逻辑
    // 频道列表
    const [channelList, setChannelList] = useState([]);

    useEffect(() => {
        // 封装函数，在函数体内调用接口
        const getChannels = async () => {
            const res = await getChannelAPI();
            // 设置频道列表
            setChannelList(res.data.channels);
        }
        // 调用函数
        getChannels();
    }, []);
    // 2. 把组件中要用到的数据return出去
    return { channelList }
}

export { useChannel }