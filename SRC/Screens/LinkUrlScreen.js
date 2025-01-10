import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { setTotalQRcodes } from '../Store/slices/common';

const LinkUrlScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token);
  const totalQrcodes = useSelector(state => state.commonReducer.totalQrcodes);

  // const selectedItem = props?.route?.params?.item;
  // console.log('🚀 ~ LinkUrlScreen ~ selectedItem:', selectedItem);
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
 
  const [link, setLink] = useState('');
  const [qrName, setQrName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qrimage, setQrimage] = useState({});
  const [pdfData, setPdfData] = useState({});
  
 const isURL = text => {
    // Regular expression for a simple URL pattern
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return urlRegex.test(text);
  };

  // const sendTextAndUrl = async () => {
  //   const url = 'auth/url';
  //   const body = {
  //     type: selectedItem?.title,
  //     text: link,
  //     qr_name: qrName,
  //   };
  //   setIsLoading(true);
  //   const response = await Post(url, body, apiHeader(token));
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log('🚀 ~ sendTextAndUrl ~ response:', response?.data);
  //     navigation.navigate('GenerateQr', {
  //       data: link,
  //       item: selectedItem?.title,
  //       qrName: qrName,
  //     });
  //     setLink('');
  //     setQrName('');
  //   }
  // };

  const sendDocument = async response => {
    console.log('🚀 ~ sendDocument ~ response==========>:', response);
    const formData = new FormData();

    const url = 'auth/pdf';
    const body = {
      type: 'image',
      file: {
        name: response?.name,
        type: response?.type,
        uri: response?.uri,
      },
      name:response?.name,
      qr_name: qrName,
    };

    // return console.log('🚀 ~ sendDocument ~ body:', body);
    for (let key in body) {
      formData.append(key, body[key]);
    }
    setIsLoading(true);
    const resposne = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    if (resposne != undefined) {
      console.log('🚀 ~ sendDocument ~ resposne:', resposne?.data);
      dispatch(setTotalQRcodes(parseInt(totalQrcodes)+1))
      // setQrimage(resposne?.data?.pdf_info);
      navigation.navigate('GenerateQr', {
        data: resposne?.data?.pdf_info,
        item: 'image',
        qrName: qrName,
      });

      // console.log('sending document', resposne?.data);
    }
  };
  // const handleDocumentSelection = useCallback(async () => {
  //   // dispatch(setInTheApp(true))
  //   try {
  //     const response = await DocumentPicker.pick({
  //       presentationStyle: 'fullScreen',
  //       type: [DocumentPicker.types.pdf, DocumentPicker.types.docx],
  //     });
  //     console.log('🚀 ~ handleDocumentSelection ~ response:', response);
  //     // console.log('This is document Response==========================>>>>>>>>',response)
  //     setPdfData(response);
  //     // sendDocument(response);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (Object.keys(image).length > 0) {
  //     sendDocument(image);
  //   }
  // }, [image]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <View style={styles.rowContainer}> */}
      <View
        style={{
          paddingVertical: moderateScale(10, 0.6),
          // backgroundColor:'red',
          width: windowWidth * 0.2,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <LinearGradient colors={Color.themeBgColor} style={styles.customBtn}>
            <Icon
              name="left"
              as={AntDesign}
              size={moderateScale(20, 0.6)}
              color={'white'}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* </View> */}

      <View style={styles.inputContainer}>
        {/* {(selectedItem?.title == 'pdf' ||
          selectedItem?.title == 'image') && ( */}
          <TouchableOpacity
            onPress={() => {
              // selectedItem?.title == 'pdf'
              //   ? handleDocumentSelection()
              //   : 
                setImagePicker(true);
            }}
            style={styles.input2}>
            {Object.keys(image).length > 0 
            // ||
            // Object.keys(pdfData).length > 0
             ? (
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
                      )} */}
                  {
                  // pdfData[0]?.name || 
                  image?.name}
                </CustomText>
                <Icon
                  name="close"
                  as={FontAwesome}
                  // style={styles.icon2}
                  color={Color.themeblue}
                  size={moderateScale(15, 0.3)}
                  onPress={() => {
                    setImage({});
                    setPdfData({});
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
                    // selectedItem?.title !== 'image'
                    //   ? handleDocumentSelection()
                      // : 
                      setImagePicker(true);
                  }}
                />
                {/* </TouchableOpacity> */}
                <CustomText
                  onPress={() => {
                    //selectedItem?.title != 'image'
                    //   ? handleDocumentSelection()
                    //   :
                       setImagePicker(true);
                  }}
                  style={styles.text2}>
                  {
                  /* {selectedItem?.title != 'image'
                    ? 'upload your  pdf file'
                    :  */}
                    {'upload your image'}
                </CustomText>
              </>
            )}
          </TouchableOpacity>
        {/* )} */}

        {/* {(selectedItem?.title == 'url' || selectedItem?.title == 'text') && (
          <TextInputWithTitle
            rightIcon={false}
            placeholder={
              selectedItem?.title == 'url' ? 'Put Your Link Url' : ' Your Text'
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
        )} */}
        <TextInputWithTitle
          // titleText={'Username'}
          placeholder={'Name Your Qr '}
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

        {
          Object.keys(image).length > 0 &&
          // !link == '' ||
          // Object.keys(pdfData).length > 0) &&
          qrName != '' && (
            <CustomButton
              onPress={() => {
                sendDocument(image);
                // if (link != '') {
                //   if (selectedItem?.title == 'url' && isURL(link)) {
                //     sendTextAndUrl();
                //     // navigation.navigate('GenerateQr', {
                //     //   data: link,
                //     //   item: selectedItem?.title,
                //     //   qrName: qrName,
                //     // });
                //   } else if (
                //     selectedItem?.title == 'url' &&
                //     isURL(link) == false
                //   ) {
                //     Platform.OS == 'android'
                //       ? ToastAndroid.show('Invalid URL', ToastAndroid.SHORT)
                //       : alert('Invalid URL');
                //   } else {
                //     sendTextAndUrl();
                //     // navigation.navigate('GenerateQr', {
                //     //   data: link,
                //     //   item: selectedItem?.title,
                //     //   qrName: qrName,
                //     // });
                //     // setLink('');
                //     // setQrName('');
                //   }
                // } else {
                //   if (selectedItem?.title == 'image') {
                //     sendDocument(image);
                //   } else {
                //     sendDocument(pdfData);
                //   }
                // }
              }}
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                  'generate  code'
                )
              }
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
    </SafeAreaView>
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
  customBtn: {
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    borderRadius: (windowWidth * 0.13) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : Color.white,
    marginHorizontal: moderateScale(15, 0.3),
  },
});
