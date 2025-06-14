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

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [autoBackup, setAutoBackup] = useState(true);
  const [dataSync, setDataSync] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [crashReports, setCrashReports] = useState(true);

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
        <Text style={styles.headerTitle}>Settings</Text>
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
          <View style={styles.settingsHeader}>
            <Text style={styles.settingsIcon}>⚙️</Text>
            <Text style={styles.settingsTitle}>App Settings</Text>
            <Text style={styles.settingsSubtitle}>
              Customize your TrackFlow experience
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data & Backup</Text>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Auto Backup</Text>
                <Text style={styles.settingSubtitle}>
                  Automatically backup your data daily
                </Text>
              </View>
              <Switch
                value={autoBackup}
                onValueChange={setAutoBackup}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={autoBackup ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Cloud Sync</Text>
                <Text style={styles.settingSubtitle}>
                  Sync data across devices (Coming Soon)
                </Text>
              </View>
              <Switch
                value={dataSync}
                onValueChange={setDataSync}
                disabled={true}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={dataSync ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Export Data</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Import Data</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy</Text>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Usage Analytics</Text>
                <Text style={styles.settingSubtitle}>
                  Help improve the app by sharing usage data
                </Text>
              </View>
              <Switch
                value={analytics}
                onValueChange={setAnalytics}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={analytics ? '#ffffff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Crash Reports</Text>
                <Text style={styles.settingSubtitle}>
                  Automatically send crash reports to developers
                </Text>
              </View>
              <Switch
                value={crashReports}
                onValueChange={setCrashReports}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#4facfe' }}
                thumbColor={crashReports ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Preferences</Text>

            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Default Currency</Text>
                <Text style={styles.preferenceValue}>Indian Rupee (₹)</Text>
              </View>
              <Text style={styles.preferenceArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Date Format</Text>
                <Text style={styles.preferenceValue}>DD/MM/YYYY</Text>
              </View>
              <Text style={styles.preferenceArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>Language</Text>
                <Text style={styles.preferenceValue}>English</Text>
              </View>
              <Text style={styles.preferenceArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Storage</Text>

            <View style={styles.storageInfo}>
              <View style={styles.storageItem}>
                <Text style={styles.storageLabel}>App Data:</Text>
                <Text style={styles.storageValue}>2.4 MB</Text>
              </View>
              <View style={styles.storageItem}>
                <Text style={styles.storageLabel}>Cache:</Text>
                <Text style={styles.storageValue}>1.2 MB</Text>
              </View>
              <View style={styles.storageItem}>
                <Text style={styles.storageLabel}>Total:</Text>
                <Text style={styles.storageValue}>3.6 MB</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.dangerButton}>
              <Text style={styles.dangerButtonText}>Clear Cache</Text>
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
  settingsHeader: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 40,
  },
  settingsIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  settingsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  settingsSubtitle: {
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
  settingItem: {
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
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  actionButtonText: {
    color: '#4facfe',
    fontSize: 16,
    fontWeight: '600',
  },
  preferenceItem: {
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
  preferenceInfo: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  preferenceValue: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  preferenceArrow: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  storageInfo: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  storageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  storageLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  storageValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: 'rgba(255,0,0,0.15)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,0,0,0.3)',
  },
  dangerButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
