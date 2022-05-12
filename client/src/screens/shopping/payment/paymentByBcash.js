import { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'

import { StyleSheet, View, Linking, Text } from 'react-native'
import theme from '../../../theme/color'


const PaymentByBcash = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Scan the QR Code to pay by Bcash</Text>
      <View style={styles.qrcodeContainer}>
        <QRCode 
          value='Hello'
        />
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.numberItem}>Bcash (Personal)</Text>
        <Text style={styles.numberItem}>:</Text>
        <Text style={styles.numberItem}>01957500605</Text>
      </View>
    </View>
  )
}
export default PaymentByBcash

const styles = StyleSheet.create({
  container: {
    // borderWidth: 3, borderColor: 'dodgerblue',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 16
  },
  qrcodeContainer: {
    // borderWidth: 3, borderColor: 'red',
    alignItems: 'center',
    margin: 8 * 2
  },
    qrCode: {
      borderWidth: 3,
      borderColor: 'red'

    },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: theme.palette.primary.main,
    borderWidth: 1,
    borderColor: '#0000ff33'
  },
    numberItem: {
      marginHorizontal: 8,
      color: 'white'
    },
})