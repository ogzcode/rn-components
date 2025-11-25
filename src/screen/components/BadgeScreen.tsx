
import React, { FC } from "react";
import { ScrollView, View, Text } from "react-native";
import Badge from "../../ui/Badge";

const ExampleRow: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <View className="flex-row items-center space-x-3 my-2">
        <Text className="w-36 text-sm text-gray-700 dark:text-gray-200">{label}</Text>
        {children}
    </View>
);

export const BadgeScreen: FC = () => {
    return (
        <ScrollView className="flex-1 p-4 bg-white dark:bg-black">
            <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Badge Examples</Text>

            <Text className="text-lg font-semibold mt-2 mb-2 text-gray-800 dark:text-gray-200">Filled variants</Text>
            <ExampleRow label="Default"><Badge label="New" /></ExampleRow>
            <ExampleRow label="Info"><Badge label="Info" variant="info" /></ExampleRow>
            <ExampleRow label="Success"><Badge label="OK" variant="success" /></ExampleRow>
            <ExampleRow label="Danger"><Badge label="99+" variant="danger" /></ExampleRow>
            <ExampleRow label="Warning"><Badge label="!" variant="warning" /></ExampleRow>

            <Text className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Outline variants</Text>
            <ExampleRow label="Default"><Badge label="New" outline /></ExampleRow>
            <ExampleRow label="Info"><Badge label="Info" variant="info" outline /></ExampleRow>
            <ExampleRow label="Success"><Badge label="OK" variant="success" outline /></ExampleRow>
            <ExampleRow label="Danger"><Badge label="99+" variant="danger" outline /></ExampleRow>
            <ExampleRow label="Warning"><Badge label="!" variant="warning" outline /></ExampleRow>

            <Text className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Using children (icon / custom content)</Text>
            <ExampleRow label="Emoji"><Badge><Text className="text-base">🔥</Text></Badge></ExampleRow>
            <ExampleRow label="Badge + child text"><Badge><Text className="text-xs text-white dark:text-white">A</Text></Badge></ExampleRow>

            <Text className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Customization</Text>
            <ExampleRow label="Small"><Badge label="1" className="px-1 py-0" /></ExampleRow>
            <ExampleRow label="Custom class"><Badge label="New" className="text-sm" /></ExampleRow>
            <ExampleRow label="Custom style"><Badge label="Styled" style={{ transform: [{ scale: 1.1 }] }} /></ExampleRow>

            <View className="h-8" />
        </ScrollView>
    );
};

export default BadgeScreen;
