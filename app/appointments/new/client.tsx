'use client'

import { Location, Service } from '@/app/db/schema'
import {
    ActionIcon,
    Box,
    Button,
    Center,
    Group,
    Image,
    Select,
    TextInput,
    Textarea,
    Title,
    rem,
} from '@mantine/core'
import { DatePickerInput, TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconClock } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'

export default function WholeForm(props: {
    action: (values: FormData) => void
    locations: Location[]
    services: Service[]
}) {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const chosenService: string | null = searchParams.get('uuid')

    const timestamp: Date = new Date()
    timestamp.setHours(0, 0, 0, 0)
    timestamp.setDate(timestamp.getDate() + 1)

    const form = useForm({
        name: 'new-appointment-form',
        initialValues: {
            name: session ? session.user?.name ?? 'ERROR NAME' : 'Jon Doe',
            email: session ? session.user?.email ?? 'ERROR EMAIL' : 'jon@me.com',
            service: chosenService ?? 'Haircut',
            location: '',
            date: timestamp,
            time: '10:00',
            notes: '',
        },

        validate: {
            name: (value: string) =>
                value.length < 2 ? 'Name must have at least 2 letters' : null,
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            location: (value: string) =>
                props.locations.map((location) => location.name).includes(value)
                    ? null
                    : 'Invalid location',
            service: (value: string) =>
                props.services.map((service) => service.name).includes(value)
                    ? null
                    : 'Invalid service',
            date: (value: Date) => (value > new Date() ? null : 'Invalid date'),
            // time: (value: Date) => (value > new Date() ? null : 'Invalid time'), // TODO: check if time is within opening hours
        },
    })
    const ref = useRef<HTMLInputElement>(null)
    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    )
    const formItems= (
        <>
            <Box p="10">
                <Title py="20" order={3}>
                    Service details
                </Title>
                <Select
                    py="10"
                    name="location"
                    label="Location"
                    placeholder="Select a location"
                    data={props.locations.map((location) => ({
                        value: location.id,
                        label: location.name,
                    }))}
                    {...form.getInputProps('location')}
                />
                <Select
                    py="10"
                    name="service"
                    label="Service"
                    placeholder="Choose one service"
                    data={props.services.map((service) => ({
                        value: service.id,
                        label: service.name,
                    }))}
                    {...form.getInputProps('service')}
                />

                <DatePickerInput
                    name="date"
                    py="10"
                    label="Pick a date"
                    {...form.getInputProps('date')}
                />

                <TimeInput
                    name="time"
                    py="10"
                    label="Pick a time"
                    placeholder="Pick time"
                    ref={ref}
                    rightSection={pickerControl}
                    {...form.getInputProps('time')}
                />
            </Box>
            <Box p="10">
                <Center>
                    <Image
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                        h={150}
                        w="auto"
                        fit="contain"
                        radius="md"
                        alt="Customer"
                    />
                </Center>
                {!session ? (
                    <>
                        <Title py="20" order={3}>
                            Customer details
                        </Title>

                        <TextInput
                            py="10"
                            withAsterisk
                            name="name"
                            label="Name"
                            placeholder="Name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            withAsterisk
                            mt="sm"
                            label="Email"
                            placeholder="Email"
                            py="10"
                            name="email"
                            {...form.getInputProps('email')}
                        />
                    </>
                ) : (
                    <>
                        <Center py="40"> Already logged in </Center>
                        <input
                            type="hidden"
                            name="name"
                            value={session?.user?.name ?? 'ERROR USER NAME'}
                        />
                        <input
                            type="hidden"
                            name="email"
                            value={session?.user?.email ?? 'ERROR EMAIL'}
                        />
                    </>
                )}
            </Box>
        </>
    )
    return (
        <form action={props.action}>
            <Group grow visibleFrom="sm">
                {formItems}
            </Group>
            <Box hiddenFrom="sm">{formItems}</Box>

            <Box py="20" px="80">
                <Textarea
                    name="notes"
                    label="Additional Notes"
                    description="Enter here your notes"
                    placeholder="Input placeholder"
                    {...form.getInputProps('notes')}
                />
            </Box>
            <Center>
                <Button type="submit" mt="xl">
                    Submit
                </Button>
            </Center>
        </form>
    )
}
