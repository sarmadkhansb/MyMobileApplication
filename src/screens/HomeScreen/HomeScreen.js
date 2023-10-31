import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Animated } from 'react-native';
import { Auth } from 'aws-amplify';

const HomeScreen = ({ navigation }) => {
  const [isHeadingClicked, setHeadingClicked] = useState(false);
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
    setHeadingClicked(!isHeadingClicked);
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
          <Text style={[styles.scrollHeaderText, isHeadingClicked && styles.clickedText]}>
            {isHeadingClicked ? 'We will get you Jee ' : 'Explore Business Ideas'}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.scrollContent,
            isHeadingClicked && styles.scrolledContent,
            { opacity: scrollAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) },
          ]}
        >
          {isHeadingClicked ? (
            <>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.bouncyText}
              >
                <Text style={styles.buttonText}>Choose your Idea</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.bouncyText}
              >
                <Text style={styles.buttonText}>Get funding</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.bouncyText}
              >
                <Text style={styles.buttonText}>Start your Business</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.bouncyText}
              >
                <Text style={styles.buttonText}>Market your Business</Text>
              </TouchableOpacity>
            </>
          ) : null}
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
    backgroundColor: '#F5F5F5',
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
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
  clickedText: {
    transform: [{ scale: 1.1 }], // Slight bounce effect
  },
  scrollContent: {
    marginTop: 20,
    height: 0,
    alignItems: 'center',
  },
  scrolledContent: {
    height: 'auto',
  },
  bouncyText: {
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#B069FF',
    fontFamily: 'Verdana',
  },
  singleLineText: {
    fontSize: 14,
    color: '#B069FF',
    fontFamily: 'Verdana',
    marginTop: 20,
    marginLeft: 40,
    alignItems: 'center',
  },
  signOutButton: {
    marginTop: 20,
  },
});

export default HomeScreen;
