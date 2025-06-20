// import { useRouter } from "expo-router";
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import React, { useRef, useState } from 'react';
// import {
//     Dimensions,
//     Image,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const router = useRouter();

// export default function TripCodeScreen() {
//   const navigation = useNavigation();
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const inputsRef = useRef<(TextInput | null)[]>([]);

//   const handleChange = (value: string, index: number) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       inputsRef.current[index + 1]?.focus();
//     }

//     if (!value && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handleStartTrip = () => {
//     console.log('OTP entered:', otp.join(''));
    
//   };

//   const handleBackPress = () => {
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//         <Ionicons name="arrow-back" size={width * 0.06} color="black" />
//       </TouchableOpacity>

//       {/* Title & Subtext */}
//       <Text style={styles.title}>Enter the trip code to start the trip.</Text>
//       <Text style={styles.subtitle}>The OTP is sent to the rider and must be</Text>
//       <Text style={styles.subtitle1}>visible to his screen.</Text>

//       {/* OTP Boxes */}
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={(ref) => { inputsRef.current[index] = ref; }}
//             style={styles.otpInput}
//             keyboardType="numeric"
//             maxLength={1}
//             value={digit}
//             onChangeText={(value) => handleChange(value, index)}
//             returnKeyType="next"
//           />
//         ))}
//       </View>

//       {/* Image */}
//       <Image
//         source={require('../assets/images/otp_veri.png')}
//         style={styles.image}
//         resizeMode="contain"
//       />

      

//       {/* Start Button */}
//       <TouchableOpacity style={styles.button} onPress={() => router.push("/ride_completed")}>
//         <Text style={styles.buttonText}>Start trip →</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     position: 'absolute',
//     top: height * 0.06,
//     left: width * 0.05,
//     zIndex: 1,
//   },
//   title: {
//     fontSize: width * 0.045,
//     textAlign: 'center',
//     fontWeight: '700',
//     marginTop: height * 0.14,
//     marginBottom: height * 0.025,
//     paddingHorizontal: width * 0.05,
//   },
//   subtitle: {
//     fontSize: width * 0.037,
//     fontWeight: '400',
//     color: '#666',
//     textAlign: 'center',
//   },
//   subtitle1: {
//     fontSize: width * 0.037,
//     fontWeight: '400',
//     color: '#666',
//     textAlign: 'center',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginTop: height * 0.05,
//     marginHorizontal: width * 0.1,
//   },
//   otpInput: {
//     width: width * 0.12,
//     height: width * 0.12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     textAlign: 'center',
//     fontSize: width * 0.05,
//   },
//   image: {
//     width: width * 0.85,
//     height: height * 0.38,
//     alignSelf: 'center',
//     marginTop: height * 0.04,
//   },
//   button: {
//   backgroundColor: '#0C235380',
//   width: width * 0.32,
//   height: height * 0.05,
//   borderRadius: 8,
//   alignItems: 'center',
//   justifyContent: 'center',
//   position: 'absolute',
//   bottom: height * 0.05, // Distance from bottom
//   alignSelf: 'center',
// },
//   buttonText: {
//     color: '#fff',
//     fontSize: width * 0.035,
//     fontWeight: '500',
//   },
// });


import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const router = useRouter();

export default function TripCodeScreen() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false); // Clear error on change

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleStartTrip = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === '1111') {
      router.push("/ride_completed");
    } else {
      setError(true);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={width * 0.06} color="black" />
      </TouchableOpacity>

      {/* Title & Subtext */}
      <Text style={styles.title}>Enter the trip code to start the trip.</Text>
      <Text style={styles.subtitle}>The OTP is sent to the rider and must be</Text>
      <Text style={styles.subtitle1}>visible to his screen.</Text>

      {/* OTP Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => { inputsRef.current[index] = ref; }}
            style={[styles.otpInput, error && { borderColor: 'red' }]}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            returnKeyType="next"
          />
        ))}
      </View>

      {/* Error Message */}
      {error && (
        <Text style={styles.errorText}>Incorrect OTP. Please try again.</Text>
      )}

      {/* Image */}
      <Image
        source={require('../assets/images/otp_veri.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Start Button */}
      <TouchableOpacity style={styles.button} onPress={handleStartTrip}>
        <Text style={styles.buttonText}>Start trip →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.06,
    left: width * 0.05,
    zIndex: 1,
  },
  title: {
    fontSize: width * 0.045,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: height * 0.14,
    marginBottom: height * 0.025,
    paddingHorizontal: width * 0.05,
  },
  subtitle: {
    fontSize: width * 0.037,
    fontWeight: '400',
    color: '#666',
    textAlign: 'center',
  },
  subtitle1: {
    fontSize: width * 0.037,
    fontWeight: '400',
    color: '#666',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: height * 0.05,
    marginHorizontal: width * 0.1,
  },
  otpInput: {
    width: width * 0.12,
    height: width * 0.12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: width * 0.05,
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.035,
    textAlign: 'center',
    marginTop: height * 0.015,
  },
  image: {
    width: width * 0.85,
    height: height * 0.38,
    alignSelf: 'center',
    marginTop: height * 0.04,
  },
  button: {
    backgroundColor: '#0b2f5b',
    width: width * .8,
    height: height * 0.05,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: height * 0.05,
    alignSelf: 'center',
    
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.035,
    fontWeight: '500',
  },
});
