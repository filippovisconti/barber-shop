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
    if (!params.id) throw new Error('No id found')
    const raw_appointment: string = await getAppointment(params.id)
    if (!raw_appointment) throw new Error('No data found')
    const appointment: Appointment = JSON.parse(JSON.stringify(raw_appointment)) as Appointment
    const raw_service: string = await getService(appointment.serviceId)
    if (!raw_service) throw new Error('No data found')
    const service: Service = JSON.parse(JSON.stringify(raw_service)) as Service
    const raw_location: string = await getLocation(appointment.locationId)
    if (!raw_location) throw new Error('No data found')
    const location: Location = JSON.parse(JSON.stringify(raw_location)) as Location

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
