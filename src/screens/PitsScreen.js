import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../theme';
import { useUser } from '../context/UserContext';

const COLORS = ['#D05E41', '#EB813B', '#865E47', '#7BDCB5', '#8B6852'];
const ICONS = ['🔥', '🥩', '☀️', '🍖', '🏆', '🔧', '📖', '🎯'];

export default function PitsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, addCollection, deleteCollection } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDesc, setCollectionDesc] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleCreateCollection = () => {
    if (!collectionName.trim()) {
      Alert.alert('Missing Info', 'Please enter a collection name');
      return;
    }

    addCollection({
      name: collectionName,
      description: collectionDesc,
      icon: selectedIcon,
      color: selectedColor,
    });

    setCollectionName('');
    setCollectionDesc('');
    setSelectedIcon(ICONS[0]);
    setSelectedColor(COLORS[0]);
    setModalVisible(false);
    Alert.alert('Success', 'Collection created! 🎉');
  };

  const handleDeleteCollection = (collectionId) => {
    Alert.alert('Delete Collection', 'Are you sure you want to delete this collection?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => {
          deleteCollection(collectionId);
          Alert.alert('Deleted', 'Collection removed');
        },
        style: 'destructive',
      },
    ]);
  };

  const collections = user?.collections || [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Collections</Text>
          <Text style={styles.headerSubtitle}>Organize your BBQ items</Text>
        </View>
        <TouchableOpacity
          style={[styles.addBtn, shadow.float]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {collections.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={styles.emptyTitle}>No Collections Yet</Text>
          <Text style={styles.emptyDesc}>Create your first collection to organize your BBQ gear</Text>
          <TouchableOpacity
            style={[styles.createBtn, shadow.card]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle" size={20} color={colors.white} />
            <Text style={styles.createBtnText}>Create Collection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Collections Grid */}
          <View style={styles.grid}>
            {collections.map((collection) => (
              <TouchableOpacity
                key={collection.id}
                style={[styles.collectionCard, { backgroundColor: collection.color }, shadow.card]}
                onPress={() => navigation.navigate('PitDetail', { pit: collection })}
                activeOpacity={0.8}
              >
                {/* Delete Button */}
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDeleteCollection(collection.id)}
                >
                  <Ionicons name="close" size={16} color={colors.white} />
                </TouchableOpacity>

                {/* Content */}
                <Text style={styles.collectionIcon}>{collection.icon}</Text>
                <Text style={styles.collectionName}>{collection.name}</Text>
                <Text style={styles.collectionDesc}>{collection.description}</Text>

                {/* Footer */}
                <View style={styles.collectionFooter}>
                  <Text style={styles.itemCount}>
                    {collection.items?.length || 0} items
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.white} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: spacing.xl }} />
        </ScrollView>
      )}

      {/* Add Collection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Collection</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView
            style={styles.modalBody}
            contentContainerStyle={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Collection Name</Text>
              <TextInput
                style={[styles.input, shadow.card]}
                placeholder="E.g., Smoking Essentials"
                placeholderTextColor={colors.textMuted}
                value={collectionName}
                onChangeText={setCollectionName}
              />
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea, shadow.card]}
                placeholder="What's in this collection?"
                placeholderTextColor={colors.textMuted}
                value={collectionDesc}
                onChangeText={setCollectionDesc}
                multiline
              />
            </View>

            {/* Icon Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Choose Icon</Text>
              <View style={styles.iconGrid}>
                {ICONS.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      selectedIcon === icon && styles.iconOptionSelected,
                      shadow.card,
                    ]}
                    onPress={() => setSelectedIcon(icon)}
                  >
                    <Text style={styles.iconOptionText}>{icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Color Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Choose Color</Text>
              <View style={styles.colorGrid}>
                {COLORS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      selectedColor === color && styles.colorOptionSelected,
                      shadow.card,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <Ionicons name="checkmark" size={20} color={colors.white} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Preview */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preview</Text>
              <View
                style={[
                  styles.previewCard,
                  { backgroundColor: selectedColor },
                  shadow.card,
                ]}
              >
                <Text style={styles.previewIcon}>{selectedIcon}</Text>
                <Text style={styles.previewName}>
                  {collectionName || 'Collection Name'}
                </Text>
                <Text style={styles.previewDesc}>
                  {collectionDesc || 'Your description here'}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Create Button */}
          <View style={[styles.modalFooter, { paddingBottom: insets.bottom + spacing.lg }]}>
            <TouchableOpacity
              style={[styles.createCollectionBtn, shadow.float]}
              onPress={handleCreateCollection}
            >
              <Text style={styles.createCollectionBtnText}>Create Collection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Body
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.lg,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  collectionCard: {
    width: '48%',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    position: 'relative',
  },
  deleteBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  collectionName: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  collectionDesc: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.lg,
    lineHeight: 16,
  },
  collectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emptyDesc: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  createBtnText: {
    fontFamily: fonts.heading,
    fontSize: 14,
    color: colors.white,
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.text,
  },
  modalBody: {
    flex: 1,
  },
  modalContent: {
    padding: spacing.lg,
  },

  // Inputs
  inputGroup: {
    marginBottom: spacing.xl,
  },
  label: {
    fontFamily: fonts.heading,
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 80,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },

  // Icon Grid
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  iconOption: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  iconOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  iconOptionText: {
    fontSize: 28,
  },

  // Color Grid
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  colorOption: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: colors.text,
    borderWidth: 3,
  },

  // Preview
  previewCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  previewIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  previewName: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  previewDesc: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },

  // Modal Footer
  modalFooter: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  createCollectionBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createCollectionBtnText: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.white,
  },
});

