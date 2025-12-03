import React, { createContext, useContext, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal } from '@rn-primitives/portal';
import * as ToastPrimitive from '@rn-primitives/toast';
import { Info, Check, TriangleAlert, X } from 'lucide-react-native';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';

const ToastContext = createContext({ showToast: (message: string, type?: string, duration?: number) => { } });

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toast, setToast] = useState({ visible: false, message: '', type: "info", duration: 2000 });
    const toastPosition = useSharedValue(-100);
    const insets = useSafeAreaInsets();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { isDark } = useTheme();

    const showToast = (message: string, type: string = "warning", duration: number = 2000) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setToast({ visible: true, message, type, duration });
        toastPosition.value = withTiming(-100, { duration: 0 });
        toastPosition.value = withTiming(insets.top, { duration: 300, easing: Easing.ease });

        timeoutRef.current = setTimeout(() => {
            setToast({ visible: false, message: '', type: 'success', duration: 2000 });
        }, duration);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            toastPosition.value = withTiming(-100, { duration: 300, easing: Easing.ease });
            setToast({ visible: false, message: '', type: 'success', duration: 2000 });
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'info':
                return <Info size={20} color="#FFF" />;
            case 'success':
                return <Check size={20} color="#FFF" />;
            case 'warning':
                return <TriangleAlert size={20} color="#FFF" />;
            default:
                return <Check size={20} color="#FFF" />;
        }
    };
    const iconBgColor = {
        info: '#FFA500',
        success: '#28A745',
        warning: '#DC3545',
    }[toast.type];

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: toastPosition.value }],
    }));

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast.visible && (
                <Portal name="toast-example">
                    <Animated.View style={[{ position: 'absolute', top: 0, width: '100%', zIndex: 9999 }, animatedStyle]}>
                        <View className="w-full px-1">
                            <ToastPrimitive.Root
                                type="foreground"
                                open={toast.visible}
                                onOpenChange={handleOpenChange}
                            >
                                <View className={`mx-4 my-2 rounded-lg p-3 shadow-md flex-row items-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                                    <View style={{ backgroundColor: iconBgColor }} className="p-2 rounded-md mr-2">
                                        {getIcon(toast.type)}
                                    </View>

                                    <ToastPrimitive.Description asChild>
                                        <Text className={`${isDark ? 'text-gray-100' : 'text-gray-800'} text-sm flex-1`}>{toast.message}</Text>
                                    </ToastPrimitive.Description>

                                    <ToastPrimitive.Close asChild>
                                        <TouchableOpacity
                                            onPress={() => setToast({ visible: false, message: '', type: 'success', duration: 2000 })}
                                            className={isDark ? 'p-2 rounded-full bg-gray-700' : 'p-2 rounded-full bg-gray-100'}
                                        >
                                            <X size={16} color={isDark ? '#fff' : '#000'} />
                                        </TouchableOpacity>
                                    </ToastPrimitive.Close>
                                </View>
                            </ToastPrimitive.Root>
                        </View>
                    </Animated.View>
                </Portal>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};


