import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { RoleProvider } from '../context/RoleContext';
import { ThemeProvider } from '../context/ThemeContext';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <ThemeProvider>
            <RoleProvider>
                <RootLayoutNav />
            </RoleProvider>
        </ThemeProvider>
    );
}

function RootLayoutNav() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(member)" />
            <Stack.Screen name="(admin)" />
        </Stack>
    );
}
