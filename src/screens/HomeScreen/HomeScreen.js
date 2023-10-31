import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Animated } from 'react-native';
import { Auth } from 'aws-amplify';

const HomeScreen = ({ navigation }) => {
  const [isHeadingClicked, setHeadingClicked] = useState(false);
  const [showIdeaBoxes, setShowIdeaBoxes] = useState(false);
  const [scrollAnim] = useState(new Animated.Value(0));
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const startupText = "One Place For Your Startup";

  useEffect(() => {
    if (isHeadingClicked) {
      const textToType = startupText;
      let index = 0;

      const typingInterval = setInterval(() => {
        setTypingText((prevText) => prevText + textToType[index]);
        index++;

        if (index === textToType.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setTypingText('');
            setTypingIndex(typingIndex + 1);
          }, 1000);
        }
      }, 100);
    }
  }, [isHeadingClicked, typingIndex]);

  const handleHeadingClick = () => {
    if (!showIdeaBoxes) {
      setHeadingClicked(!isHeadingClicked);
      setShowIdeaBoxes(true);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.scrollHeader}
          onPress={() => handleHeadingClick()}
        >
          <Text style={styles.scrollHeaderText}>
            {isHeadingClicked ? 'We will get you ' : 'Explore Business Ideas'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.scrollContent,
            isHeadingClicked && styles.scrolledContent,
            { opacity: scrollAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }
          ]}
        >
          <Text style={styles.scrollText}>
            {"\n"}
            <Text style={styles.glowText}>Choose your Idea</Text>{"\n"}
            <Text style={styles.glowText}>Get funding</Text>{"\n"}
            <Text style={styles.glowText}>Start your Business</Text>{"\n"}
            <Text style={styles.glowText}>Market your Business</Text>{"\n"}
          </Text>
        </Animated.View>
        <Text style={styles.singleLineText}>{typingText}</Text>
      </View>
      <Button title="Sign Out" onPress={signOut} color="#B069FF" style={styles.signOutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // New background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: '#FFC0CB',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    overflow: 'hidden',
  },
  scrollHeader: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  scrollHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B069FF',
    fontFamily: 'Verdana',
  },
  scrollContent: {
    marginTop: 20, // Increased distance between lines
    height: 0,
    alignItems: 'center', // Centered text
  },
  scrolledContent: {
    height: 'auto',
  },
  scrollText: {
    fontSize: 16,
    color: '#B069FF',
    fontFamily: 'Verdana',
  },
  glowText: {
    textShadowColor: 'rgba(176, 105, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  singleLineText: {
    fontSize: 14, // Reduced size for the typing line
    color: '#B069FF',
    fontFamily: 'Verdana',
    marginTop: 20, // Increased distance
    marginLeft: 40,
    alignItems: 'center',
  },
  signOutButton: {
    marginTop: 20,
  },
});

export default HomeScreen;
