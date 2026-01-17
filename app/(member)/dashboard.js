import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronRight, Clock, Dumbbell, Flame, TrendingUp, Zap } from 'lucide-react-native';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function MemberDashboard() {
    const { theme } = useTheme();
    const router = useRouter();
    const isDark = theme === 'dark';

    // Mock exercise data - removed accuracy
    const exercises = [
        {
            name: 'Shoulder Press',
            sets: 4,
            reps: [12, 10, 10, 8],
            weight: '40kg',
        },
        {
            name: 'Lateral Raises',
            sets: 3,
            reps: [15, 12, 12],
            weight: '12kg',
        },
        {
            name: 'Front Raises',
            sets: 3,
            reps: [12, 10, 10],
            weight: '10kg',
        },
        {
            name: 'Rear Delt Fly',
            sets: 3,
            reps: [15, 15, 12],
            weight: '8kg',
        },
    ];

    const goToProfile = () => {
        router.push('/(member)/profile');
    };

    const goToFeedback = () => {
        router.push('/(member)/feedback');
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: isDark ? '#020617' : '#f8fafc' }]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Header with Logo and Profile Picture */}
                <View style={styles.topHeader}>
                    <View>
                        <Text style={[styles.logo, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                            FIT<Text style={{ color: '#2563eb' }}>ZONE</Text>
                        </Text>
                        <Text style={[styles.tagline, { color: isDark ? '#94a3b8' : '#64748b' }]}>
                            Smart Gym Monitoring
                        </Text>
                    </View>
                    <Pressable onPress={goToProfile} style={styles.profileButton}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                            style={styles.profileImage}
                        />
                    </Pressable>
                </View>

                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={[styles.welcomeText, { color: isDark ? '#94a3b8' : '#64748b' }]}>Welcome back,</Text>
                    <Text style={[styles.userName, { color: isDark ? '#ffffff' : '#0f172a' }]}>Junaid Ameer Khan</Text>
                    <View style={styles.lastVisitRow}>
                        <Clock size={14} color={isDark ? '#94a3b8' : '#64748b'} />
                        <Text style={[styles.lastVisitText, { color: isDark ? '#94a3b8' : '#64748b' }]}>
                            Last visit: Yesterday 5:30 PM
                        </Text>
                    </View>
                </View>

                {/* Today's Check-in Time - Enhanced with Gradient */}
                <View style={styles.checkInCard}>
                    <LinearGradient
                        colors={['#1e3a8a', '#1e40af', '#172554']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientCard}
                    >
                        <View style={styles.checkInContent}>
                            <View style={styles.checkInLeft}>
                                <View style={styles.checkInBadge}>
                                    <Zap size={12} color="#fff" fill="#fff" />
                                    <Text style={styles.checkInLabel}>CHECKED IN</Text>
                                </View>
                                <Text style={styles.checkInTime}>6:45 AM</Text>
                                <Text style={styles.checkInDuration}>⚡️ Active for 42 minutes</Text>
                            </View>
                            <View style={styles.checkInIcon}>
                                <Clock size={56} color="rgba(255,255,255,0.2)" strokeWidth={1.5} />
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                {/* Workout Summary Statistics */}
                <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0f172a' }]}>Today's Summary</Text>
                <View style={styles.statsGrid}>
                    <StatCard title="Total Sets" value="13" icon={Dumbbell} isDark={isDark} color="#2563eb" />
                    <StatCard title="Total Reps" value="149" icon={TrendingUp} isDark={isDark} color="#3b82f6" />
                </View>

                {/* Exercise Tables */}
                <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0f172a', marginTop: 24 }]}>
                    Workout Details
                </Text>

                {exercises.map((exercise, index) => (
                    <View
                        key={index}
                        style={[styles.exerciseTable, {
                            backgroundColor: isDark ? '#0f172a' : '#ffffff',
                            borderColor: isDark ? '#1e293b' : '#e2e8f0',
                            shadowColor: '#2563eb',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 8,
                            elevation: 2,
                        }]}
                    >
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <View style={styles.exerciseHeaderLeft}>
                                <View style={[styles.exerciseNumber, {
                                    backgroundColor: index % 2 === 0 ? '#1e40af' : '#2563eb'
                                }]}>
                                    <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.exerciseName, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                                        {exercise.name}
                                    </Text>
                                    <Text style={[styles.exerciseWeight, { color: isDark ? '#94a3b8' : '#64748b' }]}>
                                        {exercise.weight} • {exercise.sets} sets
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Table Body - Reps */}
                        <View style={[styles.tableBody, { borderTopColor: isDark ? '#1e293b' : '#e2e8f0' }]}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableLabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>Set</Text>
                                {exercise.reps.map((_, idx) => (
                                    <Text key={idx} style={[styles.tableSetNumber, { color: isDark ? '#cbd5e1' : '#475569' }]}>
                                        {idx + 1}
                                    </Text>
                                ))}
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableLabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>Reps</Text>
                                {exercise.reps.map((rep, idx) => (
                                    <View key={idx} style={[styles.repBox, {
                                        backgroundColor: isDark ? '#1e293b' : '#eff6ff',
                                        borderColor: index % 2 === 0 ? '#1e40af' : '#3b82f6'
                                    }]}>
                                        <Text style={[styles.repNumber, { color: index % 2 === 0 ? '#3b82f6' : '#2563eb' }]}>
                                            {rep}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                ))}

                {/* Current Streak - Enhanced */}
                <View style={[styles.streakCard, {
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#1e293b' : '#e2e8f0'
                }]}>
                    <View style={styles.streakContent}>
                        <View style={[styles.streakIcon, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
                            <Flame size={36} color="#2563eb" fill="#2563eb" />
                        </View>
                        <View style={styles.streakText}>
                            <Text style={[styles.streakTitle, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                                Current Streak
                            </Text>
                            <Text style={[styles.streakDays, { color: '#2563eb' }]}>7 Days in a Row! 🔥</Text>
                            <Text style={[styles.streakSubtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>
                                Keep pushing! You're unstoppable!
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Quick Links */}
                <View style={[styles.quickLinksCard, {
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#1e293b' : '#e2e8f0'
                }]}>
                    <Pressable
                        style={styles.quickLink}
                        onPress={() => router.push('/(member)/reports')}
                    >
                        <Text style={[styles.quickLinkText, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                            📊 View Detailed Reports
                        </Text>
                        <ChevronRight size={20} color="#2563eb" />
                    </Pressable>
                    <View style={[styles.quickLinkDivider, { backgroundColor: isDark ? '#1e293b' : '#e2e8f0' }]} />
                    <Pressable
                        style={styles.quickLink}
                        onPress={() => router.push('/(member)/tutorials')}
                    >
                        <Text style={[styles.quickLinkText, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                            🎥 Browse Tutorials
                        </Text>
                        <ChevronRight size={20} color="#2563eb" />
                    </Pressable>
                    <View style={[styles.quickLinkDivider, { backgroundColor: isDark ? '#1e293b' : '#e2e8f0' }]} />
                    <Pressable
                        style={styles.quickLink}
                        onPress={goToFeedback}
                    >
                        <Text style={[styles.quickLinkText, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                            💬 Give Feedback
                        </Text>
                        <ChevronRight size={20} color="#2563eb" />
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const StatCard = ({ title, value, icon: Icon, isDark, color }) => (
    <View style={[styles.statCard, {
        backgroundColor: isDark ? '#0f172a' : '#ffffff',
        borderColor: isDark ? '#1e293b' : '#e2e8f0',
        shadowColor: color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 3,
    }]}>
        <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
            <Icon size={22} color={color} strokeWidth={2.5} />
        </View>
        <Text style={[styles.statValue, { color: color }]}>{value}</Text>
        <Text style={[styles.statTitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginTop: 2,
    },
    profileButton: {
        padding: 4,
    },
    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 3,
        borderColor: '#2563eb',
    },
    welcomeSection: {
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 14,
        fontWeight: '600',
    },
    userName: {
        fontSize: 26,
        fontWeight: '800',
        marginTop: 4,
    },
    lastVisitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 6,
    },
    lastVisitText: {
        fontSize: 12,
        fontWeight: '500',
    },
    checkInCard: {
        borderRadius: 24,
        marginBottom: 24,
        overflow: 'hidden',
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    gradientCard: {
        padding: 24,
    },
    checkInContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkInLeft: {
        flex: 1,
    },
    checkInBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        gap: 4,
        marginBottom: 8,
    },
    checkInLabel: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    checkInTime: {
        color: '#ffffff',
        fontSize: 42,
        fontWeight: '900',
        marginTop: 4,
        letterSpacing: -1,
    },
    checkInDuration: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 15,
        fontWeight: '700',
        marginTop: 6,
    },
    checkInIcon: {
        opacity: 1,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        width: '48%',
        padding: 18,
        borderRadius: 22,
        borderWidth: 1,
        alignItems: 'center',
    },
    statIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 4,
    },
    statTitle: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    exerciseTable: {
        borderRadius: 22,
        borderWidth: 1,
        marginBottom: 16,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
    },
    exerciseHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    exerciseNumber: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    exerciseNumberText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '900',
    },
    exerciseName: {
        fontSize: 17,
        fontWeight: '700',
    },
    exerciseWeight: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
    },
    tableBody: {
        borderTopWidth: 1,
        padding: 16,
        gap: 12,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    tableLabel: {
        fontSize: 12,
        fontWeight: '700',
        width: 40,
        textTransform: 'uppercase',
    },
    tableSetNumber: {
        fontSize: 11,
        fontWeight: '700',
        width: 32,
        textAlign: 'center',
    },
    repBox: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2.5,
    },
    repNumber: {
        fontSize: 17,
        fontWeight: '900',
    },
    streakCard: {
        borderRadius: 24,
        borderWidth: 1,
        padding: 22,
        marginTop: 8,
        marginBottom: 16,
    },
    streakContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    streakIcon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    streakText: {
        flex: 1,
    },
    streakTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    streakDays: {
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 2,
    },
    streakSubtitle: {
        fontSize: 13,
        fontWeight: '500',
    },
    quickLinksCard: {
        borderRadius: 24,
        borderWidth: 1,
        overflow: 'hidden',
    },
    quickLink: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    quickLinkText: {
        fontSize: 16,
        fontWeight: '600',
    },
    quickLinkDivider: {
        height: 1,
    },
});
