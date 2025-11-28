import React, { useState, useEffect } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import Animated, {
    interpolate,
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';

interface FloatingInputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    cursorColor?: string;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
    label,
    value,
    onChangeText,
    cursorColor = '#f43f5e',
    ...props
}) => {
    const { isDark } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const labelPosition = useSharedValue(value ? 1 : 0);

    useEffect(() => {
        // if value changes from outside, animate label position linearly
        labelPosition.value = withTiming(value ? 1 : 0, { duration: 160, easing: Easing.linear });
    }, [value]);

    const handleFocus = () => {
        setIsFocused(true);
        // move label up linearly (no bounce)
        labelPosition.value = withTiming(1, { duration: 140, easing: Easing.linear });
    };

    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
            labelPosition.value = withTiming(0, { duration: 140, easing: Easing.linear });
        }
    };

    const animatedLabelStyle = useAnimatedStyle(() => {
        const top = interpolate(labelPosition.value, [0, 1], [16, -16]);
        const fontSize = interpolate(labelPosition.value, [0, 1], [16, 12]);
        return {
            position: 'absolute',
            left: 12,
            // don't force full width when left aligned
            top,
            fontSize,
            zIndex: 10,
            paddingHorizontal: 4,
            // keep background consistent with container so label sits above border
        } as any;
    });

    const containerBg = isDark ? 'bg-gray-800' : 'bg-white';

    return (
        <View className={`w-full relative border-2 rounded-md ${containerBg}`} style={{ borderColor: isDark ? '#374151' : '#9CA3AF' }}>
            <Animated.Text
                style={[animatedLabelStyle]}
                className={`text-gray-600 dark:text-gray-300`}
                pointerEvents="none"
            >
                {label}
            </Animated.Text>

            <TextInput
                className={`h-12 px-3 text-base ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
                value={value}
                onChangeText={onChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                cursorColor={cursorColor}
                {...props}
            />
        </View>
    );
};
