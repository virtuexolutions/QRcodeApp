import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedItem} from '../Store/slices/common';
// import {style} from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import Feather from 'react-native-vector-icons/Feather';
import ImagePickerModal from '../Components/ImagePickerModal';

const LinkUrlScreen = props => {
  const selectedItem = props?.route?.params?.item;
  console.log('🚀 ~ LinkUrlScreen ~ selectedItem:', selectedItem);
  // const selectedItem = useSelector(state => state.commonReducer.selectedItem);
  // console.log('🚀 ~ SelectCategory ~ selectedItem:', selectedItem);
  const navigation = useNavigation();
  const [imagePicker, setImagePicker] = useState();

  const [link, setLink] = useState('');
  const [qrName, setQrName] = useState('');
  const [qrimage, setQrimage] = useState({});
  console.log('🚀 ~ LinkUrlScreen ~ qrimage:', qrimage);

  const data = link;

  // function isURL(text) {
  //   // Regular expression for a simple URL pattern
  //   const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  //   return urlRegex.test(text);
  // }

  // // Example usage:
  // const text1 = 'https://www.example.com';
  // const text2 = 'This is not a URL';

  // console.log(isURL(text1)); // Output: true
  // console.log(isURL(text2)); // Output: false

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.rowContainer}> */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btn}>
          <Icon name="arrowleft" as={AntDesign} color={'white'} size={25} />
        </TouchableOpacity>
      {/* </View> */}

      <View style={styles.inputContainer}>
        {(selectedItem?.title == 'pdf' || selectedItem?.title == 'image') && (
          <TouchableOpacity
            onPress={() => {
              selectedItem?.title == 'image'
                ? setImagePicker(true)
                : console.log('doc picker will open here');
            }}
            style={styles.input2}>
            {Object.keys(qrimage).length > 0 ? (
              <>
                <CustomText
                  isBold
                  numberOfLines={1}
                  style={{
                    width: windowWidth * 0.6,
                    color: Color.themeblue,
                    fontSize: moderateScale(12, 0.6),
                  }}>
                  {qrimage?.name}
                </CustomText>
                <Icon
                  name="close"
                  as={FontAwesome}
                  // style={styles.icon2}
                  color={Color.themeblue}
                  size={moderateScale(15, 0.3)}
                  onPress={() => {
                    // setImagePicker(true);
                    setQrimage({});
                  }}
                  style={{marginLeft : moderateScale(10,0.3)}}
                />
              </>
            ) : (
              <>
                <Icon
                  name="upload"
                  as={Feather}
                  // style={styles.icon2}
                  color={Color.themeblue}
                  size={moderateScale(20, 0.3)}
                  onPress={() => {
                    setImagePicker(true);
                  }}
                />
                {/* </TouchableOpacity> */}
                <CustomText
                  onPress={() => {
                    qrimage.Obect;
                    setImagePicker(true);
                  }}
                  style={styles.text2}>
                  {selectedItem?.title == 'image'
                    ? 'upload your image'
                    : 'upload your file'}
                </CustomText>
              </>
            )}
          </TouchableOpacity>
        )}

        {(selectedItem?.title == 'link url' ||
          selectedItem?.title == 'text') && (
          <TextInputWithTitle
            rightIcon={false}
            placeholder={
              selectedItem?.title == 'link url'
                ? 'put your link url'
                : ' your text'
            }
            // border={1}
            setText={setLink}
            value={link}
            viewHeight={0.07}
            viewWidth={0.8}
            inputWidth={0.65}
            border={1}
            // borderBottomWidth={1}
            marginBottom={moderateScale(10, 0.3)}
            borderColor={Color.themeblue}
            marginTop={moderateScale(10, 0.3)}
            color={Color.themeblue}
            placeholderColor={Color.themeblue}
          />
        )}
        <TextInputWithTitle
          // titleText={'Username'}
          placeholder={'name your Qr '}
          border={1}
          setText={setQrName}
          value={qrName}
          viewHeight={0.07}
          viewWidth={0.8}
          inputWidth={0.6}
          borderColor={Color.themeblue}
          marginTop={moderateScale(10, 0.3)}
          marginBottom={moderateScale(10, 0.3)}
          // color={Color.themeblue}
          placeholderColor={Color.themeblue}
        />

        {(!link == '' || Object.keys(qrimage).length > 0) && (
          <CustomButton
            onPress={() => {
              navigation.navigate('GenerateQr', {data: data});
              setLink('');
              setQrimage({})
              setQrName('');
            }}
            text={'generate  code'}
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.45}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            // borderWidth={1}
            // borderColor={Color.themeblue}
            isBold
            bgColor={Color.themeblue}
          />
        )}
      </View>
      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setQrimage}
      />
    </View>
  );
};

export default LinkUrlScreen;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Color.themeblue,
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(20, 0.3),
    marginHorizontal: moderateScale(15, 0.3),
  },
  mainContainer: {
    backgroundColor: 'white',
    height: windowHeight,
  },
  text2: {
    paddingHorizontal: moderateScale(10, 0.6),
    color: Color.themeblue,
    fontSize: moderateScale(13, 0.6),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //   backgroundColor:Color.red,
    paddingVertical: moderateScale(20, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.65,
    marginTop: moderateScale(20, 0.3),
    // backgroundColor : 'red'
  },
  input2: {
    flexDirection: 'row',
    alignItems: 'center',
    height: windowHeight * 0.07,
    //  backgroundColor:'red',
    width: windowWidth * 0.8,
    borderWidth: 1,
    // backgroundColor: 'red',
    paddingHorizontal: moderateScale(10, 0.6),
    borderColor: Color.themeblue,
    borderRadius: moderateScale(8, 0.6),
    marginBottom: moderateScale(15, 0.3),
  },
  edit: {
    position: 'absolute',
    right: 15,
    borderRadius: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
