import {
    Box,
    Button,
    PasswordInput,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export default function SignUpForm() {
    const [value, setValue] = useState('');

    const form = useForm({
        initialValues: { name: '', email: '', age: 0 },

        // functions will be used to validate values at corresponding key
        validate: {
            name: (value: string) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <Box maw={340} mx="auto">
            <Title py="20" order={1}>
                Sign up here
            </Title>

            <form onSubmit={form.onSubmit(console.log)}>
                <TextInput withAsterisk label="Name" placeholder="Name" {...form.getInputProps('name')} />
                <TextInput
                  withAsterisk
                  mt="sm"
                  label="Email"
                  placeholder="Email"
                  {...form.getInputProps('email')}
                />

                <PasswordInput
                  withAsterisk
                  label="Enter your password"
                  placeholder="Your password"
                  value={value}
                />

                <Button type="submit" mt="sm">
                    Submit
                </Button>
            </form>
        </Box>
    );
}
