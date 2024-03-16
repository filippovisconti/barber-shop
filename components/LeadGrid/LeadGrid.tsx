import {
    Badge,
    Button,
    Card,
    Center,
    Container,
    Grid,
    Group,
    SimpleGrid,
    Text,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core'
import { IconMap2, IconRazor } from '@tabler/icons-react'
import Link from 'next/link'

import WelcomeCarousel from '../WelcomeCarousel/Carousel'
import classes from './LeadGrid.module.css'


const height = 350
export function LeadGrid() {
    const theme = useMantineTheme()
    const hotTowelShaveUuid = '1cb819b2-d4db-4f1a-842f-cd1179383515'
    return (
        <Container my="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Card withBorder radius="md" className={classes.card}>
                    <WelcomeCarousel height={height} />
                </Card>
                <Grid gutter="md">
                    <Grid.Col>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>Hot Towel Shave</Text>
                                <Badge color="pink">On Sale</Badge>
                            </Group>

                            <Text size="sm" c="dimmed">
                                Relax and rejuvenate with our luxurious hot towel shave service.
                                Experience the timeless art of grooming as our skilled barbers
                                deliver a smooth and precise shave, leaving your skin feeling
                                refreshed and revitalized.
                            </Text>

                            <Button color="blue" fullWidth mt="md" radius="md">
                                <Link href={`/appointments/new?uuid=${hotTowelShaveUuid}`}>
                                    Book now
                                </Link>
                            </Button>
                        </Card>{' '}
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card withBorder radius="md" className={classes.card}>
                            <SimpleGrid cols={1} m="xs">
                                <UnstyledButton key="location" className={classes.item}>
                                    <Center>
                                        <IconMap2 color={theme.colors['green'][6]} size="2rem" />
                                    </Center>
                                    <Center>
                                        <Link href="/locations">
                                            <Text size="xs" mt={7}>
                                                Locations
                                            </Text>
                                        </Link>
                                    </Center>
                                </UnstyledButton>
                            </SimpleGrid>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card withBorder radius="md" className={classes.card}>
                            <SimpleGrid cols={1} m="xs">
                                <UnstyledButton key="services" className={classes.item}>
                                    <Center>
                                        <IconRazor color={theme.colors['red'][6]} size="2rem" />
                                    </Center>
                                    <Center>
                                        <Link href="/services">
                                            <Text size="xs" mt={7}>
                                                Services
                                            </Text>
                                        </Link>
                                    </Center>
                                </UnstyledButton>
                            </SimpleGrid>
                        </Card>

                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    )
}
