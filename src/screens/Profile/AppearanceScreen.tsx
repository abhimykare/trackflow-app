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

const AppearanceScreen: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [selectedAccent, setSelectedAccent] = useState('blue');

  const themes = [
    {
      id: 'dark',
      name: 'Dark',
      description: 'Easy on the eyes',
      color: '#050510',
    },
    {
      id: 'light',
      name: 'Light',
      description: 'Coming Soon',
      color: '#ffffff',
      disabled: true,
    },
    {
      id: 'auto',
      name: 'Auto',
      description: 'Follow system',
      color: '#333333',
      disabled: true,
    },
  ];

  const accentColors = [
    { id: 'blue', name: 'Blue', color: '#4facfe' },
    { id: 'green', name: 'Green', color: '#00d4aa' },
    { id: 'purple', name: 'Purple', color: '#6c5ce7' },
    { id: 'orange', name: 'Orange', color: '#fd79a8' },
    { id: 'red', name: 'Red', color: '#e17055' },
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
        <Text style={styles.headerTitle}>Appearance</Text>
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
          <View style={styles.appearanceHeader}>
            <Text style={styles.appearanceIcon}>🌙</Text>
            <Text style={styles.appearanceTitle}>Customize Appearance</Text>
            <Text style={styles.appearanceSubtitle}>
              Personalize your TrackFlow experience with themes and colors
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Theme</Text>
            <Text style={styles.sectionDescription}>
              Choose how TrackFlow looks on your device
            </Text>

            {themes.map(theme => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeOption,
                  selectedTheme === theme.id && styles.selectedThemeOption,
                  theme.disabled && styles.disabledOption,
                ]}
                onPress={() => !theme.disabled && setSelectedTheme(theme.id)}
                disabled={theme.disabled}
              >
                <View style={styles.themePreview}>
                  <View
                    style={[
                      styles.themeColor,
                      { backgroundColor: theme.color },
                    ]}
                  />
                  {theme.disabled && <View style={styles.disabledOverlay} />}
                </View>
                <View style={styles.themeInfo}>
                  <Text
                    style={[
                      styles.themeTitle,
                      theme.disabled && styles.disabledText,
                    ]}
                  >
                    {theme.name}
                  </Text>
                  <Text
                    style={[
                      styles.themeDescription,
                      theme.disabled && styles.disabledText,
                    ]}
                  >
                    {theme.description}
                  </Text>
                </View>
                <View style={styles.themeSelector}>
                  {selectedTheme === theme.id && (
                    <View style={styles.selectedIndicator} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accent Color</Text>
            <Text style={styles.sectionDescription}>
              Choose your preferred accent color
            </Text>

            <View style={styles.colorGrid}>
              {accentColors.map(color => (
                <TouchableOpacity
                  key={color.id}
                  style={[
                    styles.colorOption,
                    selectedAccent === color.id && styles.selectedColorOption,
                  ]}
                  onPress={() => setSelectedAccent(color.id)}
                >
                  <View
                    style={[
                      styles.colorCircle,
                      { backgroundColor: color.color },
                    ]}
                  />
                  <Text style={styles.colorName}>{color.name}</Text>
                  {selectedAccent === color.id && (
                    <View style={styles.colorSelectedIndicator} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preview</Text>
            <View style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <Text style={styles.previewTitle}>Sample Expense Card</Text>
                <Text style={styles.previewAmount}>₹2,500</Text>
              </View>
              <View style={styles.previewContent}>
                <View
                  style={[
                    styles.previewIcon,
                    {
                      backgroundColor: accentColors.find(
                        c => c.id === selectedAccent,
                      )?.color,
                    },
                  ]}
                >
                  <Text style={styles.previewEmoji}>🍛</Text>
                </View>
                <View style={styles.previewInfo}>
                  <Text style={styles.previewCategory}>Food & Dining</Text>
                  <Text style={styles.previewDate}>Today</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.applyButton,
              {
                backgroundColor: accentColors.find(c => c.id === selectedAccent)
                  ?.color,
              },
            ]}
          >
            <Text style={styles.applyButtonText}>Apply Changes</Text>
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
  appearanceHeader: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 40,
  },
  appearanceIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  appearanceTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  appearanceSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 16,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  selectedThemeOption: {
    borderColor: '#4facfe',
    backgroundColor: 'rgba(79, 172, 254, 0.1)',
  },
  disabledOption: {
    opacity: 0.5,
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  themeColor: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  disabledOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeInfo: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  disabledText: {
    color: 'rgba(255,255,255,0.3)',
  },
  themeSelector: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4facfe',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: '18%',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  selectedColorOption: {
    transform: [{ scale: 1.1 }],
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  colorName: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  colorSelectedIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4facfe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  previewAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  previewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  previewEmoji: {
    fontSize: 20,
  },
  previewInfo: {
    flex: 1,
  },
  previewCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  previewDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  applyButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AppearanceScreen;
