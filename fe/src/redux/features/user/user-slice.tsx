import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserState = {
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
    }
  },
});

export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer