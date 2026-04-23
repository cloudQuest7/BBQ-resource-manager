import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius, shadow } from '../theme';
import { useUser } from '../context/UserContext';

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { loginUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Info', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - replace with real authentication
      setTimeout(() => {
        const mockUser = {
          id: 'user_001',
          name: 'Grillmaster Sarah',
          username: 'sarah_bbq',
          email: email,
          avatar: '👩‍🍳',
          level: 'Expert',
          bio: 'Passionate about smoking meats and perfecting rubs',
          joinDate: new Date().toISOString(),
          stats: {
            bbqsHosted: 24,
            recipes: 12,
            hoursGrilled: 156,
            streak: 8,
          },
          achievements: [
            { id: 1, name: 'Smoker Master', icon: '🏅', unlocked: true },
            { id: 2, name: 'Sauce Expert', icon: '🍯', unlocked: true },
            { id: 3, name: 'Perfect Sear', icon: '✨', unlocked: true },
            { id: 4, name: 'Beef Master', icon: '🐄', unlocked: false },
          ],
          preferences: {
            temperatureUnit: 'F',
            measurementUnit: 'lbs',
            cookingStyle: 'Smoking',
            notifications: true,
            theme: 'light',
          },
        };

        loginUser(mockUser);
        setLoading(false);
        Alert.alert('Success', 'Welcome back! 🔥');
        // Navigate to home - update this when you set up navigation
        // navigation.navigate('MainTabs');
      }, 800);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Login failed. Try again!');
    }
  };

  const handleSignUp = () => {
    // Navigate to signup screen when created
    Alert.alert('Sign Up', 'Sign up feature coming soon! 🔨');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Decoration */}
        <View style={[styles.decorationTop, { paddingTop: insets.top }]}>
          <Text style={styles.bigEmoji}>🔥</Text>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>
            Ready to fire up the grill?
          </Text>
          <View style={styles.decorLine} />
        </View>

        {/* Login Form */}
        <View style={styles.formSection}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelContainer}>
              <Ionicons name="mail" size={16} color={colors.primary} />
              <Text style={styles.inputLabel}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="grillmaster@bbq.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelContainer}>
              <Ionicons name="lock-closed" size={16} color={colors.primary} />
              <Text style={styles.inputLabel}>Password</Text>
            </View>
            <View style={[styles.passwordInputWrapper, shadow.card]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginBtn, loading && styles.loginBtnLoading, shadow.float]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loginBtnText}>Logging in...</Text>
            </View>
          ) : (
            <View style={styles.btnContent}>
              <Ionicons name="log-in" size={20} color={colors.white} />
              <Text style={styles.loginBtnText}>Login</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Sign Up Section */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Demo Credentials */}
        <View style={[styles.demoCard, shadow.card]}>
          <Text style={styles.demoTitle}>🧪 Demo Credentials</Text>
          <Text style={styles.demoText}>Email: demo@bbq.com</Text>
          <Text style={styles.demoText}>Password: password123</Text>
        </View>

        {/* Decorative Elements */}
        <View style={styles.decorationBottom}>
          <Text style={styles.bottomEmoji}>🍖</Text>
          <Text style={styles.bottomEmoji}>🔥</Text>
          <Text style={styles.bottomEmoji}>🍖</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },

  // Top Decoration
  decorationTop: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  bigEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },

  // Welcome Section
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
  },
  welcomeTitle: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  decorLine: {
    width: 60,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },

  // Form Section
  formSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: fonts.bodyBold,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.text,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    fontFamily: fonts.body,
    color: colors.text,
  },

  // Forgot Password
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotText: {
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.primary,
  },

  // Login Button
  loginBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  loginBtnLoading: {
    opacity: 0.7,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loginBtnText: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.white,
  },

  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: 13,
    fontFamily: fonts.body,
    color: colors.textMuted,
  },

  // Sign Up
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  signupText: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.text,
  },
  signupLink: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.primary,
  },

  // Demo Card
  demoCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.brandAccent,
  },
  demoTitle: {
    fontSize: 13,
    fontFamily: fonts.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  demoText: {
    fontSize: 12,
    fontFamily: fonts.body,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },

  // Bottom Decoration
  decorationBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  bottomEmoji: {
    fontSize: 32,
  },
});
