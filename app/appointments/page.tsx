import { JoinAppointment } from '@/app/db/schema'
import AppointmentTable from '@/components/AppointmentTable/AppointmentTable'
import { EmailBanner } from '@/components/EmailBanner/EmailBanner'
import { Box, Container, Group, Space, Title } from '@mantine/core'

async function getData(): Promise<string> {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    const url: URL = new URL(`/api/appointments/join`, process.env.BASE_URL)
    const res = await fetch(url, { cache: 'no-store' })
    return res.json()
}
function getDeleteAppointmentUrl(): string {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    return process.env.BASE_URL
}

export default async function Page() {
    const data: string = await getData()
    if (!data) throw new Error('No data found')
    const appointments: JoinAppointment[] = JSON.parse(JSON.stringify(data)) as JoinAppointment[]

    const tableAndBanner = (
        <Box miw={{ base: 200, sm: 500, md: 600 }} py="20">
            <AppointmentTable
                appointments={appointments}
                deleteAppointmentUrl={getDeleteAppointmentUrl()}
            />
        </Box>
    )

    return (
        <main>
            <Container>
                <Title py="20" order={1}>
                    List of all appointments
                </Title>
                <Group justify="center" grow visibleFrom="sm">
                    {tableAndBanner}
                </Group>
                <Box hiddenFrom="sm">{tableAndBanner}</Box>
                <Space h="xl" />
                <EmailBanner />
            </Container>
        </main>
    )
}
