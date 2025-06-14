import React, { useRef, useEffect } from 'react';
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

type MenuItemProps = {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <Text style={styles.menuIcon}>{icon}</Text>
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <Text style={styles.menuArrow}>→</Text>
    </TouchableOpacity>
  );
};

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <Animated.View
          style={[
            styles.profileCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatarLarge}>
              <Text style={styles.profileAvatarText}>AK</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Arun Kumar</Text>
              <Text style={styles.profileEmail}>arun.kumar@example.com</Text>
            </View>
          </View>

          <View style={styles.profileStats}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>₹40,000</Text>
              <Text style={styles.profileStatLabel}>Monthly Income</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>₹11,500</Text>
              <Text style={styles.profileStatLabel}>Monthly Savings</Text>
            </View>
          </View>
        </Animated.View>

        {/* Menu Sections */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>Account</Text>
            <MenuItem
              icon="👤"
              title="Personal Information"
              subtitle="Update your personal details"
              onPress={() => navigation.navigate('PersonalInformation')}
            />
            <MenuItem
              icon="💰"
              title="Add Salary"
              subtitle="Update your monthly income"
              onPress={() => navigation.navigate('AddSalary')}
            />
            <MenuItem
              icon="🔐"
              title="Security"
              subtitle="Change password and security settings"
              onPress={() => navigation.navigate('Security')}
            />
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>Preferences</Text>
            <MenuItem
              icon="⚙️"
              title="Settings"
              subtitle="App preferences and notifications"
              onPress={() => navigation.navigate('Settings')}
            />
            <MenuItem
              icon="🌙"
              title="Appearance"
              subtitle="Theme and display options"
              onPress={() => navigation.navigate('Appearance')}
            />
            <MenuItem
              icon="🔔"
              title="Notifications"
              subtitle="Manage alerts and reminders"
              onPress={() => navigation.navigate('Notifications')}
            />
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>Support</Text>
            <MenuItem
              icon="❓"
              title="FAQ"
              subtitle="Frequently asked questions"
              onPress={() => navigation.navigate('FAQ')}
            />
            <MenuItem
              icon="📞"
              title="Contact Us"
              subtitle="Get help and support"
              onPress={() => navigation.navigate('ContactUs')}
            />
            <MenuItem
              icon="ℹ️"
              title="About TrackFlow"
              subtitle="App version and information"
              onPress={() => navigation.navigate('AboutTrackFlow')}
            />
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
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
  profileCard: {
    margin: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileAvatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4facfe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileAvatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
  },
  profileStat: {
    flex: 1,
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  profileStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
  },
  menuSection: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  menuArrow: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,0,0,0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,0,0,0.3)',
  },
  logoutButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
