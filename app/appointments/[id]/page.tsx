import { Box, Center, Container } from '@mantine/core'
import { Appointment } from '@/app/db/schema'
import { AppointmentInfoAction } from '@/components/AppointmentInfoAction/AppointmentInfoAction'

async function getData(id: string): Promise<string> {
    if (!process.env.BASE_URL)
        throw new Error('BASE_URL environment variable is required.')
    if (!id) throw new Error('id in getData is required.')
    const url: URL = new URL(`/api/appointments/${id}`, process.env.BASE_URL)
    const res = await fetch(url, { cache: 'no-store' })
    const res_json = res.json()
    return res_json
}
export default async function Page({ params }: { params: { id: string } }) {
    if (!params.id) throw new Error('No id found')
    const data: string = await getData(params.id)
    if (!data) throw new Error('No data found')
    const appointment: Appointment = JSON.parse(
        JSON.stringify(data)
    ) as Appointment
    return (
        <main>
            <Container>
                <Center>
                    <Box maw={{ base: 400, sm: 600 }} py="120">
                        <AppointmentInfoAction appointment={appointment} />
                    </Box>
                </Center>
            </Container>
        </main>
    )
}
