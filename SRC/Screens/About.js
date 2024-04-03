import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

const About = () => {
  return (
    <ImageBackground
    source={require("../Assets/Images/bg.png")}
    >
      <Text>About</Text>
    </ImageBackground>
  )
}

export default About;