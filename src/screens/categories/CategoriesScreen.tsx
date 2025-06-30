import type React from 'react';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Category, // Make sure Category is imported here
  useGetCategories,
  createCategory,
  updateCategory,
  deleteCategory, // Import deleteCategory
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
} from '../../services/categoriesServices';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/routeNavigator';

const availableIcons = [
  '🍛',
  '🛵',
  '📄',
  '🛍️',
  '⚕️',
  '🎭',
  '🏠',
  '📚',
  '💡',
  '🎯',
  '🎮',
  '🍕',
  '☕',
  '👕',
  '🎬',
  '🚗',
  '✈️',
  '🏋️',
  '🎸',
  '💻',
];

// Available colors for categories
const availableColors = [
  '#ff6b6b',
  '#4ecdc4',
  '#6c5ce7',
  '#45b7d1',
  '#a29bfe',
  '#f9ca24',
  '#ff7675',
  '#74b9ff',
  '#0984e3',
  '#00b894',
  '#e17055',
  '#fd79a8',
  '#fdcb6e',
  '#6c5ce7',
  '#a29bfe',
  '#fd79a8',
  '#55a3ff',
  '#26de81',
];








const CategoriesScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCategories();
  const [categories, setCategories] = useState<Category[]>([]);

  const deleteCategoryMutation = useMutation<any, Error, string>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      Alert.alert('Success', 'Category deleted successfully!');
      refetch();
    },
    onError: err => {
      Alert.alert('Error', err.message || 'Failed to delete category');
    },
  });

  // Mutations for adding and updating categories
  const addCategoryMutation = useMutation<any, Error, CreateCategoryPayload>({
    mutationFn: createCategory,
    onSuccess: () => {
      Alert.alert('Success', 'Category added successfully!');
      setIsAddModalVisible(false);
      resetForm();
      refetch();
    },
    onError: err => {
      Alert.alert('Error', err.message || 'Failed to add category');
    },
  });

  const updateCategoryMutation = useMutation<any, Error, {
    categoryId: string;
    payload: UpdateCategoryPayload;
  }>({
    mutationFn: ({ categoryId, payload }) => updateCategory(categoryId, payload),
    onSuccess: () => {
      Alert.alert('Success', 'Category updated successfully!');
      setIsEditModalVisible(false);
      setCurrentEditingCategory(null);
      resetForm();
      refetch();
    },
    onError: err => {
      Alert.alert('Error', err.message || 'Failed to update category');
    },
  });

  useEffect(() => {
    if (categoriesData?.data?.categories) {
      const transformedCategories: Category[] =
        categoriesData.data.categories.map(cat => ({
          id: cat._id, // Use _id from backend as id
          name: cat.name,
          icon: cat.icon,
          color: cat.color,
          description: cat.description, // Include description
          userId: cat.userId,
          isDefault: cat.isDefault,
          isActive: cat.isActive,
          createdAt: cat.createdAt,
          updatedAt: cat.updatedAt,
        }));
      setCategories(transformedCategories);
    }
  }, [categoriesData]);

  // Modal states
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentEditingCategory, setCurrentEditingCategory] =
    useState<Category | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formIcon, setFormIcon] = useState('🍛');
  const [formColor, setFormColor] = useState('#ff6b6b');

  const resetForm = () => {
    setFormName('');
    setFormIcon('🍛');
    setFormColor('#ff6b6b');
  };

  const handleAddCategory = () => {
    if (!formName.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newCategoryPayload: CreateCategoryPayload = {
      name: formName.trim(),
      icon: formIcon,
      color: formColor,
      // description: 'Optional description if you add a field for it'
    };
    addCategoryMutation.mutate(newCategoryPayload);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentEditingCategory(category);
    setFormName(category.name);
    setFormIcon(category.icon);
    setFormColor(category.color);
    setIsEditModalVisible(true);
  };

  const handleUpdateCategory = () => {
    if (!formName.trim() || !currentEditingCategory) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const updatedCategoryPayload: UpdateCategoryPayload = {
      name: formName.trim(),
      icon: formIcon,
      color: formColor,
      // description: 'Optional description if you add a field for it'
    };

    updateCategoryMutation.mutate({
      categoryId: currentEditingCategory.id,
      payload: updatedCategoryPayload,
    });
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${categoryName}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCategoryMutation.mutate(categoryId);
          },
        },
      ],
    );
  };

const renderCategoryItem = (category: Category) => (
    <View key={category.id} style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View
          style={[styles.categoryIcon, { backgroundColor: category.color }]}
        >
          <Text style={styles.categoryEmoji}>{category.icon}</Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditCategory(category)}
          >
            <Text style={styles.editButtonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editButton, styles.deleteButton]}
            onPress={() => handleDeleteCategory(category.id, category.name)}
          >
            <Text style={styles.editButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderIconSelector = () => (
    <View style={styles.iconSelector}>
      <Text style={styles.selectorLabel}>Select Icon</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.iconGrid}>
          {availableIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.iconOption,
                formIcon === icon && styles.selectedIconOption,
              ]}
              onPress={() => setFormIcon(icon)}
            >
              <Text style={styles.iconOptionText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderColorSelector = () => (
    <View style={styles.colorSelector}>
      <Text style={styles.selectorLabel}>Select Color</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.colorGrid}>
          {availableColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                formColor === color && styles.selectedColorOption,
              ]}
              onPress={() => setFormColor(color)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderAddModal = () => (
    <Modal
      visible={isAddModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsAddModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Category</Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Category Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formName}
            onChangeText={setFormName}
          />

          {renderIconSelector()}
          {renderColorSelector()}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setIsAddModalVisible(false);
                resetForm();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.addButton]}
              onPress={handleAddCategory}
            >
              <Text style={styles.addButtonText}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderEditModal = () => (
    <Modal
      visible={isEditModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsEditModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Category</Text>

          <TextInput
            style={styles.modalInput}
            placeholder="Category Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formName}
            onChangeText={setFormName}
          />

          {renderIconSelector()}
          {renderColorSelector()}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setIsEditModalVisible(false);
                setCurrentEditingCategory(null);
                resetForm();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.updateButton]}
              onPress={handleUpdateCategory}
            >
              <Text style={styles.updateButtonText}>Update Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      {isLoading ? (
        <Text style={styles.loadingText}>Loading categories...</Text>
      ) : isError ? (
        <Text style={styles.errorText}>
          Error: {error?.message || 'Failed to load categories'}
        </Text>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Categories ({categories.length})
              </Text>
              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={() => setIsAddModalVisible(true)}
              >
                <Text style={styles.addCategoryButtonText}>+ Add Category</Text>
              </TouchableOpacity>
            </View>
            {categories.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No categories yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Add your first category to start tracking your expenses
                </Text>
              </View>
            ) : (
              categories.map(renderCategoryItem)
            )}
          </View>
        </ScrollView>
      )}
      {renderAddModal()}
      {renderEditModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050510',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addHeaderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4facfe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addHeaderButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addCategoryButton: {
    backgroundColor: '#4facfe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  addCategoryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#ff6b6b',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  emptyStateSubtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    textAlign: 'center',
  },
  categoryCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  categoryTransactions: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'rgba(255,107,107,0.2)',
  },
  editButtonText: {
    fontSize: 12,
  },
  categoryStats: {
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  budgetEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    padding: 8,
    color: '#ffffff',
    fontSize: 14,
    width: 80,
    textAlign: 'right',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  progressSection: {
    marginTop: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  warningText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  selectorLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconSelector: {
    marginBottom: 20,
  },
  iconGrid: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 5,
  },
  iconOption: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedIconOption: {
    borderColor: '#4facfe',
  },
  iconOptionText: {
    fontSize: 20,
  },
  colorSelector: {
    marginBottom: 20,
  },
  colorGrid: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 5,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#ffffff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4facfe',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#00d4aa',
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoriesScreen;
