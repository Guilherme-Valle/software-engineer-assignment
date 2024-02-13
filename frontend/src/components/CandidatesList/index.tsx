import { Table, TableColumnsType, TableProps } from "antd";

export default function CandidatesList() {
  interface DataType {
    name: string,
    phone: string,
    disposition: string,
    hire_type: string,
    fee: number,
    created_at_candidate: string,
    created_at_disposition: string,
  }

  const data = [
    {
      name: 'John',
      phone: '595-595-959',
      disposition: 'Rejected',
      hire_type: 'External',
      fee: 300,
      created_at_candidate: '16 of august, 2031',
      created_at_disposition: '12 of august, 2031',
    },
    {
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
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}
