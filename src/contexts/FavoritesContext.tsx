import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext<{
  favorites: string[];
  loading: boolean;
  toggleFavorite: (word: string) => void;
  isFavorite: (word: string) => boolean;
}>({
  favorites: [],
  loading: true,
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites: string[]): Promise<void> => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const addFavorite = (word: string): void => {
    const newFavorites = [...favorites, word];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFavorite = (word: string): void => {
    const newFavorites = favorites.filter(fav => fav !== word);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (word: string): void => {
    favorites.includes(word) ? removeFavorite(word) : addFavorite(word);
  };

  const isFavorite = (word: string): boolean => favorites.includes(word);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
