'use client';

import { Center, Container, Title } from '@mantine/core';
import { GetInTouch } from '@/components/GetInTouch/GetInTouch';

const page = () => (
    <main>

        <Container p="20">
            <Center>

                <Title pb="20" order={1}>
                    Contact Us
                </Title>

            </Center>
            <GetInTouch />
        </Container>
    </main>
);

export default page;
