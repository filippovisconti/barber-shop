// server component
import { Box, Title } from '@mantine/core'
import { redirect } from 'next/navigation'

import WholeForm from './client'

export interface FormValues {
    name: string
    email: string
    location: string
    service: string
    date: string
    time: string
    notes: string
}

export default async function NewServiceForm() {
    const createService = async (formData: FormData): Promise<void> => {
        'use server'

        if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
        const url: URL = new URL('/api/services/new', process.env.BASE_URL)
        await fetch(url, {
            method: 'POST',
            body: formData,
        }).then(async (response) => {
            if (response.ok) {
                const json = await response.json()
                const service: { id: string } = JSON.parse(JSON.stringify(json))
                redirect(`/services/${service.id}`)
            } else {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
        })
    }

    return (
        <>
            <Title py="20" order={1}>
                New Service
            </Title>
            <Box miw={{ base: 200, sm: 500, md: 600 }} py="20">
                <WholeForm action={createService} />
            </Box>
        </>
    )
}
