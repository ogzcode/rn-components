import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import * as AlertPrimitive from "@rn-primitives/alert-dialog";
import { Check, X } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeProvider";

type Props = {
    title?: string;
    description?: string;
    cancelText?: string;
    actionText?: string;
    onAction?: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
};

export const AlertDialog: React.FC<Props> = ({
    title,
    description,
    cancelText = "Cancel",
    actionText = "Continue",
    onAction,
    onCancel,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const cancelIconColor = theme === "dark" ? "#F3F4F6" : "#1F2937";
    const actionIconColor = "#FFFFFF";
    return (
        <>
            {/* Default internal trigger */}
            <Pressable onPress={() => setIsOpen(true)} className="px-3 py-2 bg-blue-500 rounded">
                <Text className="text-white">Show Alert Dialog</Text>
            </Pressable>

            <AlertPrimitive.Root open={isOpen} onOpenChange={(o) => setIsOpen(o)}>
                <AlertPrimitive.Portal>
                <AlertPrimitive.Overlay className="absolute inset-0 bg-gray-900/60 dark:bg-black/60" />

                <View className="absolute inset-0 justify-center items-center">
                    <AlertPrimitive.Content className="mx-6 rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800">
                    {title ? (
                        <AlertPrimitive.Title>
                            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</Text>
                        </AlertPrimitive.Title>
                    ) : null}

                    {description ? (
                        <AlertPrimitive.Description>
                            <Text className="text-sm text-gray-600 mt-2 dark:text-gray-300">{description}</Text>
                        </AlertPrimitive.Description>
                    ) : null}

                    {children}

                    <View className="flex-row justify-end space-x-3 mt-4 gap-4">
                        <AlertPrimitive.Cancel asChild>
                            <Pressable
                                onPress={(e) => {
                                    if (typeof onCancel === "function") onCancel();
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2 flex flex-row items-center gap-2 rounded-md bg-gray-100 dark:bg-gray-700"
                            >
                                <X color={cancelIconColor} size={16} />
                                <Text className="text-sm text-gray-800 dark:text-gray-100">
                                    {cancelText}
                                </Text>
                            </Pressable>
                        </AlertPrimitive.Cancel>

                        <AlertPrimitive.Action asChild>
                            <Pressable
                                onPress={(e) => {
                                    if (typeof onAction === "function") onAction();
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2 flex flex-row items-center gap-2 rounded-md bg-red-600 dark:bg-red-500"
                            >
                                <Check color={actionIconColor} size={16} />
                                <Text className="text-sm text-white">
                                    {actionText}
                                </Text>
                            </Pressable>
                        </AlertPrimitive.Action>
                    </View>
                </AlertPrimitive.Content>
                </View>
                </AlertPrimitive.Portal>
            </AlertPrimitive.Root>
        </>
    );
};

export default AlertDialog;
