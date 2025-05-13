// src/screens/FavoritesScreen.js

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from '../components/LoadingIndicator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const FavoritesScreen = () => {
  const { favorites, loading, toggleFavorite } = useFavorites();

  const navigation = useNavigation<NavigationProp>()

  if (loading) {
    return <LoadingIndicator message="Loading favorites..." />;
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="heart-outline" size={72} color="#ddd" />
        <Text style={styles.emptyText}>No favorite words yet</Text>
        <Text style={styles.emptySubtext}>
          Add words to your favorites while browsing the dictionary
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <TouchableOpacity 
              style={styles.wordContainer}
              onPress={() => navigation.navigate('Definition', { word: item })}
            >
              <Text style={styles.wordText}>{item}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => toggleFavorite(item)}
            >
              <Icon name="heart" size={24} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  wordContainer: {
    flex: 1,
    padding: 16,
  },
  wordText: {
    fontSize: 18,
  },
  removeButton: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#666',
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default FavoritesScreen;