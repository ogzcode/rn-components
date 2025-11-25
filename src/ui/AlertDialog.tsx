import React from "react";
import { View, Text } from "react-native";
import * as AlertPrimitive from "@rn-primitives/alert-dialog";

type Props = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title?: string;
    description?: string;
    cancelText?: string;
    actionText?: string;
    onAction?: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
};

export const AlertDialog: React.FC<Props> = ({
    open,
    onOpenChange,
    title,
    description,
    cancelText = "Cancel",
    actionText = "Continue",
    onAction,
    onCancel,
    children,
}) => {
    return (
        <AlertPrimitive.Root open={open} onOpenChange={onOpenChange}>
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

                    <View className="flex-row justify-end space-x-3 mt-4">
                        <AlertPrimitive.Cancel asChild>
                            <View className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700">
                                <Text className="text-sm text-gray-800 dark:text-gray-100" onPress={onCancel}>
                                    {cancelText}
                                </Text>
                            </View>
                        </AlertPrimitive.Cancel>

                        <AlertPrimitive.Action asChild>
                            <View className="px-4 py-2 rounded-md bg-red-600 dark:bg-red-500">
                                <Text className="text-sm text-white" onPress={onAction}>
                                    {actionText}
                                </Text>
                            </View>
                        </AlertPrimitive.Action>
                    </View>
                </AlertPrimitive.Content>
                </View>
            </AlertPrimitive.Portal>
        </AlertPrimitive.Root>
    );
};

export default AlertDialog;
