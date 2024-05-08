import {Modal, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import QRCode from 'react-native-qrcode-svg';
const CustomImageView = ({
  visible,
  galleryImages,
  setIsVisible,
  selectedItem,
}) => {
  console.log('🚀 ~ CustomImageView ~ selectedItem:', selectedItem);
  return (
    <Modal visible={visible}>
      <View style={styles.imageView}>
        <View style={styles.row}>
          <CustomButton
            iconStyle={{
              width: windowWidth * 0.09,
              height: windowHeight * 0.05,
              textAlign: 'center',
              paddingHorizontal: moderateScale(12, 0.2),
              paddingTop: moderateScale(15, 0.6),
              fontSize: moderateScale(24, 0.6),
              color: Color.white,
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
            bgColor={[Color.black, Color.black]}
            width={windowHeight * 0.06}
            height={windowHeight * 0.06}
          />
        </View>

        <FlatList
          data={galleryImages}
          keyExtractor={item => item?.id}
          horizontal
          pagingEnabled
          renderItem={({item}) => {
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
                  height: windowHeight,
                  // paddingHorizontal:moderateScale(22,0.2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  // marginHorizontal:moderateScale(22,0.2)
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
                  // getRef={c => (this.save=c)}
                  // value="Just some string value"
                  logo={require('../Assets/Images/cardimage.png')}
                  size={350}

                  // getRef={(ref)=>setQrCodeRef(ref)}
                />
              </View>
            );
          }}
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
    backgroundColor: 'black',
    justifyContent: 'center',
    // paddingHorizontal:moderateScale(12,0.2)
  },
});
