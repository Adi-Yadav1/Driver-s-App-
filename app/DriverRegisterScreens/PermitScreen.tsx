import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const PermitScreen: React.FC = () => {
  const router = useRouter();
  const [bhagAImageUri, setBhagAImageUri] = useState<string | null>(null);
  const [bhagBImageUri, setBhagBImageUri] = useState<string | null>(null);
  const [isDeclared, setIsDeclared] = useState(false);

  // Check if the proceed button should be enabled
  const isProceedEnabled = bhagAImageUri !== null && bhagBImageUri !== null && isDeclared;

  const handleClose = () => {
    console.log('Close button pressed');
    router.back(); 
  };

  const handleUploadImage = async (setUri: React.Dispatch<React.SetStateAction<string | null>>, photoType: string) => {
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
      `Upload ${photoType} Image`,
      `Choose an option to upload your ${photoType} image.`,
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
              setUri(result.assets[0].uri);
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
              setUri(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleProceed = () => {
    if (isProceedEnabled) {
      console.log('Proceeding with Permit:', { bhagAImageUri, bhagBImageUri, isDeclared });
      Alert.alert('Success', 'Permit details submitted successfully!');
      router.replace({ 
        pathname: '/DriverRegisterScreens/VehicleInformationScreen', 
        params: { PermitCompleted: 'true' } 
      });
    } else {
      Alert.alert('Missing Information', 'Please upload both permit images and agree to the declaration to proceed.');
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

        {/* Header Title */}
        <Text style={styles.headerTitleCentered}>Permit</Text>
        
        {/* Upload Permit Images Section Label */}
        <Text style={styles.uploadPermitLabel}>Upload Permit Images</Text>

        {/* BHAG A Upload Container */}
        <TouchableOpacity 
          style={styles.imageUploadBox} 
          onPress={() => handleUploadImage(setBhagAImageUri, 'BHAG A')}
        >
          {bhagAImageUri ? (
            <Image source={{ uri: bhagAImageUri }} style={styles.uploadedImage} resizeMode="cover" />
          ) : (
            <>
              <Ionicons name="camera-outline" size={30} color="#0C2353" />
              <Text style={styles.uploadBoxText}>BHAG A</Text>
            </>
          )}
        </TouchableOpacity>

        {/* BHAG B Upload Container */}
        <TouchableOpacity 
          style={styles.imageUploadBox} 
          onPress={() => handleUploadImage(setBhagBImageUri, 'BHAG B')}
        >
          {bhagBImageUri ? (
            <Image source={{ uri: bhagBImageUri }} style={styles.uploadedImage} resizeMode="cover" />
          ) : (
            <>
              <Ionicons name="camera-outline" size={30} color="#0C2353" />
              <Text style={styles.uploadBoxText}>BHAG B</Text>
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
    marginBottom: 30,
  },
  uploadPermitLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 15,
  },
  imageUploadBox: {
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderStyle: 'dashed',
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden', // Ensure image doesn't overflow rounded corners
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  uploadBoxText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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

export default PermitScreen;
