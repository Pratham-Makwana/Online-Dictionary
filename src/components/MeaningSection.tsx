import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Meaning} from '../types/dictionaryTypes';

type MeaningSectionProps = {
  meaning: Meaning;
};

const MeaningSection: FC<MeaningSectionProps> = ({meaning}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>

      <View style={styles.definitionsContainer}>
        {meaning.definitions.map((def, index) => (
          <View key={index} style={styles.definitionItem}>
            <Text style={styles.definitionNumber}>{index + 1}.</Text>
            <View style={styles.definitionContent}>
              <Text style={styles.definition}>{def.definition}</Text>

              {def.example && (
                <Text style={styles.example}>"{def.example}"</Text>
              )}

              {def.synonyms.length > 0 && (
                <View style={styles.synonymsContainer}>
                  <Text style={styles.synonymsLabel}>Synonyms: </Text>
                  <Text style={styles.synonyms}>
                    {def.synonyms.slice(0, 5).join(', ')}
                  </Text>
                </View>
              )}

              {def.antonyms.length > 0 && (
                <View style={styles.antonymsContainer}>
                  <Text style={styles.antonymsLabel}>Antonyms: </Text>
                  <Text style={styles.antonyms}>
                    {def.antonyms.slice(0, 5).join(', ')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  partOfSpeech: {
    fontSize: 20,
    fontStyle: 'italic',
    color:  Colors.primary,
    marginBottom: 12,
  },
  definitionsContainer: {
    marginLeft: 8,
  },
  definitionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  definitionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: Colors.primary,
  },
  definitionContent: {
    flex: 1,
  },
  definition: {
    fontSize: 16,
    lineHeight: 24,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 8,
  },
  synonymsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  synonymsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  synonyms: {
    fontSize: 14,
    color: Colors.primary,
  },
  antonymsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  antonymsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  antonyms: {
    fontSize: 14,
    color: '#E74C3C',
  },
});

export default MeaningSection;
