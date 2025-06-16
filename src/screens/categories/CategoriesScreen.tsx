import type React from 'react';
import { useState } from 'react';
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

// Available icons for categories
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

interface Category {
  id: string;
  name: string;
  amount: number;
  budget: number;
  icon: string;
  color: string;
  percentage: number;
  transactions: number;
}

const initialCategoriesData: Category[] = [
  {
    id: '1',
    name: 'Food',
    amount: 2500,
    budget: 4000,
    icon: '🍛',
    color: '#ff6b6b',
    percentage: 62.5,
    transactions: 12,
  },
  {
    id: '2',
    name: 'Transport',
    amount: 1800,
    budget: 2500,
    icon: '🛵',
    color: '#4ecdc4',
    percentage: 72,
    transactions: 8,
  },
  {
    id: '3',
    name: 'Bills',
    amount: 4200,
    budget: 5000,
    icon: '📄',
    color: '#6c5ce7',
    percentage: 84,
    transactions: 6,
  },
  {
    id: '4',
    name: 'Shopping',
    amount: 3500,
    budget: 4000,
    icon: '🛍️',
    color: '#45b7d1',
    percentage: 87.5,
    transactions: 15,
  },
  {
    id: '5',
    name: 'Health',
    amount: 2800,
    budget: 3000,
    icon: '⚕️',
    color: '#a29bfe',
    percentage: 93.3,
    transactions: 4,
  },
  {
    id: '6',
    name: 'Entertainment',
    amount: 1500,
    budget: 2000,
    icon: '🎭',
    color: '#f9ca24',
    percentage: 75,
    transactions: 7,
  },
];

const CategoriesScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [categories, setCategories] = useState<Category[]>(
    initialCategoriesData,
  );
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newBudget, setNewBudget] = useState('');

  // Modal states
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentEditingCategory, setCurrentEditingCategory] =
    useState<Category | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formBudget, setFormBudget] = useState('');
  const [formIcon, setFormIcon] = useState('🍛');
  const [formColor, setFormColor] = useState('#ff6b6b');

  const resetForm = () => {
    setFormName('');
    setFormBudget('');
    setFormIcon('🍛');
    setFormColor('#ff6b6b');
  };

  const handleAddCategory = () => {
    if (!formName.trim() || !formBudget.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const budget = parseFloat(formBudget);
    if (isNaN(budget) || budget <= 0) {
      Alert.alert('Error', 'Please enter a valid budget amount');
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formName.trim(),
      amount: 0,
      budget: budget,
      icon: formIcon,
      color: formColor,
      percentage: 0,
      transactions: 0,
    };

    setCategories(prev => [...prev, newCategory]);
    setIsAddModalVisible(false);
    resetForm();
    Alert.alert('Success', 'Category added successfully!');
  };

  const handleEditCategory = (category: Category) => {
    setCurrentEditingCategory(category);
    setFormName(category.name);
    setFormBudget(category.budget.toString());
    setFormIcon(category.icon);
    setFormColor(category.color);
    setIsEditModalVisible(true);
  };

  const handleUpdateCategory = () => {
    if (!formName.trim() || !formBudget.trim() || !currentEditingCategory) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const budget = parseFloat(formBudget);
    if (isNaN(budget) || budget <= 0) {
      Alert.alert('Error', 'Please enter a valid budget amount');
      return;
    }

    setCategories(prev =>
      prev.map(cat =>
        cat.id === currentEditingCategory.id
          ? {
              ...cat,
              name: formName.trim(),
              budget: budget,
              icon: formIcon,
              color: formColor,
              percentage: (cat.amount / budget) * 100,
            }
          : cat,
      ),
    );

    setIsEditModalVisible(false);
    setCurrentEditingCategory(null);
    resetForm();
    Alert.alert('Success', 'Category updated successfully!');
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
            setCategories(prev => prev.filter(cat => cat.id !== categoryId));
            Alert.alert('Success', 'Category deleted successfully!');
          },
        },
      ],
    );
  };

  const handleEditBudget = (categoryId: string, currentBudget: number) => {
    setEditingCategory(categoryId);
    setNewBudget(currentBudget.toString());
  };

  const handleSaveBudget = (categoryId: string) => {
    const budget = parseFloat(newBudget);
    if (isNaN(budget) || budget <= 0) {
      Alert.alert('Error', 'Please enter a valid budget amount');
      return;
    }

    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, budget, percentage: (cat.amount / budget) * 100 }
          : cat,
      ),
    );
    setEditingCategory(null);
    setNewBudget('');
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
          <Text style={styles.categoryTransactions}>
            {category.transactions} transactions
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditBudget(category.id, category.budget)}
          >
            <Text style={styles.editButtonText}>₹</Text>
          </TouchableOpacity>
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

      <View style={styles.categoryStats}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Spent</Text>
          <Text style={styles.statValue}>
            ₹{category.amount.toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Budget</Text>
          {editingCategory === category.id ? (
            <View style={styles.budgetEditContainer}>
              <TextInput
                style={styles.budgetInput}
                value={newBudget}
                onChangeText={setNewBudget}
                keyboardType="numeric"
                autoFocus
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSaveBudget(category.id)}
              >
                <Text style={styles.saveButtonText}>✓</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.statValue}>
              ₹{category.budget.toLocaleString('en-IN')}
            </Text>
          )}
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text
            style={[
              styles.statValue,
              {
                color:
                  category.budget - category.amount > 0 ? '#00d4aa' : '#ff6b6b',
              },
            ]}
          >
            ₹{(category.budget - category.amount).toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min(category.percentage, 100)}%`,
                  backgroundColor:
                    category.percentage > 80 ? '#ff6b6b' : category.color,
                },
              ]}
            />
          </View>
          <Text
            style={[
              styles.percentageText,
              { color: category.percentage > 80 ? '#ff6b6b' : '#00d4aa' },
            ]}
          >
            {category.percentage.toFixed(0)}%
          </Text>
        </View>
        {category.percentage > 90 && (
          <Text style={styles.warningText}>⚠️ Budget almost exceeded!</Text>
        )}
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

          <TextInput
            style={styles.modalInput}
            placeholder="Budget Amount"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formBudget}
            onChangeText={setFormBudget}
            keyboardType="numeric"
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

          <TextInput
            style={styles.modalInput}
            placeholder="Budget Amount"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={formBudget}
            onChangeText={setFormBudget}
            keyboardType="numeric"
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

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const overallPercentage =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories & Budget</Text>
        <TouchableOpacity
          style={styles.addHeaderButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Text style={styles.addHeaderButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>December Overview</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewValue}>
                ₹{totalSpent.toLocaleString('en-IN')}
              </Text>
              <Text style={styles.overviewLabel}>Total Spent</Text>
            </View>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewValue}>
                ₹{totalBudget.toLocaleString('en-IN')}
              </Text>
              <Text style={styles.overviewLabel}>Total Budget</Text>
            </View>
          </View>
          <View style={styles.overviewProgress}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.min(overallPercentage, 100)}%`,
                    backgroundColor:
                      overallPercentage > 80 ? '#ff6b6b' : '#4facfe',
                  },
                ]}
              />
            </View>
            <Text style={styles.overviewPercentage}>
              {overallPercentage.toFixed(0)}% of total budget used
            </Text>
          </View>
        </View>

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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  overviewTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  overviewLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  overviewProgress: {
    marginTop: 10,
  },
  overviewPercentage: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
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
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
