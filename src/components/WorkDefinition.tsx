import React, {FC} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Pronunciation from './Pronunciation';
import MeaningSection from './MeaningSection';
import {WordData} from '../types/dictionaryTypes';

type WordDefinitionProps = {
  wordData: WordData;
  isFavorite: boolean;
  toggleFavorite: (word: string) => void;
};
const WordDefinition: FC<WordDefinitionProps> = ({
  wordData,
  isFavorite,
  toggleFavorite,
}) => {
  const getAudioUrl = () => {
    if (!wordData.phonetics) return null;

    for (const phonetic of wordData.phonetics) {
      if (phonetic.audio) return phonetic.audio;
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pronunciation
          word={wordData.word}
          phonetic={
            wordData.phonetic ||
            (wordData.phonetics[0] && wordData?.phonetics?.[0]?.text)
          }
          audioUrl={getAudioUrl()}
        />

        <TouchableOpacity onPress={() => toggleFavorite(wordData.word)}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? '#E74C3C' : '#666'}
          />
        </TouchableOpacity>
      </View>

      {wordData.origin && (
        <View style={styles.originContainer}>
          <Text style={styles.originLabel}>Origin:</Text>
          <Text style={styles.origin}>{wordData.origin}</Text>
        </View>
      )}

      {wordData.meanings.map((meaning, index) => (
        <MeaningSection key={index} meaning={meaning} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  originContainer: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  originLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  origin: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default WordDefinition;
