import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { FloatingInput } from '../../ui/FloatingInput';
import Button from '../../ui/Button';
import { useTheme } from '../../theme/ThemeProvider';

const FloatingInputScreen: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Floating Input — Tema: {theme}</Text>

      <View className="flex-row space-x-2 mb-6">
        <Button label="Açık" variant="primary" onPress={() => setTheme('light')} />
        <Button label="Koyu" variant="primary" onPress={() => setTheme('dark')} />
      </View>

      <View className="space-y-4">
        <FloatingInput
          label="İsim"
          value={name}
          onChangeText={setName}
        />

        <FloatingInput
          label="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FloatingInput
          label="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View className="mt-4">
          <Text className="text-sm text-gray-600 dark:text-gray-300">Girilen değerler:</Text>
          <Text className="text-sm text-gray-800 dark:text-gray-200">İsim: {name || '-'}</Text>
          <Text className="text-sm text-gray-800 dark:text-gray-200">E-posta: {email || '-'}</Text>
          <Text className="text-sm text-gray-800 dark:text-gray-200">Şifre: {password ? '●●●●●' : '-'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FloatingInputScreen;
