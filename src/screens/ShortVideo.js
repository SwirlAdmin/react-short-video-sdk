//import liraries
import {
  Box,
  Center,
  HStack,
  Progress,
  Slider,
  Stack,
  TextArea,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Image,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
import PhoneInput from 'react-native-phone-number-input';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Video from 'react-native-video';
import BottomBtns from '../components/BottomBtns';
import Chevrons from '../components/Chevrons';
import CustomIcon from '../components/Icon';
import ShortBtn from '../components/ShortBtn';
import {useTogglePasswordVisibility} from '../components/ShowHide';
import {RegisterObj} from '../Storage/AsyncStorage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

// create a component
const ShortVideo = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currIndex, setIndex] = useState();
  const [apiRes, setApiRes] = useState([]);
  const [skelton, setSkelton] = useState(true);
  const [userMsg, setUserMsg] = useState('');
  const [shouldShow, setShouldShow] = useState(false);
  const [regShow, setRegShow] = useState(false);
  const [wholeData, setWholeData] = React.useState('');
  const [progress, setProgress] = useState(0);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const [seekableDuration, setSeekableDuration] = useState(0);
  const [play, setPlay] = useState(true);
  // const handleProgress = progressData => {
  //   console.log(progressData, '===proressData');
  //   setSeekableDuration(progressData.seekableDuration * 100);
  //   setCurrentPlayTime(progressData.currentTime * 100);
  //   setProgress(
  //     (progressData.currentTime / progressData.seekableDuration) * 100,
  //   );
  // };

  const [serverLength, setServerLength] = useState(0);
  const flatListRef = useRef({});
  const [isSwipeOptDone, setIsSwipeOptDone] = useState(false);
  const [async, setAsync] = useState();
  const [username, setUsername] = React.useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);
  const [buffering, setBuffering] = useState(true);
  const [id, setId] = useState('');
  const windowHeight = Dimensions.get('window').height;
  function handleBackButtonClick() {
    navigation.goBack();
    setSkelton(false);
    return true;
  }

  var regex = /\d+/g || '!@#$%^&*()+=-[]\\\';,./{}|":<>?';
  var string = username;
  var isNumeric = string.match(regex);
  const isSpeChr = function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  setTimeout(() => {
    sendRequest && setSendRequest(false);
    sendRequest && setShouldShow(false);
  }, 2000);

  const {data} = route.params;

  // CUSTOM HOOKS
  const {
    rightIcon,
    handlePasswordVisibility,
    soundVis,
    videoCurrStatus,
    videoStatus,
    centerIcon,
  } = useTogglePasswordVisibility();
  const videoRef = useRef();
  const onBuffer = ({isBuffering}) => {
    setBuffering(isBuffering);
  };
  const onError = e => {
    console.log('Error raised.....', e);
  };
  const scrollRef = useRef();

  const GetData = () => {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ci_session=pkaf9r6n9uhvp6pf1339v4h0qutrp6jl');

    var formdata = new FormData();
    formdata.append('playlistCode', data?.playlistCode);
    formdata.append('accessToken', data?.accessToken);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://api.goswirl.live/index.php/APIv1/shortVideos/getPlyalistVideos',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const datais = result?.Response?.videos;
        let serverLinks = datais.filter(val => {
          if (val.server_url) {
            return val.server_url;
          }
        });
        setServerLength(serverLinks.length);
        setSkelton(false);
        setWholeData(result?.Response);
        setApiRes(result?.Response?.videos);
      })
      .catch(error => console.log('error', error));
  };
  const AskQuestion = (_uid, _did, _sid, _msg) => {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ci_session=okq9kvlc524s3ho346fjr08075g4q692');

    var formdata = new FormData();
    formdata.append('user_id', _uid);
    formdata.append('designer_id', _did);
    formdata.append('msg', _sid);
    formdata.append('swirls_id', _msg);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://api.goswirl.live/index.php/Shopify/askque', requestOptions)
      .then(response => response.json())
      .then(result => {
        setSendRequest(true);
        result?.success && setUserMsg('');
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    if (currIndex !== undefined && videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currIndex]);

  useEffect(() => {
    GetData();
  }, []);
  useEffect(() => {
    const updateSwipeOptStatus = async () => {
      const swipeOptStatus = await AsyncStorage.getItem('isSwipeOptDone');
      if (!swipeOptStatus) {
        if (currIndex !== 0 && currIndex !== undefined) {
          await AsyncStorage.setItem('isSwipeOptDone', 'true');
        }
      }
      setIsSwipeOptDone(swipeOptStatus);
    };
    updateSwipeOptStatus();
  }, [currIndex, onChangeIndex]);

  const RegisterUser = (name, code, mobile) => {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ci_session=4s2giao9jdhc6k0rjoqdedsh6alo3vvu');

    var formdata = new FormData();
    formdata.append('name', name);
    formdata.append('code', code);
    formdata.append('mobile', mobile);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://api.goswirl.live/index.php/Shopify/user_register',
      requestOptions,
    )
      .then(response => response.json())
      .then(async result => {
        AsyncStorage.setItem('@storage_Key', result?.data?.user_id);
        setTimeout(() => {
          setRegShow(false);
        }, 1000);
        setTimeout(() => {
          RegisterObj.setUser(true);
          setRegShow(false);
        }, 1000);
      });
  };

  const PostView = data => {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ci_session=drvithf0ao4ip479pfkjko9l8u7gitnv');

    var formdata = new FormData();
    formdata.append('vid', data);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://api.goswirl.live/index.php/BrandController/getShortVideoAnalytics',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log(result, 'postView'))
      .catch(error => console.log('error', error));
  };

  let localStorageData = RegisterObj.getUser();

  localStorageData.then(val => {
    setAsync(val);
  });

  const myData = AsyncStorage.getItem('@storage_Key');
  myData.then(e => {
    setId(e);
  });
  const onChangeIndex = ({index}) => {
    setIndex(index);
  };
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const currentTimeFormatted = formatTime(progress.currentTime);
  const seekableDurationFormatted = formatTime(progress.seekableDuration);
  const timeDisplay = `${currentTimeFormatted}/${seekableDurationFormatted}`;

  const padTime = time => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <>
      <>
        <Modal
          animationIn={'slideOutLeft'}
          animationOut={'slideInLeft'}
          transparent={true}
          // supportedOrientations={'left'}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              height: hp('100%'),
              backgroundColor: '#000000d9',
              width: wp('75'),
              opacity: 0.8,
              position: 'absolute',
              left: -20,
            }}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <CustomIcon
                style={{
                  marginHorizontal: wp('1'),
                  marginVertical: hp('2'),
                  alignSelf: 'flex-end',
                }}
                name={'close-circle'}
                color={'#fff'}
                size={35}
              />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: wholeData?.customizationData?.user_profile}}
                  style={{
                    width: wp('30'),
                    height: wp('30'),
                    resizeMode: 'cover',
                    borderRadius: 15,
                  }}
                />
                <View
                  style={{
                    marginVertical: hp('2.5'),
                    marginHorizontal: wp('4'),
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      paddingBottom: wp('3'),
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    {wholeData?.customizationData?.designer_brand_name}
                  </Text>

                  {wholeData?.customizationData?.designer_bio == '' ? null : (
                    <>
                      <View
                        style={{
                          borderTopWidth: 1.5,
                          borderColor: '#fff',
                          width: wp('55'),
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          paddingTop: wp('3'),
                          alignSelf: 'center',
                        }}>
                        ABOUT
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          paddingTop: wp('3'),
                          alignSelf: 'center',
                          textAlign: 'center',
                          letterSpacing: 1.2,
                        }}>
                        {wholeData?.customizationData?.designer_bio}
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: wp('4'),
                  marginTop: hp('30'),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    paddingTop: wp('3'),
                    alignSelf: 'center',
                    textAlign: 'center',
                    letterSpacing: 1.2,
                    fontWeight: 'bold',
                    marginVertical: hp('2'),
                  }}>
                  Powered by
                </Text>
                <View style={{backgroundColor: '#fff', borderRadius: 12}}>
                  <Image
                    source={{uri: wholeData?.customizationData?.brand_logo}}
                    style={{
                      width: wp('30'),
                      height: wp('8'),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </>
      {skelton ? (
        <SkeletonPlaceholder backgroundColor="#e1e3e6" borderRadius={4}>
          <View
            style={{
              justifyContent: 'center',
              marginVertical: hp('2'),
            }}>
            <View style={{marginHorizontal: wp('5')}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View
                  style={{width: wp('60'), height: hp('5'), borderRadius: 15}}
                />
                <View
                  style={{width: wp('25'), height: hp('5'), borderRadius: 15}}
                />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginVertical: hp('1'),
              }}>
              <View
                style={{width: wp('90'), height: hp('80'), borderRadius: 15}}
              />
            </View>
            <View
              style={{
                marginHorizontal: wp('5'),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{width: wp('20'), height: hp('5'), borderRadius: 15}}
              />
              <View
                style={{width: wp('20'), height: hp('5'), borderRadius: 15}}
              />
              <View
                style={{width: wp('20'), height: hp('5'), borderRadius: 15}}
              />
              <View
                style={{width: wp('20'), height: hp('5'), borderRadius: 15}}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <SwiperFlatList
          nextButtonStyle={styles.nextButton}
          prevButtonStyle={styles.prevButton}
          ref={flatListRef}
          vertical
          scrollEnabled={shouldShow ? false : true}
          data={apiRes}
          renderItem={({item, index}) => {
            currIndex == index ? PostView(item.video_id) : null;

            return (
              <>
                <View
                  style={{
                    backgroundColor: '#000',
                    height: windowHeight,
                  }}>
                  <Video
                    onLoad={() => {
                      videoRef?.current?.seek(0);
                    }}
                    onProgress={x => {
                      setProgress(x);
                    }}
                    muted={soundVis}
                    seekColor="#a146b7"
                    source={{
                      uri: item?.server_url,
                    }}
                    poster={item?.cover_image}
                    posterResizeMode={'cover'}
                    ref={videoRef}
                    resizeMode="contain"
                    onBuffer={onBuffer}
                    onError={onError}
                    repeat
                    playWhenInactive={true}
                    paused={
                      (play && index == 0 && currIndex == undefined) ||
                      (play && currIndex == index)
                        ? false
                        : true
                    }
                    style={{width: wp('100'), height: windowHeight}}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: hp('1'),
                      marginTop: hp('1'),
                    }}>
                    <Chevrons
                      IconName={'ellipsis-vertical'}
                      size={20}
                      color={'#fff'}
                      onPress={() => setModalVisible(true)}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        width: wp('50'),
                      }}
                      numberOfLines={1}>
                      {item?.video_title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={handlePasswordVisibility}>
                      <CustomIcon
                        style={{
                          marginHorizontal: wp('1'),
                          marginVertical: hp('1'),
                        }}
                        name={rightIcon}
                        color={'#fff'}
                        size={35}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSkelton(false);
                        navigation.goBack();
                      }}>
                      <CustomIcon
                        style={{
                          marginHorizontal: wp('1'),
                          marginVertical: hp('1'),
                        }}
                        name={'close-outline'}
                        color={'#fff'}
                        size={35}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {shouldShow ? (
                  <Box
                    alignItems={'center'}
                    position={'absolute'}
                    alignSelf={'center'}
                    justifyContent={'center'}
                    left={12}
                    right={12}
                    shadow="9">
                    <Box
                      shadow="9"
                      maxW="80"
                      rounded="lg"
                      overflow="hidden"
                      _dark={{
                        borderColor: 'coolGray.600',
                        backgroundColor: 'gray.700',
                      }}
                      _web={{
                        shadow: 9,
                        borderWidth: 0,
                      }}
                      _light={{
                        backgroundColor: 'gray.50',
                      }}>
                      <Box>
                        {/* <View style={{backgroundColor: 'red', width: '100%'}}>
                   <Text>jsdnfkdf</Text>
                 </View> */}
                        <View
                          style={{
                            backgroundColor:
                              wholeData?.customizationData?.bk_color_buy_btn,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: hp('0.5'),
                            alignItems: 'center',
                            paddingHorizontal: hp('1'),
                          }}>
                          <Text
                            style={{
                              color:
                                wholeData?.customizationData
                                  ?.front_color_buy_btn,
                              fontSize: 16,
                              fontWeight: '500',
                            }}>
                            Ask Question
                          </Text>

                          <Chevrons
                            IconName={'close'}
                            size={20}
                            color={
                              wholeData?.customizationData?.front_color_buy_btn
                            }
                            onPress={() => setShouldShow(false)}
                          />
                        </View>
                      </Box>
                      <Stack p="4" space={3}>
                        <Stack space={12}>
                          <TextArea
                            borderColor={'warmGray.300'}
                            value={userMsg}
                            onChange={e => setUserMsg(e.currentTarget.value)} // for web
                            onChangeText={text => setUserMsg(text)}
                            h={20}
                            placeholder="Type Here"
                            w={400}
                            maxW="100%"
                            autoFocus
                          />
                        </Stack>

                        <HStack alignItems="center" justifyContent={'center'}>
                          {sendRequest ? (
                            <Text style={{color: 'green'}}>
                              Your query is submitted. Thank you!
                            </Text>
                          ) : (
                            <TouchableOpacity
                              disabled={userMsg.length == '' ? true : false}
                              style={{
                                backgroundColor:
                                  userMsg.length == ''
                                    ? '#d3d3d3'
                                    : wholeData?.customizationData
                                        ?.bk_color_buy_btn,
                                paddingVertical: hp('0.8'),
                                paddingHorizontal: wp('10'),
                                borderRadius: 22,
                              }}
                              onPress={() => {
                                if (!async) {
                                  setRegShow(true);
                                } else {
                                  AskQuestion(
                                    id,
                                    item.designer_id,
                                    userMsg,
                                    item?.video_id,
                                  ),
                                    setRegShow(true);
                                }
                              }}>
                              <Text
                                style={{
                                  color:
                                    userMsg.length == ''
                                      ? '#fff'
                                      : wholeData?.customizationData
                                          ?.front_color_buy_btn,
                                }}>
                                Send
                              </Text>
                            </TouchableOpacity>
                          )}
                        </HStack>
                      </Stack>
                    </Box>
                  </Box>
                ) : null}
                {!async && regShow ? (
                  <Box
                    alignItems={'center'}
                    position={'absolute'}
                    alignSelf={'center'}
                    justifyContent={'center'}
                    left={12}
                    right={12}
                    shadow="9">
                    <Box
                      shadow="9"
                      rounded="lg"
                      width={wp('90')}
                      overflow="hidden"
                      //   borderColor="red.200"
                      _dark={{
                        borderColor: 'coolGray.600',
                        backgroundColor: 'gray.700',
                      }}
                      _web={{
                        shadow: 9,
                      }}
                      _light={{
                        backgroundColor: 'gray.50',
                      }}>
                      <Box>
                        <View
                          style={{
                            backgroundColor:
                              wholeData?.customizationData?.bk_color_buy_btn,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: hp('0.5'),
                            alignItems: 'center',
                            paddingHorizontal: hp('1'),
                          }}>
                          <Text
                            style={{
                              color:
                                wholeData?.customizationData
                                  ?.front_color_buy_btn,
                              fontSize: 16,
                              fontWeight: '500',
                            }}>
                            Register Yourself
                          </Text>

                          <Chevrons
                            IconName={'close'}
                            size={20}
                            color={
                              wholeData?.customizationData?.front_color_buy_btn
                            }
                            onPress={() => setRegShow(false)}
                          />
                        </View>
                      </Box>
                      <Stack p="4" space={3}>
                        <Stack>
                          <TextInput
                            onChangeText={setUsername}
                            value={username}
                            autoFocus
                            placeholder="Your Name"
                            style={{
                              marginVertical: hp('1'),
                              fontSize: 16,
                              fontWeight: '500',
                              borderWidth:
                                isNumeric !== null || isSpeChr(username)
                                  ? 1
                                  : 0,
                              borderColor: 'red',
                              borderRadius: 8,
                            }}
                          />
                          {isNumeric !== null || isSpeChr(username) ? (
                            <Text style={{color: 'red', marginBottom: hp('4')}}>
                              Enter only characters
                            </Text>
                          ) : null}
                          <PhoneInput
                            ref={phoneInput}
                            // placeholder="dbjsbfkj"
                            defaultValue={value}
                            defaultCode="IN"
                            layout="first"
                            onChangeText={text => {
                              setValue(text);
                            }}
                            onChangeFormattedText={text => {
                              setFormattedValue(text);
                            }}
                            containerStyle={{
                              width: wp('80'),
                            }}
                            textInputProps={{
                              maxLength: 10,
                              keyboardType: 'number-pad',
                            }}
                            textInputStyle={{
                              color: '#000',
                            }}
                            withShadow
                          />
                        </Stack>

                        <HStack alignItems="center" justifyContent={'center'}>
                          {sendRequest ? (
                            <Text style={{color: 'green'}}>
                              Your query is submitted. Thank you!
                            </Text>
                          ) : (
                            <TouchableOpacity
                              disabled={
                                username.length == '' ||
                                value.length == 0 ||
                                isNumeric !== null ||
                                isSpeChr(username)
                                  ? true
                                  : false
                              }
                              style={{
                                backgroundColor:
                                  username.length == '' ||
                                  value.length == 0 ||
                                  isNumeric !== null ||
                                  isSpeChr(username)
                                    ? '#d3d3d3'
                                    : wholeData?.customizationData
                                        ?.bk_color_buy_btn,
                                paddingVertical: hp('1'),
                                paddingHorizontal: wp('10'),
                                borderRadius: 22,
                                width: wp('80'),
                                marginVertical: hp('1'),
                              }}
                              onPress={() => {
                                RegisterUser(
                                  username,
                                  formattedValue.replace(value, ''),
                                  value,
                                );
                                AskQuestion(
                                  id,
                                  item?.designer_id,
                                  userMsg,
                                  item.video_id,
                                ),
                                  setShouldShow(false);
                              }}>
                              <Text
                                style={{
                                  color:
                                    username.length == '' ||
                                    value.length == 0 ||
                                    isNumeric !== null ||
                                    isSpeChr(username)
                                      ? '#fff'
                                      : wholeData?.customizationData
                                          ?.front_color_buy_btn,
                                  alignSelf: 'center',
                                  fontSize: 16,
                                }}>
                                Register
                              </Text>
                            </TouchableOpacity>
                          )}
                        </HStack>
                      </Stack>
                    </Box>
                  </Box>
                ) : null}

                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <View style={{alignSelf: 'flex-start'}}>
                    <BottomBtns
                      chatPress={() => {
                        setShouldShow(true);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Slider
                      style={{width: '60%', height: 40}}
                      minimumValue={0}
                      maximumValue={seekableDuration}
                      value={progress.currentTime}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="#FFFFFF">
                      <Slider.Track>
                        <Slider.FilledTrack />
                      </Slider.Track>
                      <Slider.Thumb />
                    </Slider>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      position: 'absolute',
                      top: '50%',
                      transform: [{translateY: -333}],
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        videoRef?.current?.seek(parseInt(progress - 10))
                      }>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: '#fff',
                          marginHorizontal: 30,
                        }}
                        source={require('../assets/replay.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setPlay(!play)}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: '#fff',
                          marginHorizontal: 30,
                        }}
                        source={
                          play
                            ? require('../assets/pause.png')
                            : require('../assets/play.png')
                        }
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        videoRef?.current?.seek(parseInt(progress + 10))
                      }>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: '#fff',
                          marginHorizontal: 30,
                        }}
                        source={require('../assets/rewind.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {!isSwipeOptDone && (currIndex == undefined || currIndex == 0) && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/swipe-up-arrow.gif')}
                      style={{
                        width: wp('100'),
                        height: wp('12'),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                )}

                {item?.shopify_url == '' ? null : (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: hp('1'),
                      right: wp('2'),
                    }}>
                    <ShortBtn
                      style={{
                        backgroundColor:
                          wholeData?.customizationData?.bk_color_buy_btn,
                        paddingHorizontal: widthPercentageToDP('8'),
                        paddingVertical: heightPercentageToDP('1.5'),
                        borderRadius: 22,
                        bottom: 30,
                      }}
                      textStyle={{
                        color:
                          wholeData?.customizationData?.front_color_buy_btn,
                        fontSize: 15,
                        fontWeight: '400',
                      }}
                      onPress={() => Linking.openURL(item?.shopify_url)}
                      title={'Take The Hair Test'}
                    />
                  </View>
                )}
              </>
            );
          }}
          onChangeIndex={onChangeIndex}
        />
      )}
    </>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  nextButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  prevButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

//make this component available to the app
export default ShortVideo;
