import * as React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {Utils} from '../utils/utils';

const CustomIcon = props => {
  const iconName = () => {
    if (Utils.isIos()) {
      return 'ios-' + props.name;
    }
    return 'md-' + props.name;
  };
  return (
    <Icons
      style={props.style}
      name={props.noPrefix ? props.name : iconName()}
      color={props.color}
      size={props.size}
    />
  );
};
Icons.defaultProps = {
  color: 'white',
  size: 35,
  noPrefix: false,
};
export default CustomIcon;
