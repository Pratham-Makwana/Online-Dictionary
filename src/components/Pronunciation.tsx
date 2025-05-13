import React, {FC} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import Icon from './Icon';
import {Colors} from '../types/dictionaryTypes';

type PronunciationProps = {
  word: string;
  phonetic?: string;
  audioUrl?: string | null;
};
const Pronunciation: FC<PronunciationProps> = ({word, phonetic, audioUrl}) => {
  const playAudio = () => {
    if (!audioUrl) return;

    const formattedUrl = audioUrl.startsWith('//')
      ? `https:${audioUrl}`
      : audioUrl;

    const sound = new Sound(formattedUrl, '', error => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      sound.play(success => {
        if (!success) {
          console.log('Sound playback failed');
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{word}</Text>
      {phonetic && <Text style={styles.phonetic}>{phonetic}</Text>}
      {audioUrl && (
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Icon
            iconFamily="Ionicons"
            name="volume-high"
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
  },
  phonetic: {
    fontSize: 18,
    color: '#666',
    marginRight: 12,
  },
  audioButton: {
    padding: 8,
  },
});

export default Pronunciation;
