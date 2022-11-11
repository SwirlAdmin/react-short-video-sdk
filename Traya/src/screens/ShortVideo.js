//import liraries
import {Box, HStack, Stack, TextArea} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Share,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Linking,
  StatusBar,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
// import {usePipModeListener} from 'react-native-pip-android';
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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userMsg, setUserMsg] = useState('');
  const [shouldShow, setShouldShow] = useState(false);
  const [regShow, setRegShow] = useState(false);
  const [wholeData, setWholeData] = React.useState('');

  const [async, setAsync] = useState();
  const [username, setUsername] = React.useState('');
  //   const [sendRequest, setSendRequest] = useState(false);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);
  const [buffering, setBuffering] = useState(true);
  const [filtereData, setFiltereData] = useState('');
  const windowHeight = Dimensions.get('window').height;
  const {data} = route.params;

  console.log(
    username,
    formattedValue.replace(value, ''),
    value,
    userMsg,

    'erueiworuewrieddsdfsdffsfiorie',
  );
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
  // const inPipMode = usePipModeListener();
  const onBuffer = ({isBuffering}) => {
    setBuffering(isBuffering);
  };
  const onError = e => {
    console.log('Error raised.....', e);
  };
  console.log(buffering, 'buffering......');
  const scrollRef = useRef();
  const GetData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'ci_session=pkaf9r6n9uhvp6pf1339v4h0qutrp6jl; ci_session=f8sfka5a9v8ee7ljshhtr1falka1vr6g',
    );

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
      'https://livevideoshopping.in/admin/APIv1/shortVideos/getPlyalistVideos',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result?.Response?.videos, 'fsfnjsfn');
        setWholeData(result?.Response);
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
    setTimeout(() => {
      GetData();
    }, 2000);
  };
  console.log(
    wholeData?.customizationData?.bk_color_buy_btn,
    'resudslt?.Responseresult?.Response',
  );
  useEffect(() => {
    GetData();
  }, []);

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
          setRegShow(false);
        }, 100);
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
      .then(result => console.log(result, 'asdjwjewjeieijwijei'))
      .catch(error => console.log('error', error));
  };
  //   useEffect(() => {
  //     if (sendRequest) {
  //       setShouldShow(false);
  //       RegisterUser(username, formattedValue.replace(value, ''), value);
  //       setSendRequest(false);
  //     }
  //   }, [sendRequest]);
  let localStorageData = RegisterObj.getUser();

  localStorageData.then(val => {
    setAsync(val);
    console.log(val, '@local_storage');
  });
  const onChangeIndex = ({index}) => {
    setIndex(index);
  };
  console.log(currIndex, 'hdsjkadhiasdh');
  return (
    <SwiperFlatList
      ref={scrollRef}
      horizontal
      scrollEnabled={shouldShow ? false : true}
      data={apiRes}
      renderItem={({item, index}) => {
        console.log(item?.shopify_url, 'osdsfdfsdfpodsdfpo');
        currIndex == index ? PostView(item.video_id) : null;
        console.log(index, 'sddcdsfddsaddsdasfasdfuyshfushf');
        const onShare = async () => {
          try {
            const result = await Share.share({
              message: item?.server_url,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
              } else {
              }
            } else if (result.action === Share.dismissedAction) {
            }
          } catch (error) {
            alert(error.message);
          }
        };
        //SHARE FUNCTIONALITY
        ////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////

        //INSIDE CARDS FUNCTIONALITY
        ////////////////////////////////////////////////////////////////////

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
                // playInBackground={true}
                ref={videoRef}
                resizeMode="cover"
                onBuffer={onBuffer}
                onError={onError}
                repeat
                playWhenInactive={true}
                playInBackground={true}
                paused={currIndex !== index || shouldShow ? true : false}
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
                  color={
                    wholeData?.customizationData?.front_color_add_to_cart_btn
                  }
                  onPress={() => setShouldShow(false)}
                />
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
                  onPress={() => alert('In Progress')}
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                              ?.front_color_add_to_cart_btn,
                          fontSize: 16,
                          fontWeight: '500',
                        }}>
                        Ask Question
                      </Text>

                      <Chevrons
                        IconName={'close'}
                        size={20}
                        color={
                          wholeData?.customizationData
                            ?.front_color_add_to_cart_btn
                        }
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
                            userMsg.length == ''
                              ? '#d3d3d3'
                              : wholeData?.customizationData?.bk_color_buy_btn,
                          paddingVertical: hp('0.8'),
                          paddingHorizontal: wp('10'),
                          borderRadius: 22,
                        }}
                        //                     onPress={() => {
                        // setShouldShow(false);
                        // RegisterUser(username, formattedValue.replace(value, ''), value);
                        //   AskQuestion(
                        //     18580,
                        //     1234,
                        //     3412,
                        //     userMsg,
                        //     item.designer_id,
                        //   ),
                        //     setShouldShow(false);
                        //   setUserMsg('');
                        //   setRegShow(true);
                        //                     }}
                        onPress={() => {
                          if (!async) {
                            setRegShow(true);
                          } else {
                            AskQuestion(
                              18580,
                              1234,
                              3412,
                              userMsg,
                              item.designer_id,
                            ),
                              setShouldShow(false);
                            setUserMsg('');
                            setRegShow(true);
                          }
                        }}
                        // onPress={
                        //   !async
                        //     ? this.makeRemoteRequest.bind(this)
                        //     : () =>
                        //         Alert.alert(
                        //           'Please fill the service detail first',
                        //         )
                        // }
                      >
                        <Text
                          style={{
                            color:
                              userMsg.length == ''
                                ? '#fff'
                                : wholeData?.customizationData
                                    ?.front_color_add_to_cart_btn,
                          }}>
                          Send
                        </Text>
                      </TouchableOpacity>
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
                              ?.front_color_add_to_cart_btn,
                          fontSize: 16,
                          fontWeight: '500',
                        }}>
                        Who are you?
                      </Text>

                      <Chevrons
                        IconName={'close'}
                        size={20}
                        color={
                          wholeData?.customizationData
                            ?.front_color_add_to_cart_btn
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
                        placeholder="Your Name"
                        style={{
                          marginVertical: hp('1'),
                          fontSize: 16,
                          fontWeight: '500',
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
                          // marginVertical: hp('1'),
                          // height: hp('8'),
                        }}
                        textInputProps={{
                          maxLength: 10,
                          // marginBottom: -4,
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
                          username.length == '' || value.length == 0
                            ? true
                            : false
                        }
                        style={{
                          backgroundColor:
                            username.length == '' || value.length == 0
                              ? '#d3d3d3'
                              : wholeData?.customizationData?.bk_color_buy_btn,
                          paddingVertical: hp('0.8'),
                          paddingHorizontal: wp('10'),
                          borderRadius: 22,
                          width: wp('80'),
                        }}
                        onPress={() => {
                          RegisterUser(
                            username,
                            formattedValue.replace(value, ''),
                            value,
                          );
                        }}>
                        <Text
                          style={{
                            color:
                              wholeData?.customizationData
                                ?.front_color_add_to_cart_btn,
                            alignSelf: 'center',
                          }}>
                          Register
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
                  setShouldShow(true);
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
                  }}
                  textStyle={{
                    color:
                      wholeData?.customizationData?.front_color_add_to_cart_btn,
                    fontSize: 15,
                    fontWeight: '400',
                  }}
                  // onPress={() => RegisterObj.clearUser()}
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
export default ShortVideo;
