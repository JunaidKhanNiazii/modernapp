import { useRouter } from 'expo-router';
import { Activity, AlertTriangle, ArrowUpRight, Calendar, TrendingUp, Users } from 'lucide-react-native';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function AdminDashboard() {
    const { theme } = useTheme();
    const router = useRouter();
    const isDark = theme === 'dark';

    const stats = [
        { title: 'Total Members', value: '1,245', icon: Users, change: '+12%', color: '#2563eb' },
        { title: 'Active Today', value: '342', icon: Activity, change: '+5%', color: '#3b82f6' },
        { title: 'Alerts', value: '3', icon: AlertTriangle, change: '-2', color: '#f59e0b' },
    ];

    const goToProfile = () => {
        router.push('/(admin)/profile');
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: isDark ? '#020617' : '#f8fafc' }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header with FITZONE Logo and Admin Pic */}
                <View style={styles.topHeader}>
                    <View>
                        <Text style={[styles.logo, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                            FIT<Text style={{ color: '#2563eb' }}>ZONE</Text>
                        </Text>
                        <Text style={[styles.tagline, { color: isDark ? '#94a3b8' : '#64748b' }]}>
                            Admin Dashboard
                        </Text>
                    </View>
                    <Pressable onPress={goToProfile} style={styles.profileButton}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
                            style={styles.profileImage}
                        />
                    </Pressable>
                </View>

                {/* Welcome / Date Section */}
                <View style={styles.dateSection}>
                    <Text style={[styles.welcomeText, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                        Overview
                    </Text>
                    <View style={[styles.dateBadge, { backgroundColor: isDark ? '#1e293b' : '#ffffff' }]}>
                        <Calendar size={14} color={isDark ? '#94a3b8' : '#64748b'} />
                        <Text style={[styles.dateText, { color: isDark ? '#94a3b8' : '#64748b' }]}>Oct 24, 2025</Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View
                            key={index}
                            style={[
                                styles.statCard,
                                { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }
                            ]}
                        >
                            <View style={[styles.iconBox, { backgroundColor: `${stat.color}15` }]}>
                                <stat.icon size={20} color={stat.color} />
                            </View>
                            <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0f172a' }]}>{stat.value}</Text>
                            <Text style={[styles.statTitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>{stat.title}</Text>
                            <View style={styles.changeBadge}>
                                <TrendingUp size={12} color="#10b981" />
                                <Text style={styles.changeText}>{stat.change}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <Text style={[styles.sectionTitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>QUICK MANAGEMENT</Text>
                <View style={styles.actionGrid}>
                    <ActionButton
                        icon={Users}
                        title="Members"
                        path="/(admin)/members"
                        isDark={isDark}
                        router={router}
                    />
                    <ActionButton
                        icon={Activity}
                        title="Exercises"
                        path="/(admin)/exercise-setup"
                        isDark={isDark}
                        router={router}
                    />
                    <ActionButton
                        icon={AlertTriangle}
                        title="Alerts"
                        path="/(admin)/alerts"
                        isDark={isDark}
                        router={router}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const ActionButton = ({ icon: Icon, title, path, isDark, router }) => (
    <Pressable
        onPress={() => router.push(path)}
        style={[
            styles.actionCard,
            { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }
        ]}
    >
        <View style={[styles.actionIcon, { backgroundColor: isDark ? '#0f172a' : '#eff6ff' }]}>
            <Icon size={24} color="#2563eb" />
        </View>
        <View style={styles.actionInfo}>
            <Text style={[styles.actionTitle, { color: isDark ? '#ffffff' : '#0f172a' }]}>{title}</Text>
            <ArrowUpRight size={16} color={isDark ? '#64748b' : '#94a3b8'} />
        </View>
    </Pressable>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginTop: 2,
    },
    profileButton: {
        padding: 2,
    },
    profileImage: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#2563eb',
    },
    dateSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        gap: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        width: '31%',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
    },
    iconBox: {
        padding: 10,
        borderRadius: 14,
        marginBottom: 12,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 2,
    },
    statTitle: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 8,
        textAlign: 'center',
    },
    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    changeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#10b981',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 16,
        marginLeft: 4,
    },
    actionGrid: {
        gap: 12,
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
    },
    actionIcon: {
        padding: 12,
        borderRadius: 16,
        marginRight: 16,
    },
    actionInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
});
