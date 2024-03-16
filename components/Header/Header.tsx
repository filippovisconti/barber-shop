'use client'

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import {
    Box,
    Burger,
    Button,
    Divider,
    Drawer,
    Group,
    Indicator,
    ScrollArea,
    Text,
    rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import BarberLogo from '../BarberLogo/BarberLogo'
import classes from './Header.module.css'

export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
    const { data: session } = useSession()

    // <Link key="2" href="/locations" className={classes.link}>
    // Locations
    // </Link>,
    // <Link key="7" href="/services" className={classes.link}>
    // Services
    // </Link>,
    const links = [
        <Link key="5" href="/appointments" className={classes.link}>
            <Text c="dimmed" size="xs">
                All appointments
            </Text>
        </Link>,
        <Link key="1" href="/" className={classes.link}>
            Home
        </Link>,
        <Link key="3" href="/contact-us" className={classes.link}>
            Contact Us
        </Link>,
        <Link key="4" href="/appointments/new" className={classes.link}>
            <Indicator processing offset={-4}>
                Schedule Appointment
            </Indicator>
        </Link>,
    ]

    const loginSignupItem = (
        <>
            {session ? (
                <>
                    Welcome back, {session.user?.name}!{' '}
                    <Link key="5" href="/api/auth/signout">
                        <Button>Sign out</Button>
                    </Link>
                </>
            ) : (
                <Link key="6" href="/api/auth/signin">
                    <Button>Sign in</Button>
                </Link>
            )}
        </>
    )

    const responsiveCutOff = 'xl'

    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Link key="1" href="/" className={classes.homelink}>
                        <BarberLogo />
                    </Link>
                    <Group h="100%" gap={0} visibleFrom={responsiveCutOff}>
                        {links}
                    </Group>
                    <Group visibleFrom={responsiveCutOff}>
                        {loginSignupItem}
                        <ColorSchemeToggle />
                    </Group>
                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom={responsiveCutOff}
                    />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom={responsiveCutOff}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />
                    {links}
                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        {loginSignupItem}
                        <ColorSchemeToggle />
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    )
}
