'use client'

import LoginForm from '@/components/LoginForm/LoginForm'
import { Container } from '@mantine/core'
import React from 'react'

export default function Page() {
    return (
        <main>
            <Container>
                <LoginForm />
            </Container>
        </main>
    )
}
