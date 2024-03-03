'use client'

import { Anchor, Badge, Button, Card, Group, Image, Text } from '@mantine/core'
import { Location } from '@/app/db/schema'

function GenerateCard(location: Location) {
    const opens: String = `${new Date(location.openingAt).getHours().toString().padStart(2, '0')}:${new Date(location.openingAt).getMinutes().toString().padEnd(2, '0')}`
    const closes: String = `${new Date(location.closingAt).getHours().toString().padStart(2, '0')}:${new Date(location.closingAt).getMinutes().toString().padEnd(2, '0')}`
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fz="lg" fw={500}>
                    {location.name}
                </Text>
                <Badge color="pink">{location.city}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {location.address}, {location.city}
            </Text>
            {`${opens} - ${closes}`}
            <Anchor href="https://maps.google.com" target="_blank" mt="sm">
                <Button color="blue" fullWidth mt="md" radius="md">
                    Open in Google Maps
                </Button>
            </Anchor>
        </Card>
    )
}

export default function LocationCards(props: { locations: Location[] }) {
    const cards = props.locations.map((location) => GenerateCard(location))
    return (
        <Group p="20" justify="center" grow>
            {cards}
        </Group>
    )
}
