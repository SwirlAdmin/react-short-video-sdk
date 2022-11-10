//import libraries
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
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
      accessToken: 'abcdef',
      playlistCode: 'dfXo0b',
      baseImg:
        'https://www.pixelstalk.net/wp-content/uploads/images1/Medical-Wallpapers-HD-768x480.jpg',
    },
    {
      id: 3,
      baseImg:
        'https://images.pexels.com/photos/3756791/pexels-photo-3756791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      accessToken: 'abcdef',
      playlistCode: 'LyftMe',
      baseImg:
        'https://img.freepik.com/free-vector/hairdressing-salon-background-with-cartoon-woman_52683-73971.jpg?w=2000',
    },
    {
      id: 5,
      accessToken: 'abcdef',
      playlistCode: 'dfXo0b',
      baseImg:
        'https://c4.wallpaperflare.com/wallpaper/737/93/233/computer-hi-tech-technology-wallpaper-preview.jpg',
    },
  ];

  const rrr = dummydata.filter(e => {
    return e.accessToken;
  });
  console.log(rrr, 'fsfddsfsfsd3df');

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
        data={rrr}
        showsVerticalScrollIndicator={false}
        renderItem={item => {
          console.log(item?.item, 'hedfdsfyyy');
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('SVideo', {data: item?.item})
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
