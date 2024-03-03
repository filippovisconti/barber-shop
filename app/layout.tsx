import { FooterSocial } from '@/components/FooterSocial/FooterSocial'
import { HeaderMegaMenu } from '@/components/Header/Header'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import React from 'react'

import { theme } from '../theme'
import { Providers } from './provider'

export const metadata = {
    title: 'Barber Shop Name',
    description:
        'Barber Shop Name is a modern barbershop located in the heart of the city. We offer a wide range of services, from classic haircuts to beard trims and hot towel shaves. Our team of skilled barbers is dedicated to providing an exceptional grooming experience for every client. Book your appointment today!',
}

export default function RootLayout({ children }: { children: any }) {
    const stickyFooter =
        '.content{min-height: 100vh;position: relative;  } footer { position: fixed; bottom: 0; width: 100%; backdrop-filter: blur(4px);}'

    const padBody = '.main-body {padding-bottom:160px}'

    return (
        <html lang="en">
            <head>
                <style>
                    {stickyFooter}
                    {padBody}
                </style>
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

                            <div className="main-body">{children}</div>

                            <FooterSocial />
                        </div>
                    </Providers>
                </MantineProvider>
            </body>
        </html>
    )
}
