'use client';
import { Title, Text } from '@mantine/core';
import classes from './Welcome.module.css';
import { LeadGrid } from '../LeadGrid/LeadGrid';

export function Welcome() {
    return (
        <main>
            <Title className={classes.title} ta="center" mt={100}>
                Welcome to{' '}
                <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                    Barber Shop
                </Text>
            </Title>

            <Text c="dimmed" ta="center" size="lg" p='24' maw={580} mx="auto" mt="xl">
                where style meets precision.
                Step into a world of expert grooming and personalized service that caters to the modern man.
            </Text>

            <LeadGrid />
        </main>
    );
}
