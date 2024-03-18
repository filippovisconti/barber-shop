import UpdateServiceForm from '@/components/UpdateServiceForm/UpdateServiceForm'
import { Container } from '@mantine/core'

export default function Page({ params }: { params: { id: string } }) {
    if (!params.id) throw new Error('No id found')
    return (
        <main>
            <Container>
                <UpdateServiceForm id={params.id} />
            </Container>
        </main>
    )
}
