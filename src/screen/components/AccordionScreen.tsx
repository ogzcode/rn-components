import React, { FC } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Accordion } from '../../ui/Accordion';

const sampleItems = [
  { value: 'item-1', label: 'What is React Native?', content: 'React Native is a framework for building native apps using React.' },
  { value: 'item-2', label: 'How to style?', content: 'You can use nativewind (tailwind) classes or inline styles.' },
  { value: 'item-3', label: 'Animations', content: 'This Accordion uses react-native-reanimated for enter/exit animations.' },
];

export const AccordionScreen: FC = () => {
  return (
    <ScrollView className="flex-1 p-4 bg-white dark:bg-black">
      <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Accordion Examples</Text>

      <Text className="text-lg font-semibold mt-2 mb-2 text-gray-800 dark:text-gray-200">Multiple (default)</Text>
      <Accordion items={sampleItems} />

      <Text className="text-lg font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">Single (only one open)</Text>
      <Accordion items={sampleItems} type="single" />

      <View className="h-8" />
    </ScrollView>
  );
};

export default AccordionScreen;
