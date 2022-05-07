import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: '',
    message: '' 
  },
  reducers: {
    requested: (state, action) => ({
      ...state,                 
      loading: true,           
      error: '',              
      message: ''
    }),
    failed: (state, action) => ({
      ...state, 
      loading: false,       
      message: '',
      error: action.payload 
    }),

  } // End of reducers
})
export default reducer


const saveInfo = () => {
  console.log('save info')
}