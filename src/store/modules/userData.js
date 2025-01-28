import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

// 创建用户Slice
const userSlice = createSlice({
    name: 'userData',
    initialState: {
        tolen: ''
    },
    reducers: {
        // 设置token
        setToken(state, action) {
            state.token = action.payload;
        }
    }
})

const { setToken } = userSlice.actions;

// 登录请求，异步获取token
const asyncLogin = (loginFrom) => async (dispatch) => {
    try{
        // 登录请求，传入表单数据
        const res = await request.post('/authorizations', loginFrom);
        // 存入token
        dispatch(setToken(res.data.token));
        return '';
    }
    catch(err){
        const errMessage = err.response.data.message;
        return errMessage;
    }
}

export { asyncLogin, setToken };

export default userSlice.reducer;