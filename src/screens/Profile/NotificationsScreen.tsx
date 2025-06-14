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
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [pushNotifications, setPushNotifications] = useState(true);
  const [expenseReminders, setExpenseReminders] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [monthlyReports, setMonthlyReports] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

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
        <Text style={styles.headerTitle}>Notifications</Text>
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
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <Text style={styles.notificationTitle}>Notification Settings</Text>
            <Text style={styles.notificationSubtitle}>
              Stay updated with your expense tracking progress
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>

            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationItemTitle}>
                  Push Notifications
                </Text>
                <Text style={styles.notificationItemSubtitle}>
                  Enable all push notifications
                </Text>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={pushNotifications ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expense Tracking</Text>

            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationItemTitle}>
                  Daily Expense Reminders
                </Text>
                <Text style={styles.notificationItemSubtitle}>
                  Remind me to log my daily expenses
                </Text>
              </View>
              <Switch
                value={expenseReminders}
                onValueChange={setExpenseReminders}
                disabled={!pushNotifications}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={expenseReminders ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationItemTitle}>Budget Alerts</Text>
                <Text style={styles.notificationItemSubtitle}>
                  Alert when approaching budget limits
                </Text>
              </View>
              <Switch
                value={budgetAlerts}
                onValueChange={setBudgetAlerts}
                disabled={!pushNotifications}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={budgetAlerts ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reports</Text>

            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationItemTitle}>Weekly Reports</Text>
                <Text style={styles.notificationItemSubtitle}>
                  Get weekly spending summaries
                </Text>
              </View>
              <Switch
                value={weeklyReports}
                onValueChange={setWeeklyReports}
                disabled={!pushNotifications}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={weeklyReports ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationItemTitle}>
                  Monthly Reports
                </Text>
                <Text style={styles.notificationItemSubtitle}>
                  Get monthly financial insights
                </Text>
              </View>
              <Switch
                value={monthlyReports}
                onValueChange={setMonthlyReports}
                disabled={!pushNotifications}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={monthlyReports ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notification Style</Text>

            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationItemTitle}>Sound</Text>
                <Text style={styles.notificationItemSubtitle}>
                  Play sound for notifications
                </Text>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                disabled={!pushNotifications}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={soundEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.notificationItem}>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationItemTitle}>Vibration</Text>
                <Text style={styles.notificationItemSubtitle}>
                  Vibrate for notifications
                </Text>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                disabled={!pushNotifications}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={vibrationEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notification Schedule</Text>

            <TouchableOpacity style={styles.scheduleItem}>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>Daily Reminder Time</Text>
                <Text style={styles.scheduleValue}>8:00 PM</Text>
              </View>
              <Text style={styles.scheduleArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.scheduleItem}>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>Weekly Report Day</Text>
                <Text style={styles.scheduleValue}>Sunday</Text>
              </View>
              <Text style={styles.scheduleArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.scheduleItem}>
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>Monthly Report Date</Text>
                <Text style={styles.scheduleValue}>1st of every month</Text>
              </View>
              <Text style={styles.scheduleArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.testButton}>
            <Text style={styles.testButtonText}>Send Test Notification</Text>
          </TouchableOpacity>
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
  notificationHeader: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 40,
  },
  notificationIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  notificationSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  notificationInfo: {
    flex: 1,
    marginRight: 16,
  },
  notificationItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  notificationItemSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  scheduleValue: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  scheduleArrow: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  testButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NotificationsScreen;
