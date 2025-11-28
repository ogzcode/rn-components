import React from 'react';
import * as SwitchPrimitive from '@rn-primitives/switch';
import { View, Text, useColorScheme, Animated, Easing } from 'react-native';

type Severity = 'info' | 'success' | 'warning' | 'error';

// Tailwind class mapping per severity and color scheme
const severityClasses: Record<Severity, { light: { true: string; false: string }; dark: { true: string; false: string } }> = {
    info: {
        light: { true: 'bg-blue-500', false: 'bg-blue-200' },
        dark: { true: 'bg-blue-400', false: 'bg-blue-900' },
    },
    success: {
        light: { true: 'bg-green-500', false: 'bg-green-200' },
        dark: { true: 'bg-emerald-400', false: 'bg-emerald-900' },
    },
    warning: {
        light: { true: 'bg-yellow-400', false: 'bg-yellow-200' },
        dark: { true: 'bg-amber-400', false: 'bg-amber-900' },
    },
    error: {
        light: { true: 'bg-red-500', false: 'bg-red-200' },
        dark: { true: 'bg-rose-400', false: 'bg-rose-900' },
    },
};

type Props = {
    checked: boolean;
    setChecked: (v: boolean) => void;
    severity?: Severity;
    label?: string;
};

const AnimatedThumb = Animated.createAnimatedComponent(SwitchPrimitive.Thumb as any);

const CustomSwitch: React.FC<Props> = ({ checked, setChecked, severity = 'info', label }) => {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const classes = severityClasses[severity][colorScheme];

    const anim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(anim, {
            toValue: checked ? 1 : 0,
            duration: 200,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, [checked, anim]);

    const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 20] });

    return (
        <View className="flex-row items-center justify-between py-3">
            {label ? (
                <Text className="text-base text-gray-900 dark:text-gray-100 mr-4">{label}</Text>
            ) : null}

            <SwitchPrimitive.Root
                checked={checked}
                onCheckedChange={setChecked}
                className={`w-12 h-8 rounded-full justify-center px-1 ${checked ? classes.true : classes.false}`}
                aria-label={label ?? 'toggle'}
            >
                <AnimatedThumb
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                    style={{
                        transform: [{ translateX }],
                    }}
                />
            </SwitchPrimitive.Root>
        </View>
    );
};

export default CustomSwitch;