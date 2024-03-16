import UpdateAppointmentForm from '@/components/UpdateAppointmentForm/UpdateAppointmentForm'
import { Container } from '@mantine/core'

export default function Page({ params }: { params: { id: string } }) {
    if (!params.id) throw new Error('No id found')
    return (
        <main>
            <Container>
                <UpdateAppointmentForm id={params.id} />
            </Container>
        </main>
    )
}
