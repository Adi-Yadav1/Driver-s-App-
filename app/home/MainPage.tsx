// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { Ionicons } from '@expo/vector-icons';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   interpolateColor,
// } from 'react-native-reanimated';
// import { rideService, type Ride } from '../../api/rideService';
// import RideCardStack from '../ride/RideCardStack';
// import { useRouter } from 'expo-router';

// const userAvatar = require('../../assets/images/avator.png');
// const carIcon = require('../../assets/images/icon.png');

// const initialRegion = {
//   latitude: 28.4711,
//   longitude: 77.0736,
//   latitudeDelta: 0.01,
//   longitudeDelta: 0.01,
// };

// const STATUS_COLORS = {
//   Offline: '#ef4444', // red-500
//   Online: '#22c55e', // green-500
//   GoHome: '#6366f1', // indigo-500
// };

// const MAX_VISIBLE_MODALS = 3;
// const CARD_TIMER_DURATION = 20;

// export default function MainPage() {
//   const router = useRouter();
//   const [status, setStatus] = useState<'Offline' | 'Online' | 'GoHome'>('Offline');
//   const [activeRides, setActiveRides] = useState<Ride[]>([]);
//   const [acceptedRides, setAcceptedRides] = useState<Ride[]>([]);
//   const [earnings, setEarnings] = useState(0);
//   const [isStatusChanging, setIsStatusChanging] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const statusIndex = { Offline: 0, Online: 1, GoHome: 2 };
//   const colorProgress = useSharedValue(statusIndex[status]);

//   const generateRideRequest = useCallback(async () => {
//     try {
//       const randomId = Math.floor(Math.random() * 3) + 1;
//       const ride = await rideService.getRideRequest(randomId.toString());
//       return { ...ride, requestStatus: 'pending' } as Ride;
//     } catch (error) {
//       console.error('Failed to fetch ride:', error);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     let timeouts: ReturnType<typeof setTimeout>[] = [];
//     const rideIds = ['1', '2', '3'];
//     if (status === 'Online') {
//       setActiveRides([]);
//       rideIds.forEach((id, idx) => {
//         timeouts.push(
//           setTimeout(() => {
//             rideService.getRideRequest(id).then((newRide) => {
//               if (newRide) {
//                 setActiveRides((prev) => {
//                   if (
//                     prev.length >= MAX_VISIBLE_MODALS ||
//                     prev.some((ride) => ride.id === newRide.id)
//                   )
//                     return prev;
//                   return [
//                     ...prev,
//                     { ...newRide, expiresIn: CARD_TIMER_DURATION },
//                   ];
//                 });
//               }
//             });
//           }, idx * 3000)
//         );
//       });
//     } else {
//       setActiveRides([]);
//     }
//     return () => {
//       timeouts.forEach(clearTimeout);
//     };
//   }, [status]);

//   useEffect(() => {
//     colorProgress.value = withTiming(statusIndex[status], { duration: 350 });
//   }, [status]);

//   const getAnimatedStyle = (btnStatus: 'Offline' | 'Online' | 'GoHome') => {
//     const btnIdx = statusIndex[btnStatus];
//     return useAnimatedStyle(() => {
//       const isActive = colorProgress.value === btnIdx;
//       const bgColor = interpolateColor(
//         colorProgress.value,
//         [0, 1, 2],
//         [STATUS_COLORS.Offline, STATUS_COLORS.Online, STATUS_COLORS.GoHome]
//       );
//       return {
//         backgroundColor: isActive ? bgColor : 'white',
//         transform: [{ scale: isActive ? 1.02 : 1 }],
//         shadowOpacity: isActive ? 0.3 : 0.1,
//         shadowRadius: isActive ? 10 : 5,
//       };
//     });
//   };

//   const handleRideClose = useCallback((rideId: string) => {
//     setActiveRides((prev) => prev.filter((ride) => ride.id !== rideId));
//   }, []);

//   const handleRideAccept = useCallback(
//     async (rideId: string) => {
//       try {
//         const ride = activeRides.find((r) => r.id === rideId);
//         if (!ride) return;
//         const success = await rideService.acceptRide(rideId, ride.baseFare);
//         if (success) {
//           setActiveRides((prev) => prev.filter((r) => r.id !== rideId));
//           setAcceptedRides((prev) => [
//             ...prev,
//             { ...ride, requestStatus: 'accepted' },
//           ]);
//           setEarnings((prev) => prev + ride.baseFare);
//           router.push('/ride-accepted');
//         } else {
//           Alert.alert('Error', 'Failed to accept ride. Please try again.');
//         }
//       } catch (error) {
//         Alert.alert('Error', 'An error occurred while accepting the ride.');
//       }
//     },
//     [activeRides]
//   );

//   const handleStatusChange = useCallback(
//     async (newStatus: 'Offline' | 'Online' | 'GoHome') => {
//       if (isStatusChanging) return;
//       setIsStatusChanging(true);
//       setIsLoading(true);
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 500));
//         setStatus(newStatus);
//         if (newStatus === 'Offline') {
//           setActiveRides([]);
//         }
//       } finally {
//         setIsStatusChanging(false);
//         setIsLoading(false);
//       }
//     },
//     [isStatusChanging]
//   );

//   return (
//     <View className="flex-1 bg-gray-100">
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-4 pt-8 pb-2 bg-white rounded-b-2xl shadow">
//         <TouchableOpacity>
//           <Ionicons name="menu" size={28} color="#222" />
//         </TouchableOpacity>
//         <Text className="text-lg font-semibold">Welcome, Rakesh!</Text>
//         <Image source={userAvatar} className="w-9 h-9 rounded-full" />
//       </View>

//       {/* Status Toggle */}
//       <View className="mx-4 mt-4">
//         <View className="bg-gray-100 p-2 rounded-2xl">
//           <View className="flex-row bg-white rounded-xl p-1 shadow-sm">
//             {['Offline', 'Online', 'GoHome'].map((statusType) => (
//               <TouchableOpacity
//                 key={statusType}
//                 onPress={() =>
//                   handleStatusChange(statusType as 'Offline' | 'Online' | 'GoHome')
//                 }
//                 disabled={isStatusChanging}
//                 className={`flex-1 ${status === statusType ? '' : 'opacity-50'}`}
//               >
//                 <Animated.View
//                   style={[getAnimatedStyle(statusType as 'Offline' | 'Online' | 'GoHome')]}
//                   className="py-3 px-2 rounded-lg"
//                 >
//                   <View className="flex-row items-center justify-center space-x-2">
//                     <View
//                       className={`p-2 rounded-full ${
//                         status === statusType ? 'bg-white/20' : 'bg-gray-200'
//                       }`}
//                     >
//                       <Ionicons
//                         name={
//                           statusType === 'Offline'
//                             ? 'power'
//                             : statusType === 'Online'
//                             ? 'radio'
//                             : 'home'
//                         }
//                         size={18}
//                         color={status === statusType ? 'white' : '#666'}
//                       />
//                     </View>
//                     <Text
//                       className={`font-semibold ${
//                         status === statusType ? 'text-white' : 'text-gray-600'
//                       }`}
//                     >
//                       {statusType}
//                     </Text>
//                   </View>
//                 </Animated.View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </View>

//       {/* Stats */}
//       <View className="flex-row justify-around py-2 border-t border-b border-gray-200 bg-white mt-2">
//         <View className="items-center">
//           <Text className="text-lg font-bold">{activeRides.length}</Text>
//           <Text className="text-xs text-gray-500">Active Rides</Text>
//         </View>
//         <View className="items-center">
//           <Text className="text-lg font-bold">₹{earnings}</Text>
//           <Text className="text-xs text-gray-500">Earnings</Text>
//         </View>
//         <View className="items-center">
//           <Text className="text-lg font-bold">₹55</Text>
//           <Text className="text-xs text-gray-500">Bonus</Text>
//         </View>
//       </View>

//       {/* Ride Alerts */}
//       {status === 'Online' && activeRides.length > 0 && (
//         <RideCardStack
//           rides={activeRides
//             .map((ride) => ({
//               ...ride,
//               requestStatus: ride.requestStatus ?? 'pending',
//               expiresIn: CARD_TIMER_DURATION,
//             }))
//             .filter((ride) => ride.requestStatus === 'pending')
//             .slice(0, MAX_VISIBLE_MODALS)}
//           onAccept={handleRideAccept}
//           onBargain={(id, newFare) => {
//             const ride = activeRides.find((r) => r.id === id);
//             if (ride) {
//               setActiveRides((prev) => prev.filter((r) => r.id !== id));
//               setAcceptedRides((prev) => [
//                 ...prev,
//                 { ...ride, requestStatus: 'accepted', baseFare: newFare },
//               ]);
//               setEarnings((prev) => prev + newFare);
//               Alert.alert('Success', `Bargained ride accepted at ₹${newFare}!`);
//             }
//           }}
//           onReject={handleRideClose}
//         />
//       )}

//       {/* Map */}
//       <View className="flex-1 mt-2">
//         <MapView style={{ width: '100%', height: '100%' }} initialRegion={initialRegion}>
//           <Marker coordinate={{ latitude: 28.4711, longitude: 77.0736 }}>
//             <View className="bg-blue-500 rounded-full p-3 shadow-lg border-2 border-white">
//               <Ionicons name="location" size={20} color="white" />
//             </View>
//           </Marker>
//           <Marker coordinate={{ latitude: 28.469, longitude: 77.073 }}>
//             <View className="bg-red-500 rounded-full p-3 shadow-lg border-2 border-white">
//               <Ionicons name="car" size={20} color="white" />
//             </View>
//           </Marker>
//         </MapView>
//       </View>
//     </View>
//   );
// }

// app/home/MainPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { rideService, type Ride } from '../../api/rideService';
import RideCardStack from '../ride/RideCardStack';
import { useRouter } from 'expo-router';
// import { ThemedView } from '../../components/ThemedView'; 
// import { ThemedText } from '../../components/ThemedText'; 

const userAvatar = require('../../assets/images/avator.png');

const initialRegion = {
  latitude: 28.4711,
  longitude: 77.0736,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const STATUS_COLORS = {
  Offline: '#ef4444',
  Online: '#22c55e',
  GoHome: '#6366f1',
};

const MAX_VISIBLE_MODALS = 3;
const CARD_TIMER_DURATION = 20;

export default function MainPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'Offline' | 'Online' | 'GoHome'>('Offline');
  const [activeRides, setActiveRides] = useState<Ride[]>([]);
  const [acceptedRides, setAcceptedRides] = useState<Ride[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const statusIndex = { Offline: 0, Online: 1, GoHome: 2 };
  const colorProgress = useSharedValue(statusIndex[status]);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    const rideIds = ['1', '2', '3'];
    if (status === 'Online') {
      setActiveRides([]);
      rideIds.forEach((id, idx) => {
        timeouts.push(
          setTimeout(() => {
            rideService.getRideRequest(id).then((newRide) => {
              if (newRide) {
                setActiveRides((prev) => {
                  if (
                    prev.length >= MAX_VISIBLE_MODALS ||
                    prev.some((ride) => ride.id === newRide.id)
                  )
                    return prev;
                  return [...prev, { ...newRide, expiresIn: CARD_TIMER_DURATION }];
                });
              }
            });
          }, idx * 3000)
        );
      });
    } else {
      setActiveRides([]);
    }
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [status]);

  useEffect(() => {
    colorProgress.value = withTiming(statusIndex[status], { duration: 350 });
  }, [status]);

  const getAnimatedStyle = (btnStatus: 'Offline' | 'Online' | 'GoHome') => {
    const btnIdx = statusIndex[btnStatus];
    return useAnimatedStyle(() => {
      const isActive = colorProgress.value === btnIdx;
      const bgColor = interpolateColor(
        colorProgress.value,
        [0, 1, 2],
        [STATUS_COLORS.Offline, STATUS_COLORS.Online, STATUS_COLORS.GoHome]
      );
      return {
        backgroundColor: isActive ? bgColor : 'white',
        transform: [{ scale: isActive ? 1.02 : 1 }],
        shadowOpacity: isActive ? 0.3 : 0.1,
        shadowRadius: isActive ? 10 : 5,
      };
    });
  };

  const handleRideClose = useCallback((rideId: string) => {
    setActiveRides((prev) => prev.filter((ride) => ride.id !== rideId));
  }, []);

  const handleRideAccept = useCallback(
    async (rideId: string) => {
      try {
        const ride = activeRides.find((r) => r.id === rideId);
        if (!ride) return;
        const success = await rideService.acceptRide(rideId, ride.baseFare);
        if (success) {
          setActiveRides((prev) => prev.filter((r) => r.id !== rideId));
          setAcceptedRides((prev) => [
            ...prev,
            { ...ride, requestStatus: 'accepted' },
          ]);
          setEarnings((prev) => prev + ride.baseFare);
          router.push('/ride-accepted');
        } else {
          Alert.alert('Error', 'Failed to accept ride. Please try again.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while accepting the ride.');
      }
    },
    [activeRides]
  );

  const handleStatusChange = useCallback(
    async (newStatus: 'Offline' | 'Online' | 'GoHome') => {
      if (isStatusChanging) return;
      setIsStatusChanging(true);
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus(newStatus);
        if (newStatus === 'Offline') {
          setActiveRides([]);
        }
      } finally {
        setIsStatusChanging(false);
        setIsLoading(false);
      }
    },
    [isStatusChanging]
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Welcome, Rakesh!</Text>
        <Image source={userAvatar} style={styles.avatar} />
      </View>

      {/* Status Toggle */}
      <View style={styles.statusContainer}>
        <View style={styles.toggleWrapper}>
          {['Offline', 'Online', 'GoHome'].map((statusType) => (
            <TouchableOpacity
              key={statusType}
              onPress={() =>
                handleStatusChange(statusType as 'Offline' | 'Online' | 'GoHome')
              }
              disabled={isStatusChanging}
              style={[styles.statusButton, status !== statusType && styles.inactive]}
            >
              <Animated.View style={[styles.animatedStatus, getAnimatedStyle(statusType as any)]}>
                <View style={styles.iconTextRow}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: status === statusType ? '#ffffff50' : '#e5e7eb' },
                    ]}
                  >
                    <Ionicons
                      name={
                        statusType === 'Offline'
                          ? 'power'
                          : statusType === 'Online'
                          ? 'radio'
                          : 'home'
                      }
                      size={18}
                      color={status === statusType ? 'white' : '#666'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.statusLabel,
                      { color: status === statusType ? 'white' : '#4B5563' },
                    ]}
                  >
                    {statusType}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>{activeRides.length}</Text>
          <Text style={styles.statLabel}>Active Rides</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>₹{earnings}</Text>
          <Text style={styles.statLabel}>Earnings</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statValue}>₹55</Text>
          <Text style={styles.statLabel}>Bonus</Text>
        </View>
      </View>

      {/* Ride Alerts */}
      {status === 'Online' && activeRides.length > 0 && (
        <RideCardStack
          rides={activeRides
            .map((ride) => ({
              ...ride,
              requestStatus: ride.requestStatus ?? 'pending',
              expiresIn: CARD_TIMER_DURATION,
            }))
            .filter((ride) => ride.requestStatus === 'pending')
            .slice(0, MAX_VISIBLE_MODALS)}
          onAccept={handleRideAccept}
          onBargain={(id, newFare) => {
            const ride = activeRides.find((r) => r.id === id);
            if (ride) {
              setActiveRides((prev) => prev.filter((r) => r.id !== id));
              setAcceptedRides((prev) => [
                ...prev,
                { ...ride, requestStatus: 'accepted', baseFare: newFare },
              ]);
              setEarnings((prev) => prev + newFare);
              Alert.alert('Success', `Bargained ride accepted at ₹${newFare}!`);
            }
          }}
          onReject={handleRideClose}
        />
      )}

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView style={StyleSheet.absoluteFill} initialRegion={initialRegion}>
          <Marker coordinate={{ latitude: 28.4711, longitude: 77.0736 }}>
            <View style={styles.markerBlue}>
              <Ionicons name="location" size={20} color="white" />
            </View>
          </Marker>
          <Marker coordinate={{ latitude: 28.469, longitude: 77.073 }}>
            <View style={styles.markerRed}>
              <Ionicons name="car" size={20} color="white" />
            </View>
          </Marker>
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  statusContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  toggleWrapper: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 4,
  },
  statusButton: {
    flex: 1,
  },
  inactive: {
    opacity: 0.5,
  },
  animatedStatus: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  iconTextRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    padding: 8,
    borderRadius: 999,
    marginRight: 8,
  },
  statusLabel: {
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 8,
  },
  statBlock: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  mapContainer: {
    flex: 1,
    marginTop: 8,
  },
  markerBlue: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 3,
  },
  markerRed: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 3,
  },
});


