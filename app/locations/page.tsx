import LocationCards from '@/components/LocationCards/LocationCards';
import { Center, Container, Title } from '@mantine/core';
import LocationRepository from '../db/repositories/LocationRepository';
import { Location } from '../db/schema';

async function getData() {
    const res = LocationRepository.getAll();
    return res;
}
export default async function Page() {
    const data = await getData();
    const locations: Location[] = JSON.parse(JSON.stringify(data)) as Location[];
    return (
        <main>
            <Container p='20'>
                <Center>
                    <Title item-center order={1}>Find us!</Title>
                </Center>
            </Container>

            <Container p='20'>
                At [Barber Shop Name], we believe in the power of a great haircut to boost confidence
                and leave a lasting impression. With a passion for precision and a commitment to
                customer satisfaction, our team of skilled barbers is dedicated to providing an
                exceptional grooming experience for every client. You can find us here!

                [Insert Map here]
            </Container>

            <Container py='30'>
                <LocationCards locations={locations} />
            </Container>
        </main>);
}
