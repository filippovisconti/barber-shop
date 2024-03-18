// server componen

import { Box, Title } from '@mantine/core'
import { redirect } from 'next/navigation'

import WholeForm from './client'

async function getService(id: string) {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    const res = await fetch(`${process.env.BASE_URL}/api/services/${id}`, {
        cache: 'no-store',
    })
    return res.json()
}

export default async function UpdateServiceForm(props: { id: string }) {
    const updateService = async (formData: FormData): Promise<void> => {
        'use server'

        if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
        const url: URL = new URL(`/api/services/${props.id}`, process.env.BASE_URL)
        await fetch(url, {
            method: 'PATCH',
            body: formData,
        }).then(async (response) => {
            if (response.ok) {
                const json = await response.json()
                const service: { id: string } = JSON.parse(JSON.stringify(json))
                redirect(`/services/${service.id}`)
            } else {
                throw new Error(`HTTP error! status: ${await response.text()}`)
            }
        })
    }

    const service = await getService(props.id)

    return (
        <>
            <Title py="20" order={1}>
                Edit Service
            </Title>
            <Box miw={{ base: 200, sm: 500, md: 600 }} py="20">
                <WholeForm action={updateService} service={service} />
            </Box>
        </>
    )
}
