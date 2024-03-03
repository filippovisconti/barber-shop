import { Button, Card, Overlay, Text } from '@mantine/core'
import Link from 'next/link'

import classes from './ImageActionBanner.module.css'

export function ImageActionBanner() {
    return (
        <Card radius="md" className={classes.card}>
            <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

            <div className={classes.content}>
                <Text size="lg" fw={700} className={classes.title}>
                    Contact us!
                </Text>

                <Text size="sm" className={classes.description}>
                    Save up to 25% at Fifth Season Hotels in Europe, the Middle East, Africa and
                    Asia Pacific
                </Text>

                <Link href="/appointments/new">
                    <Button className={classes.action} variant="white" color="dark" size="xs">
                        Book now
                    </Button>
                </Link>
            </div>
        </Card>
    )
}
