import { Appointment, Location, Service } from '@/app/db/schema'
import { AppointmentInfoAction } from '@/components/AppointmentInfoAction/AppointmentInfoAction'
import { Box, Center, Container } from '@mantine/core'

async function getAppointment(id: string): Promise<string> {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    if (!id) throw new Error('id in getData is required.')
    const url: URL = new URL(`/api/appointments/${id}`, process.env.BASE_URL)
    const res = await fetch(url, { cache: 'no-store' })
    return res.json()
}

async function getService(id: string): Promise<string> {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    if (!id) throw new Error('id in getData is required.')
    const url: URL = new URL(`/api/services/${id}`, process.env.BASE_URL)
    const res = await fetch(url, { cache: 'no-store' })
    return res.json()
}

async function getLocation(id: string): Promise<string> {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    if (!id) throw new Error('id in getData is required.')
    const url: URL = new URL(`/api/locations/${id}`, process.env.BASE_URL)
    const res = await fetch(url, { cache: 'no-store' })
    return res.json()
}

export default async function Page({ params }: { params: { id: string } }) {
    if (params.id === 'undefined') throw new Error('You must provide an id')
    if (!params.id) throw new Error('No id found')
    const rawAppointment: string = await getAppointment(params.id)
    if (!rawAppointment) throw new Error('No data found')
    const appointment: Appointment = JSON.parse(JSON.stringify(rawAppointment)) as Appointment
    const rawService: string = await getService(appointment.serviceId)
    if (!rawService) throw new Error('No data found')
    const service: Service = JSON.parse(JSON.stringify(rawService)) as Service
    const rawLocation: string = await getLocation(appointment.locationId)
    if (!rawLocation) throw new Error('No data found')
    const location: Location = JSON.parse(JSON.stringify(rawLocation)) as Location

    return (
        <main>
            <Container>
                <Center>
                    <Box maw={{ base: 400, sm: 600 }} py="120">
                        <AppointmentInfoAction
                            appointment={appointment}
                            service={service}
                            location={location}
                        />
                    </Box>
                </Center>
            </Container>
        </main>
    )
}
