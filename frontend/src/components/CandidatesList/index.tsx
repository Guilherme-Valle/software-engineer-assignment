import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";

export default function CandidatesList() {
  interface DataType {
    name: string,
    phone: string,
    disposition: string,
    hire_type: string,
    fee: number,
    created_at_candidate: string,
    created_at_disposition: string,
    id: number
  }

  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);

  const data = [
    {
      id: 1,
      name: 'John',
      phone: '595-595-959',
      disposition: 'Rejected',
      hire_type: 'External',
      fee: 300,
      created_at_candidate: '16 of august, 2031',
      created_at_disposition: '12 of august, 2031',
    },
    {
      id: 2,
      name: 'Jack',
      phone: '595-595-959',
      disposition: 'Rejected',
      hire_type: 'External',
      fee: 300,
      created_at_candidate: '16 of august, 2031',
      created_at_disposition: '12 of august, 2031',
    }
  ]
  const columns: TableColumnsType<DataType> = [
    { dataIndex: 'name', title: 'Candidate' },
    { dataIndex: 'phone', title: 'Phone' },
    { dataIndex: 'disposition', title: 'Disposition' },
    { dataIndex: 'hire_type', title: 'Hire Type' },
    { dataIndex: 'fee', title: 'Fee' },
    { dataIndex: 'created_at_candidate', title: 'Candidate created' },
    { dataIndex: 'created_at_disposition', title: 'Disposition created' },
    {
      key: 'action',
      title: <EllipsisOutlined />,
      render: (_, record) => {
        return <Dropdown 
        onOpenChange={(open) => {
          if (open) {
            setSelectedRow(record);
          }
        }}
        menu={{
          items: candidateActions,
          onClick: onClickMenu
        }} placement="bottom" trigger={['click']}>
          <EllipsisOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      }
    },
  ];

  const candidateActions: MenuProps['items'] = [
    {
      key: 'edit',
      label: <a>
        Edit
      </a>
    },
    {
      key: 'set-disposition',
      label: <a>
        Set disposition
      </a>
    },
    {
      key: 'delete',
      label: <a>
        Delete
      </a>
    },
  ]

  

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onClickMenu: MenuProps['onClick'] = ({ key }) => {
    alert(`${key} para ${selectedRow?.id}`);
  }


  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}
