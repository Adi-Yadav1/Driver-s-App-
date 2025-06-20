// DriverRegisterScreens/RegisterVehicleScreens.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, RelativePathString } from 'expo-router'; // Import RelativePathString

const RegisterVehicleScreen: React.FC = () => {
  const router = useRouter();

  const handleClose = () => {
    console.log('Close button pressed');
    // Implement navigation logic for closing this screen, e.g., router.back()
    // Example: router.back(); or router.push('/');
  };

  const handleItemPress = (item: string) => {
    console.log(${item} pressed);
    switch(item){
      case 'Owner Documents':
        // FIX: Cast pathname to RelativePathString for '/'
        router.push({ pathname: '/' as RelativePathString }); 
        break;
      case 'Vehicle Information':
        router.push({ pathname: '/DriverRegisterScreens/VehicleInformationScreen' as RelativePathString }); 
        break;
      case 'Driver Information':
        // FIX: Cast pathname to RelativePathString for '/'
        router.push({ pathname: '/' as RelativePathString }); 
        break;
      case 'Profile Photo':
        // FIX: Cast pathname to RelativePathString for '/'
        router.push({ pathname: '/' as RelativePathString }); 
        break;
      case 'Payment':
        // FIX: Cast pathname to RelativePathString for '/'
        router.push({ pathname: '/' as RelativePathString }); 
        break;
      default:
        console.log(No specific nav logic for: ${item});
        break;
    }
  };

  const handleProceed = () => {
    console.log('Proceed button pressed');
    // Implement navigation logic for proceeding, e.g., to a dashboard or next step
    // Example: router.push('/dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Close Button - positioned at the very top right */}
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        {/* Header Title and Subtitle - centered */}
        <Text style={styles.headerTitleCentered}>Register Your Vehicle</Text>
        <Text style={styles.subtitleCentered}>Start earning in simple steps</Text>

        {/* List Items */}
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress('Owner Documents')}>
            <Text style={styles.listItemText}>Owner Documents</Text>
            <Ionicons name="arrow-forward" size={24} color="#0C2353" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={()=> handleItemPress('Vehicle Information')}>
            <Text style={styles.listItemText}>Vehicle Information</Text>
            <Ionicons name="arrow-forward" size={24} color="#0C2353" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress('Driver Information')}>
            <Text style={styles.listItemText}>Driver Information</Text>
            <Ionicons name="arrow-forward" size={24} color="#0C2353" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress('Profile Photo')}>
            <Text style={styles.listItemText}>Profile Photo</Text>
            <Ionicons name="arrow-forward" size={24} color="#0C2353" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={() => handleItemPress('Payment')}>
            <Text style={styles.listItemText}>Payment</Text>
            <Ionicons name="arrow-forward" size={24} color="#0C2353" />
          </TouchableOpacity>
        </View>

        {/* Proceed Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
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
  // New container for the close button to control its position
  closeButtonContainer: {
    width: '100%',
    alignItems: 'flex-end', // Aligns children to the right
    marginTop: 20, // Adjust for top spacing from SafeAreaView
    marginBottom: 10, // Spacing before the centered title
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
  // Centered header title
  headerTitleCentered: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    marginBottom: 30, 
  },
  // Centered subtitle
  subtitleCentered: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(43, 43, 43, 0.5)',
    textAlign: 'center',
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 25,
  },
  listContainer: {
    flex: 1,
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  listItemText: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '400',
  },
  bottomButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  proceedButton: {
    backgroundColor: '#0C2353',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    fontWeight: '400',
  },
});

export default RegisterVehicleScreen;