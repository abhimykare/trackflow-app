import type React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/routeNavigator';

const transactionsData = [
  {
    id: '1',
    title: 'KSEB Electricity Bill',
    amount: 1800,
    category: 'Bills',
    date: '2024-12-15',
    time: '2 hours ago',
    icon: '⚡',
    color: '#6c5ce7',
  },
  {
    id: '2',
    title: 'Lunch at Paragon',
    amount: 450,
    category: 'Food',
    date: '2024-12-15',
    time: '5 hours ago',
    icon: '🍛',
    color: '#ff6b6b',
  },
  {
    id: '3',
    title: 'Petrol',
    amount: 500,
    category: 'Transport',
    date: '2024-12-14',
    time: '1 day ago',
    icon: '⛽',
    color: '#4ecdc4',
  },
  {
    id: '4',
    title: 'Medicine',
    amount: 350,
    category: 'Health',
    date: '2024-12-13',
    time: '2 days ago',
    icon: '💊',
    color: '#a29bfe',
  },
  {
    id: '5',
    title: 'Netflix Subscription',
    amount: 649,
    category: 'Entertainment',
    date: '2024-12-12',
    time: '3 days ago',
    icon: '🎭',
    color: '#f9ca24',
  },
  {
    id: '6',
    title: 'Grocery Shopping',
    amount: 1200,
    category: 'Food',
    date: '2024-12-12',
    time: '3 days ago',
    icon: '🛒',
    color: '#ff6b6b',
  },
  {
    id: '7',
    title: 'Uber Ride',
    amount: 180,
    category: 'Transport',
    date: '2024-12-11',
    time: '4 days ago',
    icon: '🚗',
    color: '#4ecdc4',
  },
  {
    id: '8',
    title: 'Coffee',
    amount: 120,
    category: 'Food',
    date: '2024-12-11',
    time: '4 days ago',
    icon: '☕',
    color: '#ff6b6b',
  },
  {
    id: '9',
    title: 'Phone Recharge',
    amount: 399,
    category: 'Bills',
    date: '2024-12-10',
    time: '5 days ago',
    icon: '📱',
    color: '#6c5ce7',
  },
  {
    id: '10',
    title: 'Book Purchase',
    amount: 250,
    category: 'Shopping',
    date: '2024-12-10',
    time: '5 days ago',
    icon: '📚',
    color: '#45b7d1',
  },
];

const filterOptions = [
  'All',
  'Food',
  'Transport',
  'Bills',
  'Shopping',
  'Health',
  'Entertainment',
];

const TransactionsScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [transactions, setTransactions] = useState(transactionsData);

  const filteredTransactions =
    selectedFilter === 'All'
      ? transactions
      : transactions.filter(t => t.category === selectedFilter);

  const totalAmount = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0,
  );

  const groupTransactionsByDate = (transactions: any[]) => {
    const grouped = transactions.reduce((groups, transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {} as Record<string, any[]>);

    return Object.entries(grouped).map(([date, transactions]) => ({
      date,
      transactions,
      total: transactions.reduce((sum, t) => sum + t.amount, 0),
    }));
  };

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const renderFilterItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item && styles.filterItemActive,
      ]}
      onPress={() => setSelectedFilter(item)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === item && styles.filterTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderTransaction = (transaction: any) => (
    <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
      <View
        style={[
          styles.transactionIcon,
          { backgroundColor: `${transaction.color}20` },
        ]}
      >
        <Text style={styles.transactionEmoji}>{transaction.icon}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionCategory}>
          {transaction.category} • {transaction.time}
        </Text>
      </View>
      <Text style={styles.transactionAmount}>-₹{transaction.amount}</Text>
    </TouchableOpacity>
  );

  const renderDateGroup = ({ item }: { item: any }) => (
    <View style={styles.dateGroup}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        <Text style={styles.dateTotalText}>
          -₹{item.total.toLocaleString('en-IN')}
        </Text>
      </View>
      {item.transactions.map(renderTransaction)}
    </View>
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
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>
          {selectedFilter === 'All'
            ? 'Total Expenses'
            : `${selectedFilter} Expenses`}
        </Text>
        <Text style={styles.summaryAmount}>
          ₹{totalAmount.toLocaleString('en-IN')}
        </Text>
        <Text style={styles.summarySubtext}>
          {filteredTransactions.length} transactions this month
        </Text>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          data={filterOptions}
          renderItem={renderFilterItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      <FlatList
        data={groupedTransactions}
        renderItem={renderDateGroup}
        keyExtractor={item => item.date}
        style={styles.transactionsList}
        showsVerticalScrollIndicator={false}
      />
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4facfe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 8,
  },
  summaryAmount: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summarySubtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersList: {
    paddingHorizontal: 15,
  },
  filterItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  filterItemActive: {
    backgroundColor: '#4facfe',
    borderColor: '#4facfe',
  },
  filterText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  dateText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTotalText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 18,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionCategory: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  transactionAmount: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionsScreen;
