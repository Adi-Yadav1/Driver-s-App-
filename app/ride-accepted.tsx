import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CustomSwipeButton = ({ onSwipeSuccess }: { onSwipeSuccess: () => void }) => {
  const pan = useRef(new Animated.Value(0)).current;
  const buttonWidth = SCREEN_WIDTH - 100;
  const thumbWidth = 50;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > 0 && gesture.dx <= buttonWidth - thumbWidth) {
          pan.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > buttonWidth * 0.6) {
          Animated.timing(pan, {
            toValue: buttonWidth - thumbWidth,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            onSwipeSuccess();
            pan.setValue(0);
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const bgColor = pan.interpolate({
    inputRange: [0, buttonWidth - thumbWidth],
    outputRange: ["#d3d3d3", "#0B1547"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.track,
        {
          width: buttonWidth,
          backgroundColor: bgColor,
        },
      ]}
    >
      <Text style={styles.label}>Arrived</Text>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            transform: [{ translateX: pan }],
          },
        ]}
      >
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </Animated.View>
    </Animated.View>
  );
};

const RideAcceptedScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [pressedBtn, setPressedBtn] = useState<"yes" | "no" | null>(null);

  const initialRegion = {
    latitude: 28.4595,
    longitude: 77.0266,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleCancel = () => {
    setModalVisible(false);
    setShowReasonModal(true);
    setPressedBtn(null);
  };

  const handleFinalCancel = () => {
    console.log("Ride cancelled. Reason:", cancelReason);
    setShowReasonModal(false);
    setCancelReason("");
  };

  // Button press handlers for modal
  const handleNoPress = () => {
    setPressedBtn("no");
    setTimeout(() => {
      setModalVisible(false);
      setPressedBtn(null);
    }, 120);
  };

  const handleYesPress = () => {
    setPressedBtn("yes");
    setTimeout(() => {
      handleCancel();
      setPressedBtn(null);
    }, 120);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/avator.png")}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.driverName}>Samuel Mishra</Text>
          <Text style={styles.rating}>⭐ 4.5</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="call" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chatbubble-ellipses" size={22} color="#000" />
        </TouchableOpacity>
      </View>

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

      <View style={styles.detailsContainer1}>
        <View style={styles.pickupHeader}>
          <Text style={styles.pickupTitle}>Pickup Location</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row", marginBottom: 50 }}>
          <Text style={styles.address}>
            Medinova Apartments, Plot no 50, Sector 56, Gurugram
          </Text>
          <Image
            source={require("../assets/images/up.png")}
            style={{ marginLeft: 30, width: 38, height: 38 }}
          />
        </View>

        <Text style={styles.etp}>ETP - 14:20</Text>
        <View style={styles.line}></View>

        <View>
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={20} color="red" />
            <Text style={styles.infoText}>Pick Up</Text>
            <Text style={styles.infoText1}>1 min | 0.9 km</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={20} color="blue" />
            <Text style={styles.infoText}>Drop</Text>
            <Text style={styles.infoText2}>20 min | 9.2 km</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <CustomSwipeButton onSwipeSuccess={() => router.push("/ride-arrived")} />
          <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(true)}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cancel Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Ionicons name="alert-circle" size={30} color="#3478f6" />
            <Text style={styles.modalText}>Do you want to cancel the ride?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  pressedBtn === "no" && styles.modalBtnActive,
                ]}
                onPress={handleNoPress}
                activeOpacity={0.7}
              >
                <Text style={styles.modalBtnTextNo}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  pressedBtn === "yes" && styles.modalBtnActive,
                ]}
                onPress={handleYesPress}
                activeOpacity={0.7}
              >
                <Text style={styles.modalBtnTextNo}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Reason Input Modal */}
      <Modal
        visible={showReasonModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReasonModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.reasonModalContainer}>
            <Ionicons name="alert-circle" size={30} color="#3478f6" />
            <Text style={styles.modalText}>Do you want to cancel the ride?</Text>
            <View style={styles.reasonInputBox}>
              <Text style={styles.reasonLabel}>Please specify your reason.</Text>
              <View style={styles.reasonInput}>
                <TextInput
                  value={cancelReason}
                  onChangeText={setCancelReason}
                  placeholder="Type your reason here"
                  style={{ flex: 1 }}
                  multiline
                  placeholderTextColor="#888"
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handleFinalCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RideAcceptedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
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
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    elevation: 10,
    marginTop: -30,
  },
  track: {
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
    overflow: "hidden",
  },
  label: {
    position: "absolute",
    alignSelf: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    zIndex: 1,
  },
  thumb: {
    width: 50,
    height: 45,
    backgroundColor: "#0B1547",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 2,
  },
  detailsContainer1: {
    backgroundColor: "#0C2353E5",
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
    height: 51,
    justifyContent: "center",
  },
  pickupHeader: {
    backgroundColor: "white",
    width: 148,
    height: 30,
    borderRadius: 30,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pickupTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  address: {
    fontSize: 14,
    color: "#333",
    width: 274,
    height: 40,
  },
  etp: { fontSize: 12, color: "#777", marginTop: 4 },
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
  infoText1: {
    flex: 1,
    textAlign: "right",
  },
  infoText2: {
    flex: 1,
    textAlign: "right",
    opacity: 0.3,
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    backgroundColor: "grey",
    width: "100%",
    height: 1,
    opacity: 0.4,
  },
  cancelBtn: {
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
  },

  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    width: 280,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalBtn: {
    backgroundColor: "#e0e0e0",
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalBtnActive: {
    backgroundColor: "#0B1547",
  },
  modalBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalBtnTextNo: {
    color: "#222",
    fontWeight: "600",
  },
  reasonModalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
  },
  reasonInputBox: {
    width: "100%",
    marginVertical: 15,
  },
  reasonLabel: {
    marginBottom: 6,
    fontSize: 14,
    color: "#333",
  },
  reasonInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
    height: 80,
  },
  confirmBtn: {
    backgroundColor: "#0B1547",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  confirmBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

