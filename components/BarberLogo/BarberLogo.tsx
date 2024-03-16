import { Center, Image, Title } from '@mantine/core'

export function BarberLogoFooter() {
    return (
        <Center>
            <Image src="/logo.png" alt="Barber Shop" height={50} />
            <Title order={3} ta="center" px={10}>
                {' '}
                Barber Shop{' '}
            </Title>
        </Center>
    )
}

export default function BarberLogo() {
    return (
        <Center>
            <Image src="/logo.png" alt="Barber Shop" height={70} />
            <Title order={2} ta="center" px={10}>
                {' '}
                Barber Shop{' '}
            </Title>
        </Center>
    )
}
