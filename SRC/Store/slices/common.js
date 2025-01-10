import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  userData: {},
  totalQrcodes : 0 ,
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
  
    setUserData(state, action) {
      state.userData = action?.payload;
      // state.userData = action?.payload?.userData;
    },
    setTotalQRcodes(state ,action){
      state.totalQrcodes = action?.payload
    },
    setUserLogOut(state, action) {
      state.userData = {};
      // console.log("🚀 ~ setUserLogOut ~ userData:", userData)
    },
   
  },
});

export const {
  setUserData,
  setUserLogOut,
  setTotalQRcodes
 

} = CommonSlice.actions;

export default CommonSlice.reducer;
