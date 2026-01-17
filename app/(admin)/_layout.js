import { Tabs } from 'expo-router';
import { BarChart2, Bell, LayoutDashboard, Settings, User, Users } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function AdminLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
                    borderTopColor: theme === 'dark' ? '#1f1f1f' : '#eeeeee',
                    height: 85,
                    paddingBottom: 25,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: theme === 'dark' ? '#71717a' : '#a1a1aa',
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Admin',
                    tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="exercise-setup"
                options={{
                    title: 'Config',
                    tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="members"
                options={{
                    title: 'Users',
                    tabBarIcon: ({ color }) => <Users size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="analytics"
                options={{
                    title: 'Stats',
                    tabBarIcon: ({ color }) => <BarChart2 size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="alerts"
                options={{
                    title: 'Alerts',
                    tabBarIcon: ({ color }) => <Bell size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Admin',
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
