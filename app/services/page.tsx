import ServiceRepository from "../db/repositories/ServiceRepository";
import { Service } from "../db/schema";
import ServiceTable from "@/components/ServiceTable/ServiceTable";
import { Container, Title } from '@mantine/core';


async function getData() {
    const res = ServiceRepository.getAll();
    return res;
}

export default async function Page() {
    let data = await getData();
    let service_names: Service[] = JSON.parse(JSON.stringify(data)) as Service[];

    return <main>
        <Container>
            <Title py='20' order={1}>
                List of services
            </Title>
            <ServiceTable service_names={service_names} />
        </Container>
    </main>
}
