import { Box, Center, Container, Group, Space, Title } from '@mantine/core';
import ServiceRepository from '../db/repositories/ServiceRepository';
import { Service } from '../db/schema';
import ServiceTable from '@/components/ServiceTable/ServiceTable';
import { EmailBanner } from '@/components/EmailBanner/EmailBanner';
import { ImageActionBanner } from '@/components/ImageActionBanner/ImageActionBanner';

async function getData() {
    const res = ServiceRepository.getAll();
    return res;
}

export default async function Page() {
    const data = await getData();
    const service_names: Service[] = JSON.parse(JSON.stringify(data)) as Service[];
    const table_and_banner = (
        <>
            <Box miw={{base:200, sm: 500, md: 600}} py="20" mx="auto">
                <ServiceTable service_names={service_names} />
            </Box>
            <Box maw={300} mx="auto">
                <ImageActionBanner />
            </Box>
        </>);

    return <main>
        <Container>
            <Title py="20" order={1}>
                List of services
            </Title>
            <Group justify="center" grow visibleFrom="sm">
                {table_and_banner}
            </Group>
            <Box hiddenFrom="sm">
                {table_and_banner}
            </Box>
            <Space h="xl" />
            <EmailBanner />
        </Container>

    </main>;
}
