'use client'

import { Service } from '@/app/db/schema'
import { Box, Button, Modal, Table, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconEraser } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

async function deleteService(id: string, baseUrl: string) {
    const url: URL = new URL(`/api/services/${id}`, baseUrl)
    const res = await fetch(url, { method: 'DELETE' })
    return res.json()
}
// TODO: only allow admin to edit and delete services

export default function ServiceTable(props: { service_names: Service[]; baseUrl: string }) {
    const [opened, { open, close }] = useDisclosure(false)
    const router = useRouter()
    const rows = props.service_names.map((element: Service) => (
        <Table.Tr key={element.id}>
            <Table.Td>
                <Text fw={700}>
                    <Link href={`/services/${element.id}`}>{element.name}</Link>
                </Text>
            </Table.Td>
            <Table.Td>{element.description}</Table.Td>
            <Table.Td>{element.price}€</Table.Td>
            <Table.Td>{element.duration}&apos; </Table.Td>
            <Table.Td>
                <Link href={`/services/update/${element.id}`}>
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
                            You are about to delete this service, are you sure?
                        </Title>
                        <Table.Tr>
                            <Table.Td>User: {element.name}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Duration: {element.duration} minutes</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>Price: {element.price}</Table.Td>
                        </Table.Tr>
                    </Text>
                    <Button
                        rightSection={<IconEraser size={14} />}
                        variant="filled"
                        color="red"
                        mt="md"
                        onClick={async () => {
                            deleteService(element.id, props.baseUrl)
                            router.refresh()
                            close()
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

    const serviceTable = (
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
    )
    return serviceTable
}
