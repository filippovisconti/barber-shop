'use client';
import { GetInTouch } from '@/components/GetInTouch/GetInTouch';
import { Center, Container, Title } from '@mantine/core';

const page = () => (
    <main>

        <Container p='20'>
            <Center>

                <Title pb="20" order={1}>
                    Contact Us
                </Title>

            </Center>
            <GetInTouch/>
        </Container>
    </main>
);

export default page;
