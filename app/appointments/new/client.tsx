"use client";
import { FormValues } from '@/components/NewAppointmentForm/NewAppointmentForm';
import { ActionIcon, Box, Button, Center, Group, Image, Select, TextInput, Title, rem } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconClock } from '@tabler/icons-react';
import { useRef } from 'react';

export default function WholeForm(props: { handleSubmit: (values: FormValues, event: any) => void, locations: string[], services: string[] }) {
    const form = useForm({
        name: 'new-appointment-form',
        initialValues: { name: '', email: '', service: '', location: '', date: '', time: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            name: (value: string) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            location: (value: string) => props.locations.includes(value) ? null : 'Invalid location',
            service: (value: string) => props.services.includes(value) ? null : 'Invalid service',
            // date: (value: Date) => (value > new Date() ? null : 'Invalid date'),
            // time: (value: Date) => (value > new Date() ? null : 'Invalid time'), // TODO: check if time is within opening hours
        },
    });
    const ref = useRef<HTMLInputElement>(null);
    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );
    const form_items = (
        <>
            <Box p="10">
                <Title py="20" order={3}>
                    Service details
                </Title>
                <Select py="10" label="Location" placeholder="Select a location" data={props.locations} {...form.getInputProps('location')} />
                <Select py="10" label="Service" placeholder="Choose one service" data={props.services} {...form.getInputProps('service')} />

                <DatePickerInput py="10" label="Pick a date" {...form.getInputProps('date')} />

                <TimeInput py="10" label="Pick a time" placeholder="Pick time" ref={ref} rightSection={pickerControl} {...form.getInputProps('time')} />
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
                <Title py="20" order={3}>
                    Customer details
                </Title>

                <TextInput py="10" withAsterisk label="Name" placeholder="Name" {...form.getInputProps('name')} />
                <TextInput
                    withAsterisk
                    mt="sm"
                    label="Email"
                    placeholder="Email"
                    py="10"
                    {...form.getInputProps('email')}
                />
            </Box>
        </>
    )
    return (
        <form onSubmit={form.onSubmit((values, events) => { props.handleSubmit(values, events) })}>

            <Group grow visibleFrom="sm">
                {form_items}
            </Group>
            <Box hiddenFrom="sm">{form_items}</Box>

            <Center>
                <Button type="submit" mt="xl">
                    Submit
                </Button>
            </Center>
        </form>
    )
}
