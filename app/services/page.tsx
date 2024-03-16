import { EmailBanner } from '@/components/EmailBanner/EmailBanner'
import ServiceTable from '@/components/ServiceTable/ServiceTable'
import { Box, Button, Center, Container, Group, Space, Title } from '@mantine/core'
import Link from 'next/link'

import { Service } from '../db/schema'

async function getData() {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    const res = await fetch(`${process.env.BASE_URL}/api/services`, {
        cache: 'no-store',
    })
    return res.json()
}
function getBaseUrl(): string {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    return process.env.BASE_URL
}
export default async function Page() {
    const data = await getData()
    const serviceNames: Service[] = JSON.parse(JSON.stringify(data)) as Service[]
    const tableAndBanner = (
        <>
            <Box miw={{ base: 200, sm: 500, md: 600 }} py="20">
                <ServiceTable service_names={serviceNames} baseUrl={getBaseUrl()} />
            </Box>
        </>
    )

    return (
        <main>
            <Container>
                <Title py="20" order={1}>
                    List of services
                </Title>
                <Group justify="center" grow visibleFrom="sm">
                    {tableAndBanner}
                </Group>
                <Box hiddenFrom="sm">{tableAndBanner}</Box>
                <Center>
                    <Link href="/services/new">
                        <Button variant="filled" color="green">
                            Add a new service
                        </Button>
                    </Link>
                </Center>
                <Space h="xl" />
                <EmailBanner />
            </Container>
        </main>
    )
}
