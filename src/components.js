import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow, TYPE_ICONS } from './theme';

// ─── TAG ─────────────────────────────────────────────────────────────
export function FlavorTag({ flavor, size = 'sm' }) {
  return (
    <View style={[styles.tag, size === 'lg' && styles.tagLg]}>
      <Text style={[styles.tagText, size === 'lg' && styles.tagTextLg]}>
        {flavor}
      </Text>
    </View>
  );
}

// ─── RESOURCE TYPE BADGE ─────────────────────────────────────────────────────
export function TypeBadge({ type, size = 48 }) {
  return (
    <View style={[styles.typeBadge, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ fontSize: size * 0.4 }}>{TYPE_ICONS[type] || '📌'}</Text>
    </View>
  );
}

// ─── RESOURCE CARD (Matches reference image style) ─────────────────────────
export function ResourceCard({ resource, bgColor, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.resourceCard, { backgroundColor: bgColor || colors.primary }]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <View style={styles.resourceCardLeft}>
        <TypeBadge type={resource.type} size={56} />
      </View>

      <View style={styles.resourceInfo}>
        <Text style={styles.resourceTitle} numberOfLines={1}>{resource.title}</Text>
        
        {/* Faux inventory rows to match the vibe of the image! */}
        <View style={styles.inventoryRow}>
          <Text style={styles.inventoryLabel}>TYPE</Text>
          <Text style={styles.inventoryValue}>{resource.type.toUpperCase()}</Text>
        </View>
        <View style={styles.inventoryRow}>
          <Text style={styles.inventoryLabel}>ADDED</Text>
          <Text style={styles.inventoryValue}>Just now</Text>
        </View>
        
        {/* Fake progress bar mimicking reference image */}
        <View style={styles.progressContainer}>
           <View style={styles.progressBarBg}>
               <View style={styles.progressBarFill} />
           </View>
           <Text style={styles.progressText}>90%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── COLLECTION CARD ───────────────────────────────────────────────────
export function PitCard({ pit, onPress }) {
  return (
    <TouchableOpacity
      style={styles.pitCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.pitHeader}>
        <Text style={styles.pitEmoji}>{pit.emoji || '📁'}</Text>
        <View style={styles.pitCountBadge}>
          <Text style={styles.pitCountText}>{pit.count || 0}</Text>
        </View>
      </View>
      <Text style={styles.pitName} numberOfLines={2}>{pit.name || 'Collection'}</Text>
    </TouchableOpacity>
  );
}

// ─── STAT CHIP ────────────────────────────────────────────────────────────────
export function StatChip({ num, label }) {
  return (
    <View style={styles.statChip}>
      <Text style={styles.statNum}>{num}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── PRIMARY BUTTON ──────────────────────────────────────────────────────────
export function PrimaryButton({ label, onPress, loading, icon, style }) {
  return (
    <TouchableOpacity style={[styles.primaryBtn, style]} onPress={onPress} activeOpacity={0.8} disabled={loading}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.primaryBtnText}>{icon ? `${icon}  ` : ''}{label}</Text>
      )}
    </TouchableOpacity>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
export function EmptyState({ emoji, title, subtitle }) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrapper}>
        <Text style={styles.emptyEmoji}>{emoji || '🌸'}</Text>
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
    </View>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  tagLg: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  tagText: { fontSize: 11, fontFamily: fonts.bodyMedium, color: colors.textMuted },
  tagTextLg: { fontSize: 13 },

  typeBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'rgba(255,255,255,0.15)', // subtle transparency on cards
  },

  // Newly styled reference cards!
  resourceCard: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.lg,
    ...shadow.card,
  },
  resourceCardLeft: {
    paddingRight: spacing.sm,
  },
  resourceInfo: { flex: 1, minWidth: 0 },
  resourceTitle: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.white, // Pop on dark backgrounds
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  inventoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  inventoryLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },
  inventoryValue: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.white,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
  },
  progressBarFill: {
    width: '90%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
  },
  progressText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.white,
  },

  // Collections etc
  pitCard: {
    width: 140,
    height: 140,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    justifyContent: 'space-between',
    marginRight: spacing.md,
    ...shadow.card,
  },
  pitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pitEmoji: { fontSize: 28 },
  pitCountBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: radius.pill,
  },
  pitCountText: { fontSize: 13, fontFamily: fonts.headingMedium, color: colors.primary },
  pitName: { fontSize: 16, fontFamily: fonts.headingMedium, color: colors.text, lineHeight: 22 },

  statChip: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.card,
    alignItems: 'flex-start',
  },
  statNum: { fontSize: 28, fontFamily: fonts.heading, color: colors.primary, lineHeight: 32 },
  statLabel: { fontSize: 13, color: colors.textMuted, fontFamily: fonts.bodyMedium, marginTop: 4 },

  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...shadow.float,
  },
  primaryBtnText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.headingMedium,
  },

  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl, gap: spacing.md },
  emptyIconWrapper: {
    width: 72, height: 72,
    borderRadius: 36,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadow.card,
  },
  emptyEmoji: { fontSize: 32 },
  emptyTitle: { fontSize: 18, fontFamily: fonts.headingMedium, color: colors.text },
  emptySubtitle: { fontSize: 14, color: colors.textMuted, fontFamily: fonts.body, textAlign: 'center', paddingHorizontal: spacing.xl },
});
