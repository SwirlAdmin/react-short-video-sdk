//import libraries
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Share,
  Pressable,
  Button,
  StatusBar,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import CustomIcon from '../components/Icon';
import Video from 'react-native-video';
import {useTogglePasswordVisibility} from '../components/ShowHide';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import BottomBtns from '../components/BottomBtns';
import ShortBtn from '../components/ShortBtn';
import Chevrons from '../components/Chevrons';
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Input,
  Stack,
  TextArea,
  useToast,
} from 'native-base';
import {RegisterObj} from '../Storage/AsyncStorage';
// create a component
const HomeScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currIndex, setIndex] = useState();
  const [apiRes, setApiRes] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [serverLength, setServerLength] = useState(0);
  const [userMsg, setUserMsg] = useState('');
  const [shouldShow, setShouldShow] = useState(false);
  const [async, setAsync] = useState();
  const [username, setUsername] = React.useState('');
  const [cCode, setCcode] = React.useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const [conversion, setConversion] = useState(true);
  const [mob, setMob] = React.useState('');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  console.log(value, 'valuefsfsfvalue');
  const phoneInput = useRef(null);
  const [buffering, setBuffering] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  console.log(username, cCode, mob, 'djsafjisfjis');
  const handleButtonClick = () => {
    setIsAlertVisible(true);
  };
  // console.log(textAreaValue, 'textAreaValue');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  console.log(windowHeight, 'windowHeight');

  console.log(currIndex, 'currIndex is');
  const {
    rightIcon,
    handlePasswordVisibility,
    soundVis,
    videoCurrStatus,
    videoStatus,
    centerIcon,
  } = useTogglePasswordVisibility();
  const videoRef = useRef();
  const toast = useToast();

  const onBuffer = ({isBuffering}) => {
    setBuffering(isBuffering);
  };
  const onError = e => {
    console.log('Error raised.....', e);
  };
  console.log(buffering, 'buffering......');
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
        console.log(result, 'user registered');
        setTimeout(() => {
          RegisterObj.setUser(true);
        }, 100);
      });
  };
  useEffect(() => {
    if (sendRequest) {
      setShouldShow(false);
      //send the request
      RegisterUser(username, formattedValue.replace(value, ''), mob);
      setSendRequest(false);
    }
  }, [sendRequest]);
  let localStorageData = RegisterObj.getUser();

  localStorageData.then(val => {
    setAsync(val);
    console.log(val, '@local_storage');
  });

  const GetData = () => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'ci_session=pkaf9r6n9uhvp6pf1339v4h0qutrp6jl; ci_session=otnu03b4m9p8thnb37p5dbgspv7kioai',
    );

    var formdata = new FormData();
    formdata.append('playlistCode', 'dfXo0b');
    formdata.append('accessToken', 'abcdef');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://livevideoshopping.in/admin/APIv1/shortVideos/getPlyalistVideos',
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
        // setServerLength(serverLinks.length);
        console.log(serverLinks.length, 'length of server links');
        setApiRes(result?.Response?.videos);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => console.log('error', error));
  };
  const AskQuestion = (_uid, _did, _sid, _msg) => {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', 'ci_session=okq9kvlc524s3ho346fjr08075g4q692');

    var formdata = new FormData();
    formdata.append('user_id', _uid);
    formdata.append('designer_id', _did);
    formdata.append('msg', _msg);
    formdata.append('swirls_id', _sid);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://api.goswirl.live/index.php/Shopify/askque', requestOptions)
      .then(response => response.json())
      .then(result => console.log(result, '_mdadsaddssg'))
      .catch(error => console.log('error', error));
  };
  const onRefresh = () => {
    // setRefreshing(true);
    setTimeout(() => {
      GetData();
      // setRefreshing(false);
    }, 2000);
  };
  // if (currIndex == 0) {
  //   useEffect(() => {
  //     toast.show({
  //       description: 'Hello world',
  //     });
  //   });
  // }
  useEffect(() => {
    GetData();
  }, []);
  // useEffect(() => {
  //   if (currIndex == 0 || currIndex == 1) {
  //     videoRef.current.seek(0);
  //   }
  // }, [currIndex]);
  console.log(apiRes, 'resdsadult?.Response?.videos');
  console.log(loading, 'is there');
  const dummydata = [
    {
      id: 1,
      baseImg:
        'https://images.pexels.com/photos/3756785/pexels-photo-3756785.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      baseImg:
        'https://images.pexels.com/photos/3755918/pexels-photo-3755918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      baseImg:
        'https://images.pexels.com/photos/3756791/pexels-photo-3756791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];
  // const data = [
  //   {
  //     id: 1,
  //     link: 'https://video.gumlet.io/621770ca1c8b821b05d7035a/62c818a9f5d0db8f22705b0d/main.mp4',
  //   },
  //   {
  //     id: 2,
  //     link: 'https://video.gumlet.io/621770ca1c8b821b05d7035a/62a2d8b9773f80afa9e914a4/main.mp4',
  //   },
  // ];
  const scrollRef = useRef();

  const goToPreviousIndex = () => {
    const currIndex = scrollRef.current.getCurrentIndex();
    console.log(currIndex, 'backhere');
    if (currIndex > -1) {
      scrollRef.current.scrollToIndex({index: currIndex - 1});
    }
  };
  const goToNextIndex = () => {
    const currIndex = scrollRef.current.getCurrentIndex();
    console.log(currIndex, 'for index is');

    console.log(currIndex - 1 > 0, 'fordsad here');
    if (currIndex > -1) {
      scrollRef.current.scrollToIndex({index: currIndex + 1});
    } else {
      scrollRef.current.scrollToIndex({index: currIndex});
    }
  };
  // const rrr = apiRes;
  // console.log(rrr.cover_image, 'rrvdxfrrrdfasdsf');
  const renderItem = ({item, index}) => {
    console.log(item.designer_id, 'designer_id');
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: item?.server_url,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    // console.log(
    //   Object.keys(item?.server_url).length,
    //   'inddddsadsdsadscdfffeer',
    // );
    // Object.keys(item?.server_url).length
    return loading == true ? (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ActivityIndicator />
      </ScrollView>
    ) : (
      <>
        <View
          style={{
            paddingVertical: hp('0.2'),
            backgroundColor: '#000',
            height: windowHeight,
          }}>
          <Video
            // playInBackground={true}
            // hideShutterView={true}
            // fullscreen={true}
            // // minLoadRetryCount={2}
            // // pictureInPicture={true}
            muted={soundVis}
            source={{
              uri: item?.server_url,
            }}
            // onSeek={data => console.log('onSeek', data)}
            poster={item?.cover_image}
            posterResizeMode={'cover'}
            ref={videoRef}
            resizeMode="cover"
            onBuffer={onBuffer}
            onError={onError}
            repeat
            paused={currIndex !== index || shouldShow ? true : false}
            // paused={true}
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
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                justifyContent: 'center',
                alignSelf: 'center',
                width: wp('60'),
              }}>
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
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <CustomIcon
                style={{
                  marginHorizontal: wp('3'),
                  marginVertical: hp('1'),
                }}
                name={'scan-outline'}
                color={'#fff'}
                size={25}
              />
            </TouchableOpacity>

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
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
        {shouldShow && !async ? (
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
              borderColor="red.200"
              borderWidth="1"
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
                    backgroundColor: '#b8d445',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: hp('0.5'),
                    alignItems: 'center',
                    paddingHorizontal: hp('1'),
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Who are you?
                  </Text>

                  <Chevrons
                    IconName={'close'}
                    size={20}
                    color={'#000'}
                    onPress={() => setShouldShow(false)}
                  />
                </View>
              </Box>
              <Stack p="4" space={3}>
                <Stack>
                  <TextInput
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Your Name"
                    style={{
                      marginVertical: hp('1'),
                    }}
                  />

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
                      marginVertical: hp('1'),
                      height: hp('8'),
                    }}
                    textInputProps={{
                      maxLength: 10,
                      marginBottom: -4,
                      keyboardType: 'number-pad',
                    }}
                    withShadow
                    autoFocus
                  />
                </Stack>

                <HStack alignItems="center" justifyContent={'center'}>
                  {/* <Button
                   title="Send"
                   color="#b8d445"
                   accessibilityLabel="ask questions from traya"
                 /> */}
                  <TouchableOpacity
                    disabled={
                      username.length && value.length == '' ? true : false
                    }
                    style={{
                      backgroundColor: '#b8d445',
                      paddingVertical: hp('0.8'),
                      paddingHorizontal: wp('10'),
                      borderRadius: 22,
                      width: wp('80'),
                    }}
                    onPress={() => setSendRequest(true)}>
                    <Text style={{color: '#fff', alignSelf: 'center'}}>
                      Register
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </Stack>
            </Box>
          </Box>
        ) : null}
        {shouldShow && async ? (
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
              borderColor="coolGray.200"
              borderWidth="1"
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
                    backgroundColor: '#b8d445',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: hp('0.5'),
                    alignItems: 'center',
                    paddingHorizontal: hp('1'),
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Ask Question
                  </Text>

                  <Chevrons
                    IconName={'close'}
                    size={20}
                    color={'#000'}
                    onPress={() => setShouldShow(false)}
                  />
                </View>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={12}>
                  <TextArea
                    value={userMsg}
                    onChange={e => setUserMsg(e.currentTarget.value)} // for web
                    onChangeText={text => setUserMsg(text)}
                    h={20}
                    placeholder="Type Here"
                    w={400}
                    maxW="100%"
                  />
                </Stack>

                <HStack alignItems="center" justifyContent={'center'}>
                  {/* <Button
                   title="Send"
                   color="#b8d445"
                   accessibilityLabel="ask questions from traya"
                 /> */}
                  <TouchableOpacity
                    disabled={userMsg.length == '' ? true : false}
                    style={{
                      backgroundColor:
                        userMsg.length == '' ? '#d3d3d3' : '#b8d445',
                      paddingVertical: hp('0.8'),
                      paddingHorizontal: wp('10'),
                      borderRadius: 22,
                    }}
                    onPress={() => {
                      AskQuestion(18580, 1234, 3412, userMsg, item.designer_id),
                        setShouldShow(false);
                      setUserMsg('');
                    }}>
                    <Text
                      style={{color: userMsg.length == '' ? '#fff' : '#000'}}>
                      Send
                    </Text>
                  </TouchableOpacity>
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
          }}>
          <BottomBtns
            sharePress={onShare}
            chatPress={() => {
              setConversion(true);
              setShouldShow(true);
              setConversion(false);
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            alignSelf: 'center',
            right: 12,
          }}>
          <ActivityIndicator
            animating
            size="large"
            color={'#bfd85b'}
            style={buffering ? {opacity: 1} : {opacity: 0}}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: hp('1'),
            right: wp('2'),
          }}>
          <ShortBtn
            // onPress={() => RegisterObj.clearUser()}
            onPress={() => Alert.alert('Navigation')}
            title={'Take The Hair Test'}
          />
        </View>
        {/* <View
          style={{
            position: 'absolute',
            left: 0,
            alignSelf: 'center',
          }}>
          <Chevrons
            style={
              currIndex == -1 || currIndex == 0 || currIndex == undefined
                ? {display: 'none'}
                : null
            }
            onPress={
              currIndex == -1 || currIndex == 0 || currIndex == undefined
                ? () => alert('hi')
                : goToPreviousIndex
            }
            IconName={'chevron-back'}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            right: 0,
            alignSelf: 'center',
          }}>
          <Chevrons
            style={
              currIndex == serverLength - 1 || currIndex == undefined
                ? {display: 'none'}
                : null
            }
            onPress={goToNextIndex}
            IconName={'chevron-forward'}
          />
        </View> */}
      </>
    );
  };
  const onChangeIndex = ({index}) => {
    setIndex(index);
  };
  return (
    <ImageBackground
      source={{
        uri: 'https://www.nicepng.com/png/full/447-4478234_starburst-background-png-clipart-royalty-free-stock-starburst.png',
      }}
      style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#b8d445"
        // translucent={true}
      />
      <FlatList
        style={{flex: 1}}
        data={dummydata}
        showsVerticalScrollIndicator={false}
        renderItem={item => {
          return (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.6}
              style={{
                paddingVertical: hp('0.2'),
                backgroundColor: '#414042',
                borderRadius: 22,
                marginVertical: hp('1'),
                justifyContent: 'center',
                alignItems: 'center',
                //   width: wp('65'),
                alignSelf: 'center',
                paddingHorizontal: wp('0.6'),
              }}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.item.baseImg,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {loading ? (
          // <ScrollView
          //   contentContainerStyle={{
          //     flex: 1,
          //     backgroundColor: '#000',
          //   }}
          //   // refreshControl={
          //   //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          //   // }
          // >
          //   <View
          //     style={{
          //       flex: 1,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //     }}>
          //     <Text
          //       style={{
          //         fontSize: 22,
          //         textAlign: 'center',
          //         fontWeight: 'bold',
          //         color: '#fff',
          //       }}>
          //       Your internet seems to be slow
          //     </Text>
          //     <Text
          //       style={{
          //         fontSize: 16,
          //         marginVertical: hp('2'),
          //         textAlign: 'center',
          //         width: wp('80'),
          //         color: '#fff',
          //       }}>
          //       Check you internet connection and try again
          //     </Text>
          //     <TouchableOpacity
          //       onPress={onRefresh}
          //       style={{
          //         flexDirection: 'row',
          //         alignItems: 'center',
          //         backgroundColor: '#b9d446',
          //         width: wp('80%'),
          //         justifyContent: 'center',
          //       }}>
          //       <CustomIcon
          //         name={'reload'}
          //         size={20}
          //         style={{paddingVertical: hp('1.5')}}
          //         color={'#fff'}
          //         // onPress={() => setAskQueBox(!modalVisible)}
          //       />
          //       <Text
          //         style={{
          //           fontWeight: '500',
          //           marginLeft: wp('2'),
          //           fontSize: 16,
          //           color: '#fff',
          //         }}>
          //         TRY AGAIN
          //       </Text>
          //     </TouchableOpacity>
          //   </View>
          // </ScrollView>
          <ActivityIndicator style={{flex: 1}} size={'large'} />
        ) : (
          <SwiperFlatList
            ref={scrollRef}
            horizontal
            scrollEnabled={shouldShow ? false : true}
            data={apiRes}
            renderItem={renderItem}
            onChangeIndex={onChangeIndex}
          />
        )}
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={askQueBox}
        onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          setAskQueBox(!askQueBox);
        }}></Modal> */}
    </ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  tinyLogo: {
    width: wp('60'),
    height: hp('30'),
    borderRadius: 22,
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
});

//make this component available to the app
export default HomeScreen;
