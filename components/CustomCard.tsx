import { Image, StyleSheet } from 'react-native';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ThemedIcon } from './ThemedIcon';

export type CardProps = {
  image?: string;
  title?: string;
  date?: string;
  total?: string;
};

export function CustomCard({
  image,
  title,
  date,
  total,
}: CardProps) {
  const src = image ? image : 'https://ik.imagekit.io/cascades/question.png?updatedAt=1720265005013';
  return (
    <ThemedView style={[styles.bordered, styles.container]}>
      <ThemedView style={styles.container}>
        <ThemedIcon src={src} />
        <ThemedView>
          <ThemedText style={styles.title}>{title ?? "Sampol"}</ThemedText>
          <ThemedText style={styles.date}>{date ?? "July 06, 2024"}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedText style={{ fontSize: 18 }}>&#8369;{total ?? 0}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  bordered: {
    borderWidth: 0,
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    height: 40,
    width: 40,
    color: "white"
  },
  title: { 
    fontSize: 16
  },
  date: {
    fontSize: 14,
    color: "gray"
  }
});
