'use client';

import { Box, Burger, Button, Divider, Drawer, Group, ScrollArea, rem } from '@mantine/core';
import Link from 'next/link';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const links = [
    <Link href="/" className={classes.link}>
      Home
    </Link>,
    <Link href="/locations" className={classes.link}>
      Locations
    </Link>,
    <Link href="/contact-us" className={classes.link}>
      Contact Us
    </Link>,
    <Link href="/appointments/new" className={classes.link}>
      Schedule Appointment
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
            <Button variant="default">
              <Link href="/login">Log in </Link>
            </Button>
            <Button>
              <Link href="/signup">Sign up</Link>
            </Button>
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
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
