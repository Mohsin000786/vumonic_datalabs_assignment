import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFormik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Login = () => {
  const isFocussed = useIsFocused();
  const navigation = useNavigation();
  const [dataFromAsync, setDataFromAsync] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchDataFromAsync = async () => {
      const email = await AsyncStorage.setItem("@email");
      const password = await AsyncStorage.setItem("@password");
      setDataFromAsync({ ...dataFromAsync, email: email, password: password });
    };
    fetchDataFromAsync();
  }, [dataFromAsync.email, dataFromAsync.password]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const errors = {};

    if (!values.email) {
      errors.email = "email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 6) {
      errors.password = "password is too short";
    }

    return errors;
  };

  const handleLogin = (values) => {
    // Handle login logic here
    if (
      values.email === dataFromAsync.email &&
      values.password === dataFromAsync.password
    ) {
      navigation.navigate("Dashboard");
    }
  };

  useEffect(() => {
    // Reset errors when the component mounts
    formik.setErrors({});
  }, [isFocussed]);

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: handleLogin,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign In</Text>
      <View>
        <Text style={{ marginBottom: 5 }}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          value={formik.values.email}
          keyboardType="email-address"
        />
        <Text style={styles.errorText}>{formik.errors.email}</Text>

        <Text style={{ marginBottom: 5 }}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          value={formik.values.password}
          secureTextEntry
        />
        <Text style={styles.errorText}>{formik.errors.password}</Text>

        <TouchableOpacity
          onPress={() => formik.handleSubmit()}
          style={styles.loginBtn}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#87CEEB",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  loginBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#000",
  },
});

export default Login;
