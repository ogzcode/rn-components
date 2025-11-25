import * as AccordionPrimitive from '@rn-primitives/accordion';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeOutUp,
    LinearTransition,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';

type AccordionItemType = {
    label: string;
    value: string;
    content?: string;
};

type AccordionProps = {
    items: AccordionItemType[];
    type?: 'single' | 'multiple';
    className?: string;
};

export const Accordion: React.FC<AccordionProps> = ({ items, type = 'multiple', className }) => {
    return (
        <AccordionPrimitive.Root type={type} collapsible asChild>
            <View className={`w-full ${className ?? ''}`}>
                {items.map(item => (
                    <AccordionItem key={item.value} item={item} />
                ))}
            </View>
        </AccordionPrimitive.Root>
    );
};

const AccordionItem: React.FC<{ item: AccordionItemType }> = ({ item }) => {
    return (
        <Animated.View layout={LinearTransition.duration(200)} className="overflow-hidden mb-4 w-full">
            <AccordionPrimitive.Item value={item.value} asChild>
                <View>
                    <AccordionTrigger label={item.label} />
                    <InnerContent content={item.content} />
                </View>
            </AccordionPrimitive.Item>
        </Animated.View>
    );
};

const AccordionTrigger: React.FC<{ label?: string; children?: React.ReactNode }> = ({ label = '', children = null }) => {
    const { isExpanded } = AccordionPrimitive.useItemContext();

    const progress = useDerivedValue(() => (isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 250 })));

    const chevronStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${progress.value * 180}deg` }],
    }));

    const triggerClasses = isExpanded
        ? 'flex-row justify-between px-4 py-3 w-full bg-gray-200 dark:bg-gray-800 rounded-t-md items-center'
        : 'flex-row justify-between px-4 py-3 w-full bg-gray-100 dark:bg-gray-900 rounded-md items-center';

    return (
        <AccordionPrimitive.Trigger asChild>
            <Pressable>
                <View className={triggerClasses}>
                    {label !== '' && <Text className="text-base font-medium text-gray-800 dark:text-gray-200">{label}</Text>}
                    {children}
                    <Animated.View style={chevronStyle}>
                        <ChevronDown size={20} color="#6B7280" />
                    </Animated.View>
                </View>
            </Pressable>
        </AccordionPrimitive.Trigger>
    );
};

const InnerContent: React.FC<{ content?: string; children?: React.ReactNode }> = ({ content = '', children = null }) => {
    return (
        <AccordionPrimitive.Content asChild>
            <Animated.View entering={FadeIn} exiting={FadeOutUp.duration(200)}>
                <View className="overflow-hidden px-4 py-3 bg-gray-100 dark:bg-gray-900 rounded-b-md">
                    {content !== '' && <Text className="text-sm text-gray-600 dark:text-gray-300">{content}</Text>}
                    {children}
                </View>
            </Animated.View>
        </AccordionPrimitive.Content>
    );
};