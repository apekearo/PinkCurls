import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IMLocalized } from "../../localization/IMLocalization";
import BackIcon from "../../../CoreAssets/arrow-back-icon.png";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { setUserData } from "../redux/auth";
import TNActivityIndicator from "../../truly-native/TNActivityIndicator";
import authManager from "../utils/authManager";

const axios = require("axios");
const FormData = require("form-data");

//OCR Key
// const key = "f095a55eb788957";
// REPLACE WITH YOUR KEY HERE!
const key = "OCRK8209898A";


//Identfication Strings
const strings = [
  "COVID-19 VACCINATION RECORD CARD",
  "Pfizer",
  "Moderna",
  "Bio",
  "Tech",
  "Covid",
  "19",
  "Vaccination",
  "COVID-19 Vaccination Record Card",
  "VACCINATION RECORD CARD",
  "Vaccination Record Card",
  "COVID REPORT",
  "COVID Report",
  "Covid Report",
  "COVID-19",
  "Record Card",
  "COVID-19 Report",
  "VACCINATION CARD",
  "Vaccination Card",
];

// function detectInput(input) {
//   if (input.startsWith("http")) return "url";
//   if (input.startsWith("data:")) return "base64Image";
//   return "file";
// }

const VerificationScreen = (props) => {
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam("appConfig");
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam("appStyles");
  const [gender, setgender] = useState();
  const [preference, setpreference] = useState();
  const [vaccineReport, setvaccineReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedText, setdetectedText] = useState("");
  const userDetails = props.navigation.getParam("user");

  async function ocrSpace(input, options = {}) {
    try {
      setLoading(true);
      const data = new FormData();
      // const detectedInput = detectInput(input);
      data.append("base64Image", input);
      console.log("FINAL DATAAAAAAAAA", data);
      const request = {
        method: "POST",
        // url: String("https://api.ocr.space/parse/image"),
        url: String("https://apipro1.ocr.space/parse/image"),
        headers: {
          apikey: String(key),
        },
        data,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      };

      const response = await axios(request);

      console.log(response);

      if (typeof response.data.ParsedResults != "undefined") {
        response.data.ParsedResults.map((x) => {
          {
            console.log(x.ParsedText);
            let text = x.ParsedText.replace(
              /(\r\n|\n|\r)/gm,
              " "
            ).toLowerCase();
            console.log(text);
            if (
              strings.some((substring) =>
                text.includes(substring.toLowerCase())
              )
            ) {
              setvaccineReport(true);
              alert("Vaccination status: " + vaccineReport + " Nice work! Please continue..");
            } else {
              setvaccineReport(false);
              alert("Vaccination status: " + vaccineReport + " Please try again :)");
              // alert("vaccination", vaccineReport);
            }
            setdetectedText(text);
            setLoading(false);
          }
        });
      } else {
        alert(response.data.ErrorMessage);
        setdetectedText(response.data.ErrorMessage);
        setLoading(false);
      }
      // return response.data;
      // return response.data.ParsedResults.ParsedText;
    } catch (error) {
      console.error(error);
    }
  }

  const submit = () => {
    // setLoading(true);
    if (gender == null || preference == null) {
      alert("Select Gender and preference");
    } else {
      setLoading(true);
      let userData = {
        ...userDetails,
        settings: {
          gender: gender == 1 ? "Male" : "Female",
          gender_preference: preference == 1 ? "Male" : "Female",
        },
        vaccineReport: vaccineReport,
      };
      console.log("newfields......", userData);
      authManager
        .createAccountWithEmailAndPassword(userData, userData.appIdentifier)
        .then((response) => {
          console.log(response);
          const user = response.user;
          if (user) {
            setLoading(false);
            props.setUserData({ user: user });
            props.navigation.navigate("MainStack", { user: user });
          } else {
            setLoading(false);
            Alert.alert(
              "",
              localizedErrorMessage(response.error),
              [{ text: IMLocalized("OK") }],
              {
                cancelable: false,
              }
            );
          }
        });
    }
  };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      maxWidth: 450,
      maxHeight: 450,
      quality: 0.4
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        //   console.log("response", JSON.stringify(response));
        // setfilepath(response);
        // setfiledata(response.data);
        // setfileuri(response.uri);
        console.log("URI------->", response.uri);
        console.log("Name------->", response.fileName);
        console.log("Type------->", response.type);
        let img = "data:" + response.type + ";base64," + response.data;
        ocrSpace(img).then((response) => console.log("OCR Complete"));
      }
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.Header}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.BackBtn}
          >
            <Image style={styles.BackBtnImg} source={BackIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{IMLocalized("Select Gender")}</Text>
        <View style={styles.GenderSelectCont}>
          <TouchableOpacity
            style={[
              styles.Genderbtn,
              {
                borderWidth: gender == 1 ? 7 : 1,
                borderColor: gender == 1 ? "#eb5a6d" : "#000",
              },
            ]}
            onPress={() => setgender(1)}
          >
            <Text
              style={[styles.Text, { color: gender == 1 ? "#eb5a6d" : "#000" }]}
            >
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.Genderbtn,
              {
                borderWidth: gender == 2 ? 7 : 1,
                borderColor: gender == 2 ? "#eb5a6d" : "#000",
              },
            ]}
            onPress={() => setgender(2)}
          >
            <Text
              style={[styles.Text, { color: gender == 2 ? "#eb5a6d" : "#000" }]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{IMLocalized("Select Preference")}</Text>
        <View style={styles.GenderSelectCont}>
          <TouchableOpacity
            style={[
              styles.Genderbtn,
              {
                borderWidth: preference == 1 ? 7 : 1,
                borderColor: preference == 1 ? "#eb5a6d" : "#000",
              },
            ]}
            onPress={() => setpreference(1)}
          >
            <Text
              style={[
                styles.Text,
                { color: preference == 1 ? "#eb5a6d" : "#000" },
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.Genderbtn,
              {
                borderWidth: preference == 2 ? 7 : 1,
                borderColor: preference == 2 ? "#eb5a6d" : "#000",
              },
            ]}
            onPress={() => setpreference(2)}
          >
            <Text
              style={[
                styles.Text,
                { color: preference == 2 ? "#eb5a6d" : "#000" },
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.UploadBtn} onPress={launchCamera}>
          <Text style={styles.BtnText}>Upload Covid Report</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center" }}>Detected Text</Text>
        <Text style={styles.detectedText}>{detectedText}</Text>

        <TouchableOpacity style={styles.Submitbtn} onPress={submit}>
          <Text style={styles.BtnText}>Submit</Text>
        </TouchableOpacity>
        {loading && <TNActivityIndicator appStyles={appStyles} />}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default connect(null, {
  setUserData,
})(VerificationScreen);
