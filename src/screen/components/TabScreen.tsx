import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Tabs, TabContent } from '../../ui/Tabs'
import Button from '../../ui/Button'
import { useTheme } from '../../theme/ThemeProvider'

const TabScreen: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [activeTab1, setActiveTab1] = useState('home')
  const [activeTab2, setActiveTab2] = useState('profile')

  const basicTabs = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
  ]

  const profileTabs = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Privacy', value: 'privacy' },
    { label: 'Security', value: 'security' },
  ]

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text className="text-lg font-semibold mb-3 dark:text-white">Tabs Component — Theme: {theme}</Text>

      <View className="flex-row space-x-2 mb-6">
        <Button label="Light" variant="primary" onPress={() => setTheme('light')} />
        <Button label="Dark" variant="primary" onPress={() => setTheme('dark')} />
      </View>

      <View className="space-y-8">
        {/* Default Tabs */}
        <View>
          <Text className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">Default Tabs</Text>
          <Tabs
            tabList={basicTabs}
            value={activeTab1}
            onChange={setActiveTab1}
          >
            <TabContent value="home">
              <View className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
                <Text className="text-blue-900 dark:text-blue-200 font-medium mb-2">Home Content</Text>
                <Text className="text-blue-800 dark:text-blue-300">
                  This is the home tab content. You can add any components here.
                </Text>
              </View>
            </TabContent>
            <TabContent value="about">
              <View className="p-4 bg-green-50 dark:bg-green-950 rounded-md">
                <Text className="text-green-900 dark:text-green-200 font-medium mb-2">About Content</Text>
                <Text className="text-green-800 dark:text-green-300">
                  Learn more about our company and mission.
                </Text>
              </View>
            </TabContent>
            <TabContent value="contact">
              <View className="p-4 bg-purple-50 dark:bg-purple-950 rounded-md">
                <Text className="text-purple-900 dark:text-purple-200 font-medium mb-2">Contact Content</Text>
                <Text className="text-purple-800 dark:text-purple-300">
                  Get in touch with us through various channels.
                </Text>
              </View>
            </TabContent>
          </Tabs>
        </View>

        {/* Underline Tabs */}
        <View>
          <Text className="text-md font-medium mb-3 text-gray-800 dark:text-gray-200">Underline Tabs</Text>
          <Tabs
            tabList={profileTabs}
            value={activeTab2}
            onChange={setActiveTab2}
          >
            <TabContent value="profile">
              <View className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <Text className="text-gray-900 dark:text-gray-100 font-medium mb-2">Profile Information</Text>
                <Text className="text-gray-700 dark:text-gray-300 mb-2">
                  Manage your personal information and preferences.
                </Text>
                <View className="space-y-2">
                  <Text className="text-sm text-gray-600 dark:text-gray-400">• Update profile picture</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">• Change display name</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">• Edit bio information</Text>
                </View>
              </View>
            </TabContent>
            <TabContent value="settings">
              <View className="p-4 bg-orange-50 dark:bg-orange-950 rounded-md">
                <Text className="text-orange-900 dark:text-orange-200 font-medium mb-2">App Settings</Text>
                <Text className="text-orange-800 dark:text-orange-300">
                  Customize your app experience and preferences.
                </Text>
              </View>
            </TabContent>
            <TabContent value="privacy">
              <View className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-md">
                <Text className="text-indigo-900 dark:text-indigo-200 font-medium mb-2">Privacy Settings</Text>
                <Text className="text-indigo-800 dark:text-indigo-300">
                  Control who can see your information and activity.
                </Text>
              </View>
            </TabContent>
            <TabContent value="security">
              <View className="p-4 bg-red-50 dark:bg-red-950 rounded-md">
                <Text className="text-red-900 dark:text-red-200 font-medium mb-2">Security Settings</Text>
                <Text className="text-red-800 dark:text-red-300">
                  Manage your account security and authentication.
                </Text>
              </View>
            </TabContent>
          </Tabs>
        </View>

        {/* Current Selection Summary */}
        <View className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Selections:</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">Default Tabs: {activeTab1}</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">Underline Tabs: {activeTab2}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default TabScreen