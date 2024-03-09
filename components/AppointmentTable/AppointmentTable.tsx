'use client'

import { JoinAppointment } from '@/app/db/schema'
import { Box, Table } from '@mantine/core'
import moment from 'moment'
import Link from 'next/link'

export default function AppointmentTable(props: { appointments: JoinAppointment[] }) {
    const rows = props.appointments.map((element: JoinAppointment) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.userEmail}</Table.Td>
            <Table.Td>{element.serviceName}</Table.Td>
            <Table.Td>{element.locationName}</Table.Td>
            <Table.Td>{moment(element.date).format('dddd, MMMM Do YYYY, h:mm a')}</Table.Td>
            <Table.Td>{moment(element.date).format('MM/DD/YYYY')}</Table.Td>
            <Table.Td>{element.status}</Table.Td>
            <Table.Td>{element.notes == "" ? '-' : element.notes}</Table.Td>
        </Table.Tr>
    ))

    const appointmentTable = (
        <Box py="40" px="5">
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Service</Table.Th>
                        <Table.Th>Location</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Created at</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Notes</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Box>
    )
    return appointmentTable
}
