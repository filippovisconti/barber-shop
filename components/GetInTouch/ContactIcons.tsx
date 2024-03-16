import { Box, Stack, Text, rem } from '@mantine/core'
import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react'

import classes from './ContactIcons.module.css'

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: typeof IconSun
    title: React.ReactNode
    description: React.ReactNode
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
    return (
        <div className={classes.wrapper} {...others}>
            <Box mr="md">
                <Icon style={{ width: rem(24), height: rem(24) }} />
            </Box>

            <div>
                <Text size="xs" className={classes.title}>
                    {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    )
}
const email = 'contact@barbershop.com'
const phone = '+1 (555) 123-4567'
const address = '123 Main St, New York, NY 10001'
const hours = 'Mon – Fri: 9am – 7pm'

const MOCKDATA = [
    { title: 'Email', description: email, icon: IconAt },
    { title: 'Phone', description: phone, icon: IconPhone },
    {
        title: 'Address',
        description: address,
        icon: IconMapPin,
    },
    { title: 'Working hours', description: hours, icon: IconSun },
]

export function ContactIconsList() {
    const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />)
    return <Stack>{items}</Stack>
}
