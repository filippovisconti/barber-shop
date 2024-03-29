import {
    ActionIcon,
    Button,
    Group,
    SimpleGrid,
    Text,
    TextInput,
    Textarea,
    Title,
} from '@mantine/core'
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react'

import { ContactIconsList } from './ContactIcons'
import classes from './ContactUs.module.css'

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram]

export function ContactUs() {
    const icons = social.map((Icon, index) => (
        <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
            <Icon size="1.4rem" stroke={1.5} />
        </ActionIcon>
    ))

    return (
        <div className={classes.wrapper}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
                <div>
                    <Title className={classes.title}>Reach out</Title>
                    <Text className={classes.description} mt="sm" mb={30}>
                        Leave your email and we will get back to you as soon as possible, or call us
                        right away!
                    </Text>

                    <ContactIconsList />

                    <Group mt="xl">{icons}</Group>
                </div>
                <div className={classes.form}>
                    <TextInput
                        label="Email"
                        placeholder="your@email.com"
                        required
                        classNames={{
                            input: classes.input,
                            label: classes.inputLabel,
                        }}
                    />
                    <TextInput
                        label="Name"
                        placeholder="John Doe"
                        mt="md"
                        classNames={{
                            input: classes.input,
                            label: classes.inputLabel,
                        }}
                    />
                    <Textarea
                        required
                        label="Your message"
                        placeholder="I want to order your goods"
                        minRows={4}
                        mt="md"
                        classNames={{
                            input: classes.input,
                            label: classes.inputLabel,
                        }}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button className={classes.control}>Send message</Button>
                    </Group>
                </div>
            </SimpleGrid>
        </div>
    )
}
