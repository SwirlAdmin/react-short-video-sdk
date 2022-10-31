import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomIcon from './Icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Chevrons = props => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <CustomIcon
        style={{
          marginHorizontal: wp('1'),
          marginVertical: hp('1'),
        }}
        name={props.IconName}
        color={props.color ? props.color : '#fff'}
        size={props.size ? props.size : 35}
      />
    </TouchableOpacity>
  );
};

export default Chevrons;
