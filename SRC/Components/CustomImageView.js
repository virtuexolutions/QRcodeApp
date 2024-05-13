import {Modal, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, { useRef, useEffect } from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import QRCode from 'react-native-qrcode-svg';
import CustomText from './CustomText';
import { Icon } from 'native-base';
const CustomImageView = ({
  visible,
  selectedImageIndex,
  galleryImages,
  setIsVisible,
  selectedItem,
}) => {
    const flatListRef = useRef(null);

    useEffect(() => {
      if (visible && flatListRef.current && selectedImageIndex !== undefined) {
        scrollToIndex(selectedImageIndex);
      }
    }, [visible, selectedImageIndex]);
  
    const scrollToIndex = (index) => {
      flatListRef.current.scrollToOffset({ offset: index * windowWidth });
    };

  console.log('🚀 ~ CustomImageView ~ selectedItem:', selectedItem);
  return (
    <Modal visible={visible}>
      <View style={styles.imageView}>
        <View style={styles.row}>
        <TouchableOpacity
        onPress={()=>{
            setIsVisible(false)
        }}
        >

          <Icon 
          as={Entypo}
          name="cross"
          size={moderateScale(24, 0.6)}
          color={Color.black}
          />
          </TouchableOpacity>
          {/* <CustomButton
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
            color={Color.white}
            marginTop={moderateScale(5, 0.3)}
            // text={'Use'}
            isGradient={true}
            onPress={() => {
              setIsVisible(false);
            }}
            bgColor={['white', 'white']}
            width={windowHeight * 0.06}
            height={windowHeight * 0.06}
          /> */}
        </View>

        <FlatList
        ref={flatListRef}
          data={galleryImages}
          keyExtractor={item => item?.id}
          horizontal
          pagingEnabled
        //   initialScrollIndex={selectedImageIndex}
          renderItem={({item, index}) => {
            console.log('ITem OF FLATLIST : ', item);
            console.log(
              'ITem OF FLATLIST 2 : ',
              selectedItem == 'image'
                ? item?.path
                : selectedItem == 'text'
                ? item?.text
                : selectedItem == 'pdf'
                ? item?.path
                : item?.text,
            );
            return (
              <View
                style={{
                  width: windowWidth,
                  height: windowHeight * 0.8,
                  // paddingHorizontal:moderateScale(22,0.2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  // marginHorizontal:moderateScale(22,0.2)
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
              </View>
            );
          }}
          getItemLayout={(data, index) => ({
            length: windowWidth,
            offset: windowWidth * index,
            index,
          })}
        />
      </View>
    </Modal>
  );
};

export default CustomImageView;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {
    widtth: windowWidth,
    height: windowHeight,
    
    justifyContent: 'center',

    // paddingHorizontal:moderateScale(12,0.2)
  },
});
