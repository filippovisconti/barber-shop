import { Service } from '@/app/db/schema'
import { ServiceInfoAction } from '@/components/ServiceInfoAction/ServiceInfoAction'
import { Box, Center, Container } from '@mantine/core'

async function getData(id: string): Promise<string> {
    if (!process.env.BASE_URL) throw new Error('BASE_URL environment variable is required.')
    if (!id) throw new Error('id in getData is required.')
    const url: URL = new URL(`/api/services/${id}`, process.env.BASE_URL)
    const res = await fetch(url, { cache: 'no-store' })
    return res.json()
}
export default async function Page({ params }: { params: { id: string } }) {
    if (!params.id) throw new Error('No id found')
    const data: string = await getData(params.id)
    if (!data) throw new Error('No data found')
    const chosenService: Service = JSON.parse(JSON.stringify(data)) as Service
    return (
        <main>
            <Container>
                <Center>
                    <Box maw={{ base: 400, sm: 600 }} py="120">
                        <ServiceInfoAction service={chosenService} />
                    </Box>
                </Center>
            </Container>
        </main>
    )
}
