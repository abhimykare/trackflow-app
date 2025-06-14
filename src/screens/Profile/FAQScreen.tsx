import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqQuestion}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.faqQuestionText}>{question}</Text>
        <Text style={styles.faqToggle}>{expanded ? '−' : '+'}</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.faqAnswer,
          {
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            }),
            opacity: animatedHeight,
          },
        ]}
      >
        <Text style={styles.faqAnswerText}>{answer}</Text>
      </Animated.View>
    </View>
  );
};

const FAQScreen: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const faqs = [
    {
      question: 'How do I add a new expense?',
      answer:
        "To add a new expense, go to the month view and tap the '+' button at the bottom right corner. Fill in the expense details including amount, category, and date, then tap 'Save'.",
    },
    {
      question: 'Can I edit or delete an expense?',
      answer:
        'Yes, you can edit or delete an expense by going to the detailed view of a month, tapping on the expense category to expand it, then long-pressing on the specific expense. This will show options to edit or delete.',
    },
    {
      question: 'How do I update my monthly salary?',
      answer:
        "You can update your monthly salary by going to Profile > Add Salary. Enter your new salary amount and any additional income, then tap 'Update Income'.",
    },
    {
      question: 'How is my savings calculated?',
      answer:
        'Your savings are calculated by subtracting your total monthly expenses from your total monthly income (salary + additional income).',
    },
    {
      question: 'Can I export my expense data?',
      answer:
        "Currently, the export feature is under development. In a future update, you'll be able to export your expense data as CSV or PDF from the Settings menu.",
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, all your financial data is stored securely on your device. We use industry-standard encryption methods to protect your information. You can also enable additional security features like biometric login from the Security settings.',
    },
    {
      question: 'How do I set a budget for different categories?',
      answer:
        "The budget feature will be available in the next update. You'll be able to set monthly budgets for each expense category and receive notifications when you're approaching your limits.",
    },
    {
      question: 'Can I use TrackFlow offline?',
      answer:
        'Yes, TrackFlow works completely offline. All your data is stored locally on your device, so you can track your expenses even without an internet connection.',
    },
  ];

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050510" />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={styles.faqHeader}>
            <Text style={styles.faqIcon}>❓</Text>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
            <Text style={styles.faqSubtitle}>
              Find answers to common questions about TrackFlow
            </Text>
          </View>

          <View style={styles.faqList}>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.contactText}>
              Can't find what you're looking for?
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => navigation.navigate('ContactUs')}
            >
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  faqHeader: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 40,
  },
  faqIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  faqSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 20,
  },
  faqList: {
    paddingHorizontal: 24,
  },
  faqItem: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  faqToggle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4facfe',
    marginLeft: 8,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    overflow: 'hidden',
  },
  faqAnswerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20,
  },
  contactSection: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 24,
  },
  contactText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FAQScreen;
