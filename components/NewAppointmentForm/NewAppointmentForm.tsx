'use client';
import {
    ActionIcon,
    Box,
    Button,
    Select,
    TextInput,
    Title,
    rem,
} from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconClock } from '@tabler/icons-react';
import { useRef } from 'react';

export default function NewAppointmentForm() {
    const locations = ['test1', 'test2', 'test3', 'test4', 'test5'];
    const services = ['service1', 'service2', 'service3', 'service4', 'service5'];
    const form = useForm({
        initialValues: { name: '', email: '', service: '', location: '', date: '', time: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            name: (value: string) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            location: (value: string) => locations.includes(value) ? null : 'Invalid location',
            service: (value: string) => services.includes(value) ? null : 'Invalid service',
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
    return (
        <>
            <Title py="20" order={1}>
                Schedule a new appointment
            </Title>
            <Box maw={340} mx="auto">

                <form onSubmit={form.onSubmit(console.log)}>
                    <Title py="20" order={3}>
                        Service details
                    </Title>
                    <Select label="Service" placeholder="Choose one service" data={services} {...form.getInputProps('service')} />

                    <DatePickerInput   label="Pick a date"  {...form.getInputProps('date')} />

                    <TimeInput label="Pick a time" placeholder="Pick time" ref={ref} rightSection={pickerControl}  {...form.getInputProps('time')} />
                    <Select label="Location" placeholder="Select a location" data={locations} {...form.getInputProps('location')} />

                    <Title py="20" order={3}>
                        Customer details            </Title>
                    <TextInput withAsterisk label="Name" placeholder="Name" {...form.getInputProps('name')} />
                    <TextInput
                        withAsterisk
                        mt="sm"
                        label="Email"
                        placeholder="Email"
                        {...form.getInputProps('email')}
                    />

                    <Button type="submit" mt="sm">
                        Submit
                    </Button>
                </form>
            </Box>
        </>
    );
}
