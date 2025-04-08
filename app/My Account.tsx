import { SafeAreaView, Text, TextInput, Button, StyleSheet, Alert, View } from 'react-native';
import React, { useState } from 'react';
import { usename } from './mediator';

const MyAccount = () => {
  const { username, setUsername } = usename();
  const [newUsername, setNewUsername] = useState(username);

  const handleSave = () => {
    setUsername(newUsername);
    Alert.alert('Success', 'Username has been updated!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Current Username:</Text>
        <Text style={styles.username}>{username}</Text>

        <Text style={styles.label}>Change Username:</Text>
        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Enter new username"
          placeholderTextColor="#999"
        />

        <View style={styles.buttonContainer}>
          <Button title="Save Changes" onPress={handleSave} color="#2e86de" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
