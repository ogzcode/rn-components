import React, { useCallback } from 'react';
import { View, Text, Pressable, BackHandler, ViewProps, PressableProps, TextProps, ScrollView } from 'react-native';
import { useAugmentedRef, useRelativePosition } from '@rn-primitives/hooks';
import { Portal as RNPPortal } from '@rn-primitives/portal';
import { Check } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';

//rn-primitives ın select bileşeninin multiselect için düzeltme yapılmış hali

type Option = {
  label: string;
  value: string;
};

type RootContextType = {
  values: Option[];
  onValueChange: (item: Option) => void;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  disabled?: boolean;
  contentLayout: any;
  nativeID: string;
  setContentLayout: (layout: any) => void;
  setTriggerPosition: (position: any) => void;
  triggerPosition: any;
};

const RootContext = React.createContext<RootContextType | null>(null);

function onStartShouldSetResponder() {
    return true;
}

const useRootContext = () => {
    const context = React.useContext(RootContext);
    if (!context) {
        throw new Error('useRootContext must be used within a RootProvider');
    }
    return context;
}

interface RootProps extends ViewProps {
  asChild?: boolean;
  values: Option[];
  onValuesChange: (values: Option[]) => void;
  disabled?: boolean;
}

const Root = ({
    asChild = false,
    values,
    onValuesChange,
    disabled,
    ...viewProps
}: RootProps) => {
    const nativeID = React.useId();

    const [triggerPosition, setTriggerPosition] = React.useState(null);
    const [contentLayout, setContentLayout] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    function onOpenChange(value: boolean) {
        setOpen(value);
    }

    const handleItemToggle = useCallback((item: Option) => {
        if (values.map((v) => v.value).includes(item.value)) {
            onValuesChange(values.filter((v) => v.value !== item.value));
        }
        else {
            onValuesChange([...values, item]);
        }
    }, [values, onValuesChange]);



    return (
        <RootContext.Provider
            value={{
                values,
                onValueChange: handleItemToggle,
                open,
                onOpenChange,
                disabled,
                contentLayout,
                nativeID,
                setContentLayout,
                setTriggerPosition,
                triggerPosition,
            }}
        >
            <View {...viewProps} />
        </RootContext.Provider>
    );
};


interface TriggerProps extends PressableProps {
  asChild?: boolean;
}

const Trigger = React.forwardRef<View, TriggerProps>(
    ({ asChild = false, onPress: onPressProp, disabled = false, ...props }, ref) => {
        const { open, onOpenChange, disabled: disabledRoot, setTriggerPosition } = useRootContext();

        const augmentedRef = useAugmentedRef({
            ref,
            methods: {
                open: () => {
                    onOpenChange(true);
                    augmentedRef.current?.measure((_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
                        setTriggerPosition({ width, pageX, pageY: pageY, height });
                    });
                },
                close: () => {
                    setTriggerPosition(null);
                    onOpenChange(false);
                },
            },
        });

        function onPress(ev: any) {
            if (disabled) return;
            augmentedRef.current?.measure((_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
                setTriggerPosition({ width, pageX, pageY: pageY, height });
            });
            onOpenChange(!open);
            onPressProp?.(ev);
        }

        return (
            <Pressable
                ref={augmentedRef}
                //@ts-ignore
                aria-disabled={disabled ?? undefined}
                role='combobox'
                onPress={onPress}
                disabled={disabled ?? disabledRoot}
                //@ts-ignore
                aria-expanded={open}
                className="w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-3 bg-white dark:bg-gray-800 flex-row items-center justify-between"
                {...props}
            />
        );
    }
);

interface ValueProps extends TextProps {
  asChild?: boolean;
  placeholder?: string;
}

const Value = React.forwardRef<Text, ValueProps>(({ asChild = false, placeholder, ...props }, ref) => {
    const { values } = useRootContext();
    return (
        <Text ref={ref} className="text-base text-gray-900 dark:text-gray-100 flex-1" {...props}>
            {values?.length > 0 ? `${values.length} item${values.length > 1 ? 's' : ''} selected` : placeholder}
        </Text>
    );
});


interface PortalProps {
  forceMount?: boolean;
  hostName?: string;
  children: React.ReactNode;
}

function Portal({ forceMount, hostName, children }: PortalProps) {
    const value = useRootContext();

    if (!value.triggerPosition) {
        return null;
    }

    if (!forceMount) {
        if (!value.open) {
            return null;
        }
    }

    return (
        <RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
            <RootContext.Provider value={value}>{children}</RootContext.Provider>
        </RNPPortal>
    );
}

interface OverlayProps extends PressableProps {
  asChild?: boolean;
  forceMount?: boolean;
  closeOnPress?: boolean;
}

const Overlay = React.forwardRef<View, OverlayProps>(
    ({ asChild = false, forceMount, onPress: OnPressProp, closeOnPress = true, ...props }, ref) => {
        const { open, onOpenChange, setTriggerPosition, setContentLayout } = useRootContext();

        function onPress(ev: any) {
            if (closeOnPress) {
                setTriggerPosition(null);
                setContentLayout(null);
                onOpenChange(false);
            }
            OnPressProp?.(ev);
        }

        if (!forceMount) {
            if (!open) {
                return null;
            }
        }

        return <Pressable ref={ref} onPress={onPress} className="absolute inset-0 bg-black/20" {...props} />;
    }
);


interface ContentProps extends ViewProps {
  asChild?: boolean;
  forceMount?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  insets?: any;
  disablePositioningStyle?: boolean;
  position?: any;
}

const Content = React.forwardRef<View, ContentProps>(
    (
        {
            asChild = false,
            forceMount,
            align = 'start',
            side = 'bottom',
            sideOffset = 0,
            alignOffset = 0,
            avoidCollisions = true,
            onLayout: onLayoutProp,
            insets,
            style,
            disablePositioningStyle,
            position: _position,
            ...props
        },
        ref
    ) => {
        const {
            open,
            onOpenChange,
            contentLayout,
            nativeID,
            triggerPosition,
            setContentLayout,
            setTriggerPosition,
        } = useRootContext();

        React.useEffect(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                setTriggerPosition(null);
                setContentLayout(null);
                onOpenChange(false);
                return true;
            });

            return () => {
                setContentLayout(null);
                backHandler.remove();
            };
        }, []);

        const positionStyle = useRelativePosition({
            align,
            avoidCollisions,
            triggerPosition,
            contentLayout,
            alignOffset,
            insets,
            sideOffset,
            side,
            disablePositioningStyle,
        });

        function onLayout(event: any) {
            setContentLayout(event.nativeEvent.layout);
            onLayoutProp?.(event);
        }

        if (!forceMount) {
            if (!open) {
                return null;
            }
        }

        const { isDark } = useTheme();
        
        const shadowStyle = {
            shadowColor: isDark ? '#000' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
        };

        return (
            <View
                ref={ref}
                //@ts-ignore
                role='list'
                nativeID={nativeID}
                //@ts-ignore
                aria-modal={true}
                className="rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-h-60"
                style={[positionStyle, shadowStyle, { width: triggerPosition?.width }, style]}
                onLayout={onLayout}
                onStartShouldSetResponder={onStartShouldSetResponder}
                {...props}
            />
        );
    }
);


type ItemContextType = {
  itemValue: string;
  label: string;
};

const ItemContext = React.createContext<ItemContextType | null>(null);

interface ItemProps extends PressableProps {
  asChild?: boolean;
  value: string;
  label: string;
  closeOnPress?: boolean;
}

const Item = React.forwardRef<View, ItemProps>(
    (
        {
            asChild = false,
            value: itemValue,
            label,
            onPress: onPressProp,
            disabled = false,
            closeOnPress = false, // Multiselect için varsayılan olarak kapanmasın
            ...props
        },
        ref
    ) => {
        const { onOpenChange, values, onValueChange, setTriggerPosition, setContentLayout } =
            useRootContext();
        function onPress(ev: any) {
            // Multiselect'te sadece closeOnPress true ise kapat
            if (closeOnPress) {
                setTriggerPosition(null);
                setContentLayout(null);
                onOpenChange(false);
            }

            onValueChange({ value: itemValue, label });
            onPressProp?.(ev);
        }

        return (
            <ItemContext.Provider value={{ itemValue, label }}>
                <Pressable
                    ref={ref}
                    //@ts-ignore
                    role='option'
                    onPress={onPress}
                    disabled={disabled}
                    className="flex-row items-center px-3 py-3 border-b border-gray-200 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-700"
                    accessibilityState={{
                        disabled: !!disabled,
                        checked: values.map((v) => v.value).includes(itemValue),
                    }}
                    {...props}
                />
            </ItemContext.Provider>
        );
    }
);


function useItemContext() {
    const context = React.useContext(ItemContext);
    if (!context) {
        throw new Error('Item compound components cannot be rendered outside of an Item component');
    }
    return context;
}

interface ItemTextProps extends TextProps {
  asChild?: boolean;
}

const ItemText = React.forwardRef<Text, ItemTextProps>(({ asChild = false, ...props }, ref) => {
    const { label } = useItemContext();

    return (
        <Text ref={ref} className="flex-1 text-base text-gray-900 dark:text-gray-100" {...props}>
            {label}
        </Text>
    );
});


interface ItemIndicatorProps extends ViewProps {
  asChild?: boolean;
  forceMount?: boolean;
}

const ItemIndicator = React.forwardRef<View, ItemIndicatorProps>(
    ({ asChild = false, forceMount, ...props }, ref) => {
        const { itemValue } = useItemContext();
        const { values } = useRootContext();
        const { isDark } = useTheme();

        if (!forceMount) {
            if (!values?.map((v) => v.value).includes(itemValue)) {
                return null;
            }
        }
        
        return (
            <View ref={ref} //@ts-ignore
 role='presentation' className="w-4 h-4 justify-center items-center ml-2" {...props}>
                <Check size={16} color={isDark ? '#60A5FA' : '#3B82F6'} />
            </View>
        );
    }
);


interface GroupProps extends ViewProps {
  asChild?: boolean;
}

const Group = React.forwardRef<View, GroupProps>(({ asChild = false, ...props }, ref) => {
    return <View ref={ref} //@ts-ignore
 role='group' {...props} />;
});


interface LabelProps extends TextProps {
  asChild?: boolean;
}

const Label = React.forwardRef<Text, LabelProps>(({ asChild = false, ...props }, ref) => {
    return <Text ref={ref} {...props} />;
});


interface SeparatorProps extends ViewProps {
  asChild?: boolean;
  decorative?: boolean;
}

const Separator = React.forwardRef<View, SeparatorProps>(
    ({ asChild = false, decorative, ...props }, ref) => {
        return <View //@ts-ignore
 role={decorative ? 'presentation' : 'separator'} ref={ref} {...props} />;
    }
);


// Basit Multiselect bileşeni
interface MultiselectSimpleProps {
  options: Option[];
  selectedValues: Option[];
  onValuesChange: (values: Option[]) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

const MultiselectSimple: React.FC<MultiselectSimpleProps> = ({
  options,
  selectedValues,
  onValuesChange,
  placeholder = "Seçim yapın...",
  disabled = false,
  label,
}) => {
  const { isDark } = useTheme();

  return (
    <View>
      {label && (
        <Text className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}
      <Root values={selectedValues} onValuesChange={onValuesChange} disabled={disabled}>
        <Trigger>
          <Value placeholder={placeholder} />
          <View className="ml-2">
            <Check size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </View>
        </Trigger>
        <Portal>
          <Overlay />
          <Content>
            <ScrollView className="max-h-60">
              {options.map((option) => (
                <Item key={option.value} value={option.value} label={option.label} closeOnPress={false}>
                  <ItemText />
                  <ItemIndicator />
                </Item>
              ))}
            </ScrollView>
          </Content>
        </Portal>
      </Root>
    </View>
  );
};

export {
    Root,
    Trigger,
    Value,
    Portal,
    Overlay,
    Content,
    Item,
    ItemText,
    ItemIndicator,
    Group,
    Label,
    Separator,
    MultiselectSimple,
};