import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  FlatList,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

type DetailedViewScreenRouteProp = RouteProp<
  { DetailedView: { month: string } },
  'DetailedView'
>;

const mockExpenses = [
  {
    id: '1',
    category: 'Food',
    amount: 2500,
    emoji: '🍛',
    color: '#ff6b6b',
    items: [
      { name: 'Sadhya at Paragon', amount: 850, date: '15 Nov' },
      { name: 'Malabar Biriyani', amount: 450, date: '10 Nov' },
      { name: 'Karimeen Pollichathu', amount: 650, date: '5 Nov' },
      { name: 'Sulaimani Tea & Snacks', amount: 550, date: '2 Nov' },
    ],
  },
  {
    id: '2',
    category: 'Transport',
    amount: 1800,
    emoji: '🛵',
    color: '#4ecdc4',
    items: [
      { name: 'KSRTC Bus to Munnar', amount: 750, date: '20 Nov' },
      { name: 'Auto to Fort Kochi', amount: 350, date: '12 Nov' },
      { name: 'Petrol for Activa', amount: 500, date: '5 Nov' },
      { name: 'Water Metro Ferry', amount: 200, date: '1 Nov' },
    ],
  },
  {
    id: '3',
    category: 'Shopping',
    amount: 3500,
    emoji: '🛍️',
    color: '#45b7d1',
    items: [
      { name: 'Kasavu Saree from Lulu', amount: 1800, date: '25 Nov' },
      { name: 'Spices from Mattancherry', amount: 650, date: '18 Nov' },
      { name: 'Handicrafts', amount: 750, date: '10 Nov' },
      { name: 'Banana Chips', amount: 300, date: '5 Nov' },
    ],
  },
  {
    id: '4',
    category: 'Entertainment',
    amount: 1500,
    emoji: '🎭',
    color: '#f9ca24',
    items: [
      { name: 'Kathakali Show', amount: 600, date: '22 Nov' },
      { name: 'Movie at Oberon Mall', amount: 450, date: '15 Nov' },
      { name: 'Boat Ride in Alleppey', amount: 450, date: '8 Nov' },
    ],
  },
  {
    id: '5',
    category: 'Bills',
    amount: 4200,
    emoji: '📄',
    color: '#6c5ce7',
    items: [
      { name: 'KSEB Electricity', amount: 1800, date: '28 Nov' },
      { name: 'Kerala Water Authority', amount: 650, date: '25 Nov' },
      { name: 'Jio Fiber Internet', amount: 999, date: '20 Nov' },
      { name: 'Airtel Prepaid', amount: 751, date: '10 Nov' },
    ],
  },
  {
    id: '6',
    category: 'Health',
    amount: 2800,
    emoji: '⚕️',
    color: '#a29bfe',
    items: [
      { name: 'Ayurvedic Massage', amount: 1200, date: '26 Nov' },
      { name: 'Medicines from Medplus', amount: 850, date: '20 Nov' },
      { name: 'Doctor Consultation', amount: 750, date: '15 Nov' },
    ],
  },
];

const DetailedViewScreen: React.FC = () => {
  const route = useRoute<DetailedViewScreenRouteProp>();
  const navigation = useNavigation();
  const { month } = route.params;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalAmount = mockExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderExpenseItem = ({ item }) => {
    const isSelected = selectedCategory === item.category;

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedCategory(isSelected ? null : item.category)}
          style={{
            backgroundColor: isSelected
              ? 'rgba(255,255,255,0.12)'
              : 'rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: isSelected
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(255,255,255,0.1)',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                backgroundColor: item.color,
              }}
            >
              <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: 2,
                }}
              >
                {item.category}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: '400',
                }}
              >
                {month} 2024
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: 2,
              }}
            >
              ₹{item.amount.toLocaleString('en-IN')}
            </Text>
            <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
              {isSelected ? '▲' : '▼'}
            </Text>
          </View>
        </TouchableOpacity>

        {isSelected && (
          <Animated.View
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              padding: 12,
              marginTop: 4,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic',
                marginBottom: 8,
              }}
            >
              {item.category} expenses for {month}
            </Text>
            <View style={{ gap: 8 }}>
              {item.items.map((transaction, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: '500',
                      }}
                    >
                      {transaction.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 2,
                      }}
                    >
                      {transaction.date}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      fontWeight: '600',
                    }}
                  >
                    ₹{transaction.amount}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#050510' }}>
      <StatusBar barStyle="light-content" backgroundColor="#050510" />

      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 40,
          paddingHorizontal: 16,
          paddingBottom: 12,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: 8,
            width: 36,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
            ←
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: 0.5,
            }}
          >
            {month} Expenses
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: 8,
            width: 36,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>
            ⋮
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          marginHorizontal: 16,
          marginBottom: 20,
          borderRadius: 16,
          overflow: 'hidden',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          backgroundColor: '#1a472a',
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View style={{ padding: 16 }}>
          <Text
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              fontWeight: '500',
              marginBottom: 4,
            }}
          >
            Total Expenses
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: 12,
              letterSpacing: -0.5,
            }}
          >
            ₹{totalAmount.toLocaleString('en-IN')}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: 2,
                }}
              >
                {mockExpenses.length}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: '500',
                }}
              >
                Categories
              </Text>
            </View>
            <View
              style={{
                width: 1,
                height: 30,
                backgroundColor: 'rgba(255,255,255,0.3)',
                marginHorizontal: 12,
              }}
            />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: 2,
                }}
              >
                ₹{Math.round(totalAmount / 30).toLocaleString('en-IN')}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: '500',
                }}
              >
                Daily Avg
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: 12,
            letterSpacing: 0.5,
          }}
        >
          Expense Categories
        </Text>
        <FlatList
          data={mockExpenses}
          renderItem={renderExpenseItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 16,
          width: 48,
          height: 48,
          borderRadius: 24,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: '#1a472a',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DetailedViewScreen;
