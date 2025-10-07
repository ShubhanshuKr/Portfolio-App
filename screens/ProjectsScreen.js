import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Linking,
  TouchableOpacity,
  TextInput as RNTextInput,
} from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const projects = [
  {
    title: 'School Portfolio',
    description: 'A modern and basic School Portfolio web showcasing my work.',
    tech: ['HTML', 'CSS', 'JS', 'PHP'],
    image: require('../assets/Project1.png'),
    github: 'https://github.com/ShubhanshuKr/school',
    live: 'https://shubhinstitute.netlify.app/',
  },
  {
    title: 'Social Zone',
    description:
      'Full-stack social media based on the Instagram theme showcasing my expertise in MERN STACK',
    tech: ['React', 'Node.js', 'MongoDB', 'Bootstrap', 'CSS'],
    image: require('../assets/Project2.png'),
    github: 'https://github.com/ShubhanshuKr/frontend/',
    live: 'https://socialzone.netlify.app/',
  },
  {
    title: 'Personal Portfolio',
    description:
      'A personal portfolio using React JS with integration of form JS.',
    tech: ['React', 'Bootstrap', 'UI/UX', 'Form JS'],
    image: require('../assets/Project3.png'),
    github: 'https://github.com/ShubhanshuKr/',
    live: 'https://subhtech.netlify.app/',
  },
];

const allTechs = [
  ...new Set(projects.flatMap(p => p.tech.map(t => t.toLowerCase()))),
];

const ProjectCard = ({ project, index }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 700,
      delay: index * 200,
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
              outputRange: [30, 0],
            }),
          },
        ],
        marginBottom: 20,
      }}
    >
      <Card style={styles.card} elevation={6}>
        <Card.Cover source={project.image} style={styles.cardImage} />
        <Card.Content style={styles.cardContent}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          <View style={styles.techContainer}>
            {project.tech.map((t, i) => (
              <Chip
                key={i}
                style={[styles.chip, { backgroundColor: '#6a11cb33' }]}
                textStyle={{ color: '#6a11cb', fontWeight: 'bold' }}
              >
                {t}
              </Chip>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => Linking.openURL(project.github)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6a11cb', '#2575fc']}
                style={styles.button}
              >
                <MaterialCommunityIcons
                  name="github"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.buttonText}>GitHub</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL(project.live)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ff6f61', '#ff9068']}
                style={styles.button}
              >
                <MaterialCommunityIcons
                  name="web"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.buttonText}>Live</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const ProjectsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesTech = selectedTech
      ? project.tech
          .map(t => t.toLowerCase())
          .includes(selectedTech.toLowerCase())
      : true;
    return matchesSearch && matchesTech;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={styles.header}>My Projects & Creations</Text>

      {/* Search Input */}
      <RNTextInput
        placeholder="Search by project title..."
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 12 }}
      >
        <Chip
          style={[
            styles.filterChip,
            selectedTech === '' && { backgroundColor: '#6a11cb' },
          ]}
          textStyle={{ color: selectedTech === '' ? '#fff' : '#6a11cb' }}
          onPress={() => setSelectedTech('')}
        >
          All
        </Chip>
        {allTechs.map((tech, idx) => (
          <Chip
            key={idx}
            style={[
              styles.filterChip,
              selectedTech.toLowerCase() === tech && {
                backgroundColor: '#6a11cb',
              },
            ]}
            textStyle={{
              color: selectedTech.toLowerCase() === tech ? '#fff' : '#6a11cb',
            }}
            onPress={() => setSelectedTech(tech)}
          >
            {tech.charAt(0).toUpperCase() + tech.slice(1)}
          </Chip>
        ))}
      </ScrollView>

      {/* Project Cards */}
      {filteredProjects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}

      {filteredProjects.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>
          No projects found.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a11cb',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: { height: 180 },
  cardContent: { paddingVertical: 12, paddingHorizontal: 8 },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  projectDescription: { fontSize: 14, color: '#555', marginBottom: 10 },
  techContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  chip: { marginRight: 6, marginBottom: 6 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  filterChip: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#6a11cb',
    backgroundColor: '#fff',
  },
});

export default ProjectsScreen;
