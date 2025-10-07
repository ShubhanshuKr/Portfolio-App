import React, { useRef, useEffect } from 'react';
import {
  View,
  Linking,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  TextInput,
  Text,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ContactScreen = () => {
  const socialAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(socialAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(socialAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handleSend = () => {
    alert('Thank you! Your message has been sent.');
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f0f4f8' }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Floating background circles */}
      <View style={styles.floatingCircle1} />
      <View style={styles.floatingCircle2} />
      <View style={styles.floatingCircle3} />

      {/* Profile Header */}
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileGradient}
      >
        <Avatar.Image
          size={100}
          source={require('../assets/profile.jpg')}
          style={styles.avatar}
        />
        <Title style={styles.profileName}>Shubhanshu Kumar</Title>
        <Paragraph style={styles.profileSubtitle}>
          Software Developer | React Native | MERN Stack
        </Paragraph>
      </LinearGradient>

      {/* Contact Info Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Get in Touch</Text>
          <Paragraph style={styles.cardText}>📍 Indore, India</Paragraph>
          <Paragraph style={styles.cardText}>
            📧 kumarshubhanshu7488@gmail.com
          </Paragraph>
          <Paragraph style={styles.cardText}>📞 +91 9835496230</Paragraph>

          {/* Animated Social Icons */}
          <View style={styles.socialIcons}>
            {[
              {
                name: 'github',
                url: 'https://github.com/ShubhanshuKr/',
                color: '#333',
              },
              {
                name: 'linkedin',
                url: 'https://linkedin.com/in/shubhanshu-kumar-021a5a227',
                color: '#0e76a8',
              },
              {
                name: 'web',
                url: 'https://subhtech.netlify.app/',
                color: '#6a11cb',
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => Linking.openURL(item.url)}
                activeOpacity={0.8}
              >
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateY: socialAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -5],
                        }),
                      },
                    ],
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.name}
                    size={32}
                    color={item.color}
                    style={{ marginHorizontal: 14 }}
                  />
                </Animated.View>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Message Form Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Send a Message</Text>

          <TextInput
            label="Name"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your name"
          />
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <TextInput
            label="Message"
            mode="outlined"
            style={styles.input}
            placeholder="Type your message..."
            multiline
            numberOfLines={4}
          />

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPress={handleSend}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6a11cb', '#2575fc']}
                style={styles.sendButton}
              >
                <Text style={styles.sendButtonText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </Card.Content>
      </Card>

      {/* Footer */}
      <Text style={styles.footerText}>© 2025 Shubhanshu Kumar</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  floatingCircle1: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff6f61',
    top: 50,
    left: 30,
    opacity: 0.2,
  },
  floatingCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#61dafb',
    top: 150,
    right: 20,
    opacity: 0.15,
  },
  floatingCircle3: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f89820',
    bottom: 100,
    left: 50,
    opacity: 0.2,
  },

  profileGradient: {
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 6,
  },
  avatar: { borderWidth: 3, borderColor: '#fff', marginBottom: 10 },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  profileSubtitle: { color: '#e0e0e0', textAlign: 'center', marginTop: 4 },

  card: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: 25,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cardText: { color: '#555', marginBottom: 4 },

  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },

  input: {
    marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  sendButton: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  footerText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 15,
    fontSize: 12,
  },
});

export default ContactScreen;
