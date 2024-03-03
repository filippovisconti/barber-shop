// server component
import WholeForm from '@/app/appointments/new/client'
import { Location, Service } from '@/app/db/schema'
import { Box, Title } from '@mantine/core'
import { redirect } from 'next/navigation'

export interface FormValues {
    name: string
    email: string
    location: string
    service: string
    date: string
    time: string
    notes: string
}

async function getLocations() {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    const res = await fetch(`${process.env.BASE_URL}/api/locations`, {
        cache: 'no-store',
    })
    return res.json()
}

async function getServices() {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    const res = await fetch(`${process.env.BASE_URL}/api/services`, {
        cache: 'no-store',
    })
    return res.json()
}

export default async function NewAppointmentForm() {
    const rawLocations = await getLocations()
    const rawServices = await getServices()
    const parsedLocations: Location[] = JSON.parse(JSON.stringify(rawLocations))
    const parsedServices: Service[] = JSON.parse(JSON.stringify(rawServices))

    const createAppointment = async (formData: FormData) => {
        'use server'

        if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
        const url: URL = new URL('/api/appointments/new', process.env.BASE_URL)
        await fetch(url, {
            method: 'POST',
            body: formData,
        }).then(async (response) => {
            if (response.ok) {
                const json = await response.json()
                const appoinment: { id: string } = JSON.parse(JSON.stringify(json))
                console.log('Success: appointment created with id', appoinment.id)
                redirect(`/appointments/${appoinment.id}`)
            } else {
                throw new Error(`HTTP error! status: ${response.body}`)
            }
        })
    }

    return (
        <>
            <Title py="20" order={1}>
                Schedule a new appointment
            </Title>
            <Box maw={840} mx="auto">
                <WholeForm
                    action={createAppointment}
                    locations={parsedLocations}
                    services={parsedServices}
                />
            </Box>
        </>
    )
}
