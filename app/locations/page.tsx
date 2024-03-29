import LocationCards from '@/components/LocationCards/LocationCards'
import { Center, Container, Title } from '@mantine/core'

import { Location } from '../db/schema'

async function getData() {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    const res = await fetch(`${process.env.BASE_URL}/api/locations`, {
        cache: 'no-store',
    })
    return res.json()
}
export default async function Page() {
    const data = await getData()
    const locations: Location[] = JSON.parse(JSON.stringify(data)) as Location[]
    return (
        <main>
            <Container p="20">
                <Center>
                    <Title order={1}>Find us!</Title>
                </Center>
            </Container>

            <Container p="20">
                At [Barber Shop Name], we believe in the power of a great haircut to boost
                confidence and leave a lasting impression. With a passion for precision and a
                commitment to customer satisfaction, our team of skilled barbers is dedicated to
                providing an exceptional grooming experience for every client. You can find us here!
                [Insert Map here]
            </Container>

            <Container py="30">
                <LocationCards locations={locations} />
            </Container>
        </main>
    )
}
