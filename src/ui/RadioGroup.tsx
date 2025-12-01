import React, { useEffect, useRef } from 'react';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { Text, Pressable, View, Animated, useColorScheme } from 'react-native';

interface RadioGroupProps {
  options: { label: string; value: string }[]; // Radyo seçenekleri
  value: string; // Seçili değer
  onValueChange: (value: string) => void; // Değer değişiklik işleyicisi
  direction?: 'row' | 'column'; // layout yönü, opsiyonel
  variant?: 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'gray';
}

const VARIANT_COLOR: Record<NonNullable<RadioGroupProps['variant']>, string> = {
  blue: 'bg-blue-600 dark:bg-blue-400',
  green: 'bg-green-600 dark:bg-green-400',
  red: 'bg-red-600 dark:bg-red-400',
  purple: 'bg-purple-600 dark:bg-purple-400',
  amber: 'bg-amber-500 dark:bg-amber-400',
  gray: 'bg-gray-700 dark:bg-gray-400',
};

// Hex colors used by Animated indicator fallback
const VARIANT_COLOR_HEX: Record<NonNullable<RadioGroupProps['variant']>, { light: string; dark: string }> = {
  blue: { light: '#2563EB', dark: '#60A5FA' },
  green: { light: '#16A34A', dark: '#4ADE80' },
  red: { light: '#DC2626', dark: '#FB7185' },
  purple: { light: '#7C3AED', dark: '#A78BFA' },
  amber: { light: '#D97706', dark: '#FBBF24' },
  gray: { light: '#374151', dark: '#9CA3AF' },
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onValueChange,
  direction = 'column',
  variant = 'blue',
}) => {
  const isDark = useColorScheme() === 'dark';
  const rootClasses = `p-4 rounded-md ${direction === 'row' ? 'flex-row items-center' : 'flex-col items-start'} bg-gray-50 dark:bg-gray-900 ${direction === 'row' ? 'space-x-4' : ''} shadow-md dark:shadow-none`;

  const scalesRef = useRef<Record<string, any>>({});

  // Ensure scales exist for each option
  options.forEach((opt) => {
    if (!scalesRef.current[opt.value]) {
      scalesRef.current[opt.value] = new Animated.Value(value === opt.value ? 1 : 0.85);
    }
  });

  useEffect(() => {
    options.forEach((opt) => {
      const selected = value === opt.value;
      Animated.spring(scalesRef.current[opt.value], { toValue: selected ? 1 : 0.85, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
    });
  }, [value, options]);

  return (
    <RadioGroupPrimitive.Root value={value} onValueChange={onValueChange}>
      <View accessibilityRole="radiogroup" className={rootClasses}>
        {options.map((option) => {
          const selected = value === option.value;
          const scale = scalesRef.current[option.value];
          // scale handled by outer ref object
          return (
            <Pressable
              key={option.value}
              onPress={() => onValueChange(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              className={direction === 'row' ? 'flex-row items-center mr-6' : 'flex-row items-center my-2'}
            >
              <RadioGroupPrimitive.Item
                value={option.value}
                className={`w-6 h-6 rounded-full border-2 ${selected ? `border-${variant}-600 dark:border-${variant}-400` : 'border-gray-300 dark:border-gray-600'} justify-center items-center mr-3`}
              >
                <RadioGroupPrimitive.Indicator>
                  <Animated.View
                    style={{
                      transform: [{ scale }],
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: selected
                        ? VARIANT_COLOR_HEX[variant][isDark ? 'dark' : 'light']
                        : 'transparent',
                    }}
                  />
                </RadioGroupPrimitive.Indicator>
              </RadioGroupPrimitive.Item>

              <Text className="text-base text-gray-800 dark:text-gray-100 font-medium">{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </RadioGroupPrimitive.Root>
  );
};

export default RadioGroup;
