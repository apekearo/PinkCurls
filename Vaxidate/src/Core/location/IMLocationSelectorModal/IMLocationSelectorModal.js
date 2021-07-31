import React, { useState, useEffect } from 'react';
import { Modal, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import TextButton from 'react-native-button';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';

const locationDelta = { latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
Geocoder.init('AIzaSyCDeWXVrJxUCRQlpcWK2JJQSB-kFVjCqlM');
const googleApiKey = 'AIzaSyCc-7cU3-_x1VTV5eW3g2pVnl3vi9lvv7w';

function IMLocationSelectorModal(props) {
  const { onCancel, isVisible, onChangeLocation, onDone, appStyles } = props;
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));

  const [region, setRegion] = useState({
    latitude: null,
    longitude: null,
  });
  const [address, setAddress] = useState(' ');

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion(position.coords);
        onLocationChange(position.coords);
      },
      error => alert(error.message),
    );
  };

  const onLocationChange = location => {
    Geocoder.from(location.latitude, location.longitude)
      .then(json => {
        const addressComponent = json.results[8].formatted_address;
        setAddress(addressComponent);
        onChangeLocation(addressComponent);
      })
      .catch(error => {
        console.log(error);
        setAddress('');
      });
  };

  const setLocationDetails = (data, details) => {
    const { geometry, name } = details;
    if (geometry) {
      setRegion({
        longitude: geometry.location.lng,
        latitude: geometry.location.lat,
      });
    }

    if (name) {
      setAddress(name);
      onChangeLocation(name);
    }
  };

  const onMapMarkerDragEnd = location => {
    const region = location.nativeEvent.coordinate;
    setRegion(region);
    onLocationChange(region);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onCancel}>
      <SafeAreaView style={styles.container}>
        <View style={styles.navBarContainer}>
          <View style={styles.leftButtonContainer}>
            <TextButton style={styles.buttonText} onPress={onCancel}>
              Cancel
            </TextButton>
          </View>
          <View style={styles.navBarTitleContainer} />

          <View style={styles.rightButtonContainer}>
            <TextButton
              style={styles.buttonText}
              onPress={() => onDone(address)}>
              Done
            </TextButton>
          </View>
        </View>
        <GooglePlacesAutocomplete
          placeholder={'Enter location address'}
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => setLocationDetails(data, details)}
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: googleApiKey,
            language: 'en',
          }}
          styles={{
            container: styles.placesAutocompleteContainer,
            textInputContainer: styles.placesAutocompleteTextInputContainer,
            textInput: styles.placesAutocompleteTextInput,
            description: styles.placesAutocompletedDescription,
            predefinedPlacesDescription: styles.predefinedPlacesDescription,
            poweredContainer: styles.predefinedPlacesPoweredContainer,
          }}
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
          }}
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'formatted_address',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
        <MapView
          style={styles.mapContainer}
          region={{
            ...region,
            ...locationDelta,
          }}>
          <Marker
            draggable={true}
            onDragEnd={onMapMarkerDragEnd}
            coordinate={region}
          />
        </MapView>
      </SafeAreaView>
    </Modal>
  );
}

IMLocationSelectorModal.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  onDone: PropTypes.func,
  onChangeLocation: PropTypes.func,
};

export default IMLocationSelectorModal;