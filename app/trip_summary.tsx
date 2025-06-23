// app/trip_summary.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Define a more explicit interface for the styles object
interface TripSummaryScreenStyles {
  safeArea: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  backButton: ViewStyle;
  backButtonImage: ImageStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
  summaryCard: ViewStyle;
  fareText: TextStyle;
  summaryRow: ViewStyle;
  summaryLabel: TextStyle;
  summaryValue: TextStyle;
  ratingSection: ViewStyle;
  ratingTitle: TextStyle;
  flowerContainer: ViewStyle;
  flower: ImageStyle;
  feedbackSection: ViewStyle; // Adjusted style
  feedbackTitle: TextStyle; // Adjusted style
  feedbackInput: TextStyle;
  completeButton: ViewStyle;
  completeButtonDisabled: ViewStyle;
  completeButtonText: TextStyle;
  image: ViewStyle;
}

const TripSummaryScreen: React.FC = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0); // 0 means no rating selected
  const [feedback, setFeedback] = useState("");

  // Function to count words in the feedback text
  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Check if the continue button should be enabled
  const isButtonEnabled = rating > 0 && countWords(feedback) >= 2;

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleFeedbackChange = (text: string) => {
    setFeedback(text);
  };

  const handleCompletePress = () => {
    if (isButtonEnabled) {
      // Implement navigation or submission logic here
      console.log("Trip Completed! Rating:", rating, "Feedback:", feedback);
      router.push("/bonus_insentive")
      // Navigate to CurrentRideScreen
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Trip Summary</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View
            style={{
              backgroundColor: "#0C2353CC",
              width: 300,
              alignSelf: "center",
              borderRadius: 5,
              justifyContent: "center",
              height: 33,
            }}
          >
            <Text style={styles.fareText}>₹227</Text>
          </View>
          {/* Trip Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Start time</Text>
              <Text style={styles.summaryValue}>14:06</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>End time</Text>
              <Text style={styles.summaryValue}>14:20</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Trip time</Text>
              <Text style={styles.summaryValue}>14 mins</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Payment</Text>
              <Text style={styles.summaryValue}>Cash</Text>
            </View>
          </View>

          {/* Rate the Trip Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>Rate the Trip</Text>
            <View style={styles.flowerContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRatingPress(index)}
                >
                  <Image
                    source={
                      index <= rating
                        ? require("../assets/images/button_green.png") // Reverted to original image path
                        : require("../assets/images/button_grey.png") // Reverted to original image path
                    }
                    style={styles.flower}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Feedback Section */}
          {/* Feedback title moved outside the feedbackSection container */}
          <Text style={styles.feedbackTitle}>Feedback</Text>
          <View style={styles.feedbackSection}>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Leave us a message, and we will surely work on it!"
              placeholderTextColor="#9CA3AF"
              multiline
              value={feedback}
              onChangeText={handleFeedbackChange}
              maxLength={200} // Optional: limit feedback length
            />
          </View>
        </ScrollView>
        <View style={styles.image}>
          <Image source={require("../assets/images/feedback.png")} />
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={[
            styles.completeButton,
            !isButtonEnabled && styles.completeButtonDisabled,
          ]}
          onPress={handleCompletePress}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.completeButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<TripSummaryScreenStyles>({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 20, // Space for the button
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 35,
    alignSelf: "center",
  },
  backButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 14,
  },
  backButtonImage: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 1)",
  },
  summaryCard: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 5, // apply overall radius
    borderTopLeftRadius: 0, // override top-left
    borderTopRightRadius: 0, // override top-right
    marginHorizontal: 15,
    marginTop: 0,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(116, 95, 95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  fareText: {
    fontSize: 18.75,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(12, 35, 83, 1)",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 1)",
  },
  ratingSection: {
    backgroundColor: "#fff",
    borderRadius: 2,
    marginHorizontal: 15,
    marginTop: 20,
    padding: 20,
    borderColor: "white",
    alignItems: "center",
  },
  ratingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgba(12, 35, 83, 1)",
    marginBottom: 25,
    marginTop: -10,
    textAlign: "center",
  },
  flowerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
  },
  flower: {
    width: 25,
    height: 25,
  },
  feedbackSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    height: 82,
    width: 282,
    paddingLeft: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: "rgb(116, 106, 106)",
    alignSelf: "center",
  },
  feedbackTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgba(12, 35, 83, 1)",
    textAlign: "center",
  },
  feedbackInput: {
    minHeight: 120,
    borderColor: "rgba(236, 236, 236, 1)",
    padding: 10,
    textAlignVertical: "top",
    fontSize: 12,
    color: "#333",
  },
  completeButton: {
    backgroundColor: "#0C2353",
    width: 300,
    height: 40,
    borderRadius: 10,

    marginTop: 20,
    paddingBottom: 5,
    paddingTop: 5,
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  completeButtonDisabled: {
    backgroundColor: "#0C2353",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    
  },
  image: {
    alignSelf: "center",
  },
});

export default TripSummaryScreen;
