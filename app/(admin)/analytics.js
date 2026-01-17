import { Clock, TrendingUp, Users } from 'lucide-react-native';
import { MotiView } from 'moti';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function AdminAnalytics() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: isDark ? '#020617' : '#f8fafc' }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.sectionLabel}>Reports</Text>
                    <Text style={[styles.title, { color: isDark ? '#ffffff' : '#0f172a' }]}>Analytics</Text>
                </View>

                {/* Key Metrics Row */}
                <View style={styles.metricsRow}>
                    <MotiView
                        from={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={[
                            styles.metricCard,
                            { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }
                        ]}
                    >
                        <Clock size={24} color="#2563eb" />
                        <Text style={styles.metricValue}>5:42 PM</Text>
                        <Text style={[styles.metricLabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>Peak Entry Time</Text>
                    </MotiView>

                    <MotiView
                        from={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        delay={100}
                        style={[
                            styles.metricCard,
                            { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }
                        ]}
                    >
                        <Users size={24} color="#3b82f6" />
                        <Text style={[styles.metricValue, { color: '#3b82f6' }]}>128</Text>
                        <Text style={[styles.metricLabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>Daily Visitors</Text>
                    </MotiView>
                </View>

                {/* Weekly Traffic Line Chart */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    delay={200}
                    style={[
                        styles.chartCard,
                        { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }
                    ]}
                >
                    <View style={styles.chartHeader}>
                        <Text style={[styles.chartTitle, { color: isDark ? '#ffffff' : '#0f172a' }]}>Weekly Traffic</Text>
                        <TrendingUp size={20} color="#10b981" />
                    </View>

                    <LineChart
                        data={{
                            labels: ["S", "M", "T", "W", "T", "F", "S"],
                            datasets: [
                                {
                                    data: [40, 60, 45, 90, 65, 80, 55],
                                    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, // primary blue
                                    strokeWidth: 3
                                }
                            ]
                        }}
                        width={width - 80} // Card padding compensation
                        height={180}
                        yAxisLabel=""
                        yAxisSuffix=""
                        chartConfig={{
                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                            backgroundGradientFrom: isDark ? '#1e293b' : '#ffffff',
                            backgroundGradientTo: isDark ? '#1e293b' : '#ffffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(15, 23, 42, ${opacity})`,
                            labelColor: (opacity = 1) => isDark ? `rgba(148, 163, 184, ${opacity})` : `rgba(100, 116, 139, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "4",
                                strokeWidth: "2",
                                stroke: "#2563eb"
                            },
                            propsForBackgroundLines: {
                                strokeDasharray: '', // solid lines
                                stroke: isDark ? '#334155' : '#e2e8f0',
                                strokeWidth: 1
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            paddingRight: 40 // Fix for right label cut-off
                        }}
                        withVerticalLines={false}
                    />
                </MotiView>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 32,
    },
    sectionLabel: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 4,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    metricCard: {
        width: '48%',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
    },
    metricValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#2563eb',
        marginTop: 12,
        marginBottom: 4,
    },
    metricLabel: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    chartCard: {
        padding: 20,
        borderRadius: 32,
        borderWidth: 1,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
