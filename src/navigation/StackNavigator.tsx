import { createStackNavigator } from '@react-navigation/stack';
import BadgeScreen from '@/screen/components/BadgeScreen';
import { HomeScreen } from '@/screen/Home';
import AvatarScreen from '@/screen/components/AvatarScreen';
import AccordionScreen from '@/screen/components/AccordionScreen';
import AlertScreen from '@/screen/components/AlertScreen';
import ButtonScreen from '@/screen/components/ButtonScreen';
import CheckboxScreen from '@/screen/components/CheckboxScreen';
import DropdownMenuScreen from '@/screen/components/DropdownMenuScreen';
import { InputScreen } from '@/screen/components/InputScreen';
import SelectScreen from '@/screen/components/SelectScreen';
import MultiselectScreen from '@/screen/components/MultiselectScreen';
import TabScreen from '@/screen/components/TabScreen';


import { useTheme } from '@/theme/ThemeProvider';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    const { isDark } = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: isDark ? '#0f172a' : '#ffffff' },
                headerTintColor: isDark ? '#ffffff' : '#111827',
                headerTitleStyle: { fontWeight: '600' },
                cardStyle: { backgroundColor: isDark ? '#000000' : '#ffffff' },
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Badges" component={BadgeScreen} />
            <Stack.Screen name="Avatars" component={AvatarScreen} />
            <Stack.Screen name="Accordions" component={AccordionScreen} />
            <Stack.Screen name="Alerts" component={AlertScreen} />
            <Stack.Screen name="Buttons" component={ButtonScreen} />
            <Stack.Screen name="Checkboxes" component={CheckboxScreen} />
            <Stack.Screen name="DropdownMenu" component={DropdownMenuScreen} />
            <Stack.Screen name="Input" component={InputScreen} />
            <Stack.Screen name="Select" component={SelectScreen} />
            <Stack.Screen name="Multiselect" component={MultiselectScreen} />
            <Stack.Screen name="Tabs" component={TabScreen} />
        </Stack.Navigator>
    );
}

export default StackNavigator;