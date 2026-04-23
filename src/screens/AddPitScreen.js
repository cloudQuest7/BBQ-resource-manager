import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radius } from '../theme';
import { PrimaryButton } from '../components';
import { api } from '../services/api';

const EMOJIS = ['📚', '🎮', '🌿', '✨', '🔬', '🎨', '💼', '🎵', '🏋️', '🍳', '📖', '🎓', '💡', '🎯', '🚀'];

export default function AddPitScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a collection name');
      return;
    }
    setLoading(true);
    try {
      await api.addPit({
        name: name.trim(),
        emoji: selectedEmoji,
      });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.coal} />

      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>✕</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>New Collection</Text>
          <Text style={styles.headerSub}>Create a new collection</Text>
        </View>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} keyboardShouldPersistTaps="handled">
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Collection name"
            placeholderTextColor={colors.ash}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Icon</Text>
          <View style={styles.emojiGrid}>
            {EMOJIS.map(emoji => (
              <TouchableOpacity
                key={emoji}
                style={[styles.emojiOption, selectedEmoji === emoji && styles.emojiOptionSelected]}
                onPress={() => setSelectedEmoji(emoji)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <PrimaryButton
          label="Create Collection"
          onPress={handleSave}
          loading={loading}
          style={{ marginTop: spacing.lg }}
        />

        <View style={{ height: insets.bottom + spacing.xl }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  header: {
    backgroundColor: colors.coal,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  backBtn: { alignSelf: 'flex-end', padding: spacing.xs, marginBottom: spacing.sm },
  backText: { fontSize: 16, color: 'rgba(255,248,240,0.5)' },
  headerTitle: { fontFamily: fonts.heading, fontSize: 20, color: colors.surface },
  headerSub: { fontSize: 12, color: 'rgba(255,248,240,0.45)', fontFamily: fonts.body, marginTop: 3 },
  body: { flex: 1 },
  bodyContent: { padding: spacing.lg },
  fieldLabel: {
    fontSize: 11,
    fontFamily: fonts.bodyMedium,
    color: colors.smoke,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  fieldGroup: { marginBottom: spacing.lg },
  input: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.coal,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  emojiOption: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiOptionSelected: {
    borderColor: colors.ember,
    borderWidth: 1.5,
    backgroundColor: colors.emberLight,
  },
  emojiText: { fontSize: 24 },
});
