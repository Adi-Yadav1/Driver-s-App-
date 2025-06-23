// Screens/VehicleInformationScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native"; // Ensure Image is imported
import { Ionicons } from "@expo/vector-icons";
import {
  useRouter,
  useLocalSearchParams,
  RelativePathString,
} from "expo-router";

const VehicleInformationScreen: React.FC = () => {
  const router = useRouter();
  const localSearchParams = useLocalSearchParams(); // Get params from the current route

  // State to track if Vehicle Details are completed
  const [isVehicleDetailsCompleted, setIsVehicleDetailsCompleted] =
    useState(false);
  const [isRCCompleted, setIsRCCompleted] = useState(false);

  useEffect(() => {
    // Check if the vehicleDetailsCompleted param is present and true
    if (localSearchParams.vehicleDetailsCompleted === "true") {
      setIsVehicleDetailsCompleted(true);
      router.setParams({ vehicleDetailsCompleted: undefined });
    }
  }, [localSearchParams.vehicleDetailsCompleted]); // Depend on the specific param

  useEffect(() => {
    if (localSearchParams.RCCompleted === "true") {
      setIsRCCompleted(true);
      router.setParams({ RCCompleted: undefined });
    }
  }, [localSearchParams.RCCompleted]);

  const handleClose = () => {
    console.log("Close button pressed");
    router.back();
  };

  const handleItemPress = (item: string) => {
    console.log(`${item} pressed`);

    switch (item) {
      case "Vehicle Details":
        router.push("/DriverRegisterScreens/VehicleDetailsScreen");
        break;
      case "Registration Certificate (RC)":
        router.push({
          pathname:
            "/DriverRegisterScreens/RegistrationCertificateScreen" as RelativePathString,
        });
        break;
      case "Permit":
        router.push({ pathname: "/" as RelativePathString });
        break;
      case "Vehicle Insurance":
        router.push({ pathname: "/" as RelativePathString });
        break;
      default:
        console.log(`No specific nav logic for: ${item}`);
        break;
    }
  };

  const handleProceed = () => {
    console.log("Proceed button pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitleCentered}>Vehicle Information</Text>
        <Text style={styles.subtitleCentered}>
          Under this section, enter the details of vehicle number, photo of your
          vehicle, Registration Certificate and Permit.
        </Text>

        <View style={styles.listContainer}>
          <TouchableOpacity
            style={[
              styles.listItem,
              isVehicleDetailsCompleted && styles.listItemCompleted,
            ]}
            onPress={() => handleItemPress("Vehicle Details")}
          >
            <Text style={styles.listItemText}>Vehicle Details</Text>
            {isVehicleDetailsCompleted ? (
              <Image
                source={require("../../assets/images/BlueTick.png")}
                style={styles.completedIcon}
                resizeMode="contain"
              />
            ) : (
              <Ionicons name="arrow-forward" size={24} color="#0C2353" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.listItem,
              isRCCompleted && styles.listItemCompleted,
            ]}
            onPress={() => handleItemPress("Registration Certificate (RC)")}
          >
            <Text style={styles.listItemText}>
              Registration Certificate (RC)
            </Text>
            {isRCCompleted ? (
              <Image
                source={require("../../assets/images/BlueTick.png")} 
                style={styles.completedIcon}
                resizeMode="contain"
              />
            ) : (
              <Ionicons name="arrow-forward" size={24} color="#0C2353" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleItemPress("Permit")}
          >
            <Text style={styles.listItemText}>Permit</Text>
            <Ionicons name="arrow-forward" size={24} color="#0C2353" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleItemPress("Vehicle Insurance")}
          >
            <Text style={styles.listItemText}>Vehicle Insurance</Text>
            <Ionicons name="arrow-forward" size={24} color="#0C2353" />
          </TouchableOpacity>
        </View>

        {/* Proceed Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}
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
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButtonContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
    marginBottom: 10,
  },
  closeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "600",
  },
  headerTitleCentered: {
    fontSize: 24,
    fontWeight: "500",
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitleCentered: {
    fontSize: 15,
    fontWeight: "400",
    color: "rgba(43, 43, 43, 0.5)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 35,
  },
  listContainer: {
    flex: 1,
    gap: 15,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 1)",
  },
  listItemCompleted: {
    backgroundColor: "#E0F2FF",
    borderColor: "#007AFF", 
  },
  listItemText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "400",
  },
  completedIcon: {
    width: 24, 
    height: 24, 
  },
  bottomButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  proceedButton: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden", 
    backgroundColor: "#0C2353",
    paddingVertical: 12,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "400",
  },
});

export default VehicleInformationScreen;
