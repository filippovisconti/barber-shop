'use client';

import { Container } from '@mantine/core';
import React from 'react';
import LoginForm from '@/components/LoginForm/LoginForm';

export default function Page() {
    return (
        <main><Container>
            <LoginForm />
              </Container>
        </main>
    );
}
