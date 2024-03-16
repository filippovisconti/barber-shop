// server component
import { Appointment, Location, Service } from '@/app/db/schema'
import WholeForm from '@/components/UpdateAppointmentForm/client'
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

async function getAppointment(id: string): Promise<Appointment> {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    if (!id) throw new Error('id in getData is required.')
    const url: URL = new URL(`/api/appointments/${id}`, process.env.BASE_URL)
    const res = await fetch(url, { cache: 'no-store' })
    return res.json()
}

export default async function UpdateAppointmentForm(props: { id: string }) {
    const rawLocations = await getLocations()
    const rawServices = await getServices()
    const rawAppointment = await getAppointment(props.id)
    const parsedLocations: Location[] = JSON.parse(JSON.stringify(rawLocations))
    const parsedServices: Service[] = JSON.parse(JSON.stringify(rawServices))
    const parsedAppointment: Appointment = JSON.parse(JSON.stringify(rawAppointment))

    const updateAppointment = async (formData: FormData) => {
        'use server'

        if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
        const url: URL = new URL(`/api/appointments/${props.id}`, process.env.BASE_URL)
        await fetch(url, {
            method: 'PATCH',
            body: formData,
        }).then(async (response) => {
            if (response.ok) {
                const json = await response.json()
                const appoinment: { id: string } = JSON.parse(JSON.stringify(json))
                if (appoinment.id === undefined) throw new Error(`No id found: ${appoinment}`)
                redirect(`/appointments/${appoinment.id}`)
            } else {
                throw new Error(`HTTP error! status: ${response.text}`)
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
                    action={updateAppointment}
                    appointment={parsedAppointment}
                    locations={parsedLocations}
                    services={parsedServices}
                />
            </Box>
        </>
    )
}
