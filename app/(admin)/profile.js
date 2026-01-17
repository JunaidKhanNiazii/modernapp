import { useRouter } from 'expo-router';
import { AppWindow, Bell, Camera, ChevronRight, Edit2, Lock, LogOut, Mail, Moon, Save, Sun, User } from 'lucide-react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function AdminProfile() {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    const isDark = theme === 'dark';

    // State for Personal Info
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Admin User',
        email: 'admin@fitzone.com',
        password: '',
        imageUrl: 'https://i.pravatar.cc/150?img=68' // Different default image for admin
    });

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsEditing(false);
            Alert.alert("Success", "Admin profile updated successfully!");
        }, 1500);
    };

    const AdminOption = ({ icon: Icon, title, value, onPress, isSwitch, switchValue, onSwitchToggle }) => (
        <TouchableOpacity
            onPress={onPress}
            disabled={isSwitch}
            activeOpacity={0.7}
            style={[
                styles.optionCard,
                { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }
            ]}
        >
            <View style={styles.iconBox}>
                <Icon size={20} color="#2563eb" />
            </View>
            <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: isDark ? '#ffffff' : '#0f172a' }]}>{title}</Text>
                {value && <Text style={[styles.optionValue, { color: isDark ? '#94a3b8' : '#64748b' }]}>{value}</Text>}
            </View>
            {isSwitch ? (
                <Switch
                    value={switchValue}
                    onValueChange={onSwitchToggle}
                    trackColor={{ false: '#334155', true: '#2563eb' }}
                    thumbColor="#ffffff"
                />
            ) : (
                <ChevronRight size={20} color={isDark ? '#475569' : '#cbd5e1'} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: isDark ? '#020617' : '#f8fafc' }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Header */}
                <MotiView
                    from={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={styles.header}
                >
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: formData.imageUrl }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editBadge} onPress={() => setIsEditing(!isEditing)}>
                            <Edit2 size={12} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.name, { color: isDark ? '#ffffff' : '#0f172a' }]}>{formData.name}</Text>
                    <Text style={styles.role}>FITZONE Gym Manager</Text>
                </MotiView>

                {/* Editable Personal Info Section */}
                <AnimatePresence>
                    {isEditing && (
                        <MotiView
                            from={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={[styles.editForm, { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#e2e8f0' }]}
                        >
                            <Text style={[styles.sectionTitle, { color: isDark ? '#94a3b8' : '#64748b', marginBottom: 16 }]}>EDIT ADMIN FILE</Text>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: isDark ? '#cbd5e1' : '#475569' }]}>Full Name</Text>
                                <View style={[styles.inputContainer, { backgroundColor: isDark ? '#0f172a' : '#f1f5f9' }]}>
                                    <User size={16} color={isDark ? '#64748b' : '#94a3b8'} />
                                    <TextInput
                                        value={formData.name}
                                        onChangeText={(t) => setFormData({ ...formData, name: t })}
                                        style={[styles.input, { color: isDark ? '#ffffff' : '#0f172a' }]}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: isDark ? '#cbd5e1' : '#475569' }]}>Email Address</Text>
                                <View style={[styles.inputContainer, { backgroundColor: isDark ? '#0f172a' : '#f1f5f9' }]}>
                                    <Mail size={16} color={isDark ? '#64748b' : '#94a3b8'} />
                                    <TextInput
                                        value={formData.email}
                                        onChangeText={(t) => setFormData({ ...formData, email: t })}
                                        style={[styles.input, { color: isDark ? '#ffffff' : '#0f172a' }]}
                                        keyboardType="email-address"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: isDark ? '#cbd5e1' : '#475569' }]}>New Password</Text>
                                <View style={[styles.inputContainer, { backgroundColor: isDark ? '#0f172a' : '#f1f5f9' }]}>
                                    <Lock size={16} color={isDark ? '#64748b' : '#94a3b8'} />
                                    <TextInput
                                        value={formData.password}
                                        onChangeText={(t) => setFormData({ ...formData, password: t })}
                                        placeholder="Leave blank to keep current"
                                        placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
                                        secureTextEntry
                                        style={[styles.input, { color: isDark ? '#ffffff' : '#0f172a' }]}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: isDark ? '#cbd5e1' : '#475569' }]}>Profile Picture URL</Text>
                                <View style={[styles.inputContainer, { backgroundColor: isDark ? '#0f172a' : '#f1f5f9' }]}>
                                    <Camera size={16} color={isDark ? '#64748b' : '#94a3b8'} />
                                    <TextInput
                                        value={formData.imageUrl}
                                        onChangeText={(t) => setFormData({ ...formData, imageUrl: t })}
                                        style={[styles.input, { color: isDark ? '#ffffff' : '#0f172a' }]}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleSave}
                                disabled={isLoading}
                                style={styles.saveButton}
                            >
                                {isLoading ? <ActivityIndicator color="#fff" /> : (
                                    <>
                                        <Text style={styles.saveButtonText}>Save Changes</Text>
                                        <Save size={16} color="#fff" />
                                    </>
                                )}
                            </TouchableOpacity>
                        </MotiView>
                    )}
                </AnimatePresence>

                <Text style={[styles.sectionTitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>Gym Configuration</Text>

                <AdminOption
                    icon={AppWindow}
                    title="Gym Details"
                    value="FITZONE Pro Center • Lahore"
                />

                <AdminOption
                    icon={Bell}
                    title="System Notifications"
                    value="Configure alert sensitivity"
                />

                <Text style={[styles.sectionTitle, { color: isDark ? '#94a3b8' : '#64748b', marginTop: 24 }]}>App Settings</Text>

                <AdminOption
                    icon={theme === 'dark' ? Moon : Sun}
                    title="Dark Mode"
                    value="Switch application theme"
                    isSwitch={true}
                    switchValue={theme === 'dark'}
                    onSwitchToggle={toggleTheme}
                />

                <TouchableOpacity
                    onPress={() => router.replace('/')}
                    style={styles.logoutButton}
                >
                    <View style={styles.logoutIcon}>
                        <LogOut size={20} color="#f43f5e" />
                    </View>
                    <Text style={styles.logoutText}>Exit Admin Portal</Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#2563eb',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#2563eb',
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#020617',
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 4,
    },
    role: {
        color: '#2563eb',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 12,
        marginLeft: 4,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 20,
        borderWidth: 1,
    },
    iconBox: {
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        padding: 10,
        borderRadius: 14,
        marginRight: 16,
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 2,
    },
    optionValue: {
        fontSize: 12,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 32,
        borderRadius: 20,
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(244, 63, 94, 0.2)',
        marginBottom: 20,
    },
    logoutIcon: {
        backgroundColor: '#f43f5e',
        padding: 8,
        borderRadius: 12,
        marginRight: 16,
    },
    logoutText: {
        color: '#f43f5e',
        fontWeight: '800',
        fontSize: 16,
    },
    editForm: {
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 50,
        borderRadius: 14,
        gap: 12,
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: '#2563eb',
        height: 50,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        gap: 8,
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    saveButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 15,
    },
});
