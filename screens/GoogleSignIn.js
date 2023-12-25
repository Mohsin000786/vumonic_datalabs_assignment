import { View, Text } from "react-native";
import React from "react";
import SignWithGoogle from "./assets/screen-assets/sign_with_google.svg";
import { authorize } from "react-native-app-auth";

const GoogleSignIn = () => {
  const [token, setToken] = useState("");
  const [authorizedUser, setAuthorizedUser] = useState([]);
  const clientId = "";
  const apiKey = "";
  const config = {
    clientId: clientId,
    redirectUrl: "com.securepasswordforgmail:/oauth2redirect/google",
    scopes: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/admin.reports.usage.readonly",
    ],
    serviceConfiguration: {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
    },
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const authenticateWithGoogle = async () => {
    if (!token) {
      try {
        const result = await authorize(config);
        setToken(result?.accessToken);
        // Access token is available in result.accessToken
        // Use the access token to make requests to the Gmail API
      } catch (error) {
        console.error("Authorization Error", error);
      }
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      const stringifyUser = JSON.stringify(user);
      setAuthorizedUser([JSON.parse(stringifyUser)]);
    } catch (error) {
      console.log("Error in fetching user data", error);
    }
  };

  const twoFactorHandler = async () => {
    try {
      const response = await fetch(
        `https://admin.googleapis.com/admin/reports/v1/usage/users/${authorizedUser[0]?.email}/dates/2023-12-15?key=${apiKey}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          scopes: [
            "https://www.googleapis.com/auth/admin.reports.usage.readonly",
          ],
        }
      );

      const user = await response.json();
      console.log("authorizedUser", user);
    } catch (error) {
      console.log("ERR", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={authenticateWithGoogle}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: "100%",
        }}
      >
        <SignWithGoogle height={50} width="100%" />
      </TouchableOpacity>

      {authorizedUser?.map((x, idx) => {
        return (
          <View key={idx} style={{ flexDirection: "column" }}>
            <Text style={{ marginVertical: 6 }}>{x.email}</Text>
          </View>
        );
      })}

      <TouchableOpacity
        onPress={async () => {
          setToken("");
          setAuthorizedUser(null);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: "100%",
          backgroundColor: "#000",
        }}
      >
        <Text style={{ color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;
