import { View, Text, TouchableHighlight } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const TwoStepVerification = () => {
  const navigation = useNavigation();

  const navigateToTwoStepVerification = () => {
    navigation.navigate("Webview", {
      link: "https://myaccount.google.com/signinoptions/two-step-verification",
    });
  };

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#87CEEB" }}>
      <Text style={{ fontSize: 20, marginVertical: 6, textAlign: "center", color: "#fff" }}>
        Kindly ! Check Your 2-Step Verification
      </Text>
      <Text style={{ fontSize: 18, marginVertical: 6, textAlign: "center", color: "#fff" }}>
        If the 2 Step Verification is not enabled, Please enabled it.
      </Text>
      <Text style={{ fontSize: 18, marginVertical: 6, textAlign: "center", color: "#fff" }}>
        After, enabling 2-Step Verification , scroll down to the bottom and click on App passwords to generate a secure password for the application.
      </Text>
      <TouchableHighlight
        onPress={navigateToTwoStepVerification}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: "60%",
          borderRadius: 5,
          backgroundColor: "#000",
          marginVertical: 8,
        }}
      >
        <Text style={{ fontSize: 13, color: "#fff" }}>
          Enable 2-Step Verification
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default TwoStepVerification;
