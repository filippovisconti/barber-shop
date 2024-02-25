import { EmailBanner } from '@/components/EmailBanner/EmailBanner';
import { ImageActionBanner } from '@/components/ImageActionBanner/ImageActionBanner';
import ServiceTable from '@/components/ServiceTable/ServiceTable';
import { Box, Container, Group, Space, Title } from '@mantine/core';
import { Service } from '../db/schema';

async function getData() {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.');
    const res = await fetch(`${process.env.BASE_URL}/api/services`, { cache: "no-store" });
    return res.json();
}

export default async function Page() {
    const data = await getData();
    const service_names: Service[] = JSON.parse(JSON.stringify(data)) as Service[];
    const table_and_banner = (
        <>
            <Box miw={{ base: 200, sm: 500, md: 600 }} py="20">
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
