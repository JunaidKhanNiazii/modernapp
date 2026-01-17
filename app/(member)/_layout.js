import { Tabs } from 'expo-router';
import { FileText, LayoutDashboard, MessageCircle, Play, User } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function MemberLayout() {
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
                    title: 'Home',
                    tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="tutorials"
                options={{
                    title: 'Lern',
                    tabBarIcon: ({ color }) => <Play size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="ai-assistant"
                options={{
                    title: 'AI',
                    tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
