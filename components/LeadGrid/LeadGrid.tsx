import {
	Badge,
	Button,
	Card,
	Container,
	Grid,
	Group,
	SimpleGrid,
	Skeleton,
	Text,
	rem,
} from '@mantine/core';
import Link from 'next/link';
import { ActionsGrid } from '../ActionsGrid/ActionsGrid';

const PRIMARY_COL_HEIGHT = rem(300);

export function LeadGrid() {
	const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

	return (
		<Container my="md">
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
				<ActionsGrid />
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
								<Link href="/appointments/new">Book now</Link>
							</Button>
						</Card>{' '}
					</Grid.Col>
					<Grid.Col span={6}>
						<Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
					</Grid.Col>
					<Grid.Col span={6}>
						<Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
					</Grid.Col>
				</Grid>
			</SimpleGrid>
		</Container>
	);
}
