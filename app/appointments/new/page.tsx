import { Container } from '@mantine/core';
import NewAppointmentForm from '@/components/NewAppointmentForm/NewAppointmentForm';

export default function Page() {
    return (
        <main>
            <Container>
                <NewAppointmentForm />
            </Container>
        </main>
    );
}
