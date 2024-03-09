'use client'

import { JoinAppointment } from '@/app/db/schema'
import { Box, Table, Text } from '@mantine/core'
import Link from 'next/link'

export default function AppointmentTable(props: { appointments: JoinAppointment[] }) {
    const rows = props.appointments.map((element: JoinAppointment) => (
        <Table.Tr key={element.id}>
            <Table.Td>
                <Text fw={700}>
                    <Link href={`/appointments/${element.id}`}>{element.id}</Link>
                </Text>
            </Table.Td>
            <Table.Td>{element.userEmail}</Table.Td>
            <Table.Td>{element.serviceName}</Table.Td>
            <Table.Td>{element.locationName}</Table.Td>
            <Table.Td>{element.date}</Table.Td>
            <Table.Td>{element.notes}</Table.Td>
            <Table.Td>{element.createdAt}</Table.Td>
            <Table.Td>{element.status}</Table.Td>
        </Table.Tr>
    ))

    const appointmentTable = (
        <Box py="40" px="5">
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Appointments</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Service</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Notes</Table.Th>
                        <Table.Th>Created at</Table.Th>
                        <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Box>
    )
    return appointmentTable
}
