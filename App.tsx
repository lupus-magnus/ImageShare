// import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import logo from "./assets/logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState<string>("");

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult.uri);
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage);
  };
  if (selectedImage !== "") {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        To share a photo, click the button below 💜
      </Text>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      {/* {selectedImage !== "" && (
        <View style={styles.container}>
          <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "green",
  },

  logo: {
    width: 305,
    height: 159,
    marginTop: 10,
    borderRadius: 20,
  },

  instructions: {
    color: "#888",
    fontSize: 18,
  },

  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "blue",
    borderRadius: 5,
  },

  buttonText: {
    color: "#ddd",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 22,
  },

  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
