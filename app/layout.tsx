import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { HeaderMegaMenu } from '@/components/Header/Header';
import { FooterSocial } from '@/components/FooterSocial/FooterSocial';
import { Providers } from './provider';

export const metadata = {
    title: 'Barber Shop Name',
    description:
        'Barber Shop Name is a modern barbershop located in the heart of the city. We offer a wide range of services, from classic haircuts to beard trims and hot towel shaves. Our team of skilled barbers is dedicated to providing an exceptional grooming experience for every client. Book your appointment today!',
};

export default function RootLayout({ children }: { children: any }) {
    const css = '.content{min-height: 100vh;position: relative; } footer { position: absolute; bottom: 0; width: 100%;}';
    return (
        <html lang="en">
            <head>
                <style>{css}</style>
                <ColorSchemeScript defaultColorScheme="auto" />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <Providers>
                        <div className="content">

                            <HeaderMegaMenu />

                            <div>{children}</div>

                            <FooterSocial />
                        </div>
                    </Providers>
                </MantineProvider>
            </body>
        </html>
    );
}
