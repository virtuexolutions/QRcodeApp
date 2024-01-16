import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import CustomImage from '../Components/CustomImage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationService from '../navigationService';
import {setUserLogOut} from '../Store/slices/common';
import {useDispatch, useSelector} from 'react-redux';
import {SetUserRole, setUserLogoutAuth} from '../Store/slices/auth';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
useEffect(()=>{
  navigation.setOptions({
    headerShown: false
  })

},[])

  const options = [
    {
      id: 1,
      name: 'Privacy Policy',
      next: '>',
      onPress: () => navigationService.navigate('PrivacyPolicy'),
      // navigation.navigate("Help")
    },

    {
      id: 2,
      name: 'Terms & Condition',
      next: '>',
      onPress: () => {
        navigationService.navigate('TermsAndConditions');
      },
    },
    {
      id: 3,
      name: 'About',
      next: '>',
      onPress: () => {
        console.log('About');
        navigationService.navigate('About');
      },
    },
    {
      id: 4,
      name: 'Help',
      next: '>',
      onPress: () => {
        navigationService.navigate('Help');
      },
    },
    {
      id: 5,
      name: 'Logout',
      next: '>',
      onPress: () => {
        dispatch(setUserLogOut());
        dispatch(setUserLogoutAuth());
        // dispatch(setUserLogOut());
        dispatch(SetUserRole(''));
        console.log('logout=======>');
        // navigationService.navigate('LoginScreen')
      },
    },
  ];
  return (
    <ImageBackground
      source={require('../Assets/Images/signup_bg.png')}
      style={styles.mainScreen}>
      <View style={styles.header}>
        <View style={styles.backBtn}>
          <Icon
            name="arrowleft"
            size={moderateScale(24, 0.6)}
            color={Color.white}
            as={AntDesign}
          />
          {/* </RadialGradient> */}
        </View>
        <View style={styles.userInfo}>
          <CustomText style={styles.txt5}>Settings</CustomText>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((item, index) => (
          <TouchableOpacity
            onPress={item.onPress}
            key={index}
            style={[styles.option, item.name === 'Logout' && styles.logout]}>
            <CustomText style={{color: Color.white}}>{item.name}</CustomText>
            {item.name === 'Logout' ? (
              <Icon
                as={Ionicons}
                name="exit-outline"
                size={5}
                color={Color.white}
              />
            ) : (
              <CustomText style={{color: Color.white}}>{item.next}</CustomText>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  },
  imageContainer: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderColor: 'red',
    borderRadius: (windowWidth * 0.3) / 2,
    borderWidth: 2,
    overflow: 'hidden',
  },
  backBtn: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    borderRadius: (windowWidth * 0.09) / 2,
    borderColor: Color.white,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // borderRadius:100,
    width: '100%',
    height: 200,
  },
  header: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: moderateScale(18, 0.5),
    paddingVertical: moderateScale(20, 0.5),
    alignItems: 'center',
  },
  userInfo: {
    marginRight: 24,
  },
  txt5: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFF',
  },
  txt6: {
    fontSize: 12,
    textAlign: 'left',
    width: windowWidth * 0.6, // fontWeight: 'bold',
    color: '#FFFF',
  },
  option: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Color.white,
    borderBottomWidth: 1,
  },
  logout: {
    borderBottomWidth: 0,
  },
  optionsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 13,
    marginHorizontal: 14,
    marginTop: moderateScale(46, 0.7),

    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    // borderLeftWidth: 2,
    // borderRightWidth: 2,

    // borderBottomColor: '#0000003D',
    // borderColor: Color.darkBlue,
    borderRadius: 12,
  },
});
