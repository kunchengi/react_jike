import { message } from 'antd';
import { createSlice } from "@reduxjs/toolkit";
import { request, getToken, setToken as _setToken } from "@/utils";

// 创建用户Slice
const userSlice = createSlice({
    name: 'userData',
    initialState: {
        tolen: getToken() || '',
        userInfo: {}
    },
    reducers: {
        // 设置token
        setToken(state, action) {
            state.token = action.payload;
            // 将token保存到localStorage
            _setToken(action.payload);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        }
    }
})

const { setToken, setUserInfo } = userSlice.actions;

// 登录请求，异步获取token
const asyncLogin = (loginFrom) => async (dispatch) => {
    try{
        // 登录请求，传入表单数据
        const res = await request.post('/authorizations', loginFrom);
        if(res){
            // 存入token
            dispatch(setToken(res.data.token));
            return '';
        }
        return '网络繁忙，请稍后重试！';
    }
    catch(err){
        const errMessage = err.response.data.message;
        return errMessage;
    }
}

// 异步获取用户信息
const asyncGetUserInfo = () => async (dispatch) => {
    try{
        const res = await request.get('/user/profile');
        if(res){
            // 存入用户信息
            dispatch(setUserInfo(res.data));
            message.success(`亲爱的${res.data.name}，欢迎回来！`);
        }
        else{
            throw new Error('网络繁忙，请稍后重试！');
        }
    }
    catch(err){
        const errMessage = err.response.data.message;
        message.error('请求用户信息失败'+errMessage);
    }
}

export { asyncLogin, setToken, asyncGetUserInfo };

export default userSlice.reducer;