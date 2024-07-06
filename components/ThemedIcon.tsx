import React from 'react';
import { useColorScheme, Image, StyleSheet } from 'react-native';

export const ThemedIcon = ({ src }: { src: string}) => {
  const colorScheme = useColorScheme();
  const tintColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <Image
      source={{ uri: src }}
      style={[styles.icon, { tintColor }]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
