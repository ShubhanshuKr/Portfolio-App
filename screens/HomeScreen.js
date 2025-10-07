import React from 'react';
import { View, StyleSheet, Image, Linking, ScrollView } from 'react-native';
import { Text, Button, Card, IconButton, FAB } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'; // ✅ Correct import for CLI
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // ✅ Works with Paper

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#127b92ff', '#a72121ff']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.profileImage}
            />
            <Text variant="headlineMedium" style={styles.name}>
              Shubhanshu Kumar
            </Text>
            <Text variant="titleMedium" style={styles.title}>
              React Native Developer 💻
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              I build beautiful, fast, and responsive mobile apps using React
              Native & React Native Paper.
            </Text>

            {/* Social Media Icons */}
            <View style={styles.iconRow}>
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name="github"
                    size={28}
                    color="#000"
                  />
                )}
                onPress={() => Linking.openURL('https://github.com/')}
              />
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name="linkedin"
                    size={28}
                    color="#0A66C2"
                  />
                )}
                onPress={() => Linking.openURL('https://linkedin.com/')}
              />
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name="web"
                    size={28}
                    color="#00796B"
                  />
                )}
                onPress={() => Linking.openURL('https://yourportfolio.com')}
              />
            </View>
          </Card.Content>

          {/* Action Buttons */}
          <Card.Actions style={styles.buttonContainer}>
            <Button
              mode="contained-tonal"
              icon="account"
              onPress={() => navigation.navigate('About')}
              style={styles.button}
            >
              About Me
            </Button>
            <Button
              mode="contained-tonal"
              icon="folder"
              onPress={() => navigation.navigate('Project')}
              style={styles.button}
            >
              Projects
            </Button>
            <Button
              mode="contained-tonal"
              icon="email"
              onPress={() => navigation.navigate('Contact')}
              style={styles.button}
            >
              Contact
            </Button>
          </Card.Actions>
        </Card>

        {/* Quote Box */}
        <View style={styles.quoteBox}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={24}
            color="#FFB300"
          />
          <Text variant="bodyLarge" style={styles.quote}>
            “Turning ideas into interactive experiences 🚀”
          </Text>
        </View>
      </ScrollView>

      {/* Floating Hire Me Button */}
      <FAB
        icon="briefcase"
        label="Hire Me"
        color="white"
        style={styles.fab}
        onPress={() => Linking.openURL('mailto:kumarshubhanshu7488@gmail.com')}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 20,
    elevation: 6,
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginTop: 30,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#00bcd4',
  },
  name: {
    marginBottom: 4,
    fontWeight: '700',
  },
  title: {
    color: '#555',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginVertical: 6,
    width: 220,
    borderRadius: 10,
  },
  quoteBox: {
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    elevation: 4,
  },
  quote: {
    color: '#444',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    backgroundColor: '#00bcd4',
  },
});
