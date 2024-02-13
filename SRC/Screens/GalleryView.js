import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Touchable,
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

const GalleryView = () => {
  const isFoucsed = useIsFocused();
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const [selectedItem, setSelectedItem] = useState('Images');
  console.log('🚀 ~ GalleryView ~ selectedItem:', selectedItem);

  const [visible, setIsVisible] = useState(false);
  const [yestImageIsVisible, setYestImageVisible] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  console.log('🚀 ~ GalleryView ~ galleryImages:', galleryImages);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setImageIndex] = useState(0);
  const [currentYesterdayImageIndex, setYesterdayImageIndex] = useState(0);
  const onSelect = index => {
    setIsVisible(true);
    setImageIndex(index);
    // setYesterdayImageIndex(index);
  };
  
  var imageUrls = [
   
  ];
  const secondImagesArray = [
    // {
    //   uri: 'https://images.pexels.com/photos/6404058/pexels-photo-6404058.jpeg',
    // },
    // {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    // },
    // {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    // },
    // {
    //   uri: 'https://images.pexels.com/photos/4947151/pexels-photo-4947151.jpeg',
    // },
    // {
    //   uri: 'https://images.pexels.com/photos/6404058/pexels-photo-6404058.jpeg',
    // },
    // {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    // },
    // {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
    // },
    // {
    //   uri: 'https://images.pexels.com/photos/4947151/pexels-photo-4947151.jpeg',
    // },
  ];

  const saveImages = async () => {
    const url = 'auth/document';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response !== undefined) {
      // console.log(galleryImages[0])
      //  return console.log("🚀 ~ saveImages ~ response:", response?.data?.info)
      setGalleryImages(response?.data?.info);
    }
  };
  useEffect(() => {
    saveImages();
  }, [isFoucsed]);

  function ImageBuilder({galleryImages, onPress, index}) {
    console.log("🚀 ~ ImageBuilder ~ galleryImages:", galleryImages)
    // console.log("🚀 ~ ImageBuilder ~ galleryImages:", galleryImages[0])
    // console.log('Image ==> ', imageUrl);s
    if (!Array.isArray(galleryImages) || index < 0 || index >= galleryImages.length) {
      console.error('Invalid galleryImages array or index');
      return null; // or render a placeholder or handle the error appropriately
    }
  
    const imageItem = galleryImages[index];
  
    // Check if the image item and its 'image' property are defined
    if (!imageItem || !imageItem.image) {
      console.error(`Invalid image data at index ${index}`);
      return null; // or render a placeholder or handle the error appropriately
    }
    imageUrls.push({uri:`https://ce84-139-190-235-11.ngrok-free.app${imageItem.image}`});
    return (
      <TouchableOpacity onPress={() => onPress(index)}>
        <View style={styles.imageContainer}>
           <Image
            source={{uri:`https://ce84-139-190-235-11.ngrok-free.app${imageItem.image}`}}
            width={'100%'}
            height={'100%'}
            resizeMode="cover"
            style={styles.galleryImg}
          />
        </View>
      </TouchableOpacity>
    );
  }
  // const arra{{uri: ""}}

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: moderateScale(50, 0.6),
      }}
      style={styles.mainScreen}>
      <View style={{
        paddingVertical:moderateScale(10,.6),
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:"green"
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}>
          <Icon
            name="chevron-left"
            as={Feather}
            style={styles.icon2}
            color={Color.white}
            size={moderateScale(23, 0.3)}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <CustomText isBold style={{
          fontSize:moderateScale(22,.6),
          width:windowWidth*0.6,
          color:Color.themeblue
          // backgroundColor:'red',
          
        }}>
          gallery
        </CustomText>
      </View>
      <View>
        <View
          style={styles.container}>
          <TouchableOpacity
            style={{
              borderBottomWidth: selectedItem == 'Images' ? 1 : 0,
              borderColor:
                selectedItem == 'Images' ? Color.themeblue : '#9B9B9B',
              color: selectedItem == 'Images' ? Color.themeblue : Color.black,
            }}
            onPress={() => {
              setSelectedItem('Images');
            }}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>Images</CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('i m Text here');
              setSelectedItem('Text');
            }}
            style={{
              borderBottomWidth: selectedItem == 'Text' ? 1 : 0,
              borderColor: selectedItem == 'Text' ? Color.themeblue : '#9B9B9B',
              color: selectedItem == 'Text' ? Color.themeblue : 'black',
            }}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>Text</CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem('Links');
            }}
            style={{
              borderBottomWidth: selectedItem == 'Links' ? 1 : 0,
              borderColor: selectedItem == 'Links' && Color.themeblue,
              color: selectedItem == 'Text' ? Color.themeblue : 'black',
            }}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>Links</CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem('PDF');
            }}
            style={{
              borderBottomWidth: selectedItem == 'PDF' ? 1 : 0,
              borderColor: selectedItem == 'PDF' && Color.themeblue,
              color: selectedItem == 'PDF' ? Color.themeblue : 'black',
            }}>
            <View style={styles.tabBarButton}>
              <CustomText isBold>PDF</CustomText>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.todaySection}>
          <CustomText style={{fontSize: moderateScale(18, 0.4)}} isBold>
            Today
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
             {galleryImages.length > 0 ? (
            galleryImages.map((item, index) => (
              <ImageBuilder
                key={index}
                galleryImages={galleryImages}
                index={index}
                onPress={onSelect}
              />
            ))
          ) : (
            <Text>Loading images...</Text>
          )}
            {/* {galleryImages?.map((item, index) => (
              <ImageBuilder
                imageUrl={item?.image}
                index={index}
                onPress={onSelect}
              />
            ))} */}
          </View>
          <ImageView
            images={imageUrls}
            imageIndex={currentImageIndex}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
        <View style={styles.todaySection}>
          <CustomText style={{fontSize: moderateScale(18, 0.4)}} isBold>
            Yesterday
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {secondImagesArray?.map((item, index) => (
              <ImageBuilder imageUrl={item?.image} index={index} onPress={onSelect} />
            ))}
          </View>
          <ImageView
            images={secondImagesArray}
            imageIndex={currentYesterdayImageIndex}
            visible={yestImageIsVisible}
            onRequestClose={() => setYestImageVisible(false)}
          />
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
    width: windowWidth,

    paddingHorizontal: moderateScale(15, 0.2),
  },
  galleryImg: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 105,
    height: 105,
    margin: moderateScale(5, 0.6),
    borderRadius: 9,
    overflow: 'hidden',
  },
  tabBarButton: {
    // borderBottomWidth: 1,
    paddingVertical: moderateScale(3, 0.7),
    // borderBottomColor: Color.darkGray,
    alignItems: 'center',
  },
  container:{
    width: windowWidth,
    height: windowHeight * 0.07,
    paddingVertical: moderateScale(12, 0.5),
    paddingHorizontal: moderateScale(15, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(25, 0.6),
    overflow: 'hidden',
    gap: 0,
  },

  back: {
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    // position: 'absolute',
    // left: moderateScale(10, 0.6),
    // top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    backgroundColor: Color.themeblue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10, 0.6),
  },
});
