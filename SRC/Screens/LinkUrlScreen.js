import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
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

const LinkUrlScreen = () => {
  const selectedItem = useSelector(state => state.commonReducer.selectedItem);
  console.log("🚀 ~ LinkUrlScreen ~ selectedItem:", selectedItem)
  // console.log('🚀 ~ SelectCategory ~ selectedItem:', selectedItem);
  const navigation = useNavigation();
  const [imagePicker, setImagePicker] = useState();
  const [image, setImage] = useState();

  const [link, setLink] = useState('');
  const [qrName, setQrName] = useState('');
  const [text, setText] = useState('');
  const [pdf, setPdf] = useState();
  const [qrimage, setQrimage] = useState();

  const data = link;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btn}>
          <Icon name="arrowleft" as={AntDesign} color={'#002F58'} size={25} />
        </TouchableOpacity>
        </View>

      <View style={styles.inputContainer}>
     
    <TouchableOpacity
        onPress={() =>{
          setImagePicker(true);
        }}
          style={styles.input2}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              // alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor:'red',
              height: windowHeight * 0.07,
            }}
            onPress={() => {
              setImagePicker(true);
            }}>
            <Icon
              name="upload"
              as={Feather}
              // style={styles.icon2}
              color={Color.white}
              size={moderateScale(20, 0.3)}
              onPress={() => {
                setImagePicker(true);
              }}
            />
          </TouchableOpacity>
          <CustomText 
          onPress={() =>{
            setImagePicker(true)
          }}
          style={styles.text2}>
           { 
           selectedItem == 'image' ?
           'upload your image' :
           'upload your file' 
          }
          </CustomText>
        </TouchableOpacity>
        
    
        <TextInputWithTitle
          rightIcon={false}
          placeholder={
            selectedItem == 'link url'
              ? 'put your link url'
              : ' your text'
          }
          // border={1}
          setText={setLink}
          value={link}
          viewHeight={0.07}
          viewWidth={0.8}
          inputWidth={0.6}
          border={1}
          // borderBottomWidth={1}
          marginBottom={moderateScale(10, 0.3)}
          borderColor={Color.white}
          marginTop={moderateScale(10, 0.3)}
          color={Color.white}
          placeholderColor={Color.white}
        />
        <TextInputWithTitle
          titleText={'Username'}
          placeholder={'name your Qr '}
          border={1}
          setText={setQrName}
          value={qrName}
          viewHeight={0.07}
          viewWidth={0.8}
          inputWidth={0.6}
          borderBottomWidth={1}
          borderColor={Color.white}
          marginTop={moderateScale(10, 0.3)}
          marginBottom={moderateScale(10, 0.3)}
          color={Color.white}
          placeholderColor={Color.white}
        />
      

        {!link == '' && (
          <CustomButton
            onPress={() => {
              navigation.navigate('GenerateQr', {data: data});
              setLink('');
              setQrName('');
            }}
            text={'generate  code'}
            fontSize={moderateScale(12, 0.3)}
            textColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.45}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            borderWidth={1}
            borderColor={Color.white}
            isBold
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
    backgroundColor: Color.white,
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: '#002F58',
    height: windowHeight,
  },
  text2:{
    paddingHorizontal:moderateScale(10,.6),
    color:Color.white,
    fontSize:moderateScale(13,.6)
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
  },
  input2:{
    flexDirection:'row',
    alignItems: 'center',
    height: windowHeight * 0.07,
    //  backgroundColor:'red',
    width: windowWidth * 0.8,
    borderWidth: 1,
    // backgroundColor: 'red',
    paddingHorizontal:moderateScale(60,.6),
    borderColor: Color.white,
    borderRadius: moderateScale(8, 0.6),
    marginBottom:moderateScale(15,.3)
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
