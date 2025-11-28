import * as React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import * as SelectPrimitive from '@rn-primitives/select';
import { Check } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';

type Option = {
  label: string;
  value: string;
};

const SelectComponent = ({
  options,
  selectedValue,
  onValueChange,
  defaultValue,
  placeholder,
  disabled,
  label,
}: {
  options: Option[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}) => {
  const { isDark } = useTheme();

  return (
    <View>
      {label && <Text className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{label}</Text>}
      <SelectPrimitive.Root
        value={selectedValue ? { label: options.find(opt => opt.value === selectedValue)?.label || '', value: selectedValue } : undefined}
        onValueChange={(option) => onValueChange(option?.value || '')}
      >
        <SelectPrimitive.Trigger 
          className="w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-3 bg-white dark:bg-gray-800"
          disabled={disabled}
        >
          <SelectPrimitive.Value
            className="text-base text-gray-900 dark:text-gray-100"
            placeholder={placeholder || 'Select an option'}
          />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Overlay style={StyleSheet.absoluteFill}>
            <SelectPrimitive.Content 
              className="rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
              align="start"
              side="bottom"
              sideOffset={4}
              style={{
                minWidth: '100%',
                maxHeight: 240,
                shadowColor: isDark ? '#000' : '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <ScrollView style={{ maxHeight: 240 }}>
                <SelectPrimitive.Viewport>
                  <SelectPrimitive.Group>
                    {options.map((option) => {
                      if (!option) return null;
                      return (
                      <SelectPrimitive.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 12,
                          paddingVertical: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: isDark ? '#374151' : '#E5E7EB',
                        }}
                      >
                        <Text style={{
                          flex: 1,
                          fontSize: 16,
                          color: isDark ? '#F3F4F6' : '#1F2937',
                        }}>
                          {option.label}
                        </Text>
                        <SelectPrimitive.ItemIndicator style={{
                          width: 16,
                          height: 16,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 8,
                        }}>
                          <Check 
                            size={16} 
                            color={isDark ? '#60A5FA' : '#3B82F6'} 
                          />
                        </SelectPrimitive.ItemIndicator>
                      </SelectPrimitive.Item>
                      );
                    })}
                  </SelectPrimitive.Group>
                </SelectPrimitive.Viewport>
              </ScrollView>
            </SelectPrimitive.Content>
          </SelectPrimitive.Overlay>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </View>
  );
};

export default SelectComponent;
