import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../types/dictionaryTypes';
const screenWidth = Dimensions.get('window').width;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home', {screen: 'Dictionary'});
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <View style={styles.logoWrapper}>
        <Image source={require('../assets/logo.webp')} />
      </View>

      {/* App Name */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>WordWise</Text>
        <Text style={styles.subtitleText}>Your pocket dictionary</Text>
      </View>

      {/* Bottom attribution */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 WordWise Dictionary</Text>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0055A4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  cardStack: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    position: 'absolute',
    width: '80%',
    height: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom: {
    transform: [{rotate: '-8deg'}, {translateX: -15}],
    zIndex: 1,
  },
  cardMiddle: {
    transform: [{rotate: '4deg'}, {translateX: 8}],
    zIndex: 2,
  },
  cardTop: {
    zIndex: 3,
  },
  cardLetter: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  titleText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 5,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
});
