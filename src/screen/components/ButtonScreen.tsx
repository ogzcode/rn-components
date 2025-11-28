import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import Button from '../../ui/Button'
import { useTheme } from '../../theme/ThemeProvider'

const ButtonScreen: React.FC = () => {
    const { theme, setTheme } = useTheme()

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text className="text-lg font-semibold mb-3 dark:text-white">Buttons — Theme: {theme}</Text>

            <View className="flex-row space-x-2 mb-4">
                <Button label="Light" variant="primary" onPress={() => setTheme('light')} />
                <Button label="Dark" variant="primary" onPress={() => setTheme('dark')} />
            </View>

            <Text className="text-md font-medium mb-2 dark:text-white">Outline</Text>
            <View className="space-y-2 mb-4">
                <Button label="Default" />
                <Button label="Primary" variant="primary" />
                <Button label="Success" variant="success" />
                <Button label="Danger" variant="danger" />
                <Button label="Warning" variant="warning" />
            </View>

            <Text className="text-md font-medium mb-2 dark:text-white">Solid</Text>
            <View className="space-y-2 mb-4">
                <Button label="Default" outline={false} />
                <Button label="Primary" variant="primary" outline={false} />
                <Button label="Success" variant="success" outline={false} />
                <Button label="Danger" variant="danger" outline={false} />
                <Button label="Warning" variant="warning" outline={false} />
            </View>
        </ScrollView>
    )
}

export default ButtonScreen
