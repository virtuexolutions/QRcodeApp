import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Touchable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import ImageView from 'react-native-image-viewing';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useFocus} from 'native-base/lib/typescript/components/primitives';
import CustomImage from '../Components/CustomImage';
import {baseUrl} from '../Config';

const GalleryView = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);

  const [selectedItem, setSelectedItem] = useState('image');
  console.log('🚀 ~ GalleryView ~ selectedItem:', selectedItem);

  const [visible, setIsVisible] = useState(false);
  const [yestImageIsVisible, setYestImageVisible] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  console.log('🚀 ~ GalleryView ~ galleryImages:', galleryImages);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  console.log('🚀 ~ GalleryView ~ imageUrls:', imageUrls);
  const onSelect = index => {
    console.log('🚀 ~ onSelect ~ onSelect:', onSelect);
    setIsVisible(true);
    setImageIndex(index);
  };

  const GetQrcodes = async () => {
    const url = `auth/document?type=${selectedItem}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    console.log('User tooken ==>', token);
    if (response != undefined) {
      console.log('QR===>', response?.data);
      setGalleryImages(response?.data?.info);
      setImageUrls(
        response?.data?.info?.map((item, index) => {
          return {uri: `${baseUrl}${item.image}`};
        }),
      );
    }
  };
  useEffect(() => {
    if (selectedItem != '') {
      GetQrcodes();
    }
  }, [selectedItem]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: moderateScale(50, 0.6),
      }}
      style={styles.mainScreen}>
      <View style={styles.row}>
        <CustomButton
          iconStyle={{
            width: windowWidth * 0.09,
            height: windowHeight * 0.05,
            textAlign: 'center',
            paddingTop: moderateScale(15, 0.6),
            fontSize: moderateScale(24, 0.6),
            color: Color.white,
          }}
          iconName="chevron-left"
          iconType={Feather}
          iconSize={18}
          color={Color.white}
          marginTop={moderateScale(5, 0.3)}
          // text={'Use'}
          isGradient={true}
          onPress={() => {
            navigation.goBack();
          }}
          bgColor={Color.themeBgColor}
          width={windowHeight * 0.06}
          height={windowHeight * 0.06}
        />

        <CustomText
          isBold
          style={{
            fontSize: moderateScale(22, 0.6),
            width: windowWidth * 0.53,
            color: Color.themeblue,
            // backgroundColor:'red',
          }}>
          gallery
        </CustomText>
      </View>
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              borderBottomWidth: selectedItem == 'image' ? 1 : 0,
              borderColor:
                selectedItem == 'image' ? Color.themeblue : '#9B9B9B',
              color: selectedItem == 'image' ? Color.themeblue : Color.black,
            }}
            onPress={() => {
              setSelectedItem('image');
            }}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>Images</CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('i m Text here');
              setSelectedItem('text');
            }}
            style={{
              borderBottomWidth: selectedItem == 'text' ? 1 : 0,
              borderColor: selectedItem == 'text' ? Color.themeblue : '#9B9B9B',
              color: selectedItem == 'text' ? Color.themeblue : 'black',
            }}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>Text</CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem('url');
            }}
            style={{
              borderBottomWidth: selectedItem == 'url' ? 1 : 0,
              borderColor: selectedItem == 'url' && Color.themeblue,
              color: selectedItem == 'url' ? Color.themeblue : 'black',
            }}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>url</CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem('pdf');
            }}
            style={{
              borderBottomWidth: selectedItem == 'pdf' ? 1 : 0,
              borderColor: selectedItem == 'pdf' && Color.themeblue,
              color: selectedItem == 'pdf' ? Color.themeblue : 'black',
            }}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>pdf</CustomText>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.todaySection}>
          {isLoading ? (
            <ActivityIndicator
              style={{alignItems: 'center', height: windowHeight * 0.65}}
              size={'large'}
              color={Color.themeblue}
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
              numColumns={3}
              data={galleryImages}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                // backgroundColor :'red',
                paddingTop: moderateScale(10, 0.6),
                paddingBottom: moderateScale(50, 0.6),
                // alignItems : 'center'
              }}
              style={{
                width: windowWidth * 0.95,
                alignSelf: 'center',
              }}
              renderItem={({item, index}) => {
                console.log(
                  '🚀 ~ GalleryView ~ item:',
                  `${baseUrl}${item?.image}`,
                );
                return (
                  <View>
                    <View style={styles.imageContainer}>
                      <CustomImage
                        onPress={() => onSelect(index)}
                        source={{uri: `${baseUrl}${item?.image}`}}
                        style={styles.galleryImg}
                        // resizeMode="cover"
                      />
                    </View>
                    <CustomText
                      numberOfLines={1}
                      isBold
                      style={{
                        marginVertical: moderateScale(2, 0.3),

                        paddingLeft: moderateScale(8, 0.6),
                        // backgroundColor :'red',
                        width: windowWidth * 0.25,
                        fontSize: moderateScale(13, 0.6),
                        color: 'black',
                        marginHorizontal: moderateScale(10, 0.3),
                        // textAlign :'center',
                      }}>
                      {/* jsgahsgdhgajsgdjagsjdhgagdasdgaj */}
                      {item?.qr_name}
                    </CustomText>
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      width: '100%',
                      height: windowHeight * 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: windowWidth * 0.25,
                        height: windowHeight * 0.15,

                        // backgroundColor:'red',
                      }}>
                      <CustomImage
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                        source={require('../Assets/Images/emptybox.png')}
                      />
                    </View>
                  </View>
                );
              }}
            />
          )}
          <View style={{
            width :windowWidth*0.7,
            marginHorizontal :moderateScale(20,.3),
            backgroundColor:'red',
}}>
            <ImageView
              backgroundColor={'#002F58'}
              images={imageUrls}
              imageIndex={currentImageIndex}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GalleryView;

const styles = StyleSheet.create({
  mainScreen: {
    width: windowWidth,
    height: windowHeight,
  },
  todaySection: {
    // alignItems:'center',
    width: windowWidth,
    paddingHorizontal: moderateScale(15, 0.2),
  },
  galleryImg: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: windowWidth * 0.28,
    height: windowHeight * 0.12,
    margin: moderateScale(6, 0.6),
    // borderRadius: 9,
    // overflow: 'hidden',
  },
  tabBarButton: {
    // borderBottomWidth: 1,
    paddingVertical: moderateScale(3, 0.7),
    // borderBottomColor: Color.darkGray,
    alignItems: 'center',
  },
  container: {
    width: windowWidth,
    height: windowHeight * 0.07,
    paddingVertical: moderateScale(12, 0.5),
    paddingHorizontal: moderateScale(15, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(25, 0.6),
    // paddingBottom:moderateScale(30,.6),
    // backgroundColor:'red'
    // overflow: 'hidden',
    // gap: 0,
  },
  row: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
