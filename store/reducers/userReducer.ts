import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from 'firebase/auth';

interface IUser {
    userData: string | null,
}

const userInitialState: IUser = { userData: null };

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        saveUser(state, action: PayloadAction<User | null>) {
            console.log("What to save is:");
            console.log(JSON.stringify(action.payload, null, 2));
            // state.isAuthorized = action.payload?.isAuthorized;
            // state.email = action.payload?.email;
            // state.accessToken = action.payload?.accessToken;
            action.payload ? state.userData = JSON.stringify(action.payload.toJSON()) : state = userInitialState;
            // if (action.payload) {
            //     state.userData = JSON.stringify(action.payload.toJSON());
            // } else {
            //     state.userData = null;
            // }
        },
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
