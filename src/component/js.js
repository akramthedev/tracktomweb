import React , { useMemo } from 'react';
import { Box } from '@mantine/core';

import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import {ActionIcon,
Flex,
Tooltip,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        header: 'Nom et Prénom',
        accessorKey: 'nom',
        enableGrouping: false, //do not let this column be grouped
      },
      {
        header: 'Email',
        accessorKey: 'email',
        AggregatedCell: ({ cell, table }) => (
          <Box 
            sx={{ color: 'green', display: 'inline', fontWeight: 'bold' ,className:'bg-red-300'}}
          >
            {/* {cell.getValue()} */}
            {cell.row.original.entrepriseEmail} 
          </Box>
        ),
      },
      {
        header: 'Téléphone',
        accessorKey: 'telephone',
        aggregationFn: 'min',
        AggregatedCell: ({ cell, table }) => (
          <Box
            sx={{ color: 'black', display: 'inline', fontWeight: 'bold' }}
          >
            {cell.row.original.entrepriseTelephone} 
          </Box>
        ),
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        AggregatedCell: ({ cell, table }) => (
          <Flex gap="md">
            <Tooltip label="Edit">
              <ActionIcon 
              >
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon color="red" 
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Flex>
        ),
        Cell: ({ row, table }) => (
 

          <Flex gap="md">
          <Tooltip label="Edit">
            <ActionIcon 
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon color="red" 
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Flex>
        ),
      },
      {
        header: 'entreprise',
        accessorKey: 'entrepriseNom',
      },
    ],
  );

  const table = useMantineReactTable({
    columns,
    enableColumnResizing: true,
    enableGrouping: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: {
      density: 'xs',
      expanded: false,
      grouping: ['entrepriseNom'],
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: 'entrepriseNom', desc: false }],
    },
    mantineToolbarAlertBannerBadgeProps: { color: 'blue', variant: 'outline' },
    mantineTableContainerProps: { sx: { maxHeight: 700 } },
  });

  return <MantineReactTable table={table}  className="bg-red-600" />;
};

export default Example;


