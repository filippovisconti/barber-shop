'use client';

import { /* Button, */ Group, useMantineColorScheme, useComputedColorScheme, ActionIcon } from '@mantine/core';

import { MoonIcon, SunIcon } from '@modulz/radix-icons';

export function ColorSchemeToggle() {
  const { /* setColorScheme, */ toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const color = useComputedColorScheme('light');
  const size = 18;

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
