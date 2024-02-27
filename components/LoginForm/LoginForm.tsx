'use client';

import { Box } from '@mantine/core';
import { AuthenticationForm } from '../AuthenticationForm/AuthenticationForm';

export default function LoginForm() {
	return (
		<Box maw={450} mx="auto">
			<AuthenticationForm />
		</Box>
	);
}
