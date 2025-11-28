import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import Checkbox from '../../ui/Checkbox'
import Button from '../../ui/Button'
import { useTheme } from '../../theme/ThemeProvider'

const CheckboxScreen: React.FC = () => {
    const { theme, setTheme } = useTheme()

    const [checkedA, setCheckedA] = useState(false)
    const [checkedB, setCheckedB] = useState(true)
    const [checkedDisabled, setCheckedDisabled] = useState(false)

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text className="text-lg font-semibold mb-3 dark:text-white">Checkboxes — Theme: {theme}</Text>

            <View className="flex-row space-x-2 mb-4">
                <Button label="Light" variant="primary" onPress={() => setTheme('light')} />
                <Button label="Dark" variant="primary" onPress={() => setTheme('dark')} />
            </View>

            <Text className="text-md font-medium mb-2 dark:text-white">Basic</Text>
            <View className="flex-row items-center space-x-3 mb-4">
                <Checkbox checked={checkedA} onChange={setCheckedA} />
                <Text className="dark:text-white">Unchecked</Text>
            </View>

            <View className="flex-row items-center space-x-3 mb-4">
                <Checkbox checked={checkedB} onChange={setCheckedB} />
                <Text className="dark:text-white">Checked</Text>
            </View>

            <Text className="text-md font-medium mb-2 dark:text-white">Severities</Text>
            <View className="space-y-2 mb-4">
                <View className="flex-row items-center space-x-3">
                    <Checkbox checked={false} onChange={() => {}} severity="info" />
                    <Text className="dark:text-white">Info</Text>
                </View>
                <View className="flex-row items-center space-x-3">
                    <Checkbox checked={true} onChange={() => {}} severity="success" />
                    <Text className="dark:text-white">Success</Text>
                </View>
                <View className="flex-row items-center space-x-3">
                    <Checkbox checked={false} onChange={() => {}} severity="warning" />
                    <Text className="dark:text-white">Warning</Text>
                </View>
                <View className="flex-row items-center space-x-3">
                    <Checkbox checked={true} onChange={() => {}} severity="error" />
                    <Text className="dark:text-white">Error</Text>
                </View>
            </View>

            <Text className="text-md font-medium mb-2 dark:text-white">Disabled</Text>
            <View className="flex-row items-center space-x-3 mb-6">
                <Checkbox checked={checkedDisabled} onChange={setCheckedDisabled} disabled />
                <Text className="dark:text-white">Disabled (unchangeable)</Text>
            </View>
        </ScrollView>
    )
}

export default CheckboxScreen
