import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, RefreshControl, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../theme';
import { useUser } from '../context/UserContext';
import { api } from '../services/api';
import { ResourceCard, EmptyState } from '../components';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const [pits, setPits] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const [p, all] = await Promise.all([
      api.getPits(),
      api.getResources(),
    ]);
    setPits(p);
    
    const sorted = [...all].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setAllItems(sorted);
  }, []);

  useEffect(() => { load(); }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* ── HEADER WITH DATE & MENU ── */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>BACKYARD BBQ</Text>
          <Text style={styles.headerDate}>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Text>
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Ionicons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* ── WELCOME CARD ── */}
        <View style={[styles.welcomeCard, shadow.card]}>
          <View style={styles.welcomeHeader}>
            <View>
              <Text style={styles.greetingText}>{getGreeting()},</Text>
              <Text style={styles.greetingName}>{user?.name.split(' ')[0]}! 👋</Text>
            </View>
            <Text style={styles.fireEmoji}>🔥</Text>
          </View>
          <Text style={styles.welcomeMessage}>Ready to fire up the grill today?</Text>
        </View>

        {/* ── QUICK STATS ── */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, shadow.card]}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statValue}>{user?.stats.bbqsHosted || 0}</Text>
              <Text style={styles.statLabel}>BBQs</Text>
            </View>
            <View style={[styles.statCard, shadow.card]}>
              <Text style={styles.statEmoji}>⏱️</Text>
              <Text style={styles.statValue}>{user?.stats.hoursGrilled || 0}</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
            <View style={[styles.statCard, shadow.card]}>
              <Text style={styles.statEmoji}>🏆</Text>
              <Text style={styles.statValue}>{user?.stats.streak || 0}</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </View>

        {/* ── QUICK ACTIONS ── */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, styles.actionCardPrimary, shadow.card]}
              onPress={() => navigation.navigate('AddPit')}
            >
              <Text style={styles.actionEmoji}>🔧</Text>
              <Text style={styles.actionText}>Add Pit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionCard, styles.actionCardAccent, shadow.card]}
              onPress={() => navigation.navigate('AddResource')}
            >
              <Text style={styles.actionEmoji}>➕</Text>
              <Text style={styles.actionText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── CURRENT RESOURCES ── */}
        <View style={styles.resourcesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🍖 Inventory</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            {allItems.length === 0 ? (
              <EmptyState
                emoji="🍖"
                title="No resources yet"
                subtitle="Tap the + button to add your inventory, rubs, and gear!"
              />
            ) : (
              allItems.slice(0, 3).map((r, index) => {
                const colors_map = [colors.primary, colors.brandAccent, colors.brandDark];
                const bgColor = colors_map[index % 3];

                return (
                  <TouchableOpacity
                    key={r._id}
                    style={[styles.inventoryCard, { backgroundColor: bgColor }, shadow.card]}
                    onPress={() => navigation.navigate('ResourceDetail', { resource: r })}
                    activeOpacity={0.8}
                  >
                    <View style={styles.inventoryContent}>
                      <Text style={styles.inventoryName}>{r.title}</Text>
                      <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${(r.heat || 30) * 100}%` }]} />
                      </View>
                      <Text style={styles.inventoryMeta}>{r.heat ? Math.round(r.heat * 100) : 30}%</Text>
                    </View>
                    <Text style={styles.inventoryEmoji}>🔥</Text>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>

        {/* ── PITS OVERVIEW ── */}
        {pits.length > 0 && (
          <View style={styles.pitsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔥 Your Pits</Text>
            </View>
            <View style={styles.pitsList}>
              {pits.slice(0, 2).map((pit) => (
                <TouchableOpacity
                  key={pit._id}
                  style={[styles.pitCard, shadow.card]}
                  onPress={() => navigation.navigate('PitDetail', { pit })}
                >
                  <View style={styles.pitHeader}>
                    <Text style={styles.pitName}>{pit.title || 'Unnamed Pit'}</Text>
                    <Text style={styles.pitTemp}>200°F</Text>
                  </View>
                  <Text style={styles.pitStatus}>Status: Ready to grill 🎯</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
  },

  // Header
  header: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.text,
    letterSpacing: 1,
  },
  headerDate: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  menuBtn: {
    padding: spacing.sm,
  },

  // Body
  body: { 
    flex: 1,
  },
  bodyContent: { 
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // Welcome Card
  welcomeCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  greetingText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  greetingName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.white,
    marginTop: spacing.xs,
  },
  fireEmoji: {
    fontSize: 40,
  },
  welcomeMessage: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.white,
    opacity: 0.95,
    lineHeight: 20,
  },

  // Stats Section
  statsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },

  // Actions Section
  actionsSection: {
    marginBottom: spacing.xl,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCardPrimary: {
    backgroundColor: colors.primary,
  },
  actionCardAccent: {
    backgroundColor: colors.brandAccent,
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  actionText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.white,
  },

  // Resources Section
  resourcesSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAllText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.primary,
  },
  listContainer: {
    gap: spacing.md,
  },
  inventoryCard: {
    borderRadius: radius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inventoryContent: {
    flex: 1,
  },
  inventoryName: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.white,
    marginBottom: spacing.md,
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: radius.pill,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
  },
  inventoryMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  inventoryEmoji: {
    fontSize: 28,
    marginLeft: spacing.md,
  },

  // Pits Section
  pitsSection: {
    marginBottom: spacing.xl,
  },
  pitsList: {
    gap: spacing.md,
  },
  pitCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  pitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  pitName: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.text,
  },
  pitTemp: {
    fontFamily: fonts.heading,
    fontSize: 14,
    color: colors.primary,
  },
  pitStatus: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
});
