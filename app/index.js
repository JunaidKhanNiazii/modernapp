import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Activity } from 'lucide-react-native';
import { MotiText, MotiView } from 'moti';
import { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function AppSplash() {
    const router = useRouter();
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            SplashScreen.hideAsync();
            router.replace('/(auth)/role-selection');
        }, 4000); // 4 seconds for a premium feel

        return () => clearTimeout(timer);
    }, []);

    return (
        <View className={`flex-1 items-center justify-center ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <MotiView
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 1500 }}
                className="items-center"
            >
                <MotiView
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1],
                    }}
                    transition={{
                        loop: true,
                        duration: 2000,
                        type: 'timing',
                    }}
                    className="bg-primary/20 p-8 rounded-full"
                >
                    <Activity size={80} color="#2563eb" />
                </MotiView>

                <MotiText
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 500, duration: 1000 }}
                    className="text-4xl font-bold mt-6 text-primary tracking-widest"
                    style={{ fontFamily: 'System' }}
                >
                    FITZONE
                </MotiText>

                <MotiText
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1500, duration: 1000 }}
                    className={`text-lg mt-2 tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    Smart Fitness. Real Results.
                </MotiText>
            </MotiView>

            <MotiView
                from={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ delay: 1000, duration: 2500, type: 'timing' }}
                className="h-1 bg-primary absolute bottom-20 rounded-full"
            />
        </View>
    );
}
