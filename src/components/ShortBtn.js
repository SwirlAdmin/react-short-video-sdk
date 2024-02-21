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
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text style={props.textStyle}>{props.title}</Text>
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
  // btnStyle: {
  //   backgroundColor: '#bfd85b',
  //   paddingHorizontal: widthPercentageToDP('8'),
  //   paddingVertical: heightPercentageToDP('1.5'),
  //   borderRadius: 22,
  // },
});

//make this component available to the app
export default ShortBtn;
