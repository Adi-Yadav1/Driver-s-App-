// app/ride_completed.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Linking,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const RideCompletedScreen = () => {
  const router = useRouter();
  const [showEndRideModal, setShowEndRideModal] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const initialRegion = {
    latitude: 28.4595,
    longitude: 77.0266,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleCancelRide = () => {
    console.log("Ride canceled for reason:", cancelReason);
    setShowEndRideModal(false);
    setShowReasonInput(false);
    setCancelReason("");
  };

  const handleSOSPress = () => {
    Linking.openURL("tel:112");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/avator.png")}
            style={styles.avatar}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.driverName}>Sameul Mishra</Text>
            <Text style={styles.rating}>⭐ 4.5</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="call" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-ellipses" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Map */}
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
        >
          <Marker coordinate={initialRegion} title="Driver">
            <Image
              source={require("../assets/images/avator.png")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </Marker>
        </MapView>

        {/* Drop Location Title */}
        <View style={styles.detailsContainer1}>
          <View style={styles.dropLocationHeader}>
            <Text style={styles.pickupTitle}>Drop Location</Text>
          </View>
        </View>

        {/* Ride Details */}
        <View style={styles.detailsContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.address}>
              Galleria Market, DLF Phase IV, Sector 28, Gurugram
            </Text>
            <Image
              source={require("../assets/images/up.png")}
              style={{ width: 38, height: 38 }}
            />
          </View>
          <Text style={styles.etp}>ETA - 14:43</Text>
          <View style={styles.line} />

          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={20} color="red" />
            <Text style={styles.infoText}>Departure</Text>
            <Text style={styles.infoTextRight}>14:22</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={20} color="blue" />
            <Text style={styles.infoText}>Drop</Text>
            <Text style={[styles.infoTextRight, { opacity: 0.5 }]}>
              21 min | 9.2 km
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.arrivedBtn}
              onPress={() => router.push("/trip_summary")}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Complete Ride
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowEndRideModal(true)}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SOS Button */}
        <TouchableOpacity style={styles.sosFloatingBtn} onPress={handleSOSPress}>
          <Text style={styles.sosFloatingText}>SOS</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal transparent visible={showEndRideModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Ionicons name="warning" size={28} color="#0050C8" />
              {!showReasonInput ? (
                <>
                  <Text style={styles.modalText}>
                    Do you want to end the ride early?
                  </Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalBtn}
                      onPress={() => setShowEndRideModal(false)}
                    >
                      <Text>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.modalBtn,
                        yesPressed && styles.modalBtnPressed,
                      ]}
                      onPress={() => setShowReasonInput(true)}
                      onPressIn={() => setYesPressed(true)}
                      onPressOut={() => setYesPressed(false)}
                    >
                      <Text
                        style={[
                          styles.modalBtnText,
                          yesPressed && styles.modalBtnTextPressed,
                        ]}
                      >
                        Yes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.modalText}>
                    Please tell us why you wand end ride early:
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter reason..."
                    value={cancelReason}
                    onChangeText={setCancelReason}
                    multiline
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalBtn}
                      onPress={() => setShowEndRideModal(false)}
                    >
                      <Text>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalBtn, styles.modalBtnPressed]}
                      onPress={handleCancelRide}
                    >
                      <Text
                        style={[
                          styles.modalBtnText,
                          styles.modalBtnTextPressed,
                        ]}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default RideCompletedScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  driverName: { fontSize: 16, fontWeight: "bold" },
  rating: { fontSize: 14, color: "#555" },
  iconButton: {
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  map: { flex: 1 },
  detailsContainer1: {
    backgroundColor: "#0C2353E5",
    padding: 10,
    height: 51,
    marginBottom: 30,
    justifyContent: "center",
  },
  dropLocationHeader: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 148,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  pickupTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    elevation: 10,
    marginTop: -30,
  },
  address: {
    fontSize: 14,
    color: "#333",
    width: 260,
  },
  etp: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    flex: 1,
  },
  infoTextRight: {
    textAlign: "right",
    fontSize: 14,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrivedBtn: {
    flex: 1,
    backgroundColor: "#0b2f5b",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 10,
  },
  line: {
    backgroundColor: "grey",
    height: 1,
    opacity: 0.4,
    marginVertical: 10,
  },
  sosFloatingBtn: {
    position: "absolute",
    bottom: 40,
    marginBottom: 270,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF4D4D",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  sosFloatingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalBtn: {
    flex: 1,
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  modalBtnPressed: {
    backgroundColor: "#0D2454",
  },
  modalBtnText: {
    color: "#000",
    fontWeight: "bold",
  },
  modalBtnTextPressed: {
    color: "white",
  },
  textInput: {
    width: "100%",
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
});
