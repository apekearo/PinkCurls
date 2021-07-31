import { DynamicStyleSheet } from 'react-native-dark-mode';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const dynamicStyles = appStyles => {
  return new DynamicStyleSheet({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    //
    navBarContainer: {
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'center',
      ...ifIphoneX(
        {
          top: 50,
        },
        {
          top: 12,
        },
      ),
      paddingVertical: 10,
      // height: 25,
      width: '100%',
      paddingHorizontal: 10,
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
      zIndex: 1,
    },
    navBarTitleContainer: {
      flex: 5,
    },
    leftButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 14,
      color: appStyles.colorSet.mainThemeForegroundColor,
      fontWeight: '600',
    },
    // GooglePlacesAutocomplete
    placesAutocompleteContainer: {
      ...ifIphoneX(
        {
          marginTop: 46,
        },
        {
          marginTop: 50,
        },
      ),
      height: '50%',
      backgroundColor: appStyles.colorSet.whiteSmoke,
    },
    placesAutocompleteTextInputContainer: {
      width: '100%',
      backgroundColor: appStyles.colorSet.hairlineColor,
      borderBottomWidth: 0,
      borderTopWidth: 0,
    },
    placesAutocompleteTextInput: {
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
      color: appStyles.colorSet.mainTextColor,
    },
    placesAutocompletedDescription: {
      fontWeight: '400',
      color: appStyles.colorSet.mainSubtextColor,
    },
    predefinedPlacesDescription: {
      color: appStyles.colorSet.mainSubtextColor,
    },
    predefinedPlacesPoweredContainer: {
      backgroundColor: appStyles.colorSet.mainThemeBackgroundColor,
    },
    mapContainer: {
      width: '100%',
      height: '39%',
      backgroundColor: appStyles.colorSet.whiteSmoke,
    },
  })
};

export default dynamicStyles;
