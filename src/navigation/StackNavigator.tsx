import { createStackNavigator } from '@react-navigation/stack';
import BadgeScreen from '@/screen/components/BadgeScreen';
import { HomeScreen } from '@/screen/Home';
import AvatarScreen from '@/screen/components/AvatarScreen';
import AccordionScreen from '@/screen/components/AccordionScreen';
import AlertScreen from '@/screen/components/AlertScreen';
import { useTheme } from '@/theme/ThemeProvider';
import ButtonScreen from '@/screen/components/ButtonScreen';

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
        </Stack.Navigator>
    );
}

export default StackNavigator;