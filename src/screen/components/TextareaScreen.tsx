import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Textarea from '../../ui/Textarea';

const TextareaScreen: React.FC = () => {
  const [controlled, setControlled] = useState('This is controlled text');

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} className="bg-white dark:bg-black min-h-screen">
      <Text className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Textarea examples</Text>

      <View className="space-y-6">
        <View>
          <Text className="text-sm text-gray-700 dark:text-gray-300 mb-2">Default</Text>
          <Textarea placeholder="Type something..." style={{}} />
        </View>

        <View>
          <Text className="text-sm text-gray-700 dark:text-gray-300 mb-2">Controlled</Text>
          <Textarea value={controlled} onChangeText={setControlled} numberOfLines={6} style={{}} />
        </View>

        <View>
          <Text className="text-sm text-gray-700 dark:text-gray-300 mb-2">Large (override height)</Text>
          <Textarea placeholder="Larger textarea" style={{ height: 140 }} />
        </View>
      </View>
    </ScrollView>
  );
};

export default TextareaScreen;
