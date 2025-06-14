import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Mock data
const monthlyData = [
  {
    id: '1',
    month: 'Dec',
    totalExpenses: 16500,
    budget: 20000,
    savings: 11500,
    income: 45000,
    categories: 6,
    transactions: 24,
    topCategory: 'Bills',
    trend: 'up',
    trendPercentage: 8.5,
  },
  {
    id: '2',
    month: 'Nov',
    totalExpenses: 15200,
    budget: 20000,
    savings: 12800,
    income: 45000,
    categories: 6,
    transactions: 22,
    topCategory: 'Food',
    trend: 'down',
    trendPercentage: 5.2,
  },
  {
    id: '3',
    month: 'Oct',
    totalExpenses: 14800,
    budget: 20000,
    savings: 13200,
    income: 45000,
    categories: 5,
    transactions: 19,
    topCategory: 'Shopping',
    trend: 'up',
    trendPercentage: 3.1,
  },
];

const quickActions = [
  {
    id: '1',
    title: 'Add Expense',
    icon: '💰',
    color: '#ff6b6b',
    action: 'addExpense',
    screen: 'AddExpense',
  },
  {
    id: '2',
    title: 'Set Budget',
    icon: '🎯',
    color: '#4ecdc4',
    action: 'setBudget',
    screen: 'SetBudget',
  },
  {
    id: '3',
    title: 'View Reports',
    icon: '📊',
    color: '#45b7d1',
    action: 'viewReports',
    screen: 'Reports',
  },
  {
    id: '4',
    title: 'Categories',
    icon: '📂',
    color: '#f9ca24',
    action: 'categories',
    screen: 'Categories',
  },
];

const expenseCategories = [
  {
    id: '1',
    name: 'Food',
    amount: 2500,
    budget: 4000,
    icon: '🍛',
    color: '#ff6b6b',
    percentage: 62.5,
  },
  {
    id: '2',
    name: 'Transport',
    amount: 1800,
    budget: 2500,
    icon: '🛵',
    color: '#4ecdc4',
    percentage: 72,
  },
  {
    id: '3',
    name: 'Bills',
    amount: 4200,
    budget: 5000,
    icon: '📄',
    color: '#6c5ce7',
    percentage: 84,
  },
  {
    id: '4',
    name: 'Shopping',
    amount: 3500,
    budget: 4000,
    icon: '🛍️',
    color: '#45b7d1',
    percentage: 87.5,
  },
  {
    id: '5',
    name: 'Health',
    amount: 2800,
    budget: 3000,
    icon: '⚕️',
    color: '#a29bfe',
    percentage: 93.3,
  },
  {
    id: '6',
    name: 'Entertainment',
    amount: 1500,
    budget: 2000,
    icon: '🎭',
    color: '#f9ca24',
    percentage: 75,
  },
];

const recentTransactions = [
  {
    id: '1',
    title: 'KSEB Electricity Bill',
    amount: 1800,
    category: 'Bills',
    date: '2 hours ago',
    icon: '⚡',
  },
  {
    id: '2',
    title: 'Lunch at Paragon',
    amount: 450,
    category: 'Food',
    date: '5 hours ago',
    icon: '🍛',
  },
  {
    id: '3',
    title: 'Petrol',
    amount: 500,
    category: 'Transport',
    date: '1 day ago',
    icon: '⛽',
  },
  {
    id: '4',
    title: 'Medicine',
    amount: 350,
    category: 'Health',
    date: '2 days ago',
    icon: '💊',
  },
];

const insights = [
  {
    id: '1',
    type: 'warning',
    title: 'Budget Alert',
    message: "You've spent 84% of your Bills budget this month",
    icon: '⚠️',
    color: '#ff6b6b',
  },
  {
    id: '2',
    type: 'tip',
    title: 'Saving Tip',
    message: "You're saving ₹500 more than last month. Great job!",
    icon: '💡',
    color: '#00d4aa',
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement',
    message: "You've tracked expenses for 30 days straight!",
    icon: '🏆',
    color: '#f9ca24',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const currentMonth = monthlyData[0];
  const budgetUsed = (currentMonth.totalExpenses / currentMonth.budget) * 100;
  const savingsRate = (currentMonth.savings / currentMonth.income) * 100;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleQuickAction = screen => {
    navigation.navigate(screen);
  };

  const renderQuickAction = ({ item }) => (
    <TouchableOpacity
      style={[styles.quickActionCard, { backgroundColor: `${item.color}20` }]}
      onPress={() => handleQuickAction(item.screen)}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: item.color }]}>
        <Text style={styles.quickActionEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.quickActionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
          <Text style={styles.categoryEmoji}>{item.icon}</Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryAmount}>
            ₹{item.amount.toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.categoryPercentage}>
          <Text
            style={[
              styles.percentageText,
              { color: item.percentage > 80 ? '#ff6b6b' : '#00d4aa' },
            ]}
          >
            {item.percentage.toFixed(0)}%
          </Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${Math.min(item.percentage, 100)}%`,
                backgroundColor: item.percentage > 80 ? '#ff6b6b' : item.color,
              },
            ]}
          />
        </View>
        <Text style={styles.budgetText}>
          of ₹{item.budget.toLocaleString('en-IN')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Text style={styles.transactionEmoji}>{item.icon}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionCategory}>
          {item.category} • {item.date}
        </Text>
      </View>
      <Text style={styles.transactionAmount}>-₹{item.amount}</Text>
    </View>
  );

  const renderInsight = ({ item }) => (
    <View style={[styles.insightCard, { borderLeftColor: item.color }]}>
      <View style={styles.insightHeader}>
        <Text style={styles.insightIcon}>{item.icon}</Text>
        <Text style={styles.insightTitle}>{item.title}</Text>
      </View>
      <Text style={styles.insightMessage}>{item.message}</Text>
    </View>
  );

  const renderMonthItem = ({ item }) => (
    <TouchableOpacity
      style={styles.monthCard}
      onPress={() => navigation.navigate('DetailedView', { month: item.month })}
    >
      <View style={styles.monthHeader}>
        <Text style={styles.monthName}>{item.month}</Text>
        <View style={styles.trendContainer}>
          <Text
            style={[
              styles.trendIcon,
              { color: item.trend === 'up' ? '#ff6b6b' : '#00d4aa' },
            ]}
          >
            {item.trend === 'up' ? '↗' : '↘'}
          </Text>
          <Text
            style={[
              styles.trendText,
              { color: item.trend === 'up' ? '#ff6b6b' : '#00d4aa' },
            ]}
          >
            {item.trendPercentage}%
          </Text>
        </View>
      </View>
      <Text style={styles.monthAmount}>
        ₹{item.totalExpenses.toLocaleString('en-IN')}
      </Text>
      <View style={styles.monthStats}>
        <Text style={styles.monthStat}>{item.transactions} transactions</Text>
        <Text style={styles.monthStat}>Top: {item.topCategory}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#050510" />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.headerLeft}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>AK</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerGreeting}>Good Evening</Text>
              <Text style={styles.headerName}>Arun Kumar</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileButtonText}>⚙️</Text>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              styles.overviewSection,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.overviewCard}>
              <View style={styles.overviewHeader}>
                <Text style={styles.overviewTitle}>December Overview</Text>
                <TouchableOpacity style={styles.periodSelector}>
                  <Text style={styles.periodText}>{selectedPeriod}</Text>
                  <Text style={styles.periodArrow}>▼</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.overviewStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    ₹{currentMonth.totalExpenses.toLocaleString('en-IN')}
                  </Text>
                  <Text style={styles.statLabel}>Total Spent</Text>
                  <View style={styles.statProgress}>
                    <View style={styles.statProgressBar}>
                      <View
                        style={[
                          styles.statProgressFill,
                          { width: `${budgetUsed}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.statProgressText}>
                      {budgetUsed.toFixed(0)}% of budget
                    </Text>
                  </View>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    ₹{currentMonth.savings.toLocaleString('en-IN')}
                  </Text>
                  <Text style={styles.statLabel}>Saved</Text>
                  <Text style={styles.statSubtext}>
                    {savingsRate.toFixed(1)}% of income
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.section,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <FlatList
              data={quickActions}
              renderItem={renderQuickAction}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickActionsList}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.section,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories This Month</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Categories')}
              >
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={expenseCategories.slice(0, 4)}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.section,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.sectionTitle}>Insights & Tips</Text>
            <FlatList
              data={insights}
              renderItem={renderInsight}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.section,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Transactions')}
              >
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.transactionsList}>
              {recentTransactions.map(transaction => (
                <View key={transaction.id}>
                  {renderTransaction({ item: transaction })}
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.section,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.sectionTitle}>Monthly History</Text>
            <FlatList
              data={monthlyData}
              renderItem={renderMonthItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </Animated.View>
        </ScrollView>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <View style={styles.fabContent}>
            <Text style={styles.fabText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050510',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4facfe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileAvatarText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
  },
  headerGreeting: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  headerName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 14,
  },
  overviewSection: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  overviewCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  overviewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  periodText: {
    fontSize: 10,
    color: '#ffffff',
    marginRight: 4,
  },
  periodArrow: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.7)',
  },
  overviewStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  statProgress: {
    marginTop: 4,
  },
  statProgressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 4,
  },
  statProgressFill: {
    height: '100%',
    backgroundColor: '#4facfe',
    borderRadius: 2,
  },
  statProgressText: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.6)',
  },
  statSubtext: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 10,
    color: '#4facfe',
    fontWeight: '600',
  },
  quickActionsList: {
    paddingHorizontal: 10,
  },
  quickActionCard: {
    width: 70,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quickActionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  quickActionEmoji: {
    fontSize: 16,
  },
  quickActionTitle: {
    fontSize: 10,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  categoryCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 25,
    height: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryEmoji: {
    fontSize: 14,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  categoryAmount: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  categoryPercentage: {
    alignItems: 'flex-end',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginRight: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  budgetText: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.5)',
  },
  insightCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  insightIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  insightTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  insightMessage: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 12,
  },
  transactionsList: {
    paddingHorizontal: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  transactionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  transactionEmoji: {
    fontSize: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  transactionAmount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  monthCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  monthName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  monthAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  monthStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthStat: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabContent: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4facfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
