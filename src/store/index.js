import { configureStore } from "@reduxjs/toolkit";
import userData from "./modules/userData";

export default configureStore({
    reducer: {
        userData,// 用户数据
    },
});