// app/bonus_insentive.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { goBack } from 'expo-router/build/global-state/routing';

export default function App() {
     const handlePress = () => {
        router.push('../BalanceScreen');
     };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Earn an Extra ₹200 for 7 bookings</Text>
          <View style={styles.timeBox}>
            <MaterialIcons name="access-time" size={16} color="#fff" />
            <Text style={styles.timeText}>12:00 PM - 11:59 PM</Text>
          </View>
        </View>

        {/* Earnings */}
        <View style={styles.earningsContainer}>
          <Text style={styles.earningsLabel}>Total earnings</Text>
          <Text style={styles.earningsAmount}>₹0</Text>
        </View>

        {/* Incentives Section */}
        <ScrollView style={styles.incentivesContainer}>
          <Text style={styles.incentivesTitle}>Incentives</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Earn an extra ₹200</Text>
            <Text style={styles.cardSubtitle}>0/7 bookings</Text>
            <Text style={styles.cardFooter}>5 more bookings to go</Text>
          </View>

          {[{ amount: 340, total: 13 }, { amount: 450, total: 18 }, { amount: 570, total: 25 }].map(
            (item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>Earn an extra ₹{item.amount}</Text>
                <Text style={styles.cardSubtitle}>0/{item.total} bookings</Text>
              </View>
            )
          )}

          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Details</Text>
            <Text style={styles.detail}>• Trips must begin in Delhi(NCR).</Text>
            <Text style={styles.detail}>• This offer only applies to completed rides.</Text>
            <Text style={styles.detail}>• This offer is only for limited period.</Text>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home-outline" size={22} color="#333" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={goBack} >
            <FontAwesome name="gift" size={22} color="#333" />
            <Text style={styles.navText}>Bonus</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handlePress}>
            <Ionicons name="calendar-outline" size={22} color="#333" />
            <Text style={styles.navText}>Plans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="mail-outline" size={22} color="#333" />
            <Text style={styles.navText}>Inbox</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  header: {
    backgroundColor: '#1f2a4d',
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: '#2e3b60',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  earningsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earningsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  earningsAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  incentivesContainer: {
    padding: 16,
  },
  incentivesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007aff',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  cardFooter: {
    fontSize: 13,
    color: '#007aff',
    marginTop: 4,
  },
  detailsContainer: {
    marginTop: 12,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  detail: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: '#333',
  },
});
