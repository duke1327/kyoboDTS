import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await axios.get("http://localhost:8080/user/list");
    return response.data;
});

export const addUser = createAsyncThunk(
    "user/addUser",
    async ({ name, email }) => {
        await axios.post(
            "http://localhost:8080/user/add",
            { name, email }
        );
        const usersResponse = await axios.get(
            "http://localhost:8080/user/list",
        );
        return usersResponse.data;
    },
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ id, name, email }) => {
        await axios.put(`http://localhost:8080/user/${id}`, { name, email });
        const usersResponse = await axios.get(
            "http://localhost:8080/user/list",
        );
        return usersResponse.data;
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        const usersResponse = await axios.get(
            "http://localhost:8080/user/list",
        );
        return usersResponse.data;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    },
});

export default userSlice.reducer;
