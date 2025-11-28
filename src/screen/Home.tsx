import { ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import { ArrowRight } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeProvider";

type RootStackParamList = {
	Badges: undefined;
	Avatars: undefined;
	Accordions: undefined;
	Alerts: undefined;
	Buttons: undefined;
	Checkboxes: undefined;
	DropdownMenu: undefined;
	Input: undefined;
	Select: undefined;
	Multiselect: undefined;
	Tabs: undefined;
	FloatingInput: undefined;
	Switch: undefined;
	Textarea: undefined;
};

export const HomeScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const { setTheme, theme } = useTheme();
	return (
		<ScrollView className="flex-1 p-4 bg-white dark:bg-gray-900" contentContainerStyle={{ paddingBottom: 40 }}>
			<View className="gap-4">
			<Pressable
				className="bg-gray-900 dark:bg-gray-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => setTheme(theme === "light" ? "dark" : "light")}
			>
				<Text className="text-white font-semibold">Toggle Theme</Text>
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Badges")}
			>
				<Text className="text-white font-semibold">Badge Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>
			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Avatars")}
			>
				<Text className="text-white font-semibold">Avatar Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>
			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Accordions")}
			>
				<Text className="text-white font-semibold">Accordion Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>
			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Alerts")}
			>
				<Text className="text-white font-semibold">Alert Dialog Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Buttons")}
			>
				<Text className="text-white font-semibold">Button Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Checkboxes")}
			>
				<Text className="text-white font-semibold">Checkbox Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("DropdownMenu")}
			>
				<Text className="text-white font-semibold">Dropdown Menu Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Input")}
			>
				<Text className="text-white font-semibold">Input Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>
			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Select")}
			>
				<Text className="text-white font-semibold">Select Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Multiselect")}
			>
				<Text className="text-white font-semibold">Multiselect Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Tabs")}
			>
				<Text className="text-white font-semibold">Tabs Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("FloatingInput")}
			>
				<Text className="text-white font-semibold">Floating Input Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Switch")}
			>
				<Text className="text-white font-semibold">Switch Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>

			<Pressable
				className="bg-blue-500 dark:bg-blue-700 px-6 py-3 rounded-lg flex justify-between items-center flex-row"
				onPress={() => navigation.navigate("Textarea") }
			>
				<Text className="text-white font-semibold">Textarea Screen</Text>
				<ArrowRight className="absolute left-4 top-3" size={20} color="white" />
			</Pressable>
			</View>
		</ScrollView>
	);
}