import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Header: {
    height: height * 0.09,
    width: "100%",
    justifyContent: "center",
  },
  BackBtn: {
    height: "100%",
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  Submitbtn: {
    height: height * 0.06,
    width: width * 0.6,
    marginTop: height * 0.03,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#eb5a6d",
    borderRadius: width * 0.1,
    marginTop: height * 0.3,
  },
  BackBtnImg: {
    resizeMode: "contain",
    height: "50%",
    width: "50%",
    tintColor: "#eb5a6d",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#eb5a6d",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 35,
  },
  GenderSelectCont: {
    width: "95%",
    alignSelf: "center",
    height: height * 0.08,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Genderbtn: {
    width: "45%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 5,
  },
  GenderIconCont: {
    height: "90%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  UploadBtn: {
    height: height * 0.08,
    width: width * 0.6,
    marginTop: height * 0.03,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#eb5a6d",
    borderRadius: 10,
  },
  BtnText: {
    color: "#fff",
    fontSize: width * 0.05,
  },
  detectedText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    width: "90%",
  },
});
