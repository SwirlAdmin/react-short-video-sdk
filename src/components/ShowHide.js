import {useState} from 'react';

export const useTogglePasswordVisibility = () => {
  const [rightIcon, setRightIcon] = useState('volume-medium-outline');
  const [soundVis, setSound] = useState(false);
  const [centerIcon, setCenterIcon] = useState('pause-outline');
  const [videoStatus, setVideoStatus] = useState(false);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'volume-medium-outline') {
      setRightIcon('volume-mute-outline');
      setSound(true);
    } else if (rightIcon === 'volume-mute-outline') {
      setRightIcon('volume-medium-outline');
      setSound(false);
    }
  };
  const videoCurrStatus = () => {
    if (centerIcon === 'pause-outline') {
      setCenterIcon('play-outline');
      setVideoStatus(true);
    } else if (centerIcon === 'play-outline') {
      setCenterIcon('pause-outline');
      setVideoStatus(false);
    }
  };
  return {
    rightIcon,
    handlePasswordVisibility,
    soundVis,
    videoCurrStatus,
    videoStatus,
    centerIcon,
  };
};
