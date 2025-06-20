

// import { useRouter } from "expo-router";
// import React, { useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Animated,
//   PanResponder,
//   Dimensions,
// } from "react-native";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// // ✅ CustomSwipeButton – beautified
// const CustomSwipeButton = ({ onSwipeSuccess }: { onSwipeSuccess: () => void }) => {
//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gesture) => {
//         if (gesture.dx > 0 && gesture.dx < SCREEN_WIDTH - 100) {
//           pan.setValue({ x: gesture.dx, y: 0 });
//         }
//       },
//       onPanResponderRelease: (_, gesture) => {
//         if (gesture.dx > SCREEN_WIDTH * 0.6) {
//           Animated.spring(pan, {
//             toValue: { x: SCREEN_WIDTH - 100, y: 0 },
//             useNativeDriver: false,
//           }).start(() => {
//             onSwipeSuccess();
//             pan.setValue({ x: 0, y: 0 }); // Reset after action
//           });
//         } else {
//           Animated.spring(pan, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   return (
//     <View style={swipeStyles.container}>
//       <LinearGradient
//         colors={["#0b2f5b", "#2c5c94"]}
//         start={[0, 0]}
//         end={[1, 0]}
//         style={swipeStyles.track}
//       >
//         <Text style={swipeStyles.label}>Slide to Arrive</Text>
//         <Animated.View
//           style={[swipeStyles.thumb, { transform: [{ translateX: pan.x }] }]}
//           {...panResponder.panHandlers}
//         >
//           <Ionicons name="chevron-forward" size={20} color="#fff" />
//         </Animated.View>
//       </LinearGradient>
//     </View>
//   );
// };

// // ✅ Main screen
// const RideAcceptedScreen = () => {
//   const router = useRouter();

//   const initialRegion = {
//     latitude: 28.4595,
//     longitude: 77.0266,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image
//           source={require("../assets/images/avator.png")}
//           style={styles.avatar}
//         />
//         <View style={{ flex: 1, marginLeft: 10 }}>
//           <Text style={styles.driverName}>Samuel Mishra</Text>
//           <Text style={styles.rating}>⭐ 4.5</Text>
//         </View>
//         <TouchableOpacity style={styles.iconButton}>
//           <Ionicons name="call" size={22} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton}>
//           <Ionicons name="chatbubble-ellipses" size={22} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Map */}
//       <MapView
//         style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         initialRegion={initialRegion}
//       >
//         <Marker coordinate={initialRegion} title="Driver">
//           <Image
//             source={require("../assets/images/avator.png")}
//             style={{ width: 40, height: 40, borderRadius: 20 }}
//           />
//         </Marker>
//       </MapView>

//       {/* Location Header */}
//       <View style={styles.detailsContainer1}>
//         <View style={styles.pickupHeader}>
//           <Text style={styles.pickupTitle}>Pickup Location</Text>
//         </View>
//       </View>

//       {/* Location Details */}
//       <View style={styles.detailsContainer}>
//         <View style={{ flexDirection: "row", marginBottom: 50 }}>
//           <Text style={styles.address}>
//             Medinova Apartments, Plot no 50, Sector 56, Gurugram
//           </Text>
//           <Image
//             source={require("../assets/images/up.png")}
//             style={{ marginLeft: 30, width: 38, height: 38 }}
//           />
//         </View>

//         <Text style={styles.etp}>ETP - 14:20</Text>
//         <View style={styles.line}></View>

//         <View>
//           <View style={styles.infoRow}>
//             <MaterialIcons name="location-on" size={20} color="red" />
//             <Text style={styles.infoText}>Pick Up</Text>
//             <Text style={styles.infoText1}>1 min | 0.9 km</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <MaterialIcons name="location-on" size={20} color="blue" />
//             <Text style={styles.infoText}>Drop</Text>
//             <Text style={styles.infoText2}>20 min | 9.2 km</Text>
//           </View>
//         </View>

//         {/* Actions */}
//         <View style={styles.actions}>
//           {/* <CustomSwipeButton onSwipeSuccess={() => router.replace("/ride-arrived")} /> */}
//           <CustomSwipeButton onSwipeSuccess={() => router.push("/ride-arrived")} />
//           <TouchableOpacity style={styles.cancelBtn}>
//             <Ionicons name="close" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default RideAcceptedScreen;

// // ✅ Main styles
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f6f6f6" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     elevation: 2,
//   },
//   avatar: { width: 40, height: 40, borderRadius: 20 },
//   driverName: { fontSize: 16, fontWeight: "bold" },
//   rating: { fontSize: 14, color: "#555" },
//   iconButton: {
//     padding: 8,
//     marginHorizontal: 5,
//     backgroundColor: "#eee",
//     borderRadius: 20,
//   },
//   map: { flex: 1 },
//   detailsContainer: {
//     backgroundColor: "#fff",
//     padding: 16,
//     elevation: 10,
//     marginTop: -30,
//   },
//   detailsContainer1: {
//     backgroundColor: "#0C2353E5",
//     padding: 10,
//     borderRadius: 3,
//     marginBottom: 30,
//     height: 51,
//     justifyContent: "center",
//   },
//   pickupHeader: {
//     backgroundColor: "white",
//     width: 148,
//     height: 30,
//     borderRadius: 30,
//     marginLeft: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pickupTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "black",
//   },
//   address: {
//     fontSize: 14,
//     color: "#333",
//     width: 274,
//     height: 40,
//   },
//   etp: { fontSize: 12, color: "#777", marginTop: 4 },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   infoText: {
//     marginLeft: 5,
//     fontSize: 14,
//     flex: 1,
//   },
//   infoText1: {
//     flex: 1,
//     textAlign: "right",
//   },
//   infoText2: {
//     flex: 1,
//     textAlign: "right",
//     opacity: 0.3,
//   },
//   actions: {
//     flexDirection: "row",
//     marginTop: 16,
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   line: {
//     backgroundColor: "grey",
//     width: "100%",
//     height: 1,
//     opacity: 0.4,
//   },
//   cancelBtn: {
//     backgroundColor: "#f44336",
//     padding: 12,
//     borderRadius: 10,
//     marginLeft: 10,
//   },
// });

// // ✅ Swipe styles
// const swipeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginRight: 10,
//   },
//   track: {
//     width: "100%",
//     height: 52,
//     borderRadius: 26,
//     justifyContent: "center",
//     backgroundColor: "#0b2f5b",
//     position: "relative",
//   },
//   label: {
//     alignSelf: "center",
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//     zIndex: 0,
//   },
//   thumb: {
//     width: 60,
//     height: 52,
//     backgroundColor: "#0a1e3f",
//     borderRadius: 26,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     zIndex: 2,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
// });


import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

// ✅ Swipe Button
// const CustomSwipeButton = ({ onSwipeSuccess }: { onSwipeSuccess: () => void }) => {
//   const pan = useRef(new Animated.Value(0)).current;

//   const buttonWidth = SCREEN_WIDTH - 100; // Room for cancel button
//   const thumbWidth = 50;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gesture) => {
//         if (gesture.dx > 0 && gesture.dx <= buttonWidth - thumbWidth) {
//           pan.setValue(gesture.dx);
//         }
//       },
//       onPanResponderRelease: (_, gesture) => {
//         if (gesture.dx > buttonWidth * 0.6) {
//           Animated.timing(pan, {
//             toValue: buttonWidth - thumbWidth,
//             duration: 200,
//             useNativeDriver: false,
//           }).start(() => {
//             onSwipeSuccess();
//             pan.setValue(0);
//           });
//         } else {
//           Animated.spring(pan, {
//             toValue: 0,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   const bgColor = pan.interpolate({
//     inputRange: [0, buttonWidth - thumbWidth],
//     outputRange: ["#d3d3d3", "#0B1547"],
//     extrapolate: "clamp",
//   });

//   return (
//     <Animated.View
//       style={[
//         swipeStylesImproved.track,
//         { width: buttonWidth, backgroundColor: bgColor,
//           borderRadius: 10,
//           height: 40,
//          },
//       ]}
//     >
//       <Text style={swipeStylesImproved.label}>Arrived</Text>
//       <Animated.View
//         {...panResponder.panHandlers}
//         style={[
//           swipeStylesImproved.thumb,
//           {
//             transform: [{ translateX: pan }],
//           },
//         ]}
//       >
//         <Ionicons name="arrow-forward" size={20} color="#fff" />
//       </Animated.View>
//     </Animated.View>
//   );
// };
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

// ✅ Main screen
const RideAcceptedScreen = () => {
  const router = useRouter();

  const initialRegion = {
    latitude: 28.4595,
    longitude: 77.0266,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

      {/* Location Header */}
      <View style={styles.detailsContainer1}>
        <View style={styles.pickupHeader}>
          <Text style={styles.pickupTitle}>Pickup Location</Text>
        </View>
      </View>

      {/* Location Details */}
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

        {/* Swipe + Cancel */}
        <View style={styles.actions}>
          <CustomSwipeButton onSwipeSuccess={() => router.push("/ride-arrived")} />
          <TouchableOpacity style={styles.cancelBtn}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RideAcceptedScreen;

// ✅ Base styles
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
});

// ✅ Swipe button styles
const swipeStylesImproved = StyleSheet.create({
  track: {
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
    position: "relative",
    overflow: "hidden",
  },
  label: {
    alignSelf: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    zIndex: 0,
  },
  thumb: {
    width: 50,
    height: 52,
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 26,
    backgroundColor: "#0B1547",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

