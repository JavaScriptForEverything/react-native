import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: '',

    // message: '' 
    // to check button clicked to save data of this Screens.
    screen: {}, // { isInfo: true, isDetails: true, isPayment: true, isSuccess: true }
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

    nextClicked: (state, action) => ({ ...state, screen: action.payload })

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
export const nextClicked = (obj) => (dispatch) => dispatch(actions.nextClicked(obj))


export const saveInfo = (fields) => {
  console.log(fields)
}