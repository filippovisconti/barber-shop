import { Avatar, Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { Service } from '@/app/db/schema';

export function UserInfoAction(props: { service: Service }) {
	return (
		<Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
			<Avatar
				// TODO: Change this to the actual image
				src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
				size={120}
				radius={120}
				mx="auto"
			/>
			<Text ta="center" fz="xl" fw={500} mt="md">
				{props.service.name}
			</Text>
			<Text ta="center" c="dimmed" py="15" fz="sm">
				{props.service.description}
			</Text>
			<Text ta="center" fz="sm">
				{props.service.duration} minutes
			</Text>
			<Text ta="center" fz="sm">
				{props.service.price} €
			</Text>

			<Link href="/appointments/new">
				<Button variant="default" fullWidth mt="md">
					Book now!
				</Button>
			</Link>
		</Paper>
	);
}
