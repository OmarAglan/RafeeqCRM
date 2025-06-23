import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { Button, Platform, StyleSheet, TextInput, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
    const separatorColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'icon');

    const handleLogin = () => {
        // We use router.replace to navigate to the dashboard and prevent
        // the user from going back to the login screen.
        router.replace('/dashboard');
    };

    const isWeb = Platform.OS === 'web';

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.split, { flexDirection: isWeb ? 'row' : 'column' }]}>
                <View style={styles.panel}>
                    <ThemedText type="subtitle">Login with Google</ThemedText>
                    <Button title="Login with Google" onPress={() => { /* will implement later */ }} />
                </View>

                <View style={styles.separatorContainer}>
                    <View style={[styles.separator, {
                        width: isWeb ? 1 : '80%',
                        height: isWeb ? '80%' : 1,
                        backgroundColor: separatorColor,
                        marginVertical: isWeb ? 0 : 20,
                    }]} />
                </View>

                <View style={styles.panel}>
                    <ThemedText type="subtitle">Login with Email</ThemedText>
                    <TextInput
                        style={[styles.input, { color, borderColor: separatorColor }]}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={separatorColor}
                    />
                    <TextInput
                        style={[styles.input, { color, borderColor: separatorColor }]}
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor={separatorColor}
                    />
                    <Button title="Login" onPress={handleLogin} />
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    split: {
        flex: 1,
        width: '100%',
        maxWidth: 800,
        justifyContent: 'center',
        alignItems: 'center',
    },
    panel: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    separatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
    },
    input: {
        width: '80%',
        height: 44,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});