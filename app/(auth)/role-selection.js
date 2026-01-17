import { useRouter } from 'expo-router';
import { ChevronRight, ShieldCheck, Users } from 'lucide-react-native';
import { MotiView } from 'moti';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRole } from '../../context/RoleContext';
import { useTheme } from '../../context/ThemeContext';

export default function RoleSelection() {
    const router = useRouter();
    const { setRole } = useRole();
    const { theme } = useTheme();

    const handleRoleSelect = (role) => {
        setRole(role);
        if (role === 'member') {
            router.push('/(auth)/login-member');
        } else {
            router.push('/(auth)/login-admin');
        }
    };

    const RoleCard = ({ title, description, icon: Icon, role, delay }) => (
        <MotiView
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay, duration: 800, type: 'timing' }}
            className="w-full mb-6"
        >
            <TouchableOpacity
                onPress={() => handleRoleSelect(role)}
                activeOpacity={0.8}
                className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} border p-6 rounded-3xl flex-row items-center shadow-sm`}
            >
                <View className="bg-primary/10 p-4 rounded-2xl mr-4">
                    <Icon size={32} color="#2563eb" />
                </View>
                <View className="flex-1">
                    <Text className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{title}</Text>
                    <Text className={`text-sm mt-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{description}</Text>
                </View>
                <ChevronRight size={24} color={theme === 'dark' ? '#52525b' : '#a1a1aa'} />
            </TouchableOpacity>
        </MotiView>
    );

    return (
        <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <View className="flex-1 px-6 justify-center">
                <MotiView
                    from={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1000 }}
                    className="mb-12"
                >
                    <Text className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Welcome to FITZONE</Text>
                    <Text className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Select your role</Text>
                    <Text className={`text-lg mt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Choose how you want to use the smart gym companion.</Text>
                </MotiView>

                <RoleCard
                    title="Gym Member"
                    description="View your workouts, progress, and AI forms."
                    icon={Users}
                    role="member"
                    delay={200}
                />

                <RoleCard
                    title="Admin / Trainer"
                    description="Manage exercises, members, and gym analytics."
                    icon={ShieldCheck}
                    role="admin"
                    delay={400}
                />
            </View>
        </SafeAreaView>
    );
}
