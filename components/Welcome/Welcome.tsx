'use client'

import { Text, Title } from '@mantine/core'

import { LeadGrid } from '../LeadGrid/LeadGrid'
import classes from './Welcome.module.css'

export function Welcome() {
    return (
        <main>
            <Title className={classes.title} ta="center" mt={20}>
                Welcome to{' '}
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: 'pink', to: 'yellow' }}
                >
                    Barber Shop
                </Text>
            </Title>

            <Text c="dimmed" ta="center" size="lg" p="24" maw={580} mx="auto" mt="xl" pb="50">
                where style meets precision. Step into a world of expert grooming and personalized
                service that caters to the modern man.
            </Text>

            <LeadGrid />
        </main>
    )
}
