//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from './Icon';

// create a component
const BottomBtns = props => {
  return (
    <SafeAreaView
      style={{flexDirection: 'column-reverse', marginHorizontal: wp('4')}}>
      <TouchableOpacity onPress={props.sharePress}>
        <CustomIcon
          style={{
            marginHorizontal: wp('1'),
            marginVertical: hp('1'),
          }}
          name={'share-social'}
          color={'#fff'}
          size={35}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.chatPress}>
        <Text style={{color: '#fff'}}>{props.videoIndex}</Text>
        <CustomIcon
          style={{
            marginHorizontal: wp('1'),
            marginVertical: hp('1'),
          }}
          name={'chatbubble-ellipses'}
          color={'#fff'}
          size={35}
        />
      </TouchableOpacity>
    </SafeAreaView>
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
});

//make this component available to the app
export default BottomBtns;
