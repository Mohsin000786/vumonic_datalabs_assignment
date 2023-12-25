import { View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Webview = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const url = route?.params?.link;
  const webViewRef = useRef(null);
  const [currentWebPage, setCurrentWebPage] = useState("");

  const onNavigationStateChange = (navState) => {
    console.log("navState", navState);
    const isLoggedIn = navState.url.includes(
      "https://mail.google.com/mail/mu/mp/83/#tl/priority/%5Esmartlabel_personal"
    );

    const isPasswordGenerated = navState.canGoForward

    if (isLoggedIn) {
      navigation.navigate("TwoStepVerification");
    }

    if(isPasswordGenerated){
      navigation.navigate("Login");
    }
  };

  const onMessage = async (event) => {
    if (event.nativeEvent.title === "Gmail") setCurrentWebPage("gmail");
    await AsyncStorage.setItem("@email", event.nativeEvent.data);

    if (event.nativeEvent.title === "App passwords") {
      setCurrentWebPage("google");
      await AsyncStorage.setItem("@password", event.nativeEvent.data);
    }
  };

  const injectedJavaScriptForEmail = `
        const emailField = document.querySelector('input[type="email"]');
        const emailValue = emailField.value
        window.ReactNativeWebView.postMessage(emailValue)
        true;
      `;

  const injectedJavaScriptForPassword = `
      let str= ""
      var container = document.querySelector('div[dir="ltr"]');
      var spanElements = container.querySelectorAll('span');
      
      var passValue = Array.from(spanElements).map(span => (
        str += span.textContent;
        return str
      ));
  
      window.ReactNativeWebView.postMessage(passValue)
      true;
    `;

  console.log("webViewRef", webViewRef);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <WebView
        ref={webViewRef}
        source={{
          uri: url,
        }}
        onMessage={onMessage}
        injectedJavaScript={
          currentWebPage === "gmail"
            ? injectedJavaScriptForEmail
            : injectedJavaScriptForPassword
        }
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
};

export default Webview;
