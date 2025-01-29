import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
  SafeAreaView,
  LogBox,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import {Icon} from 'native-base';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {Text} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchbarComponent from '../Components/SearchbarComponent';
import CardComponent from '../Components/CardComponent';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  height,
  resizeMode,
  width,
} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const HomeScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ HomeScreen ~ userData:============>', userData);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ HomeScreen ~ token============>:', token);
  const [search, setSearch] = useState('');
  const dataArray = [
    {
      id: 1,
      image: require('../Assets/Images/Qrscan1.png'),
      title: 'QRCODE SCANNER',
      onPress: () => navigation.navigate('ScanScreen'),
      // description: 'Decode QR codes instantly with a single tap. Scan and explore the digital world effortlessly.',
    },
    {
      id: 2,
      image: require('../Assets/Images/Qrscan2.png'),
      title: 'GENERATE QRCODE',
      onPress: () => navigation.navigate('LinkUrlScreen'),
      // description: 'Create bespoke QR codes that are suited to your specific needs. Custom QR codes can help to empower your messaging.',
    },
    {
      id: 3,
      image: require('../Assets/Images/Qrscan3.png'),
      title: 'QR Code Gallery',
      onPress: () => navigation.navigate('GalleryView'),
      // description: 'View and explore your generated QR codes, seamlessly blending creativity with functionality',
    },
    // {
    //   id: 4,
    //   image: require('../Assets/Images/cardimage4.png'),
    //   title: 'Generate image QR',
    //   onPress: () =>
    //     navigation.navigate('LinkUrlScreen', {
    //       fromGenerateimage: true,
    //       item: {title: 'image'},
    //     }),
    //   // onpress:()=> navigation.navigate('LinkUrlScreen', {item: item}),
    //   description: 'Each image combines creativity and functionality. QR integration transforms photos into interactive experiences. ',
    // },
    // {
    //   id:5,
    //   image:require('../Assets/Images/cardimage.png'),
    //   title:'QR SCAN',
    //   description:'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.'
    // },
  ];

  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);
  return (
    // <LinearGradient
    //   start={{x: 0, y: 1}}
    //   end={{x: 1, y: 1}}
    //   colors={['#49C3E9', '#0066FF']}
    //   style={styles.mainContainer}>
    <SafeAreaView style={styles.mainContainer}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // paddingBottom: moderateScale(20, 0.6),
          // justifyContent: 'center',
          // alignItems: 'center',
        }}> */}
      <View style={styles.container}>
        <View style={styles.mainView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}
            style={styles.imagecontainer}>
            <CustomImage
              // onPress={() => {
              //   navigation.navigate('Profile');
              // }}
              style={{
                height: '100%',
                width: '100%',
              }}
              source={
                userData?.photo
                  ? {uri: userData?.photo}
                  : require('../Assets/Images/user.png')
              }
            />
          </TouchableOpacity>

          <View
            style={{
              paddingHorizontal: moderateScale(15, 0.6),
            }}>
            <CustomText
              style={[
                styles.text1,
                {
                  fontSize: moderateScale(18, 0.6),
                  color: Color.white,
                  fontWeight: 'bold',
                  // backgroundColor:'red',
                  width: windowWidth * 0.35,
                },
              ]}>
              {userData?.first_name}
            </CustomText>
          </View>
        </View>

        <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();}}
        >
          <View style={styles.generalBtn}>
            <Icon
              name="menu"
              as={Entypo}
              size={moderateScale(20, 0.6)}
              color={Color.white}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* <View
          style={{
            paddingVertical: moderateScale(20, 0.6),
          }}>
          <SearchbarComponent
          search={search}
          setSearch={setSearch}
            placeHolderColor={Color.veryLightGray}
            placeholderName={'Search..'}
            SearchStyle={{
              width: windowWidth * 0.9,
              backgroundColor: Color.white,
              // borderColor:Color.themeblue
            }}
          />
        </View> */}
      {/* <View
          style={{
            paddingVertical: moderateScale(20, 0.6),
          }}
        >
          <LinearGradient
            colors={['#001D55', '#012497']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.cardContainner}>
            <View>
              <CustomText isBold style={styles.cardtitle}>
                QR CODE GENERATOR
              </CustomText>
              <CustomText style={styles.carddes}>
              Easily generate dynamic QR codes for every occasion. Our user-friendly QR code generator opens up a world of possibilities.
              </CustomText>
              <CustomButton
                // onPres s={() => navigationService.navigate('LoginScreen')}
                text={'Join Now'}
                fontSize={moderateScale(9, 0.3)}
                textColor={'#002F58'}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.2}
                height={windowHeight * 0.04}
                marginTop={moderateScale(10, 0.3)}
                bgColor={Color.white}
                alignSelf={'left'}
                isBold
                // isGradient
              />
            </View>
            <View style={styles.imagecontainer2}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../Assets/Images/cardimage.png')}
              />
            </View>
          </LinearGradient>
        </View> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: moderateScale(20, 0.6),
        }}>
        {/* <View> */}
        <View
          style={{
            alignSelf: 'flex-start',
            // marginTop:moderateScale(25,0.6),
            // backgroundColor:'red'
            // paddingVertical:moderateScale(40,0.6)
            // justifyContent:'center'
          }}>
          <FlatList
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            data={dataArray}
            keyExtractor={item => item.id}
            numColumns={1}
            contentContainerStyle={{
              gap: moderateScale(15, 0.6),
              // marginHorizontal: moderateScale(10, 0.3),
              // marginVertical: moderateScale(10, 0.3),
              padding: moderateScale(20, 0.6),
              // paddingHorizontal:moderateScale(10,0.6),
              // marginLeft:moderateScale(15,0.6),
              // paddingBottom: moderateScale(50, 0.6),
              // backgroundColor:'green'
            }}
            renderItem={({item, index}) => {
              return <CardComponent item={item} />;
            }}
          />
        </View>

        <View style={styles.scanImageStyle}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            resizeMode={'contain'}
            source={require('../Assets/Images/Qrscan.png')}
          />
        </View>
        {/* </View> */}
      </View>
      <View
        style={{
          width: windowWidth * 0.78,
          position: 'absolute',
          bottom: moderateScale(35, 0.6),
          alignSelf: 'center',
        }}>
        <CustomText
          style={{
            fontSize: moderateScale(11, 0.6),
            color: Color.white,
            textAlign: 'center',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suscipit
          gravida tellus, eu ullamcorper.
        </CustomText>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
    //</LinearGradient>
    // </ImageBackground>
  );
};

export default HomeScreen;
const styles = ScaledSheet.create({
  text1: {
    fontSize: moderateScale(10, 0.6),
    // color: Color.white,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'green',
    width: windowWidth,
    paddingHorizontal: moderateScale(14, 0.6),
    // marginHorizontal: moderateScale(15, 0.3),
    paddingVertical: moderateScale(5, 0.6),
    alignItems: 'center',
    marginTop: moderateScale(15, 0.3),
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  imagecontainer: {
    width: windowHeight * 0.065,
    height: windowHeight * 0.065,
    borderRadius: (windowHeight * 0.065) / 2,
    overflow: 'hidden',
  },
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
    // alignItems:'center',
    backgroundColor: Color.themesplashblack,
  },
  // icon: {
  //   height: windowHeight * 0.042,
  //   width: windowHeight * 0.06,
  //   // borderRadius: moderateScale(25.05),
  //   // backgroundColor: Color.white,
  //   alignItems: 'center',
  //   // justifyContent: 'center',
  // },
  cardtitle: {
    fontSize: moderateScale(22, 0.6),
    // color: '#1F1D2B',
    color: Color.white,
    width: windowWidth * 0.5,
    textTransform: 'uppercase',
  },
  carddes: {
    // backgroundColor:'red',
    color: Color.veryLightGray,
    width: windowWidth * 0.5,
    fontSize: moderateScale(10, 0.6),
  },
  imagecontainer2: {
    // justifyContent : 'center',
    height: windowHeight * 0.2,
    width: windowWidth * 0.35,
  },
  cardContainner: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    borderRadius: moderateScale(18, 0.6),
    // height: windowHeight * 0.23,
    width: windowWidth * 0.9,
    alignItems: 'center',
    paddingVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  generalBtn: {
    borderColor: Color.white,
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    borderWidth: moderateScale(1, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(100, 0.9),
  },
  scanImageStyle: {
    width: windowWidth * 0.93,
    height: windowHeight * 0.45,
    // overflow:'hidden'
    // top:moderateScale(15,0.6),
    // borderRadius:moderateScale(30,0.6),
    // backgroundColor:'green',
    // left:moderateScale(20,0.6)
  },
});
