import { onLongPress } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";

const CustomImage = (props) => {
  const {
    resizeMode,
    source,
    errorImageSource = require(`../Assets/Images/errorimage.png`),
    style,
    onPress,
    onLongPress,
  } = props;
  const [errorLoadingProfileImage, setErrorLoadingProfileImage] =
    useState(false);
  return (
    <TouchableOpacity 
    onLongPress={onLongPress && onLongPress}
    onPress={onPress && onPress} activeOpacity={0.9}>
      <Image
      
        resizeMode={resizeMode}
        style={style}
        source={errorLoadingProfileImage ? errorImageSource : source}
        onError={(p) => {
// console.log('errorrrrrrrrr',p);
          setErrorLoadingProfileImage(true);
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomImage;

// require(`../Assets/Images/defualtProfile.png`)
