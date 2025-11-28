import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import SelectComponent from '../../ui/Select'
import Button from '../../ui/Button'
import { useTheme } from '../../theme/ThemeProvider'

const SelectScreen: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [selectedFruit, setSelectedFruit] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const fruitOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Mango', value: 'mango' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Apple', value: 'apple1' },
    { label: 'Banana', value: 'banana1' },
    { label: 'Orange', value: 'orange1' },
    { label: 'Mango', value: 'mango1' },
    { label: 'Strawberry', value: 'strawberry1' },
    { label: 'Apple', value: 'apple2' },
    { label: 'Banana', value: 'banana2' },
    { label: 'Orange', value: 'orange2' },
    { label: 'Mango', value: 'mango2' },
    { label: 'Strawberry', value: 'strawberry2' },
  ]

  const countryOptions = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
  ]

  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
  ]

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text className="text-lg font-semibold mb-3 dark:text-white">Select Component — Theme: {theme}</Text>

      <View className="flex-row space-x-2 mb-6">
        <Button label="Light" variant="primary" onPress={() => setTheme('light')} />
        <Button label="Dark" variant="primary" onPress={() => setTheme('dark')} />
      </View>

      <View className="space-y-6">
        <View>
          <SelectComponent
            label="Select a Fruit"
            options={fruitOptions}
            selectedValue={selectedFruit}
            onValueChange={setSelectedFruit}
            placeholder="Choose a fruit..."
          />
          {selectedFruit && (
            <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected: {fruitOptions.find(f => f.value === selectedFruit)?.label}
            </Text>
          )}
        </View>

        <View>
          <SelectComponent
            label="Select a Country"
            options={countryOptions}
            selectedValue={selectedCountry}
            onValueChange={setSelectedCountry}
            placeholder="Choose a country..."
          />
          {selectedCountry && (
            <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected: {countryOptions.find(c => c.value === selectedCountry)?.label}
            </Text>
          )}
        </View>

        <View>
          <SelectComponent
            label="Select a Color"
            options={colorOptions}
            selectedValue={selectedColor}
            onValueChange={setSelectedColor}
            placeholder="Choose a color..."
          />
          {selectedColor && (
            <Text className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected: {colorOptions.find(c => c.value === selectedColor)?.label}
            </Text>
          )}
        </View>

        <View className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
          <Text className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">Current Selections:</Text>
          <Text className="text-sm text-blue-800 dark:text-blue-300">Fruit: {selectedFruit || 'None'}</Text>
          <Text className="text-sm text-blue-800 dark:text-blue-300">Country: {selectedCountry || 'None'}</Text>
          <Text className="text-sm text-blue-800 dark:text-blue-300">Color: {selectedColor || 'None'}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default SelectScreen
