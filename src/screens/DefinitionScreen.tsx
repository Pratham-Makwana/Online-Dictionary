import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fetchWord} from '../api/dictionaryApi';
import LoadingIndicator from '../components/LoadingIndicator';
import {useFavorites} from '../contexts/FavoritesContext';
import WordDefinition from '../components/WorkDefinition';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {WordData} from '../types/dictionaryTypes';

type DefinitionScreenRouteProp = RouteProp<RootStackParamList, 'Definition'>;

const DefinitionScreen = () => {
  const route = useRoute<DefinitionScreenRouteProp>();
  const {word} = route.params;
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {isFavorite, toggleFavorite} = useFavorites();

  useEffect(() => {
    const lookupWord = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchWord(word);
        setWordData(data[0]);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    lookupWord();
  }, [word]);

  if (loading) {
    return <LoadingIndicator message={`Looking up "${word}"...`} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorMessage}>
          {error === 'Word not found'
            ? `We couldn't find any definitions for "${word}".`
            : 'Something went wrong. Please try again later.'}
        </Text>
      </View>
    );
  }

  return (
    wordData && (
      <WordDefinition
        wordData={wordData}
        isFavorite={isFavorite(word)}
        toggleFavorite={toggleFavorite}
      />
    )
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#E74C3C',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default DefinitionScreen;
