import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../theme';
import { useUser } from '../context/UserContext';

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, updateUser, logoutUser } = useUser();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      { 
        text: 'Logout', 
        onPress: () => {
          logoutUser();
          // Navigate to login screen when implemented
          // navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerBar, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => setEditModalVisible(true)}>
          <Ionicons name="pencil" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={[styles.profileCard, shadow.card]}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{user.avatar}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userHandle}>@{user.username}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{user.level} Level 🏆</Text>
          </View>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, shadow.card]}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{user.stats.bbqsHosted}</Text>
            <Text style={styles.statLabel}>BBQs Hosted</Text>
          </View>
          <View style={[styles.statCard, shadow.card]}>
            <Text style={styles.statIcon}>📖</Text>
            <Text style={styles.statValue}>{user.stats.recipes}</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={[styles.statCard, shadow.card]}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={styles.statValue}>{user.stats.hoursGrilled}</Text>
            <Text style={styles.statLabel}>Hours Grilled</Text>
          </View>
          <View style={[styles.statCard, shadow.card]}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{user.stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏅 Achievements</Text>
          <View style={styles.achievementsGrid}>
            {user.achievements.map((badge) => (
              <View key={badge.id} style={[styles.achievementBadge, !badge.unlocked && styles.locked]}>
                <Text style={styles.achievementIcon}>{badge.icon}</Text>
                <Text style={styles.achievementName}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Account Management</Text>
          
          <TouchableOpacity style={[styles.settingItem, shadow.card]}>
            <View style={styles.settingContent}>
              <Ionicons name="person" size={24} color={colors.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Edit Profile</Text>
                <Text style={styles.settingDesc}>Update your info & bio</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, shadow.card]}>
            <View style={styles.settingContent}>
              <Ionicons name="settings" size={24} color={colors.brandAccent} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Preferences</Text>
                <Text style={styles.settingDesc}>Temperature, units, notifications</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, shadow.card]}>
            <View style={styles.settingContent}>
              <Ionicons name="lock-closed" size={24} color={colors.brandDark} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Security</Text>
                <Text style={styles.settingDesc}>Password & privacy</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, shadow.card]}>
            <View style={styles.settingContent}>
              <Ionicons name="download" size={24} color={colors.success} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Backup & Export</Text>
                <Text style={styles.settingDesc}>Save your data</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ About</Text>
          
          <View style={[styles.infoItem, shadow.card]}>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>App Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
          </View>

          <View style={[styles.infoItem, shadow.card]}>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>
                {new Date(user.joinDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.settingItem, shadow.card]}>
            <View style={styles.settingContent}>
              <Ionicons name="help-circle" size={24} color={colors.textMuted} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Help & Support</Text>
                <Text style={styles.settingDesc}>FAQ & contact us</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutBtn, shadow.card]} 
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={20} color={colors.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: spacing.lg }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerBar: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.white,
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  
  // Profile Card
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginVertical: spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    fontSize: 48,
  },
  userName: {
    fontSize: 22,
    fontFamily: fonts.heading,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userHandle: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  levelBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  levelText: {
    fontFamily: fonts.bodyBold,
    color: colors.white,
    fontSize: 12,
  },
  bio: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  // Achievements
  section: {
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementBadge: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadow.card,
  },
  locked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  achievementName: {
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    color: colors.text,
    textAlign: 'center',
  },

  // Settings Items
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.text,
  },
  settingDesc: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  // Info Items
  infoItem: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textMuted,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.text,
  },

  // Logout Button
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.danger,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.white,
  },
});
