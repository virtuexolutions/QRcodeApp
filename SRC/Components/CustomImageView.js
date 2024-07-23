import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import QRCode from 'react-native-qrcode-svg';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import {SafeAreaView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import VerificationModal from './VerificationModal';

const CustomImageView = ({
  isVisible,
  selectedImageIndex,
  galleryImages,
  setIsVisible,
  selectedItem,
}) => {
  console.log('===========>', galleryImages);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const [modalVisible ,setModalVisible] =useState(false)

  useEffect(() => {
    if (isVisible && flatListRef.current && selectedImageIndex !== undefined) {
      scrollToIndex(selectedImageIndex);
    }
  }, [isVisible, selectedImageIndex]);

  const scrollToIndex = index => {
    flatListRef.current.scrollToOffset({offset: index * windowWidth});
  };

  console.log('🚀 ~ CustomImageView ~ selectedItem:', selectedItem);
  return (
    <Modal visible={isVisible}>
      <SafeAreaView>
        <View style={styles.imageView}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false)
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

            <CustomButton
              iconStyle={{
                width: windowWidth * 0.09,
                height: windowHeight * 0.05,
                textAlign: 'center',
                paddingHorizontal: moderateScale(12, 0.2),
                paddingTop: moderateScale(15, 0.6),
                fontSize: moderateScale(24, 0.6),
                color: Color.black,
              }}
              iconName="cross"
              iconType={Entypo}
              iconSize={18}
              // color={Color.white}
              marginTop={moderateScale(5, 0.3)}
              // text={'Use'}
              isGradient={true}
              onPress={() => {
                setIsVisible(false);
              }}
              bgColor={['white', 'white']}
              width={windowHeight * 0.06}
              height={windowHeight * 0.06}
            />
          </View>

          <FlatList
            ref={flatListRef}
            data={galleryImages}
            keyExtractor={item => item?.id}
            horizontal
            pagingEnabled
            //   initialScrollIndex={selectedImageIndex}
            renderItem={({item, index}) => {
              // console.log('ITem OF FLATLIST : ', item);
              // console.log(
              //   'ITem OF FLATLIST 2 : ',
              //   selectedItem == 'image'
              //     ? item?.path
              //     : selectedItem == 'text'
              //     ? item?.text
              //     : selectedItem == 'pdf'
              //     ? item?.path
              //     : item?.text,
              // );
              return (
                <TouchableOpacity
                  onLongPress={() => {
                    setModalVisible(true);
                    console.log('on long press===========>');
                  }}
                  style={{
                    width: windowWidth,
                    height: windowHeight * 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                  {/* <CustomText style={{color: Color.white}} isBold>{index}</CustomText> */}
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
                    size={350}

                    // getRef={(ref)=>setQrCodeRef(ref)}
                  />
                </TouchableOpacity>
              );
            }}
            getItemLayout={(data, index) => ({
              length: windowWidth,
              offset: windowWidth * index,
              index,
            })}
          />
        </View>
     
      </SafeAreaView>
    </Modal>
  );
};

export default CustomImageView;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor :'red'
  },
  imageView: {
    widtth: windowWidth,
    height: windowHeight,

    justifyContent: 'center',

    // paddingHorizontal:moderateScale(12,0.2)
  },
  customBtn: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    borderRadius: (windowWidth * 0.13) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : Color.themeColor,
  },
});
