import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import DropdownMenu from '../../ui/DropdownMenu'
import Button from '../../ui/Button'
import { useTheme } from '../../theme/ThemeProvider'

const DropdownMenuScreen: React.FC = () => {
    const { theme, setTheme } = useTheme()

    const items = [
        { key: 'new', label: 'New File', onPress: () => console.log('New File') },
        { key: 'open', label: 'Open...', onPress: () => console.log('Open') },
        { key: 'sep1', type: 'separator' },
        { key: 'tools', type: 'submenu', label: 'More Tools', items: [
            { key: 'save', label: 'Save Page As...', onPress: () => console.log('Save') },
            { key: 'shortcut', label: 'Create Shortcut...', onPress: () => console.log('Shortcut') },
        ] },
        { key: 'sep3', type: 'separator' },
        { key: 'label-people', type: 'label', label: 'People' },
        { key: 'person-a', label: 'Elmer Fudd' },
        { key: 'person-b', label: 'Foghorn Leghorn' }
    ]

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text className="text-lg font-semibold mb-3 dark:text-white">Dropdown Menu — Theme: {theme}</Text>

            <View className="flex-row space-x-2 mb-4">
                <Button label="Light" variant="primary" onPress={() => setTheme('light')} />
                <Button label="Dark" variant="primary" onPress={() => setTheme('dark')} />
            </View>

            <Text className="text-md font-medium mb-2 dark:text-white">Custom items + custom trigger</Text>
            <View className="mb-6">
                <DropdownMenu
                    trigger={<Button label="Open menu" variant="primary" outline={false} />}
                    items={items as any}
                    contentClassName="min-w-[220px]"
                />
            </View>

            <Text className="text-md font-medium mb-2 dark:text-white">Positioning examples</Text>
            <View className="flex-row space-x-3 mb-4">
                <DropdownMenu trigger={<Button label="Bottom / Start" />} items={items as any} side="bottom" align="start" />
                <DropdownMenu trigger={<Button label="Bottom / End" />} items={items as any} side="bottom" align="end" />
            </View>

            <Text className="text-sm text-gray-500 dark:text-gray-300">Use the `side` and `align` props on `DropdownMenu` to control placement (e.g. `side="bottom" align="start"`). You can also pass `sideOffset` / `alignOffset` numbers to nudge the content.</Text>
        </ScrollView>
    )
}

export default DropdownMenuScreen
