import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationService from './navigationService';
import { useSelector } from 'react-redux';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Color from './Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Icon } from 'native-base';
import { View } from 'react-native';
import { windowHeight } from './Utillity/utils';
import WalkThroughScreen from './Screens/WalkthroughScreen';
import LoginScreen from './Screens/LoginScreen';
import Signup from './Screens/Signup';
import HomeScreen from './Screens/HomeScreen';
import ScanScreen from './Screens/ScanScreen';


const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  console.log("🚀 ~ AppNavigator ~ walkThrough:", walkThrough)
  const role = useSelector(state => state.authReducer.role);
  console.log('🚀 ~ file: appNavigation.js:31 ~ AppNavigator ~ role:', role);

  console.log(
    '🚀 ~ file: appNavigation.js:27 ~ AppNavigator ~ walkThrough:',
    walkThrough,
  );

  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
    !walkThrough
    ? 'WalkThroughScreen'
    : token == null
    ? 'LoginScreen'
    : 'HomeScreen';
    
    console.log("🚀 ~ AppNavigatorContainer ~ firstScreen:", firstScreen)
    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{ headerShown: false }}>     
          <RootNav.Screen name="HomeScreen" component={HomeScreen} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="WalkThroughScreen" component={WalkThroughScreen} />
          <RootNav.Screen name="ScanScreen" component={ScanScreen} />

         



          
          
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};


export const TabNavigation = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
    // tabBar={(props) => {
    //   return (
    //     <LinearGradient
    //       colors={['red', 'blue']}
          
    //       start={[1, 0]}
    //       end={[0, 0]}
    //     >
    //       <BottomTabBar
    //         {...props}
    //         style={{ backgroundColor: 'transparent' }}
    //       />
    //     </LinearGradient>
    //   );
    // }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor:'pink',
          // backgroundColor: Color.red,
          // borderTopLeftRadius:15,
          // borderTopRightRadius:15,
          // paddingVertical:5
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let color = Color.theme2;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;

          if (
            route.name === 'HomeScreen'
          ) {
            iconName = focused ? 'home' : 'home-outline';

            color = focused ?
              Color.theme2 : Color.white
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }

          else if (
            route.name === 'Donation'
          ) {
            iconName = focused ? 'donate' : 'donate';
            type = FontAwesome5
            color = focused ?
              Color.theme2 : Color.white
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'StoreScreen') {
            iconName = focused
              ? 'cart'
              : 'cart';
            color = focused ?
              Color.theme2 : Color.white
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } 
          else if (route?.name == 'Campaigns'){
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
          else {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
            color = focused ?
              Color.theme2 : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
          return route.name == 'Campaigns' ? (
            <View
              style={{
                borderWidth: 5,
                borderColor: Color.lightGrey,
                height: moderateScale(60, 0.3),
                width: moderateScale(60, 0.3),
                borderRadius: moderateScale(30, 0.3),
                backgroundColor: Color.theme2,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: moderateScale(-30, 0.3),
              }}>
              <Icon
                name={'search'}
                as={Feather}
                  color={Color.white}
                size={size}
              />
            </View>
          ) : (
            <Icon name={iconName} as={type} color={color} size={size} />
          );
        },
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={Color.tabBarGradient}
              style={{ height: windowHeight * 0.1 }}
            />
          </View>
        ),
       


      })}
    >
      {/* <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tabs.Screen name={'Donation'} component={Donation} />
      <Tabs.Screen name={'Campaigns'} component={Campaigns} />

      {/* <Tabs.Screen name={'BibleCategories'} component={BibleCategories} /> */}
      {/* <Tabs.Screen name={'StoreScreen'} component={StoreScreen} /> 
      <Tabs.Screen name={'Settings'} component={Settings} /> */}

    </Tabs.Navigator>
  );
};
export default AppNavigator;

{/* <></>\ */ }
