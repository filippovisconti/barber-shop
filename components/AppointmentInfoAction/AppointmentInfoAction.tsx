import { Appointment, Location, Service } from '@/app/db/schema'
import { Avatar, Button, Paper, Text, Title } from '@mantine/core'
import moment from 'moment'
import Link from 'next/link'

export function AppointmentInfoAction(props: {
    appointment: Appointment
    service: Service
    location: Location
}) {
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
                    {moment(props.appointment.date).format('dddd, MMMM Do YYYY, h:mm a')}
                </Text>
                <Text ta="center" c="dimmed" py="15" fz="sm">
                    {props.location.name}
                </Text>
                <Text ta="center" fz="sm">
                    {props.service.duration} minutes
                </Text>
                <Text ta="center" fz="sm">
                    {props.service.price} €
                </Text>

                <Link href="#">
                    <Button variant="default" fullWidth mt="md">
                        Edit!
                    </Button>
                </Link>
            </Paper>
        </>
    )
}
