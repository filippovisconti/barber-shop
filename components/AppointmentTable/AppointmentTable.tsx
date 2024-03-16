'use client'

import { JoinAppointment } from '@/app/db/schema'
import { Box, Button, Modal, Table, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconEraser } from '@tabler/icons-react'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

async function deleteAppointment(id: string, baseUrl: string) {
    const url: URL = new URL(`/api/appointments/${id}`, baseUrl)
    const res = await fetch(url, { method: 'DELETE' })
    return res.json()
}

export default function AppointmentTable(props: {
    appointments: JoinAppointment[]
    baseUrl: string
}) {
    const [opened, { open, close }] = useDisclosure(false)
    const router = useRouter()
    const rows = props.appointments.map((element: JoinAppointment) => (
        <Table.Tr key={element.id}>
            <Table.Td visibleFrom="sm">
                <Link href={`/appointments/${element.id}`}>{element.userEmail}</Link>
            </Table.Td>
            <Table.Td>{element.serviceName}</Table.Td>
            <Table.Td>{element.locationName}</Table.Td>
            <Table.Td>{moment(element.date).format('dddd, MMMM Do YYYY')}</Table.Td>
            <Table.Td>{moment(element.date).format('h:mm a')}</Table.Td>
            {/* <Table.Td>{moment(element.date).format('MM/DD/YYYY')}</Table.Td> */}
            <Table.Td>{element.status}</Table.Td>
            {/* <Table.Td>{!element.notes ? '-' : element.notes}</Table.Td> */}
            <Table.Td>
                <Link href="#">
                    <Button
                        rightSection={<IconEdit size={14} />}
                        variant="filled"
                        fullWidth
                        mt="md"
                    >
                        Edit
                    </Button>
                </Link>
            </Table.Td>
            <Table.Td>
                <Modal
                    opened={opened}
                    onClose={close}
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                    withCloseButton={false}
                >
                    <Text>
                        <Title py="20" order={3}>
                            You are about to delete the appointment, are you sure?
                        </Title>
                        <Table.Tr>
                            <Table.Td>User: {element.userEmail}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                Date and time:{' '}
                                {moment(element.date).format('dddd, MMMM Do YYYY, h:mm a')}
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Service: {element.serviceName}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Location: {element.locationName}</Table.Td>
                        </Table.Tr>
                    </Text>
                    <Button
                        rightSection={<IconEraser size={14} />}
                        variant="filled"
                        color="red"
                        mt="md"
                        onClick={async () => {
                            deleteAppointment(element.id, props.deleteAppointmentUrl)
                            close()
                            router.refresh()
                        }}
                    >
                        Confirm deletion
                    </Button>
                </Modal>
                <Button
                    rightSection={<IconEraser size={14} />}
                    variant="filled"
                    color="red"
                    fullWidth
                    mt="md"
                    onClick={open}
                >
                    Remove
                </Button>
            </Table.Td>
        </Table.Tr>
    ))

    const appointmentTable = (
        <>
            <Box py="40" px="5">
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th visibleFrom="sm">Email</Table.Th>
                            <Table.Th>Service</Table.Th>
                            <Table.Th>Location</Table.Th>
                            <Table.Th>Date</Table.Th>
                            <Table.Th>Time</Table.Th>
                            {/* <Table.Th>Created at</Table.Th> */}
                            <Table.Th>Status</Table.Th>
                            {/* <Table.Th>Notes</Table.Th> */}
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Box>
        </>
    )
    return appointmentTable
}
