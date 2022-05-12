import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: '',

    step: 1,
    info: {},             // used to store shippingInfo
    // message: '' 
    // to check button clicked to save data of this Screens.
    // screen: {}, // { isInfo: true, isDetails: true, isPayment: true, isSuccess: true }
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

    nextClicked: (state, action) => ({ ...state, step: action.payload }),
    saveInfo: (state, action) => ({ ...state, info: action.payload }),

  } // End of reducers
})
export default reducer


/* Dispatch only nextButton Click:
	const nextHandler = () => {
    if(step === 1) dispatch(nextClicked({ isInfo: true }))

		if(step > 3) return 
		setStep(step+1)

	}
*/
export const nextClicked = (step) => (dispatch) => {
  dispatch(actions.nextClicked(step))
}
// export const prevClicked = (step) => (dispatch) => {
//   dispatch(actions.nextClicked( step - 1))
// }


export const saveInfo = (fields) => async (dispatch) => {
  dispatch(actions.saveInfo(fields))
  await AsyncStorageLib.setItem('info', JSON.stringify(fields))
}