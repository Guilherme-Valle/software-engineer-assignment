import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Table, TableColumnsType, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CandidatesList() {
  const navigate = useNavigate();
  interface DataType {
    name: string,
    phone: string,
    disposition: string,
    hire_type: string,
    fee: number,
    created_at_candidate: string,
    created_at_disposition: string,
    id: number,
    disposition_id: number
  }

  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);

  const [candidates, setCandidates] = useState([]);

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
    switch (key) {
      case 'edit': 
        return navigate(`/candidate/${selectedRow?.id}`)
      case 'set-disposition':
        return navigate(`/disposition/${selectedRow?.disposition_id}`)
    }
  }

  const getCandidates = async() => {
    const candidatesResponse = await axios.get('http://localhost/api/candidate/');
    const candidatesData = candidatesResponse.data;
    setCandidates(candidatesData?.data || []);
  }

  useEffect(() => {
    getCandidates();
  }, []);


  return (
    <div>
      <Table columns={columns} dataSource={candidates} onChange={onChange} />
    </div>
  )
}
