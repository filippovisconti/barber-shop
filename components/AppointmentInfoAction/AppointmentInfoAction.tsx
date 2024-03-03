import { Appointment } from '@/app/db/schema'
import { Avatar, Button, Paper, Text, Title } from '@mantine/core'
import Link from 'next/link'

export function AppointmentInfoAction(props: { appointment: Appointment }) {
    return (
        <>
            <Title order={1} pb="40">
                Appointment details
            </Title>
            <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                <Avatar
                    // TODO: Change this to the actual image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                    size={120}
                    radius={120}
                    mx="auto"
                />
                <Text ta="center" fz="xl" fw={500} mt="md">
                    {props.appointment.date.toString()}
                </Text>
                <Text ta="center" c="dimmed" py="15" fz="sm">
                    {props.appointment.locationId}
                </Text>
                <Text ta="center" fz="sm">
                    {props.appointment.serviceId} minutes
                </Text>
                <Text ta="center" fz="sm">
                    {props.appointment.serviceId} €
                </Text>

                <Link href="/appointments/new">
                    <Button variant="default" fullWidth mt="md">
                        Book now!
                    </Button>
                </Link>
            </Paper>
        </>
    )
}
