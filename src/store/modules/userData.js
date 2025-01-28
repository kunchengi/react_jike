import { createSlice } from "@reduxjs/toolkit";

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
export { setToken };

export default userSlice.reducer;