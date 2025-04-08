import React, { useState, useEffect } from 'react'
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import * as Location from 'expo-location'

export default function SettingsScreen() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)
  const [location, setLocation] = useState<string | null>(null)
  const router = useRouter()

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to access your current location.')
        return
      }

      let loc = await Location.getCurrentPositionAsync({})
      let address = await Location.reverseGeocodeAsync(loc.coords)

      if (address.length > 0) {
        const { city, region } = address[0]
        setLocation(`${city}, ${region}`)
      } else {
        setLocation('Location not found')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Failed to get location')
    }
  }

  useEffect(() => {
    fetchLocation()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.section} onPress={() => router.push('/My Account')}>
        <Text style={styles.label}>My Account</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setIsNotificationEnabled(prev => !prev)}
        />
      </View>


      <View style={styles.section}>
        <Text style={styles.label}>Current Location</Text>
        <Text style={styles.locationText}>
          {location ? location : 'Searching'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 34, fontWeight: 'bold', marginVertical: 20, marginTop: 30 },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: { fontSize: 18 },
  locationText: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: 'gray',
  },
})
