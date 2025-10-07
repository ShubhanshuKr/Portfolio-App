import React, { useRef, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text as RNText,
} from 'react-native';
import { Card, Avatar, Chip, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const skills = [
  { name: 'UI Design', color: '#ff6f61' },
  { name: 'React Native', color: '#61dafb' },
  { name: 'React', color: '#61dafb' },
  { name: 'Java', color: '#f89820' },
  { name: 'SQL', color: '#f29111' },
  { name: 'Bootstrap', color: '#563d7c' },
  { name: 'Tailwind', color: '#a259ff' },
  { name: 'MUI', color: '#ffcc00' },
  { name: 'Canva', color: '#ff9a00' },
];

const stats = [
  { label: 'Projects', value: 24 },
  { label: 'Clients', value: 12 },
  { label: 'Awards', value: 5 },
];

// Animated skill component
const AnimatedSkill = ({ name, color, delay }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 800,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
    >
      <Chip
        style={[styles.skillChip, { backgroundColor: color }]}
        textStyle={{ fontWeight: 'bold', color: '#fff' }}
      >
        {name}
      </Chip>
    </Animated.View>
  );
};

// Animated number component
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start > value) {
        start = value;
        clearInterval(interval);
      }
      setDisplayValue(start);
    }, 60); // adjust speed
    return () => clearInterval(interval);
  }, [value]);

  return <RNText style={styles.statValue}>{displayValue}</RNText>;
};

// Half marquee component
const HalfMarquee = ({ text }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -width,
        duration: 12000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <View style={styles.marqueeContainer}>
      <Animated.View
        style={{ flexDirection: 'row', transform: [{ translateX: scrollX }] }}
      >
        <RNText style={styles.marqueeText}>{text} </RNText>
        <RNText style={styles.marqueeText}>{text} </RNText>
      </Animated.View>
    </View>
  );
};

const AboutSection = () => {
  const circleSize = 150;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#127b92ff', '#a6c1ee']}
        style={styles.gradientBackground}
      >
        {/* Background shapes */}
        <View
          style={[
            styles.circle,
            { top: -50, left: -50, backgroundColor: '#fff3' },
          ]}
        />
        <View
          style={[
            styles.circle,
            {
              top: 200,
              right: -80,
              backgroundColor: '#ffffff33',
              width: circleSize * 1.5,
              height: circleSize * 1.5,
              borderRadius: (circleSize * 1.5) / 2,
            },
          ]}
        />
        <View
          style={[
            styles.circle,
            { bottom: -50, left: width / 3, backgroundColor: '#fff2' },
          ]}
        />

        {/* Welcome note */}
        <RNText style={styles.welcomeNote}>
          ✨ Welcome to my portfolio ✨
        </RNText>

        {/* Avatar */}
        <Avatar.Image
          size={120}
          source={require('../assets/profile.jpg')}
          style={styles.avatar}
        />

        {/* Card */}
        <Card style={styles.card} elevation={6}>
          <Card.Content style={styles.cardContent}>
            {/* Name with colorful gradient */}
            <RNText style={styles.nameText}>
              <RNText style={{ color: '#ff6f61' }}>Shu</RNText>
              <RNText style={{ color: '#61dafb' }}>bh</RNText>
              <RNText style={{ color: '#f89820' }}>anshu</RNText>
              <RNText style={{ color: '#a259ff' }}> Kumar</RNText>
            </RNText>

            <RNText style={styles.subtitle}>
              UI/UX Designer & Full Stack Developer
            </RNText>
            <RNText style={styles.paragraph}>
              I craft intuitive, beautiful interfaces blending design & tech.
              Passionate about creating products that leave a mark and solve
              real-world problems creatively.
            </RNText>

            {/* Skills */}
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <AnimatedSkill
                  key={index}
                  name={skill.name}
                  color={skill.color}
                  delay={index * 200}
                />
              ))}
            </View>

            {/* Half Marquee */}
            <HalfMarquee text="Creative • UI/UX • React • Design • Innovation • Passion" />

            {/* Stats */}
            <View style={styles.statsContainer}>
              {stats.map((item, index) => (
                <View key={index} style={styles.statBox}>
                  <AnimatedNumber value={item.value} />
                  <RNText style={styles.statLabel}>{item.label}</RNText>
                </View>
              ))}
            </View>

            {/* Social buttons */}
            <View style={styles.socialContainer}>
              <Button
                icon={() => <MaterialCommunityIcons name="github" size={20} />}
                mode="contained-tonal"
                style={styles.socialButton}
                onPress={() =>
                  Linking.openURL('https://github.com/ShubhanshuKr/')
                }
              >
                GitHub
              </Button>
              <Button
                icon={() => (
                  <MaterialCommunityIcons name="linkedin" size={20} />
                )}
                mode="contained-tonal"
                style={styles.socialButton}
                onPress={() =>
                  Linking.openURL(
                    'https://linkedin.com/in/shubhanshu-kumar-021a5a227',
                  )
                }
              >
                LinkedIn
              </Button>
            </View>
          </Card.Content>
        </Card>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  gradientBackground: { flex: 1, alignItems: 'center', paddingVertical: 80 },
  circle: { position: 'absolute', width: 150, height: 150, borderRadius: 75 },
  welcomeNote: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: -40,
    marginBottom: 20,
  },
  avatar: {
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: 5,
    marginBottom: 20,
    zIndex: 5,
  },
  card: {
    width: '90%',
    borderRadius: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 15 },
  },
  cardContent: { alignItems: 'center', paddingHorizontal: 20 },
  nameText: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 16 },
  paragraph: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  skillChip: { marginHorizontal: 6, marginVertical: 4 },
  marqueeContainer: { width: '100%', overflow: 'hidden', marginVertical: 10 },
  marqueeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 12, color: '#777' },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: { marginHorizontal: 8, borderRadius: 20 },
});

export default AboutSection;
