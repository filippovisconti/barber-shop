'use client';

import { Box, Table, Text } from '@mantine/core';
import Link from 'next/link';
import { Service } from '@/app/db/schema';

export default function ServiceTable(props: { service_names: Service[] }) {
    const rows = props.service_names.map((element: Service) => (
        <Table.Tr key={element.id}>
            <Table.Td>
                <Text fw={700}>
                    <Link href={`/services/${element.id}`}>{element.name}</Link>
                </Text>
            </Table.Td>
            <Table.Td>{element.description}</Table.Td>
            <Table.Td>{element.price} €</Table.Td>
            <Table.Td>{element.duration}' </Table.Td>
        </Table.Tr>
    ));

    const service_table = (
        <Box py="40" px="5">
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Service</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Duration</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Box>
    );
    return service_table;
}
