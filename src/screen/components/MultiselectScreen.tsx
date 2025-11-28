import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { MultiselectSimple } from '../../ui/Multiselect';
import Button from '../../ui/Button';
import { useTheme } from '../../theme/ThemeProvider';

type Option = {
  label: string;
  value: string;
};

const MultiselectScreen: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [selectedFruits, setSelectedFruits] = useState<Option[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Option[]>([]);
  const [selectedColors, setSelectedColors] = useState<Option[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);

  const fruitOptions: Option[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Mango', value: 'mango' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Grape', value: 'grape' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Watermelon', value: 'watermelon' },
  ];

  const countryOptions: Option[] = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Australia', value: 'au' },
    { label: 'Brazil', value: 'br' },
  ];

  const colorOptions: Option[] = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
    { label: 'Orange', value: 'orange-color' },
    { label: 'Pink', value: 'pink' },
    { label: 'Black', value: 'black' },
  ];

  const skillOptions: Option[] = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'React', value: 'react' },
    { label: 'React Native', value: 'react-native' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'Swift', value: 'swift' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'Flutter', value: 'flutter' },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Basit Multiselect Bileşeni — Tema: {theme}
      </Text>

      <View className="flex-row space-x-2 mb-6">
        <Button label="Açık" variant="primary" onPress={() => setTheme('light')} />
        <Button label="Koyu" variant="primary" onPress={() => setTheme('dark')} />
      </View>

      <View className="space-y-6">
        {/* Basic Multiselect - Basit Kullanım */}
        <View>
          <MultiselectSimple
            label="Meyveler Seçin"
            options={fruitOptions}
            selectedValues={selectedFruits}
            onValuesChange={setSelectedFruits}
            placeholder="Meyve seçin..."
          />
          {selectedFruits.length > 0 && (
            <View className="mt-2">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Seçilen meyveler:
              </Text>
              <View className="flex-row flex-wrap gap-1">
                {selectedFruits.map((fruit) => (
                  <View key={fruit.value} className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                    <Text className="text-xs text-blue-800 dark:text-blue-200">
                      {fruit.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Countries Multiselect */}
        <View>
          <MultiselectSimple
            label="Ülkeler Seçin"
            options={countryOptions}
            selectedValues={selectedCountries}
            onValuesChange={setSelectedCountries}
            placeholder="Ülke seçin..."
          />
          {selectedCountries.length > 0 && (
            <View className="mt-2">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Seçilen ülkeler:
              </Text>
              <View className="flex-row flex-wrap gap-1">
                {selectedCountries.map((country) => (
                  <View key={country.value} className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                    <Text className="text-xs text-green-800 dark:text-green-200">
                      {country.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Colors Multiselect */}
        <View>
          <MultiselectSimple
            label="Renkler Seçin"
            options={colorOptions}
            selectedValues={selectedColors}
            onValuesChange={setSelectedColors}
            placeholder="Renk seçin..."
          />
          {selectedColors.length > 0 && (
            <View className="mt-2">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Seçilen renkler:
              </Text>
              <View className="flex-row flex-wrap gap-1">
                {selectedColors.map((color) => (
                  <View key={color.value} className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                    <Text className="text-xs text-purple-800 dark:text-purple-200">
                      {color.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Skills Multiselect */}
        <View>
          <MultiselectSimple
            label="Programlama Becerileri"
            options={skillOptions}
            selectedValues={selectedSkills}
            onValuesChange={setSelectedSkills}
            placeholder="Becerilerinizi seçin..."
          />
          {selectedSkills.length > 0 && (
            <View className="mt-2">
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Seçilen beceriler:
              </Text>
              <View className="flex-row flex-wrap gap-1">
                {selectedSkills.map((skill) => (
                  <View key={skill.value} className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">
                    <Text className="text-xs text-orange-800 dark:text-orange-200">
                      {skill.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Özet Bölümü */}
        <View className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
          <Text className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
            Seçim Özeti:
          </Text>
          <Text className="text-sm text-blue-800 dark:text-blue-300">
            Meyveler: {selectedFruits.length} seçili
          </Text>
          <Text className="text-sm text-blue-800 dark:text-blue-300">
            Ülkeler: {selectedCountries.length} seçili
          </Text>
          <Text className="text-sm text-blue-800 dark:text-blue-300">
            Renkler: {selectedColors.length} seçili
          </Text>
          <Text className="text-sm text-blue-800 dark:text-blue-300">
            Beceriler: {selectedSkills.length} seçili
          </Text>
        </View>

        {/* Tümünü Temizle Butonu */}
        <View className="mt-4">
          <Button
            label="Tüm Seçimleri Temizle"
            variant="danger"
            outline={true}
            onPress={() => {
              setSelectedFruits([]);
              setSelectedCountries([]);
              setSelectedColors([]);
              setSelectedSkills([]);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MultiselectScreen;