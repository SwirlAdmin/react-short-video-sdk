//import libraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {NativeBaseProvider, Box} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VideoPlayer from 'react-native-video-player';
import CustomIcon from '../components/Icon';
// create a component
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPause, setIsPaused] = useState(false);

  const data = [
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

  return (
    <ImageBackground
      source={{
        uri: 'https://www.nicepng.com/png/full/447-4478234_starburst-background-png-clipart-royalty-free-stock-starburst.png',
      }}
      style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={data}
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
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: '#69cc98',
          }}>
          <VideoPlayer
            video={{
              uri: 'https://video.gumlet.io/621770ca1c8b821b05d7035a/62a2d8b9773f80afa9e914a4/main.mp4',
            }}
            hideControlsOnStart
            autoplay
            loop
            // customStyles={{seekBarBackground: 'green'}}
            // seek={3}
            // endWithThumbnail
            // useTextureView
            resizeMode={'cover'}
            controls={false}
            pauseOnPress
            volume={1}
            videoWidth={wp('100')}
            videoHeight={hp('97.5')}
            thumbnail={{
              uri: 'https://swirl-assets.s3.ap-south-1.amazonaws.com/video/image/62c818af3283c29113_H1-8901030851667-removebg-preview_600x600_crop_center.png',
            }}
          />
          {/* <CustomIcon name={'add'} color={'red'} size={18} /> */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <CustomIcon
                  style={{marginHorizontal: wp('1'), marginVertical: hp('1')}}
                  name={'ellipsis-vertical'}
                  color={'#fff'}
                  size={25}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                Sumit Testimonial
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
              <TouchableOpacity>
                <CustomIcon
                  style={{marginHorizontal: wp('1'), marginVertical: hp('1')}}
                  name={'scan-circle-outline'}
                  color={'#fff'}
                  size={35}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <CustomIcon
                  style={{marginHorizontal: wp('1'), marginVertical: hp('1')}}
                  name={'volume-low-outline'}
                  color={'#fff'}
                  size={35}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <CustomIcon
                  style={{marginHorizontal: wp('1'), marginVertical: hp('1')}}
                  name={'close-circle-outline'}
                  color={'#fff'}
                  size={35}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('2'),
    marginHorizontal: wp('2'),
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  tinyLogo: {
    width: wp('60'),
    height: hp('30'),
    borderRadius: 22,
  },
  logo: {
    width: 66,
    height: 58,
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
