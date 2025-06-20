import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const BalanceScreen = () => {
  const balance = 378.83; // You can make this dynamic from props/state/backend

  const isPositiveBalance = balance > 0;
  const balanceColor = isPositiveBalance ? "green" : "red";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Current Balance */}
          <View style={styles.balanceContainer}>
            <Text style={[styles.balanceAmount, { color: balanceColor }]}>
              ₹
              {parseFloat(Math.abs(balance).toFixed(2)) *
                (balance < 0 ? -1 : 1)}
            </Text>
            <Text style={styles.balanceLabel}>Current balance</Text>
          </View>

          {/* Warning or Info Card */}
          <View style={styles.warningCard}>
            <View style = {styles.warning}>
            <Image
              source={require("../assets/images/balance.png")}
              resizeMode="contain"
            />
            <Text style={styles.warningText}>
              {isPositiveBalance
                ? "You have a positive balance.\nYou can withdraw your earnings."
                : "You have negative balance\nTake more rides to automatically repay or make a payment."}
            </Text>
            </View>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payButtonText}>
                {isPositiveBalance
                  ? `Withdraw ₹${balance.toFixed(2)}`
                  : `Pay ₹${Math.abs(balance).toFixed(2)}`}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Current Plan */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Plan</Text>
            <View style={styles.planContainer}>
              <TouchableOpacity style={styles.planButton}>
                <Text style={styles.planText}>Plan 1</Text>
                <Text style={styles.planText}>1 day</Text>
                <Text style={styles.planText}>₹50</Text>
              </TouchableOpacity>
              <Text style={styles.choosePlanText}>Choose Other Plan &gt;</Text>
            </View>
          </View>

          {/* Ride History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>09 June</Text>
            <View style={styles.itemRow}>
              <MaterialCommunityIcons
                name="cash-refund"
                size={20}
                color="#000"
              />
              <Text style={styles.itemLabel}>Incentives</Text>
              <Text style={styles.itemValue}>₹0</Text>
            </View>

            <View style={styles.itemRow}>
              <Ionicons name="car-sport-outline" size={20} color="#000" />
              <Text style={styles.itemLabel}>Ride History</Text>
              <Text style={styles.itemValue}>₹160</Text>
            </View>

            <View style={styles.itemRow}>
              <Ionicons name="document-text-outline" size={20} color="#000" />
              <Text style={styles.itemLabel}>Subscription</Text>
              <Text style={styles.itemValue}>-₹50</Text>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              08 June
            </Text>
            <View style={styles.itemRow}>
              <MaterialCommunityIcons
                name="cash-refund"
                size={20}
                color="#000"
              />
              <Text style={styles.itemLabel}>Incentives</Text>
              <Text style={styles.itemValue}>₹0</Text>
            </View>

            <View style={styles.itemRow}>
              <Ionicons name="car-sport-outline" size={20} color="#000" />
              <Text style={styles.itemLabel}>Ride History</Text>
              <Text style={styles.itemValue}>₹280</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home" size={22} color="#000" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="gift-outline" size={22} color="#000" />
            <Text style={styles.tabLabel}>Bonus</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="pricetags-outline" size={22} color="#000" />
            <Text style={styles.tabLabel}>Plans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="mail-outline" size={22} color="#000" />
            <Text style={styles.tabLabel}>Inbox</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    marginTop: 30,
  },
  innerContainer: {
    flex: 1,
  },
  warning:{
    flex: 1 , 
    flexDirection: 'row',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100, // Ensures scroll content isn't hidden behind the tab bar
  },
  balanceContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  balanceAmount: {
    fontSize: 28,
    color: "red",
    fontWeight: "bold",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#555",
  },
  warningCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
    
  },
  warningText: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },
  payButton: {
    backgroundColor: "#0b2f5b",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  planContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planButton: {
    borderWidth: 1,
    borderColor: "#0b2f5b",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
  },
  planText: {
    color: "#0b2f5b",
    fontWeight: "600",
  },
  choosePlanText: {
    color: "#0b2f5b",
    fontWeight: "500",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  itemLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  itemValue: {
    fontWeight: "bold",
    color: "#000",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 20,
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
