// server component
import WholeForm from '@/app/appointments/new/client';
import { Location, Service } from '@/app/db/schema';
import {
    Box,
    Title
} from '@mantine/core';

export interface FormValues {
    name: string;
    email: string;
    location: string;
    service: string;
    date: string;
    time: string;
}

async function getLocations() {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.');
    const res = await fetch(`${process.env.BASE_URL}/api/locations`, { cache: 'no-store' });
    return res.json();
}

async function getServices() {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.');
    const res = await fetch(`${process.env.BASE_URL}/api/services`, { cache: 'no-store' });
    return res.json();
}

export default async function NewAppointmentForm() {
    const rawLocations = await getLocations();
    const rawServices = await getServices();
    const parsedLocations: Location[] = JSON.parse(JSON.stringify(rawLocations));
    const parsedServices: Service[] = JSON.parse(JSON.stringify(rawServices));
    const locations = parsedLocations.map((location) => location.name);
    const services = parsedServices.map((service) => service.name);


    const handleSubmit = async (values: FormValues, event) => {
        "use server";
        event.preventDefault();
        if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.');
        const url: URL = new URL(`/api/appointments/new`, process.env.BASE_URL);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            <Title py="20" order={1}>
                Schedule a new appointment
            </Title>
            <Box maw={840} mx="auto">
                <WholeForm handleSubmit={handleSubmit} locations={locations} services={services} />
            </Box>
        </>
    );
}
