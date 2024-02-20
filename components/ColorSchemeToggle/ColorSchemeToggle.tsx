'use client';

import { /* Button, */ Group, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

import { ActionIcon } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';

export function ColorSchemeToggle() {
    const { /* setColorScheme, */ toggleColorScheme } = useMantineColorScheme({
        keepTransitions: true,
    });
    const color = useComputedColorScheme('light');
    const size = 18

    return (
        <ActionIcon
            variant="outline"
            color={color === 'dark' ? 'yellow' : 'blue'}
            size="lg"
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
        >
            {color === 'dark' ? (
                <SunIcon style={{ width: size, height: size }} />
            ) : (
                <MoonIcon style={{ width: size, height: size }} />
            )}
        </ActionIcon>
    );
}
