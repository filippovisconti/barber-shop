'use client'

import { ActionIcon, Container, Group, Text, rem } from '@mantine/core'
import { MantineLogo } from '@mantinex/mantine-logo'
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'

import classes from './FooterSocial.module.css'

export function FooterSocial() {
    const { data: session } = useSession()

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <MantineLogo size={28} />
                {session ? <Text fz="xs"> Signed in as {session.user?.email} </Text> : <></>}

                <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandWhatsapp
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandFacebook
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    )
}
