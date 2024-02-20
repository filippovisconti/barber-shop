import { Container } from '@mantine/core';
import LocationRepository from '../db/repositories/LocationRepository';
import LocationCards from '@/components/LocationCards/LocationCards';
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
        <Container>
            At [Barber Shop Name], we believe in the power of a great haircut to boost confidence and
            leave a lasting impression. With a passion for precision and a commitment to customer
            satisfaction, our team of skilled barbers is dedicated to providing an exceptional grooming
            experience for every client. You can find us here!

            [Insert Map here]

            <LocationCards locations={locations} />
        </Container>
    </main>);
};
