'use client';

import { /* Button, */ Group, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

import { ActionIcon } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';

export function ColorSchemeToggle() {
    const { /* setColorScheme, */ toggleColorScheme } = useMantineColorScheme({
        keepTransitions: true,
    });
    const color = useComputedColorScheme('light');

    return (
        <Group justify="center" mt="xl">
            {/* <Button onClick={() => setColorScheme('light')}>Light</Button>
            <Button onClick={() => setColorScheme('dark')}>Dark</Button>
            <Button onClick={() => setColorScheme('auto')}>Auto</Button> */}
            <ActionIcon
                variant="outline"
                color={color === 'dark' ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
            >
                {color === 'dark' ? (
                    <SunIcon style={{ width: 18, height: 18 }} />
                ) : (
                    <MoonIcon style={{ width: 18, height: 18 }} />
                )}
            </ActionIcon>

        </Group>
    );
}
