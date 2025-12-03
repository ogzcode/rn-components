import React, { useState, useMemo, createContext, useContext, ReactNode } from 'react';
import * as TablePrimitive from '@rn-primitives/table';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface Column {
    key: string;
    title: string;
}

interface TableProviderProps {
    children: ReactNode;
    data: Record<string, any>[];
    columns: Column[];
    initialSortColumn: string | null;
    itemsPerPage: number;
}

interface TableContextProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    sortColumn: string | null;
    sortDirection: 'asc' | 'desc';
    handleSort: (columnKey: string) => void;
    paginatedData: Record<string, any>[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    columns: Column[];
}

// Create a context for the table
const TableContext = createContext<TableContextProps | undefined>(undefined);

function TableProvider({ children, data, columns, initialSortColumn, itemsPerPage }: TableProviderProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(initialSortColumn);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    // Search functionality
    const filteredData = useMemo(() => {
        return data.filter((row) =>
            columns.some((col) =>
                row[col.key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, data, columns]);

    // Sort functionality
    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortColumn, sortDirection]);

    // Pagination functionality
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const handleSort = (columnKey: string) => {
        if (sortColumn === columnKey) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    return (
        <TableContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                sortColumn,
                sortDirection,
                handleSort,
                paginatedData,
                currentPage,
                setCurrentPage,
                totalPages,
                columns,
            }}
        >
            {children}
        </TableContext.Provider>
    );
}

function TableHeader() {
    const context = useContext(TableContext);
    if (!context) throw new Error('TableHeader must be used within a TableProvider');
    const { columns, sortColumn, sortDirection, handleSort } = context;

    return (
        <TablePrimitive.Header>
            <TablePrimitive.Row className="flex-row bg-gray-100 dark:bg-gray-800">
                {columns.map((column) => (
                    <TablePrimitive.Head key={column.key} className="flex-1 p-3 border-b border-gray-200 dark:border-gray-700">
                        <Text onPress={() => handleSort(column.key)} className="font-bold text-sm text-gray-800 dark:text-gray-100">
                            {column.title}
                            {sortColumn === column.key ? (
                                <Text className="ml-1 text-xs">{sortDirection === 'asc' ? '▲' : '▼'}</Text>
                            ) : null}
                        </Text>
                    </TablePrimitive.Head>
                ))}
            </TablePrimitive.Row>
        </TablePrimitive.Header>
    );
}

function TableBody() {
    const context = useContext(TableContext);
    if (!context) throw new Error('TableBody must be used within a TableProvider');
    const { paginatedData, columns } = context;
    return (
        <TablePrimitive.Body>
            {paginatedData.map((row, rowIndex) => (
                <TablePrimitive.Row key={rowIndex} className={rowIndex % 2 === 0 ? 'flex-row bg-white' : 'flex-row bg-gray-50 dark:bg-gray-800'}>
                    {columns.map((column) => (
                        <TablePrimitive.Cell key={column.key} className="flex-1 p-3 border-b border-gray-200 dark:border-gray-700">
                            <Text className="text-sm text-gray-800 dark:text-gray-100">{row[column.key]}</Text>
                        </TablePrimitive.Cell>
                    ))}
                </TablePrimitive.Row>
            ))}
        </TablePrimitive.Body>
    );
}

function PaginationControls() {
    const context = useContext(TableContext);
    if (!context) throw new Error('PaginationControls must be used within a TableProvider');
    const { currentPage, setCurrentPage, totalPages } = context;

    return (
        <View className="flex-row justify-between items-center mt-4">
            <TouchableOpacity
                onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600'}`}
            >
                <Text className={`text-white`}>Previous</Text>
            </TouchableOpacity>

            <Text className="text-sm text-gray-600 dark:text-gray-300">Page {currentPage} of {totalPages}</Text>

            <TouchableOpacity
                onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600'}`}
            >
                <Text className={`text-white`}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

interface ReusableTableProps {
    data: Record<string, any>[];
    columns: Column[];
    initialSortColumn?: string | null;
    itemsPerPage?: number;
}

function ReusableTable({ data, columns, initialSortColumn = null, itemsPerPage = 5 }: ReusableTableProps) {
    return (
        <TableProvider data={data} columns={columns} initialSortColumn={initialSortColumn} itemsPerPage={itemsPerPage}>
            <TableContent />
        </TableProvider>
    );
}

function TableContent() {
    const context = useContext(TableContext);
    if (!context) throw new Error('TableContent must be used within a TableProvider');
    const { setSearchQuery } = context;
    const { isDark } = useTheme();

    return (
        <View className={`p-4 rounded border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            {/* Search Bar */}
            <TextInput
                placeholder="Search..."
                onChangeText={(text) => setSearchQuery(text)}
                className="mb-4 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
            />

            {/* Table */}
            <TablePrimitive.Root>
                <TableHeader />
                <TableBody />
            </TablePrimitive.Root>

            {/* Pagination Controls */}
            <PaginationControls />
        </View>
    );
}

export default ReusableTable;
export type { Column };
// Nativewind classes used in markup; old StyleSheet removed.

