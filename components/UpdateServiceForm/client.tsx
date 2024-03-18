'use client'


import { Service } from '@/app/db/schema'
import { Box, Button, Center, NumberInput, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function WholeForm(props: { action: (values: FormData) => void, service: Service }) {
    const form = useForm({
        name: 'update-service-form',
        initialValues: {
            name: props.service.name,
            description: props.service.description,
            price: props.service.price,
            duration: props.service.duration,
        },

        validate: {
            name: (value: string) =>
                value.length < 2 ? 'Name must have at least 2 letters' : null,
            description: (value: string) =>
                value.length < 2 ? 'Description must have at least 2 letters' : null,
            price: (value: number) => (value < 1 ? 'Price must be a number' : null), // TODO: validate as number
            duration: (value: number) => (value < 1 ? 'Duration must be a number' : null),
        },
    })

    const formItems = (
        <>
            <Box maw="400" m="auto" pt="50" pb="100">
                <TextInput
                    label="Name"
                    name="name"
                    placeholder="Haircut"
                    withAsterisk
                    required
                    py="10"
                    {...form.getInputProps('name')}
                />
                <Textarea
                    label="Description"
                    name="description"
                    placeholder="A haircut"
                    withAsterisk
                    required
                    py="10"
                    {...form.getInputProps('description')}
                />
                <NumberInput
                    label="Price"
                    name="price"
                    placeholder="10"
                    withAsterisk
                    required
                    py="10"
                    {...form.getInputProps('price')}
                />
                <NumberInput
                    label="Duration"
                    name="duration"
                    placeholder="30"
                    withAsterisk
                    required
                    py="10"
                    {...form.getInputProps('duration')}
                />
            </Box>
        </>
    )
    return (
        <form action={props.action}>
            {formItems}
            <Center>
                <Button type="submit">Submit</Button>
            </Center>
        </form>
    )
}
