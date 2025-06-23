import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const RegistrationCertificateScreen: React.FC = () => {
  const router = useRouter();
  const [documentUri, setDocumentUri] = useState<string | null>(null);
  const [isDeclared, setIsDeclared] = useState(false);

  // Check if the proceed button should be enabled
  const isProceedEnabled = documentUri !== null && isDeclared;

  const handleClose = () => {
    console.log('Close button pressed');
    router.back(); // Navigate back to the previous screen
  };

  const handleUploadDocument = async () => {
    // Request permissions for media library and camera
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    // If permissions are not granted, alert the user and offer to open settings
    if (mediaLibraryStatus !== 'granted' && cameraStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please enable camera and media library permissions in your device settings to upload a photo.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return; // Exit if permissions are not granted
    }

    // Prompt user to choose between taking a photo or selecting from gallery
    Alert.alert(
      'Upload Document',
      'Choose an option to upload your Registration Certificate.',
      [
        {
          text: 'Take Photo',
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3], // Standard aspect ratio for documents
              quality: 1,
            });

            if (!result.canceled) {
              setDocumentUri(result.assets[0].uri); // Set the URI of the captured image
            }
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3], // Standard aspect ratio for documents
              quality: 1,
            });

            if (!result.canceled) {
              setDocumentUri(result.assets[0].uri); // Set the URI of the selected image
            }
          },
        },
        { text: 'Cancel', style: 'cancel' }, 
      ]
    );
  };

  const handleProceed = () => {
    if (isProceedEnabled) {
      console.log('Proceeding with RC:', { documentUri, isDeclared });
      Alert.alert('Success', 'Registration Certificate submitted successfully!');
      router.replace({ 
        pathname: '/DriverRegisterScreens/VehicleInformationScreen', 
        params: { RCCompleted: 'true' }
      });
    } else {
      Alert.alert('Missing Information', 'Please upload the document and agree to the declaration to proceed.');
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
        <Text style={styles.headerTitleCentered}>Registration Certificate (RC)</Text>
        <Text style={styles.subtitleCentered}>
          Do not upload photo of printout or photocopy. Registration
          certificate from m-Parivahan is allowed.
        </Text>

        {/* Upload Document Field */}
        <TouchableOpacity style={styles.uploadField} onPress={handleUploadDocument}>
          <Text style={styles.uploadFieldText}>
            {documentUri ? 'Document Uploaded' : 'Upload Document'}
          </Text>
          <Image source={require('../../assets/images/attachmentIcon.png')}/>
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

        {/* Document Preview and Checkmarks */}
        <View style={styles.imagePreviewContainer}>
          {documentUri ? (
            <Image source={{ uri: documentUri }} style={styles.uploadedDocumentImage} resizeMode="contain" />
          ) : (
            <Image 
              source={require('../../assets/images/RCPlaceholder0.png')}
              style={styles.uploadedDocumentImage} 
              resizeMode="contain" 
            />
          )}
          <View style={styles.checkmarkRow}>
            {/* Replaced Ionicons with Image for Clear Image */}
            <Image
              source={require('../../assets/images/blueCheckMark.png')} // Assuming this path for a green checkmark circle
              style={styles.checkmarkImage}
            />
            <Text style={styles.checkmarkText}>Clear Image</Text>
          </View>
          <View style={styles.checkmarkRow}>
            <Image
              source={require('../../assets/images/blueCheckMark.png')}
              style={styles.checkmarkImage}
            />
            <Text style={styles.checkmarkText}>Cropped Correctly</Text>
          </View>
        </View>

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
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(43, 43, 43, 0.5)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  uploadField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(236, 236, 236, 0.5)',
  },
  uploadFieldText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.28)', // Lighter color for placeholder-like text
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingRight: 10,
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
  imagePreviewContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    marginBottom: 270,
    // flex: 1,
  },
  uploadedDocumentImage: {
    width: '100%',
    height: 150, 
    marginBottom: 15,
  },
  checkmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  checkmarkImage: { 
    width: 20, 
    height: 20, 
    marginRight: 10,
  },
  checkmarkText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 0, 
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

export default RegistrationCertificateScreen;
