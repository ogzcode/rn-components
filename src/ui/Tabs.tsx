import { View, Text, TouchableOpacity } from 'react-native';
import { createContext, useContext } from 'react';

type Tab = {
  label: string;
  value: string ;
  disabled?: boolean;
};

type TabsProps = {
  tabList?: Tab[];
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
};

type TabsContextType = {
  activeValue: string;
  onChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

export const Tabs = ({ 
    tabList = [], 
    value, 
    onChange = () => {}, 
    children
}: TabsProps) => {
    return (
        <TabsContext.Provider value={{ activeValue: value ?? '', onChange }}>
            <View>
                <View
                    className="h-12 flex-row items-center justify-center p-1.5 border-b border-gray-200 dark:border-gray-700"
                >
                    {tabList.map((tab, index) => (
                        <TabTrigger 
                            key={index} 
                            tab={tab}
                        />
                    ))}
                </View>
                {children}
            </View>
        </TabsContext.Provider>
    )
}

const TabTrigger = ({ tab }: { tab: Tab }) => {
    const { activeValue, onChange } = useTabsContext();
    const isActive = activeValue === tab.value;

    const getTabClassName = () => {
        const baseClasses = 'flex-1 items-center justify-center px-3 py-1.5';
        return `${baseClasses} ${isActive ? 'border-b-2 border-blue-500 dark:border-blue-400' : ''}`;
    };

    const getTextClassName = () => {
        return `text-base font-medium ${
            isActive 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400'
        }`;
    };

    return (
        <TouchableOpacity 
            onPress={() => onChange(tab.value)}
            disabled={tab?.disabled}
            className={getTabClassName()}
        >
            <Text className={getTextClassName()}>
                {tab.label}
            </Text>
        </TouchableOpacity>
    )
}

export const TabContent = ({ value, children }: { value: string; children: React.ReactNode }) => {
    const { activeValue } = useTabsContext();
    
    if (activeValue !== value) {
        return null;
    }
    
    return (
        <View className="mt-4">
            {children}
        </View>
    )
}