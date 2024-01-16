// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo'
// import Feather from 'react-native-vector-icons/Feather'
// import LinearGradient from 'react-native-linear-gradient';
// import { moderateScale, windowHeight, windowWidth } from 'react-native-size-matters'
// import ScreenBoiler from '../Components/ScreenBoiler'
// import { Icon } from 'native-base';
// import CustomText from '../Components/CustomText';
// import CustomImage from '../Components/CustomImage';

// const Drawer = () => {
//   const data= [
//     {
//       name: 'Home',
//       iconName: 'home',
//       iconType: Entypo,
//       onPress: () => {
//         navigation.navigate('HomeScreen');
//       },
//     },
//     {
//       name: 'Settings',
//       iconName: 'settings',
//       iconType: Entypo,
//       onPress: () => {
//         navigation.navigate('settings');
//       },
//     },

//   ];
  
//     return (
//     <ScreenBoiler
//       statusBarBackgroundColor={'white'}
//       statusBarContentStyle={'dark-content'}>
//   <LinearGradient
//         style={{
//           // width: windowWidth *0.6,
//           height: windowHeight,
//         }}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//         colors={['#ffffff', '#ffffff']}>

//  <View
//           style={{
//               height: windowHeight * 0.2,
//               width: '100%',
//               backgroundColor: '#D2E4E4',
//             }}>
//              <View
//               style={{
//                   flexDirection: 'row',
//                   marginTop: moderateScale(20, 0.3),
//                   alignItems: 'center',
//                   marginLeft: moderateScale(10, 0.3),
//                 }}>
//               <View style={styles.Profile}>
//                 <CustomImage
//                   resizeMode={'cover'}
//                   source={require('../Assets/Images/logout.png')}
//                   style={{width: '100%', height: '100%'}}
//                   />
//               </View>

//               {/* <View style={{marginLeft: moderateScale(10, 0.3)}}>
//                 <CustomText
//                 style={{fontSize: moderateScale(16, 0.6), color: Color.black}}
//                 isBold>
//                 {userData?.name}
//                 </CustomText>
                
//                 <CustomText
//                 style={{
//                     width: windowWidth * 0.4,
//                     fontSize: moderateScale(11, 0.6),
//                     color: Color.black,
//                 }}>
//                   {userData?.email}
//                 </CustomText>
//             </View> */}
//             </View>
//             <View
//           style={{
//               marginLeft: moderateScale(10, 0.3),
//             marginTop: moderateScale(10, 0.3),
//         }}>
//           {data.map((item, index) => (
//               <>
//               <TouchableOpacity
//                 onPress={item?.onPress}
//                 style={{
//                     width: windowWidth * 0.5,
//                     // borderBottomWidth: 0.5,
//                     borderColor: Color.black,
//                     margin: moderateScale(15, 0.3),
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                 }}>
//                 <Icon
//                   name={item?.iconName}
//                   as={item?.iconType}
//                   size={moderateScale(20, 0.3)}
//                   color={Color.black}
//                   onPress={item?.onPress}
//                   />
//                 <CustomText
//                   style={{
//                       fontSize: moderateScale(14, 0.6),
//                       color: Color.black,
//                       marginLeft: moderateScale(10, 0.3),
//                     }}>
//                   {item.name}
//                 </CustomText>
//               </TouchableOpacity>
//             </>
//           ))}
//         </View>
        
//         <View
//           style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: windowWidth * 0.14,
//               height: windowWidth * 0.14,
//             borderRadius: (windowWidth * 0.14) / 1,
//             backgroundColor: Color.white,
//             position: 'absolute',
//             bottom: 40,
//             left: 20,
//             elevation: 10,
//         }}>
//           <Icon
//             onPress={() => {
//                 navigation.goBack();
//             }}
//             name="chevron-left"
//             as={Feather}
//             size={moderateScale(25, 0.7)}
//             color={Color.black}
//             />
//         </View>
//           </View>
// </LinearGradient>
     

// </ScreenBoiler> 
//   );
// }

// export default Drawer;

// const styles = StyleSheet.create({
//     Profile: {
//         width: windowWidth * 0.2,
//         height: windowWidth * 0.2,
//         borderRadius: (windowWidth * 0.2) / 1,
//         borderWidth: 1,
//         borderColor: Color.white,
//         overflow: 'hidden',
//     },
// });
  