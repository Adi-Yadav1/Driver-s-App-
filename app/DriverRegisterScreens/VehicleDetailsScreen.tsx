// Screens/VehicleDetailsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const VehicleDetailsScreen: React.FC = () => {
  const router = useRouter();
  const [numberPlate, setNumberPlate] = useState('');
  const [vehiclePhotoUri, setVehiclePhotoUri] = useState<string | null>(null);
  const [isDeclared, setIsDeclared] = useState(false);

  // Check if the Proceed button should be enabled
  const isProceedEnabled = numberPlate.trim().length > 0 && vehiclePhotoUri !== null && isDeclared;

  const handleClose = () => {
    console.log('Close button pressed');
    router.back(); 
  };

  const handleChoosePhoto = async () => {
    // Request media library permissions first
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (mediaLibraryStatus !== 'granted' && cameraStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please enable camera and media library permissions in your device settings to upload a photo.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }

    Alert.alert(
      'Upload Photo',
      'Choose an option to upload your vehicle photo.',
      [
        {
          text: 'Take Photo',
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setVehiclePhotoUri(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setVehiclePhotoUri(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleProceed = () => {
    if (isProceedEnabled) {
      console.log('Proceeding with:', { numberPlate, vehiclePhotoUri, isDeclared });
      Alert.alert('Success', 'Vehicle details submitted!');
      // CORRECTED PATH: Use '/Screens/VehicleInformationScreen'
      router.replace({ 
        pathname: '/DriverRegisterScreens/VehicleInformationScreen', 
        params: { vehicleDetailsCompleted: 'true' } 
      });
    } else {
      Alert.alert('Missing Information', 'Please fill in all details and upload a photo to proceed.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Close Button */}
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Header Title and Subtitle */}
        <Text style={styles.headerTitleCentered}>Vehicle details</Text>
        <Text style={styles.subtitleCentered}>
          Enter the number plate details of the vehicle along with a
          photo clearly showing the number plate.
        </Text>

        {/* Number Plate Input */}
        <Text style={styles.inputLabel}>Enter Your Vehicle Number plate Number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="HR 45 B 1234"
          placeholderTextColor="#9CA3AF"
          value={numberPlate}
          onChangeText={setNumberPlate}
          autoCapitalize="characters" // Number plates are often uppercase
        />

        {/* Photo Upload Section */}
        <Text style={styles.inputLabel}>Upload the photo of the vehicle</Text>
        <TouchableOpacity style={styles.photoUploadContainer} onPress={handleChoosePhoto}>
          {vehiclePhotoUri ? (
            // Display the actual uploaded image
            <Image source={{ uri: vehiclePhotoUri }} style={styles.uploadedImage} resizeMode="cover" />
          ) : (
            // Display your custom placeholder image
            <>
              <Image 
                source={require('../../assets/images/PhotoUploadIcon.png')} // Your custom icon
                style={styles.photoPlaceholderIcon} // Apply new style for size
                resizeMode="contain"
              />
              <Text style={styles.photoUploadText}>VEHICLE PHOTO</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Declaration Checkbox */}
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsDeclared(!isDeclared)}>
          <Ionicons
            name={isDeclared ? 'checkbox-outline' : 'square-outline'}
            size={24}
            color={isDeclared ? '#0C2353' : '#6B7280'}
            style={styles.checkboxIcon}
          />
          <Text style={styles.checkboxText}>
            I hereby declare that the information provided is true and correct.
          </Text>
        </TouchableOpacity>

        {/* Proceed Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.proceedButton, !isProceedEnabled && styles.proceedButtonDisabled]}
            onPress={handleProceed}
            disabled={!isProceedEnabled}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 10,
  },
  closeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'rgba(12, 35, 83, 1)',
    fontWeight: '400',
  },
  headerTitleCentered: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitleCentered: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(43, 43, 43, 0.5)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(28, 27, 31, 1)',
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 18,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.28)',
    marginBottom: 20,
    backgroundColor: 'rgba(236, 236, 236, 0.5)',
  },
  photoUploadContainer: {
    borderWidth: 2,
    borderColor: 'rgba(12, 35, 83, 1)',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginHorizontal: 10,
    height: 180, // Fixed height for the photo upload area
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 20, 
    overflow: 'hidden', 
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholderIcon: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },
  photoUploadText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '400',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingRight: 20,
    marginLeft: '2%',
    flex: 1,
  },
  checkboxIcon: {
    marginRight: 10,
  },
  checkboxText: {
    flex: 1, 
    fontSize: 12,
    color: '#333',
    fontWeight: '400',
    lineHeight: 20,
  },
  bottomButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  proceedButton: {
    backgroundColor: '#0C2353',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  proceedButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default VehicleDetailsScreen;