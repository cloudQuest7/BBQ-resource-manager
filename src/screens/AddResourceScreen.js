import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, spacing, radius, TYPE_ICONS } from '../theme';
import { PrimaryButton } from '../components';
import { api } from '../services/api';

const RESOURCE_TYPES = ['pdf', 'link', 'bookmark', 'video', 'image', 'doc', 'note'];
const TAGS = ['design', 'development', 'research', 'inspiration', 'important'];

export default function AddResourceScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [type, setType] = useState('link');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPit, setSelectedPit] = useState(null);
  const [pits, setPits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getPits().then(setPits);
  }, []);

  const toggleTag = (t) => {
    setSelectedTags(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please provide a title for this resource.');
      return;
    }
    setLoading(true);
    try {
      await api.addResource({
        title: title.trim(),
        type,
        url: url.trim(),
        notes: notes.trim(),
        tags: selectedTags,
        pitId: selectedPit?._id || null,
        pitName: selectedPit?.name || 'Uncategorized',
      });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Failed to save resource. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* ── HEADER ── */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.md) + spacing.md }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <Text style={styles.headerTitle}>Add Resource</Text>
          <Text style={styles.headerSub}>Save a cute new find to your library 🎀</Text>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* TYPE SELECTOR */}
        <Text style={styles.fieldLabel}>Type of Resource</Text>
        <View style={styles.typeGrid}>
          {RESOURCE_TYPES.map(t => {
            const isSelected = type === t;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.typeOption, isSelected && styles.typeOptionSelected]}
                onPress={() => setType(t)}
                activeOpacity={0.8}
              >
                <Text style={styles.typeOptionIcon}>{TYPE_ICONS[t]}</Text>
                <Text style={[styles.typeOptionLabel, isSelected && styles.typeOptionLabelSelected]}>
                  {t}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* TITLE */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. My Favorite Design Blog"
            placeholderTextColor={colors.textMuted}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* URL */}
        {type !== 'note' && type !== 'image' && type !== 'pdf' && (
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Link URL</Text>
            <TextInput
              style={styles.input}
              placeholder="https://"
              placeholderTextColor={colors.textMuted}
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>
        )}

        {/* COLLECTION SELECTOR */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Collection</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pitSelectorRow} contentContainerStyle={{ paddingHorizontal: spacing.xl }}>
            <TouchableOpacity
              style={[styles.pitChip, !selectedPit && styles.pitChipSelected]}
              onPress={() => setSelectedPit(null)}
              activeOpacity={0.8}
            >
              <Text style={[styles.pitChipText, !selectedPit && styles.pitChipTextSelected]}>
                Uncategorized
              </Text>
            </TouchableOpacity>
            {pits.map(pit => {
              const isSelected = selectedPit?._id === pit._id;
              return (
                <TouchableOpacity
                  key={pit._id}
                  style={[styles.pitChip, isSelected && styles.pitChipSelected]}
                  onPress={() => setSelectedPit(pit)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pitChipText, isSelected && styles.pitChipTextSelected]}>
                    {pit.emoji} {pit.name}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        {/* TAGS */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Tags</Text>
          <View style={styles.flavorsRow}>
            {TAGS.map(t => {
              const active = selectedTags.includes(t);
              return (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.flavorChip,
                    active && { backgroundColor: colors.primary, borderColor: colors.primary }
                  ]}
                  onPress={() => toggleTag(t)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.flavorChipText, active && { color: colors.white }]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* NOTES */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Why is it cute?"
            placeholderTextColor={colors.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* SAVE */}
        <PrimaryButton
          label="Save Resource"
          onPress={handleSave}
          loading={loading}
          style={{ marginTop: spacing.md, marginHorizontal: spacing.xl }}
        />

        <View style={{ height: insets.bottom + spacing.xxl }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  backBtn: {
    alignSelf: 'flex-end',
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
  },
  backText: { fontSize: 15, fontFamily: fonts.bodyMedium, color: colors.primary },
  headerTitleRow: {},
  headerTitle: { fontFamily: fonts.heading, fontSize: 24, color: colors.text },
  headerSub: { fontSize: 14, color: colors.textMuted, fontFamily: fonts.body, marginTop: 4 },

  body: { flex: 1 },
  bodyContent: { paddingTop: spacing.md, paddingBottom: spacing.xxl },

  fieldLabel: {
    fontSize: 14,
    fontFamily: fonts.headingMedium,
    color: colors.text,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  fieldGroup: { marginBottom: spacing.lg },

  // Type grid
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xs,
  },
  typeOption: {
    width: '31%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  typeOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  typeOptionIcon: { fontSize: 22 },
  typeOptionLabel: { fontSize: 12, fontFamily: fonts.bodyMedium, color: colors.textMuted, textTransform: 'capitalize' },
  typeOptionLabelSelected: { color: colors.primary },

  // Input
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 15,
    fontFamily: fonts.body,
    color: colors.text,
    marginHorizontal: spacing.xl,
  },
  textArea: { height: 100, paddingTop: spacing.md },

  // Collection selector
  pitSelectorRow: { marginHorizontal: -spacing.xl, paddingVertical: spacing.xs },
  pitChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  pitChipSelected: { backgroundColor: colors.primary },
  pitChipText: { fontSize: 13, fontFamily: fonts.bodyMedium, color: colors.textMuted },
  pitChipTextSelected: { color: colors.white },

  // Tags
  flavorsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.xl },
  flavorChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  flavorChipText: { fontSize: 13, fontFamily: fonts.bodyMedium, color: colors.textMuted, textTransform: 'capitalize' },
});
