import {
    Anchor,
    Card,
    Center,
    Group,
    SimpleGrid,
    Text,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
import {
    IconBuildingBank,
    IconCashBanknote,
    IconCoin,
    IconCreditCard,
    IconReceipt,
    IconReceiptRefund,
    IconReceiptTax,
    IconRepeat,
    IconReport,
} from '@tabler/icons-react';
import classes from './ActionsGrid.module.css';

const mockdata = [
    { title: 'Credit cards', icon: IconCreditCard, color: 'violet' },
    { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
    { title: 'Transfers', icon: IconRepeat, color: 'blue' },
    { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
    { title: 'Receipts', icon: IconReceipt, color: 'teal' },
    { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' },
    { title: 'Reports', icon: IconReport, color: 'pink' },
    { title: 'Payments', icon: IconCoin, color: 'red' },
    { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
];

export function ActionsGrid() {
    const theme = useMantineTheme();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item}>
            <Center>
                <item.icon color={theme.colors[item.color][6]} size="2rem" />
            </Center>
            <Center>
                <Text size="xs" mt={7}>
                    {item.title}
                </Text>
            </Center>
        </UnstyledButton>
    ));

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Group justify="space-between">
                <Text className={classes.title}>Services</Text>
                <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }} href="/services">
                    + 21 other services
                </Anchor>
            </Group>
            <SimpleGrid cols={3} mt="md">
                {items}
            </SimpleGrid>
        </Card>
    );
}
