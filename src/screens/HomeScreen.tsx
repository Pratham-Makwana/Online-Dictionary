import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import {useFavorites} from '../contexts/FavoritesContext';
import Icon from '../components/Icon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

import {Colors} from '../types/dictionaryTypes';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {favorites} = useFavorites();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = (word: string) => {
    if (!recentSearches.includes(word)) {
      setRecentSearches(prev => [word, ...prev].slice(0, 10));
    }
    navigation.navigate('Definition', {word});
  };

  const renderListItem = ({
    item,
    type,
  }: {
    item: string;
    type: 'favorite' | 'recent';
  }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleSearch(item)}>
      <Icon
        iconFamily="Ionicons"
        name={type === 'favorite' ? 'heart' : 'time-outline'}
        size={20}
        color={type === 'favorite' ? '#E74C3C' : '#666'}
      />
      <Text style={styles.listItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={[{backgroundColor: Colors.primary, flex: 1}]}>
        <KeyboardAvoidingView
          style={[styles.container]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <View style={styles.searchContainer}>
            <Text style={styles.title}>Simple Dictionary</Text>
            <Text style={styles.subtitle}>
              Look up any word you want to learn
            </Text>
            <SearchBar onSearch={handleSearch} />
          </View>

          <ScrollView
            style={styles.listsContainer}
            contentContainerStyle={styles.listsContent}
            showsVerticalScrollIndicator={false}>
            {favorites.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Favorites</Text>
                {favorites.slice(0, 5).map(item => (
                  <View key={`fav-${item}`}>
                    {renderListItem({item, type: 'favorite'})}
                  </View>
                ))}
                {favorites.length > 5 && (
                  <TouchableOpacity
                    style={styles.viewMoreButton}
                    onPress={() =>
                      navigation.navigate('Home', {screen: 'Favorites'})
                    }>
                    <Text style={styles.viewMoreText}>View All Favorites</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                {recentSearches.map(item => (
                  <View key={`recent-${item}`}>
                    {renderListItem({item, type: 'recent'})}
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
    opacity: 0.8,
  },
  listsContainer: {
    flex: 1,
  },
  listsContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  viewMoreButton: {
    alignItems: 'center',
    padding: 8,
  },
  viewMoreText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
