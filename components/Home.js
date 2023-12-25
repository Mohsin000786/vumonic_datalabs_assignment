import { View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation()
  const SignWithGoogle = require("../assets/screen-assets/gmail.png")
  return (
    <View style={{flex: 1, backgroundColor: "#87CEEB"}}>
      <View style={{flex: 0.3, flexDirection: "row", justifyContent: "center", alignItems: "center"}}> 
        <Text style={{fontSize: 26, color: "#000"}}>Sign With Gmail</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Webview", {link : "https://www.google.com/intl/en_in/gmail/about/"})}
        style={{
          flex: 0.7,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          height: 50,
          width: "100%",
        }}
      >
        <Image source={SignWithGoogle} style={{height: 70, width:"100%", resizeMode:"contain"}} />
      </TouchableOpacity>
    </View>
  )
}

export default Home