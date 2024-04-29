import {
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Icon} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {apiHeader} from '../Utillity/utils';
import ImagePickerModal from '../Components/ImagePickerModal';

const LinkUrlScreen = props => {
  const fromImage = props?.route?.params?.fromGenerateimage;
  console.log('🚀 ~ LinkUrlScreen ~ fromImage:', fromImage);
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const selectedItem = props?.route?.params?.item;
  console.log('🚀 ~ LinkUrlScreen ~ selectedItem:', selectedItem);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  // console.log("🚀 ~ LinkUrlScreen ~ image:", image)
  const [link, setLink] = useState('');
  const [qrName, setQrName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qrimage, setQrimage] = useState({});
  console.log('🚀 ~ LinkUrlScreen ~ qrimage=======================>:', qrimage);
  // const data = link;

  const isURL = text => {
    // Regular expression for a simple URL pattern
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return urlRegex.test(text);
  };

  const sendDocument = async response => {
    console.log('🚀 ~ sendDocument ~ response==========>:', response);
    const formData = new FormData();
    // console.log('hertere');
    // console.log( 'beraa',response);

    const url = 'auth/pdf';
    const body = {
      file: {
        name:
          selectedItem?.title == 'image' || fromImage
            ? response?.name
            : response[0].name,
        type:
          selectedItem?.title == 'image' || fromImage ? response?.type : response[0].type,
        uri: selectedItem?.title == 'image'  || fromImage? response?.uri : response[0].uri,
      },
      name: selectedItem?.title == 'image'  || fromImage ? response?.name : response[0].name,
    };
    console.log('🚀 ~ sendDocument ~ body:', body);
    for (let key in body) {
      formData.append(key, body[key]);
    }
    setIsLoading(true);
    const resposne = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    if (resposne != undefined) {
      console.log('🚀 ~ sendDocument ~ resposne:', resposne?.data);
      setQrimage(resposne?.data?.pdf_info);

      // console.log('sending document', resposne?.data);
    }
  };
  const handleDocumentSelection = useCallback(async () => {
    // dispatch(setInTheApp(true))
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.pdf, DocumentPicker.types.docx],
      });
      console.log('🚀 ~ handleDocumentSelection ~ response:', response);
      // console.log('This is document Response==========================>>>>>>>>',response)

      sendDocument(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(image).length > 0) {
      sendDocument(image);
    }
  }, [image]);

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.rowContainer}> */}
      <View
        style={{
          paddingVertical: moderateScale(10, 0.6),
          // backgroundColor:'red',
          width: windowWidth * 0.2,
        }}>
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
      </View>
      {/* </View> */}

      <View style={styles.inputContainer}>
        {(selectedItem?.title == 'pdf' ||
          selectedItem?.title == 'image' ||
          fromImage == true) && (
          <TouchableOpacity
            onPress={() => {
              selectedItem?.title == 'pdf'
                ? handleDocumentSelection()
                : setImagePicker(true);
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
                  {/* {selectedItem?.title == 'pdf'
                    ? qrimage?.filename
                    : selectedItem?.title == 'image' ||
                      (fromImage == true && image?.name)} */}
                      {qrimage?.filename || qrimage?.name}
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
                  style={{marginLeft: moderateScale(10, 0.3)}}
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
                    selectedItem?.title !== 'image'
                      ? handleDocumentSelection()
                      : setImagePicker(true);
                  }}
                />
                {/* </TouchableOpacity> */}
                <CustomText
                  onPress={() => {
                    fromImage != true && selectedItem?.title != 'image'
                      ? handleDocumentSelection()
                      : setImagePicker(true);
                  }}
                  style={styles.text2}>
                  {fromImage != true && selectedItem?.title != 'image'
                    ? 'upload your  pdf file'
                    : 'upload your image'}
                </CustomText>
              </>
            )}
          </TouchableOpacity>
        )}

        {(selectedItem?.title == 'url' || selectedItem?.title == 'text') && (
          <TextInputWithTitle
            rightIcon={false}
            placeholder={
              selectedItem?.title == 'url' ? 'put your link url' : ' your text'
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
          color={Color.themeblue}
          placeholderColor={Color.themeblue}
        />

        {(!link == '' || Object.keys(qrimage).length > 0) && qrName != '' && (
          <CustomButton
            onPress={() => {
              if (link != '') {
                if (selectedItem?.title == 'url' && isURL(link)) {
                  navigation.navigate('GenerateQr', {
                    data: link,
                    item: selectedItem?.title,
                    qrName : qrName,
                  })
                  setLink('');
                  setQrName('');
                } else if (
                  selectedItem?.title == 'url' &&
                  isURL(link) == false
                ) {
                  Platform.OS == 'android'
                    ? ToastAndroid.show('Invalid URL', ToastAndroid.SHORT)
                    : alert('Invalid URL');
                }
                 else {
                  navigation.navigate('GenerateQr', {
                    data: link,
                    item: selectedItem?.title,
                    qrName : qrName,
                  });
                  setLink('');
                  setQrName('');
                }
              } else {
                navigation.navigate('GenerateQr', {
                  data: qrimage,
                  item: selectedItem?.title,
                  qrName : qrName,
                });
              }
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
            isGradient={true}
            bgColor={Color.themeBgColor}
          />
        )}
      </View>
      <ImagePickerModal
        show={imagePicker}
        setShow={setImagePicker}
        setFileObject={setImage}
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
