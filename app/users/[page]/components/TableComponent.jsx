import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

export const TableComponent = ({ data }) => {
    const columns = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Username",
            accessorKey: "username",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "City",
            accessorFn: (row) => row.address.city,
            id: "city",
        },
        {
            header: "Phone",
            accessorKey: "phone",
        },
        {
            header: "Company Name",
            accessorFn: (row) => row.company.name,
            id: "companyName",
        },
        {
            header: "Website",
            accessorKey: "website",
            cell: ({ getValue }) =>
                getValue() ? (
                    <a
                        href={`https://${getValue()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:underline"
                    >
                        {getValue()}
                    </a>
                ) : (
                    "N/A"
                ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
                <tr>
                    {table.getHeaderGroups().map((group) =>
                        group.headers.map((header) => (
                            <th key={header.id} className="px-4 py-2 text-left text-white">
                                {header.column.columnDef.header}
                            </th>
                        ))
                    )}
                </tr>
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-700">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-2 text-white">
                                {cell.renderValue()}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
