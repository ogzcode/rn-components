import React, { FC } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Avatar } from '../../ui/Avatar';

const ExampleRow: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <View className="flex-row items-center space-x-3 my-2">
    <Text className="w-36 text-sm text-gray-700 dark:text-gray-200">{label}</Text>
    {children}
  </View>
);

export const AvatarScreen: FC = () => {
  return (
    <ScrollView className="flex-1 p-4 bg-white dark:bg-black">
      <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Avatar Examples</Text>

      <Text className="text-lg font-semibold mt-2 mb-2 text-gray-800 dark:text-gray-200">Image / Fallback</Text>
      <ExampleRow label="With image">
        <Avatar imageURI="https://picsum.photos/200" alt="User" />
      </ExampleRow>
      <ExampleRow label="No image (fallback)">
        <Avatar alt="Jane Doe" />
      </ExampleRow>

      <Text className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Custom colors</Text>
      <ExampleRow label="Tailwind bg">
        <Avatar alt="Tom" fallbackColor="bg-indigo-400" />
      </ExampleRow>
      <ExampleRow label="Hex bg">
        <Avatar alt="AI" fallbackColor="#fde68a" />
      </ExampleRow>

      <Text className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Sizes</Text>
      <ExampleRow label="Small">
        <Avatar alt="S" size={32} />
      </ExampleRow>
      <ExampleRow label="Large">
        <Avatar alt="LG" size={72} />
      </ExampleRow>

      <Text className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Extra</Text>
      <ExampleRow label="With className">
        <Avatar alt="CL" className="shadow" />
      </ExampleRow>
      <View className="h-8" />
    </ScrollView>
  );
};

export default AvatarScreen;
