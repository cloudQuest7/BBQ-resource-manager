import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radius, TYPE_ICONS } from '../theme';
import { TypeBadge } from '../components';

export default function ResourceDetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { resource } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.coal} />
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Item Details</Text>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.card}>
          <TypeBadge type={resource?.type} size={64} />
          <Text style={styles.itemTitle}>{resource?.title}</Text>
          <Text style={styles.itemCollection}>{resource?.pitName}</Text>
          {resource?.url && (
            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkText}>Open Link →</Text>
            </TouchableOpacity>
          )}
          {resource?.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.notesLabel}>Notes</Text>
              <Text style={styles.notesText}>{resource.notes}</Text>
            </View>
          )}
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
  title: { fontFamily: fonts.heading, fontSize: 20, color: colors.surface, flex: 1 },
  body: { flex: 1, padding: spacing.lg },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.cardBorder,
  },
  itemTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.coal,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  itemCollection: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.smoke,
    marginBottom: spacing.lg,
  },
  link: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.emberLight,
    borderRadius: radius.md,
  },
  linkText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: '#993C1D',
  },
  notesSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    width: '100%',
  },
  notesLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.smoke,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  notesText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.coal,
    lineHeight: 20,
  },
});
