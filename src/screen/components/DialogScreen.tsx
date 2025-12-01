import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import Dialog from '../../ui/Dialog'
import { useTheme } from '../../theme/ThemeProvider'

const DialogScreen: React.FC = () => {
  const { theme, isDark, setTheme } = useTheme()
  const [name, setName] = useState('')
  const [savedName, setSavedName] = useState<string | null>(null)

  return (
    <View className={`flex-1 p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="flex-row justify-between items-center mb-6">
        <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>Dialog Examples</Text>
        <Text
          onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-sm text-blue-500"
        >
          Toggle {isDark ? 'Light' : 'Dark'}
        </Text>
      </View>

      <View className="mb-6">
        <Text className={`${isDark ? 'text-gray-100' : 'text-gray-700'} mb-2`}>1) Simple dialog</Text>
        <Dialog title="Hello" description="This is a simple dialog." triggerLabel="Open Simple" onSubmit={() => {}}>
          <Text className={`${isDark ? 'text-gray-200' : 'text-gray-600'}`}>Just a short message inside the dialog.</Text>
        </Dialog>
      </View>

      <View className="mb-6">
        <Text className={`${isDark ? 'text-gray-100' : 'text-gray-700'} mb-2`}>2) Dialog with form</Text>
        <Dialog
          title="Enter your name"
          description="Type a name and press Submit."
          triggerLabel="Open Form"
          onSubmit={() => setSavedName(name)}
        >
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
            className={`border ${isDark ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-200 bg-white text-gray-900'} rounded-md px-3 py-2`}
          />
        </Dialog>

        {savedName ? (
          <Text className={`${isDark ? 'text-gray-200' : 'text-gray-700'} mt-3`}>Saved name: {savedName}</Text>
        ) : null}
      </View>

      <View className="mb-6">
        <Text className={`${isDark ? 'text-gray-100' : 'text-gray-700'} mb-2`}>Notes</Text>
        <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          The dialog uses nativewind `className` styles and reads the app theme via the project ThemeProvider. Toggle theme to see dark/light variants.
        </Text>
      </View>
    </View>
  )
}

export default DialogScreen
