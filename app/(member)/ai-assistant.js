import { Bot, Send } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function MemberAI() {
    const { theme } = useTheme();
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello Junaid! I noticed your form on the last set of Shoulder Press was slightly tilted to the right. Try to keep your core engaged.', sender: 'ai' },
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, { id: Date.now(), text: inputText, sender: 'user' }]);
        setInputText('');

        // Fake AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "That's a great question! For Lat Pulldowns, focus on pulling your elbows towards your hips rather than just pulling the bar down. This helps isolate the lats.",
                sender: 'ai'
            }]);
        }, 1000);
    };

    return (
        <SafeAreaView edges={['top']} className={`flex-1 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <View className="px-5 pt-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 flex-row items-center">
                <View className="bg-primary/20 p-2 rounded-xl mr-3">
                    <Bot size={24} color="#2563eb" />
                </View>
                <View>
                    <Text className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>AI Fitness Guide</Text>
                    <Text className="text-primary text-xs font-bold uppercase tracking-widest">Active Monitoring</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-5 py-4">
                {messages.map((msg, idx) => (
                    <MotiView
                        key={msg.id}
                        from={{ opacity: 0, translateX: msg.sender === 'ai' ? -20 : 20 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        className={`mb-6 max-w-[85%] ${msg.sender === 'ai' ? 'self-start' : 'self-end'}`}
                    >
                        <View className={`p-4 rounded-[24px] ${msg.sender === 'ai' ? (theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-100') : 'bg-primary'}`}>
                            <Text className={`text-base ${msg.sender === 'ai' ? (theme === 'dark' ? 'text-white' : 'text-zinc-900') : 'text-white font-medium'}`}>
                                {msg.text}
                            </Text>
                        </View>
                        <Text className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'} ${msg.sender === 'ai' ? 'text-left' : 'text-right'}`}>
                            {msg.sender === 'ai' ? 'AI Assistant' : 'You'} • Just now
                        </Text>
                    </MotiView>
                ))}
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                className="p-4 border-t border-zinc-200 dark:border-zinc-800"
            >
                <View className={`flex-row items-center p-2 rounded-2xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white border border-zinc-100'}`}>
                    <TextInput
                        placeholder="Ask about your form or exercises..."
                        placeholderTextColor={theme === 'dark' ? '#71717a' : '#a1a1aa'}
                        className={`flex-1 px-4 text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        className="bg-primary p-3 rounded-xl ml-2"
                    >
                        <Send size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
