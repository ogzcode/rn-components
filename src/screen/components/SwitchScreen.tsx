
import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import CustomSwitch from '../../ui/Switch';

const SwitchScreen: React.FC = () => {
	const [info, setInfo] = useState(false);
	const [success, setSuccess] = useState(true);
	const [warning, setWarning] = useState(false);
	const [error, setError] = useState(false);
	const [noLabel, setNoLabel] = useState(true);

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }} className="bg-white dark:bg-black min-h-screen">
			<Text className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Switch examples</Text>

			<View className="space-y-2">
				<CustomSwitch label="Info (default)" checked={info} setChecked={setInfo} severity="info" />
				<CustomSwitch label="Success" checked={success} setChecked={setSuccess} severity="success" />
				<CustomSwitch label="Warning" checked={warning} setChecked={setWarning} severity="warning" />
				<CustomSwitch label="Error" checked={error} setChecked={setError} severity="error" />

				<View className="mt-4">
					<Text className="text-sm text-gray-700 dark:text-gray-300 mb-2">Switch without label (inline demo)</Text>
					<CustomSwitch checked={noLabel} setChecked={setNoLabel} />
				</View>
			</View>
		</ScrollView>
	);
};

export default SwitchScreen;

