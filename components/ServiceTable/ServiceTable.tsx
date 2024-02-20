'use client';

import { Service } from '@/app/db/schema';
import { Table, Text} from '@mantine/core';

import React from 'react'

export default function ServiceTable(props : {service_names: Service[]}) {
    const rows = props.service_names.map((element : Service) => (
    <Table.Tr key={element.id}>
      <Table.Td><Text fw={700}>{element.name}</Text></Table.Td>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td>{element.price} €</Table.Td>
      <Table.Td>{element.duration} minutes </Table.Td>
    </Table.Tr>
  ));

  const service_table = (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Service</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Duration</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
  return service_table;
}
