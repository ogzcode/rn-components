import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import RadioGroup from '../../ui/RadioGroup';

const OPTIONS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export default function RadioScreen() {
  const [verticalValue, setVerticalValue] = useState('a');
  const [horizontalValue, setHorizontalValue] = useState('b');
  const [greenValue, setGreenValue] = useState('a');
  const [redValue, setRedValue] = useState('b');
  const [purpleValue, setPurpleValue] = useState('c');

  return (
    <ScrollView className="flex-1 p-4 bg-white dark:bg-black">
      <Text className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Radio Examples</Text>

      <Text className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Default (Vertical)</Text>
      <RadioGroup options={OPTIONS} value={verticalValue} onValueChange={setVerticalValue} />
      <Text className="mt-2 text-sm text-gray-700 dark:text-gray-300">Selected: {verticalValue}</Text>

      <Text className="text-lg font-medium mt-6 mb-2 text-gray-800 dark:text-gray-200">Horizontal</Text>
      <RadioGroup options={OPTIONS} value={horizontalValue} onValueChange={setHorizontalValue} direction="row" />
      <Text className="mt-2 text-sm text-gray-700 dark:text-gray-300">Selected: {horizontalValue}</Text>

      <Text className="text-lg font-medium mt-6 mb-2 text-gray-800 dark:text-gray-200">Variant: Green</Text>
      <RadioGroup options={OPTIONS} value={greenValue} onValueChange={setGreenValue} variant="green" />
      <Text className="mt-2 text-sm text-gray-700 dark:text-gray-300">Selected: {greenValue}</Text>

      <Text className="text-lg font-medium mt-6 mb-2 text-gray-800 dark:text-gray-200">Variant: Red (Horizontal)</Text>
      <RadioGroup options={OPTIONS} value={redValue} onValueChange={setRedValue} variant="red" direction="row" />
      <Text className="mt-2 text-sm text-gray-700 dark:text-gray-300">Selected: {redValue}</Text>

      <Text className="text-lg font-medium mt-6 mb-2 text-gray-800 dark:text-gray-200">Variant: Purple</Text>
      <RadioGroup options={OPTIONS} value={purpleValue} onValueChange={setPurpleValue} variant="purple" />
      <Text className="mt-2 text-sm text-gray-700 dark:text-gray-300">Selected: {purpleValue}</Text>

      <Text className="text-lg font-medium mt-6 mb-2 text-gray-800 dark:text-gray-200">Dark Mode</Text>
      <Text className="text-sm text-gray-600 dark:text-gray-400">
        The component adapts to the system color scheme using React Native's `useColorScheme`.
        In Expo, toggle system dark mode to preview the dark styles.
      </Text>
    </ScrollView>
  );
}
