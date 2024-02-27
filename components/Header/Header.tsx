'use client';

import { Box, Burger, Button, Divider, Drawer, Group, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import Link from 'next/link';
import classes from './Header.module.css';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export function HeaderMegaMenu() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

	const links = [
		<Link key="1" href="/" className={classes.link}>
			Home
		</Link>,
		<Link key="2" href="/locations" className={classes.link}>
			Locations
		</Link>,
		<Link key="3" href="/contact-us" className={classes.link}>
			Contact Us
		</Link>,
		<Link key="7" href="/services" className={classes.link}>
			Services
		</Link>,
		<Link key="4" href="/appointments/new" className={classes.link}>
			Schedule Appointment
		</Link>,
	];

	const login_signup = [
		<Link key="5" href="/login">
			<Button variant="default">Log in</Button>
		</Link>,
		<Link key="6" href="/signup">
			<Button>Sign up</Button>
		</Link>,
	];

	return (
		<Box pb={120}>
			<header className={classes.header}>
				<Group justify="space-between" h="100%">
					<MantineLogo size={30} />
					<Group h="100%" gap={0} visibleFrom="sm">
						{links}
					</Group>
					<Group visibleFrom="sm">
						<ColorSchemeToggle />
						{login_signup}
					</Group>
					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="Navigation"
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
					<Divider my="sm" />
					{links}
					<Divider my="sm" />

					<Group justify="center" grow pb="xl" px="md">
						{login_signup}
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
