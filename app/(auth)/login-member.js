import { useRouter } from 'expo-router';
import { ArrowRight, Lock, Mail } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function LoginMember() {
    const router = useRouter();
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // UI Only: Navigate to member dashboard
        router.replace('/(member)/dashboard');
    };

    const handleGuest = () => {
        router.replace('/(member)/dashboard');
    };

    return (
        <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 px-6 justify-center"
            >
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 800 }}
                    className="mb-10"
                >
                    <Text className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Member Login</Text>
                    <Text className={`text-lg mt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Access your automated fitness data.</Text>
                </MotiView>

                <View className="space-y-4">
                    <View className={`flex-row items-center border p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                        <Mail size={20} color="#2563eb" className="mr-3" />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={theme === 'dark' ? '#71717a' : '#a1a1aa'}
                            className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <View className={`flex-row items-center border p-4 rounded-2xl mt-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                        <Lock size={20} color="#2563eb" className="mr-3" />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={theme === 'dark' ? '#71717a' : '#a1a1aa'}
                            className={`flex-1 ml-3 text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    activeOpacity={0.8}
                    className="bg-primary p-4 rounded-2xl items-center mt-8 flex-row justify-center"
                >
                    <Text className="text-white text-lg font-bold mr-2">Login</Text>
                    <ArrowRight size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleGuest}
                    className="mt-6 items-center"
                >
                    <Text className={`text-base ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Don't have an account? <Text className="text-primary font-bold">Continue as Guest</Text>
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
