import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AlertDialog from "../../ui/AlertDialog";
import { Button } from "../../ui/Button";

export default function AlertScreen() {
	const [basicOpen, setBasicOpen] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [customOpen, setCustomOpen] = useState(false);

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			<View style={{ gap: 12 }}>
				<Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>AlertDialog Examples</Text>

				<Button label="Open basic alert" onPress={() => setBasicOpen(true)} />

				<AlertDialog
					open={basicOpen}
					onOpenChange={(o) => setBasicOpen(!!o)}
					title="Heads up"
					description="This is a basic alert dialog with a single action."
					cancelText="Close"
					actionText="Got it"
					onCancel={() => setBasicOpen(false)}
					onAction={() => setBasicOpen(false)}
				/>

				<Button label="Open confirm dialog" variant="danger" onPress={() => setConfirmOpen(true)} />

				<AlertDialog
					open={confirmOpen}
					onOpenChange={(o) => setConfirmOpen(!!o)}
					title="Delete item"
					description="Are you sure you want to delete this item? This action cannot be undone."
					cancelText="No, keep it"
					actionText="Yes, delete"
					onCancel={() => setConfirmOpen(false)}
					onAction={() => {
						// perform delete action here
						setConfirmOpen(false);
					}}
				/>

				<Button label="Open custom content" onPress={() => setCustomOpen(true)} />

				<AlertDialog
					open={customOpen}
					onOpenChange={(o) => setCustomOpen(!!o)}
					title="Custom content"
					cancelText="Close"
					actionText="Accept"
					onCancel={() => setCustomOpen(false)}
					onAction={() => setCustomOpen(false)}
				>
					<View style={{ marginTop: 8 }}>
						<Text style={{ color: "#374151" }}>You can place any custom React node here — forms, messages, or images.</Text>
					</View>
				</AlertDialog>
			</View>
		</ScrollView>
	);
}

export { AlertScreen };

