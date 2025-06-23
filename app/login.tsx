import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function LoginScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';

    const formOpacity = useSharedValue(0);
    const formTranslateY = useSharedValue(20);

    useEffect(() => {
        formOpacity.value = withTiming(1, { duration: 700 });
        formTranslateY.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.quad) });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: formOpacity.value,
            transform: [{ translateY: formTranslateY.value }],
        };
    });

    const handleLogin = () => {
        // We use router.replace to navigate to the dashboard and prevent
        // the user from going back to the login screen.
        router.replace('/dashboard');
    };

    const isWeb = Platform.OS === 'web';
    const textColor = useThemeColor({}, 'text');
    const placeholderColor = useThemeColor({}, 'icon');
    const inputBgColor = useThemeColor({ light: '#f0f0f0', dark: '#2a2a2a' }, 'background');
    const separatorColor = useThemeColor({ light: '#e0e0e0', dark: '#3a3a3a' }, 'background');
    const cardBgColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');

    return (
        <ThemedView style={styles.container}>
            <Animated.View style={[
                styles.card,
                { backgroundColor: cardBgColor, flexDirection: isWeb ? 'row' : 'column' },
                animatedStyle
            ]}>

                {/* Left Panel - Social Login */}
                <View style={styles.panel}>
                    <ThemedText type="subtitle" style={styles.panelTitle}>Get Started</ThemedText>
                    <ThemedText style={styles.panelDescription}>Login with your social account</ThemedText>
                    <Pressable style={styles.socialButton}>
                        <MaterialIcons name="g-translate" size={24} color="#DB4437" />
                        <ThemedText style={styles.socialButtonText}>Sign in with Google</ThemedText>
                    </Pressable>
                </View>

                {/* Separator */}
                <View style={[styles.separator, {
                    width: isWeb ? 1 : '80%',
                    height: isWeb ? '60%' : 1,
                    backgroundColor: separatorColor,
                    marginVertical: isWeb ? 0 : 20,
                }]} />

                {/* Right Panel - Email/Password Login */}
                <View style={styles.panel}>
                    <ThemedText type="subtitle" style={styles.panelTitle}>Login with Email</ThemedText>
                    <TextInput
                        style={[styles.input, { color: textColor, backgroundColor: inputBgColor }]}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={placeholderColor}
                    />
                    <TextInput
                        style={[styles.input, { color: textColor, backgroundColor: inputBgColor }]}
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor={placeholderColor}
                    />
                    <Pressable style={styles.loginButton} onPress={handleLogin}>
                        <ThemedText style={styles.loginButtonText}>Login</ThemedText>
                    </Pressable>
                </View>

            </Animated.View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    card: {
        width: '90%',
        maxWidth: 800,
        borderRadius: 20,
        ...Platform.select({
            web: {
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            },
            native: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.1,
                shadowRadius: 15,
                elevation: 10,
            }
        }),
        overflow: 'hidden',
    },
    panel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        minHeight: 300,
    },
    panelTitle: {
        marginBottom: 8,
        textAlign: 'center',
    },
    panelDescription: {
        marginBottom: 24,
        color: '#6c757d',
        textAlign: 'center',
    },
    separator: {
        alignSelf: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 0,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        padding: 15,
        backgroundColor: Colors.light.tint,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 15,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    socialButtonText: {
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
    }
});