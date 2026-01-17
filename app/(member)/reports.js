import { BarChart2, Calendar, ChevronDown, ChevronUp, Clock, Dumbbell, TrendingUp } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

// Mock Data for filters
const reportsData = {
    Daily: [
        {
            category: 'Today',
            exercises: [
                { name: 'Shoulder Press', time: '12m', reps: 40, count: 4 },
                { name: 'Lateral Raises', time: '8m', reps: 39, count: 3 },
            ],
        }
    ],
    Weekly: [
        {
            category: 'Shoulder',
            exercises: [
                { name: 'Shoulder Press', time: '45m', reps: 162, count: 15 },
                { name: 'Lateral Raises', time: '32m', reps: 188, count: 12 },
            ],
        },
        {
            category: 'Back',
            exercises: [
                { name: 'Lat Pulldown', time: '55m', reps: 210, count: 14 },
            ],
        },
    ],
    Monthly: [
        {
            category: 'Overall',
            exercises: [
                { name: 'Shoulder Press', time: '3h 10m', reps: 650, count: 58 },
                { name: 'Lat Pulldown', time: '4h 05m', reps: 895, count: 72 },
                { name: 'Squat', time: '5h 30m', reps: 450, count: 42 },
            ]
        }
    ]
};

export default function MemberReports() {
    const { theme } = useTheme();
    const [expanded, setExpanded] = useState(null);
    const [timeFilter, setTimeFilter] = useState('Weekly');

    const activeReports = reportsData[timeFilter] || [];
    const isDark = theme === 'dark';

    const toggleExpand = (category) => {
        setExpanded(expanded === category ? null : category);
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: isDark ? '#020617' : '#f8fafc' }]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>ANALYTICS</Text>
                    <Text style={[styles.title, { color: isDark ? '#ffffff' : '#0f172a' }]}>{timeFilter} Report</Text>
                </View>

                {/* Filter Tabs */}
                <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1e293b' : '#ffffff' }]}>
                    {['Daily', 'Weekly', 'Monthly'].map((filter) => {
                        const isActive = timeFilter === filter;
                        return (
                            <Pressable
                                key={filter}
                                onPress={() => setTimeFilter(filter)}
                                style={[
                                    styles.filterButton,
                                    isActive && { backgroundColor: isDark ? '#0f172a' : '#eff6ff' }
                                ]}
                            >
                                <Text style={[
                                    styles.filterText,
                                    { color: isActive ? '#2563eb' : (isDark ? '#94a3b8' : '#64748b') }
                                ]}>
                                    {filter}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                {/* LINE CHART FOR WEEKLY REPORT */}
                {timeFilter === 'Weekly' && (
                    <MotiView
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={[styles.chartCard, {
                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                            borderColor: isDark ? '#334155' : '#e2e8f0'
                        }]}
                    >
                        <View style={styles.chartHeader}>
                            <Text style={[styles.chartTitle, { color: isDark ? '#ffffff' : '#0f172a' }]}>Weekly Growth</Text>
                            <TrendingUp size={20} color="#10b981" />
                        </View>

                        <LineChart
                            data={{
                                labels: ["M", "T", "W", "T", "F", "S", "S"],
                                datasets: [
                                    {
                                        data: [45, 70, 30, 90, 60, 85, 50],
                                        color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, // primary blue
                                        strokeWidth: 3
                                    }
                                ]
                            }}
                            width={width - 80} // Card padding compensation
                            height={180}
                            yAxisLabel=""
                            yAxisSuffix="%"
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
                )}

                {/* Report Categories List */}
                {activeReports.map((report, index) => {
                    const isExpanded = expanded === report.category || timeFilter === 'Daily';

                    return (
                        <View
                            key={`${timeFilter}-${report.category}-${index}`}
                            style={[styles.categoryCard, {
                                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                                borderColor: isDark ? '#334155' : '#e2e8f0'
                            }]}
                        >
                            <Pressable
                                onPress={() => toggleExpand(report.category)}
                                style={styles.categoryHeader}
                            >
                                <View style={styles.categoryHeaderLeft}>
                                    <View style={styles.iconContainer}>
                                        <Calendar size={18} color="#2563eb" />
                                    </View>
                                    <Text style={[styles.categoryTitle, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                                        {report.category}
                                    </Text>
                                </View>
                                {isExpanded ?
                                    <ChevronUp size={20} color={isDark ? '#94a3b8' : '#64748b'} /> :
                                    <ChevronDown size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                                }
                            </Pressable>

                            {isExpanded && (
                                <View style={styles.exerciseList}>
                                    {report.exercises.map((ex, idx) => (
                                        <View
                                            key={idx}
                                            style={[styles.exerciseCard, { backgroundColor: isDark ? '#0f172a' : '#f8fafc' }]}
                                        >
                                            <Text style={[styles.exerciseName, { color: isDark ? '#ffffff' : '#0f172a' }]}>
                                                {ex.name}
                                            </Text>
                                            <View style={styles.statsRow}>
                                                <StatItem icon={Clock} label="Time" value={ex.time} isDark={isDark} />
                                                <StatItem icon={Dumbbell} label="Reps" value={ex.reps} isDark={isDark} color="#3b82f6" />
                                                <StatItem icon={TrendingUp} label="Count" value={ex.count} isDark={isDark} color="#2563eb" />
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                })}

                {/* Summary Section */}
                <View style={[styles.summaryCard, {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#e2e8f0'
                }]}>
                    <View style={styles.summaryHeader}>
                        <View>
                            <Text style={[styles.summaryTitle, { color: isDark ? '#ffffff' : '#0f172a' }]}>Performance Summary</Text>
                            <Text style={[styles.summarySubtitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>{timeFilter} Overview</Text>
                        </View>
                        <BarChart2 size={24} color="#2563eb" />
                    </View>

                    <View style={styles.summaryBoxes}>
                        <SummaryBox title="Total Reps" value={timeFilter === 'Daily' ? "79" : (timeFilter === 'Weekly' ? "560" : "1995")} isDark={isDark} color="#3b82f6" />
                        <SummaryBox title="Total Sets" value={timeFilter === 'Daily' ? "7" : (timeFilter === 'Weekly' ? "41" : "172")} isDark={isDark} color="#2563eb" />
                        <SummaryBox title="Duration" value={timeFilter === 'Daily' ? "20m" : (timeFilter === 'Weekly' ? "132m" : "12h")} isDark={isDark} />
                    </View>

                    <View style={[styles.insightBanner, { backgroundColor: isDark ? 'rgba(249, 115, 22, 0.1)' : '#fff7ed' }]}>
                        <TrendingUp size={16} color="#f97316" />
                        <Text style={[styles.insightText, { color: '#f97316' }]}>
                            Great progress this {timeFilter.toLowerCase()}! Keep it up! 💪
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const StatItem = ({ icon: Icon, label, value, isDark, color }) => (
    <View style={styles.statItem}>
        <Icon size={14} color={color || (isDark ? '#94a3b8' : '#64748b')} />
        <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>{label}</Text>
        <Text style={[styles.statValue, { color: color || (isDark ? '#ffffff' : '#0f172a') }]}>{value}</Text>
    </View>
);

const SummaryBox = ({ title, value, isDark, color }) => (
    <View style={[styles.summaryBox, { backgroundColor: isDark ? '#0f172a' : '#f8fafc' }]}>
        <Text style={[styles.summaryBoxTitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>{title}</Text>
        <Text style={[styles.summaryBoxValue, { color: color || (isDark ? '#ffffff' : '#0f172a') }]}>{value}</Text>
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
    },
    header: {
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        padding: 4,
        borderRadius: 16,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 12,
    },
    filterText: {
        fontWeight: '700',
        fontSize: 14,
    },
    chartCard: {
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 24,
        overflow: 'hidden',
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    categoryCard: {
        marginBottom: 16,
        borderRadius: 24,
        borderWidth: 1,
        overflow: 'hidden',
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    categoryHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        padding: 8,
        borderRadius: 999,
        marginRight: 12,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    exerciseList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    exerciseCard: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 10,
        marginTop: 4,
    },
    statValue: {
        fontSize: 13,
        fontWeight: '700',
        marginTop: 2,
    },
    summaryCard: {
        padding: 24,
        borderRadius: 32,
        borderWidth: 1,
        marginBottom: 40,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    summarySubtitle: {
        fontSize: 12,
        marginTop: 2,
    },
    summaryBoxes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    summaryBox: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginHorizontal: 4,
    },
    summaryBoxTitle: {
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 6,
    },
    summaryBoxValue: {
        fontSize: 18,
        fontWeight: '900',
    },
    insightBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    insightText: {
        fontSize: 12,
        fontWeight: '700',
        flex: 1,
    },
});
