//import libraries
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeScreen = props => {
  const dummydata = [
    {
      id: 1,
      baseImg:
        'https://images.pexels.com/photos/3756785/pexels-photo-3756785.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      accessToken: '34vu4367n8f8f38ghcpr',
      playlistCode: 'BA0LeY',
      baseImg:
        'https://images.hdqwalls.com/wallpapers/pubg-royale-2020-4k-1a.jpg',
    },
    {
      id: 3,
      baseImg:
        'https://images.pexels.com/photos/3756791/pexels-photo-3756791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      // accessToken: 'wnu8pt',
      // playlistCode: 'g1T5aH',
      baseImg: 'https://wallpaperaccess.com/full/1251318.jpg',
    },
    {
      id: 5,
      accessToken: 'awdlsuezjficqginlsdr',
      playlistCode: '46bVki',
      baseImg: 'https://wallpaperaccess.com/full/2126183.jpg',
    },
    {
      id: 6,
      accessToken: 'awdlsuezjficqginlsdr',
      playlistCode: '46bVki',
      baseImg:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 7,
      accessToken: 'awdlsuezjficqginlsdr',
      playlistCode: 'dty2B7',
      baseImg:
        'https://www.pixelstalk.net/wp-content/uploads/2016/05/Gaming-Backgrounds-Pictures-HD.png',
    },
    {
      id: 8,
      accessToken: 'awdlsuezjficqginlsdr',
      playlistCode: 'dty2B7',
      baseImg:
        'https://cdn.now.gg/apps-content/com.ludo.king/banner/desktop/ludo-king%E2%84%A2.jpg',
    },
  ];

  const rrr = dummydata.filter(e => {
    return e.accessToken;
  });
  console.log(rrr, 'converted dummy data');

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={'#fff'}
        // translucent={true}
      />
      <FlatList
        style={{flex: 1}}
        data={rrr}
        showsVerticalScrollIndicator={false}
        renderItem={(item,index) => {
          console.log(item?.item, 'hedfdsfyyy');
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('SVideo', {data: item?.item, index:index})
              }
              activeOpacity={0.6}
              style={{
                paddingVertical: hp('0.2'),
                backgroundColor: '#414042',
                borderRadius: 22,
                marginVertical: hp('1'),
                justifyContent: 'center',
                alignItems: 'center',
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
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  tinyLogo: {
    width: wp('90'),
    height: hp('15'),
    borderRadius: 22,
  },
});

//make this component available to the app
export default HomeScreen;
