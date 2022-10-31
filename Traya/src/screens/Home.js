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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomIcon from '../components/Icon';
import Video from 'react-native-video';
import {useTogglePasswordVisibility} from '../components/ShowHide';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import BottomBtns from '../components/BottomBtns';
import ShortBtn from '../components/ShortBtn';
import Chevrons from '../components/Chevrons';
import {useToast} from 'native-base';

// create a component
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currIndex, setIndex] = useState();
  const [apiRes, setApiRes] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [serverLength, setServerLength] = useState(0);
  const [askQueBox, setAskQueBox] = useState(false);

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
  const [password, setPassword] = useState('');
  const videoRef = useRef();
  const toast = useToast();

  const onBuffer = e => {
    console.log('Buffering.....', e);
  };
  const onError = e => {
    console.log('Error raised.....', e);
  };

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
        setServerLength(serverLinks.length);
        console.log(serverLinks.length, 'length of server links');
        setApiRes(result?.Response?.videos);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => console.log('error', error));
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      GetData();
      setRefreshing(false);
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
  //   if (!!videoRef.current) {
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
            poster={item?.cover_image}
            posterResizeMode={'cover'}
            ref={videoRef}
            autoplayLoopKeepAnimation
            resizeMode="cover"
            onBuffer={onBuffer}
            onError={onError}
            repeat
            paused={currIndex !== index}
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
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}>
          <BottomBtns />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: hp('2'),
            right: wp('2'),
          }}>
          <ShortBtn title={'Take The Hair Test'} />
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
        animationType="none"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {loading ? (
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <ActivityIndicator size={'large'} color="#b9d446" />
            <Text
              style={{
                fontSize: 16,
                marginVertical: hp('4'),
                textAlign: 'center',
              }}>
              trying to connect...{'\n'}pull for retry...
            </Text>
          </ScrollView>
        ) : (
          <SwiperFlatList
            ref={scrollRef}
            horizontal
            paginationActiveColor="red"
            data={apiRes}
            renderItem={renderItem}
            onChangeIndex={onChangeIndex}
          />
        )}
      </Modal>
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
});

//make this component available to the app
export default HomeScreen;
