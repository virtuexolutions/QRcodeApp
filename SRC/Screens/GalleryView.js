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
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import ImageView from 'react-native-image-viewing';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useFocus} from 'native-base/lib/typescript/components/primitives';
import CustomImage from '../Components/CustomImage';
import {baseUrl} from '../Config';
import QRCode from 'react-native-qrcode-svg';
import {Button} from 'react-native-share';
import CustomImageView from '../Components/CustomImageView';
import LinearGradient from 'react-native-linear-gradient';
import VerificationModal from '../Components/VerificationModal';



const GalleryView = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);

  const [selectedItem, setSelectedItem] = useState('image');
  const [modalVisible ,setModalVisible] =useState(false)
  const [selectedImage, setSelectedImage] = useState([]);
  console.log('selectedImage' , selectedImage)
  const [visible, setIsVisible] = useState(false);
  const [yestImageIsVisible, setYestImageVisible] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  console.log('========= >>>>>>>>' ,galleryImages)
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  function showModalAndSetIndex(index) {
    setIsVisible(true);
    setSelectedImageIndex(index);
  }
  const DeleteImages = async () => {
    const url = 'auth/document-delete';
    const body = {
      type: selectedItem,
      id: selectedImage?.map(item=>{
        return item?.id
      }),
    };
    console.log('🚀 ~ DeleteImages ~ body:', body);
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      setSelectedImage([]);
      console.log('delete respose here======> ', response?.data);
      setGalleryImages(prevImages => {
        return {
          ...prevImages,
          [selectedItem]: prevImages[selectedItem].filter(
            item => selectedImage.map(item2=>item2?.id !=item?.id),
          ),
        };
      });
    }
  };

  const GetQrcodes = async () => {
    // const url = `auth/document?type=${selectedItem}`;
    const url = `auth/document`;
    setIsLoading(true);
    setSelectedImage([]);
    const response = await Get(url, token);
    setIsLoading(false);
    console.log('User tooken ==>', token);
    if (response != undefined) {
      console.log(
        '🚀 ~ GetQrcodes ~ response===========================>:',
        JSON.stringify(response?.data, null, 2),
      );
      //  return  console.log('QR===>',
      //  selectedItem === "text"?
      //  response?.data?.info?.text : selectedItem === "image" ? response?.data?.info?.image : response?.data?.info?.pdf);
      setGalleryImages(response?.data?.info);
    }
  };
  useEffect(() => {
    if (selectedItem != '') {
      GetQrcodes();
      // setSelectedImage([]);
    }
  }, [selectedItem]);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(50, 0.6),
        }}
        style={styles.mainScreen}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <LinearGradient
              colors={Color.themeBgColor}
              style={styles.customBtn}>
              <Icon
                name="left"
                as={AntDesign}
                size={moderateScale(20, 0.6)}
                color={'white'}
              />
            </LinearGradient>
          </TouchableOpacity>

          {selectedImage?.length == 0 && (
            <CustomText isBold style={styles.heading}>
              gallery
            </CustomText>
          )}
          {selectedImage?.length > 0 && (
            <View
              style={{
                width: windowWidth * 0.65,
                height: windowHeight * 0.05,
                flexDirection: 'row',
                backgroundColor: 'rgba(256,256,256,.5)',
                marginBottom: moderateScale(10, 0.3),
                alignItems: 'center',
                // backgroundColor :'red',
                justifyContent: 'center',
              }}>
              <Icon
                name={'cross'}
                as={Entypo}
                color={'black'}
                size={5}
                onPress={() => {
                  setSelectedImage([]);
                }}
              />
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  marginLeft: moderateScale(10, 0.3),
                  width: windowWidth * 0.45,
                }}>
                {selectedImage?.length} Selected items
              </CustomText>
              {selectedImage?.length == 1 &&

              
              <Icon
              style={{
                with :windowWidth*0.3,
                marginRight :moderateScale(10,.6),
                // backgroundColor :'red'
              }}
                name={'info-with-circle'}
                as={Entypo}
                size={5}
                color={Color.themeBgColor}
                onPress={() => {
                 setModalVisible(true)
                }}
              />
}
              <Icon
                name={'delete'}
                as={AntDesign}
                size={5}
                color={Color.themeBgColor}
                onPress={() => {
                  console.log('Deleting image');
                  DeleteImages();
                }}
              />
            </View>
          )}
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
                borderColor:
                  selectedItem == 'text' ? Color.themeblue : '#9B9B9B',
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
                data={
                  selectedItem == 'image'
                    ? galleryImages?.image
                    : selectedItem == 'text'
                    ? galleryImages?.text
                    : selectedItem == 'pdf'
                    ? galleryImages?.pdf
                    : galleryImages?.url
                }
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  paddingTop: moderateScale(10, 0.6),
                  paddingBottom: moderateScale(50, 0.6),
                }}
                style={{
                  width: windowWidth * 0.95,
                  alignSelf: 'center',
                }}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <View style={[styles.imageContainer]}>
                        <TouchableOpacity
                          style={
                            selectedImage.length > 0 && {
                              opacity: 0.6,
                            }
                          }
                          onPress={() => {
                            selectedImage?.length == 0
                              ? showModalAndSetIndex(index)
                              : selectedImage.some(
                                  (data, index) => data?.id != item?.id,
                                )
                              ? setSelectedImage(prev => [...prev, item])
                              : setSelectedImage(
                                  selectedImage.filter(
                                    (data, index) => data?.id != item?.id,
                                  ),
                                );
                          }}
                          onLongPress={() => {
                            setSelectedImage(prev => [...prev, item]);
                          }}>
                       <QRCode
                            value={
                              selectedItem == 'image'
                                ? item?.path
                                : selectedItem == 'text'
                                ? item?.text
                                : selectedItem == 'pdf'
                                ? item?.path
                                : item?.text
                            }
                            logo={require('../Assets/Images/cardimage.png')}
                            size={100}
                          />
                        </TouchableOpacity>

                        {selectedImage.length > 0 &&
                          selectedImage.some(item3=>item3?.id == item?.id) && (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedImage(
                                  selectedImage.filter(
                                    (data, index) => data?.id == item?.id,
                                  ),
                                );
                              }}
                              style={styles.btn}>
                              <Icon
                                name={'checkbox-marked'}
                                as={MaterialCommunityIcons}
                                color={Color.blue}
                                size={moderateScale(30, 0.2)}
                              />
                            </TouchableOpacity>
                          )}
                        {selectedImage.length > 0 &&
                          selectedImage.some(item4=>item4?.id !=item?.id) && (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedImage(prev => [...prev, item]);
                              }}
                              style={styles.select}>
                              <Icon
                                name={'checkbox-blank-outline'}
                                as={MaterialCommunityIcons}
                                color={Color.black}
                                size={moderateScale(30, 0.2)}
                              />
                            </TouchableOpacity>
                          )}
                      </View>
                      <CustomText
                        numberOfLines={1}
                        isBold
                        style={styles.qrName}>
                        {item?.qr_name}
                      </CustomText>
                    </View>
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View style={styles.image1}>
                      <View style={styles.imageview}>
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

            <CustomImageView
              isVisible={visible}
              selectedItem={selectedItem}
              selectedImageIndex={selectedImageIndex}
              setIsVisible={setIsVisible}
              galleryImages={
                selectedItem == 'image'
                  ? galleryImages?.image
                  : selectedItem == 'text'
                  ? galleryImages?.text
                  : selectedItem == 'pdf'
                  ? galleryImages?.pdf
                  : galleryImages?.url
              }
            />
          </View>
        </View>
           <VerificationModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          fromGallery={true}
          galleryImages={galleryImages}
          content={
            selectedImage[0]?.type == 'image' ?
            selectedImage[0]?.path  :
            selectedImage[0]?.type == 'pdf' ?
            selectedImage[0]?.filename :
            selectedImage[0]?.text
            }
          type={selectedImage[0]?.type}
          name={selectedImage[0]?.qr_name}
        />
      </ScrollView>
    </SafeAreaView>
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
    width: windowWidth * 0.28,
    height: windowHeight * 0.12,
    margin: moderateScale(6, 0.6),
  },
  tabBarButton: {
    paddingVertical: moderateScale(3, 0.7),
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
  },
  row: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    gap: moderateScale(34, 0.3),
    position: 'absolute',
    bottom: 100,
    left: 138,
  },
  deleteButtonText: {
    fontWeight: 'bold',
    fontSize: moderateScale(18, 0.3),
  },
  customBtn: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    borderRadius: (windowWidth * 0.13) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(22, 0.6),
    width: windowWidth * 0.53,
    color: Color.themeblue,
  },
  image1: {
    width: '100%',
    height: windowHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageview: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.15,
  },
  qrName: {
    marginBottom: moderateScale(10, 0.3),
    paddingLeft: moderateScale(8, 0.6),
    width: windowWidth * 0.25,
    fontSize: moderateScale(13, 0.6),
    // backgroundColor :'red',
    color: 'black',
    // marginHorizontal: moderateScale(10, 0.3),
  },
  select: {
    width: windowHeight * 0.035,
    height: windowHeight * 0.035,
    position: 'absolute',
    top: 0,
    right: 8,
    zindex: 1,
    backgroundColor: Color.white,
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  },
  btn: {
    width: windowHeight * 0.035,
    height: windowHeight * 0.035,
    position: 'absolute',
    top: 0,
    right: 8,
    zIndex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
  },
});

