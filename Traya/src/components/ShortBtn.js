//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

// create a component
const ShortBtn = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btnStyle}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  btnStyle: {
    backgroundColor: '#bfd85b',
    paddingHorizontal: widthPercentageToDP('4'),
    paddingVertical: heightPercentageToDP('1'),
    borderRadius: 22,
  },
  textStyle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '400',
  },
});

//make this component available to the app
export default ShortBtn;
