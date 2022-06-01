import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { axios, catchAsyncDispatch } from '../util';

const { actions, reducer } = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: '',

    step: 1,              // used to move between Cart Stepper
    info: {},             // used to store shippingInfo
    publishableKey: '',   // to getStripePublishableKey from backend and save it
    clientSecret: '',     // get clientSecret from backend: paymentIntents.create()
    isPaid: false,        // check is payment success or not.
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

    getStripePublishableKey: (state, action) => ({
      ...state,
      loading: false,
      publishableKey: action.payload      // <= publishableKey
    }),
    addPayment: (state, action) => ({
      ...state,
      loading: false,
      clientSecret: action.payload      
    })

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

// used in next/pay button: src/components/stepperButtons.js
export const nextClicked = (step) => (dispatch) => {
  dispatch(actions.nextClicked(step))
}
// export const prevClicked = (step) => (dispatch) => {
//   dispatch(actions.nextClicked( step - 1))
// }


// /src/screens/shopping/shippingInfo.js : to same into localStorage
export const saveInfo = (fields) => async (dispatch) => {
  dispatch(actions.saveInfo(fields))
  await AsyncStorageLib.setItem('info', JSON.stringify(fields))
}


// src/screens/shopping/payment.js  useEffect()
export const getStripePublishableKey = () => catchAsyncDispatch(async (dispatch) => {
  // dispatch( actions.requested() )
  const { data: { publishableKey }  } = await axios().get('/api/payments')
  dispatch( actions.getStripePublishableKey(publishableKey) )
}, actions.failed)



// // src/screens/shopping/payment/paymentByCard.js  : submitHandler
// export const addPayment = (token, fieldsData) => async (dispatch) => {
//   // if(!token) return
//   dispatch(actions.requested())

//   try {
//   const { data } = await axios(token).post('/api/payments', fieldsData)
//   console.log(data)
//   // dispatch(actions.addPayment(clientSecret))

//   } catch (err) {
//     console.log(err)
//   }
// }

export const addPayment = async (token, fieldsData ) => {
  try {
    const { data: { clientSecret } } = await axios(token).post('/api/payments', fieldsData)
    return clientSecret

  } catch (err) {
    console.log(err.message)
  }
}