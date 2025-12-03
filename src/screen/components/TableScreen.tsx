// Example Usage
import ReusableTable, { Column } from '@/ui/Table';
import React from 'react';
import { View, Text } from 'react-native';

    
export default function TableScreen() {
    const columns: Column[] = [
        { key: 'invoice', title: 'Invoice' },
        { key: 'status', title: 'Status' },
        { key: 'method', title: 'Method' },
        { key: 'amount', title: 'Amount' },
    ];

    const data = [
        { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
        { invoice: 'INV002', status: 'Unpaid', method: 'PayPal', amount: '$150.00' },
        { invoice: 'INV003', status: 'Pending', method: 'Bank Transfer', amount: '$300.00' },
        { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
        { invoice: 'INV005', status: 'Unpaid', method: 'PayPal', amount: '$100.00' },
        { invoice: 'INV006', status: 'Paid', method: 'Credit Card', amount: '$200.00' },
    ];

    return (
        <View className="p-4 space-y-6">
            <View>
                <Text className="text-lg font-semibold mb-2">Default table (5 items per page)</Text>
                <ReusableTable data={data} columns={columns} itemsPerPage={5} />
            </View>

            <View>
                <Text className="text-lg font-semibold mb-2">Smaller page size (3 items per page)</Text>
                <ReusableTable data={data} columns={columns} itemsPerPage={3} />
            </View>

            <View>
                <Text className="text-lg font-semibold mb-2">Pre-sorted by amount</Text>
                <ReusableTable data={data} columns={columns} initialSortColumn="amount" itemsPerPage={5} />
            </View>
        </View>
    );
}
