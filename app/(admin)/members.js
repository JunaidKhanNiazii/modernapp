import { ChevronRight, Filter, Mail, Search, User } from 'lucide-react-native';
import { MotiView } from 'moti';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function AdminMembers() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const members = [
        { id: 1, name: 'Junaid Ameer', email: 'junaid@fitzone.com', attendance: '98%', status: 'Online' },
        { id: 2, name: 'Sarah Ahmed', email: 'sarah@fitzone.com', attendance: '85%', status: 'Offline' },
        { id: 3, name: 'Usman Ghafoor', email: 'usman@fitzone.com', attendance: '92%', status: 'Online' },
        { id: 4, name: 'Dua Lipa', email: 'dua@fitzone.com', attendance: '70%', status: 'Offline' },
    ];

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: isDark ? '#020617' : '#f8fafc' }]}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.title, { color: isDark ? '#ffffff' : '#0f172a' }]}>Members</Text>
                        <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>Total: 1,248 Users</Text>
                    </View>
                </View>

                <View style={[styles.searchBar, { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }]}>
                    <Search size={20} color="#64748b" />
                    <TextInput
                        placeholder="Search by name or email..."
                        placeholderTextColor="#94a3b8"
                        style={[styles.searchInput, { color: isDark ? '#ffffff' : '#0f172a' }]}
                    />
                    <Pressable style={styles.filterButton}>
                        <Filter size={20} color="#2563eb" />
                    </Pressable>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {members.map((member, idx) => (
                        <MotiView
                            key={member.id}
                            from={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 100 }}
                            style={[
                                styles.card,
                                { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }
                            ]}
                        >
                            <View style={[styles.avatarContainer, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
                                <User size={24} color="#2563eb" />
                                <View style={[styles.statusDot, {
                                    backgroundColor: member.status === 'Online' ? '#10b981' : '#cbd5e1',
                                    borderColor: isDark ? '#1e293b' : '#ffffff'
                                }]} />
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={[styles.memberName, { color: isDark ? '#ffffff' : '#0f172a' }]}>{member.name}</Text>
                                <View style={styles.emailRow}>
                                    <Mail size={12} color="#64748b" />
                                    <Text style={[styles.emailText, { color: isDark ? '#94a3b8' : '#64748b' }]}>{member.email}</Text>
                                </View>
                            </View>
                            <View style={styles.statsContainer}>
                                <Text style={styles.attendanceValue}>{member.attendance}</Text>
                                <Text style={styles.attendanceLabel}>Attend.</Text>
                            </View>
                            <ChevronRight size={20} color={isDark ? '#475569' : '#cbd5e1'} />
                        </MotiView>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        marginBottom: 24,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
    },
    filterButton: {
        marginLeft: 8,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    card: {
        padding: 16,
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        position: 'relative',
    },
    statusDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
    },
    infoContainer: {
        flex: 1,
    },
    memberName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    emailText: {
        fontSize: 12,
        marginLeft: 4,
    },
    statsContainer: {
        alignItems: 'flex-end',
        marginRight: 12,
    },
    attendanceValue: {
        color: '#2563eb',
        fontWeight: 'bold',
        fontSize: 16,
    },
    attendanceLabel: {
        fontSize: 10,
        color: '#64748b',
        textTransform: 'uppercase',
        fontWeight: '800',
    },
});
