import AsyncStorageLib from '@react-native-async-storage/async-storage'

export const authenticateUser = (store) => (next) => async (action) => {
  // const { user } = store.getState().user

  console.log('redux middleware')

  next(action)
}