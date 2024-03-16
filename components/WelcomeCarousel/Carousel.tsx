import { Carousel } from '@mantine/carousel'
import { Image } from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

export default function WelcomeCarousel(props: { height: number }) {
    const autoplay = useRef(Autoplay({ delay: 2000 }))
    const height = props.height || 300
    // TODO: replace with actual images
    const images = [
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png',
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png',
    ]
    const slides = images.map((image, index) => (
        <Carousel.Slide key={index}>
            <Image radius="md" src={image} h={height} alt="Slide" />
        </Carousel.Slide>
    ))
    return (
        <Carousel plugins={[autoplay.current]} withIndicators height={height}>
            {slides}
        </Carousel>
    )
}
