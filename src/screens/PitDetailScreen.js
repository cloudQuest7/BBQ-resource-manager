import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radius } from '../theme';

export default function PitDetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { pit } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.coal} />
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{pit?.name}</Text>
          <Text style={styles.subtitle}>{pit?.count || 0} items</Text>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{pit?.emoji}</Text>
          <Text style={styles.name}>{pit?.name}</Text>
          <Text style={styles.detail}>Items in this collection</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: {
    backgroundColor: colors.coal,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backBtn: { padding: spacing.xs },
  backText: { fontSize: 16, color: colors.amber, fontFamily: fonts.heading },
  headerContent: { flex: 1 },
  title: { fontFamily: fonts.heading, fontSize: 20, color: colors.surface },
  subtitle: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,248,240,0.6)', marginTop: 2 },
  body: { flex: 1, padding: spacing.lg },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.cardBorder,
  },
  emoji: { fontSize: 48, marginBottom: spacing.lg },
  name: { fontFamily: fonts.heading, fontSize: 20, color: colors.coal, marginBottom: spacing.sm },
  detail: { fontFamily: fonts.body, fontSize: 12, color: colors.smoke },
});
