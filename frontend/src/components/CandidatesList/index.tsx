import { EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Table, TableColumnsType, TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";

export default function CandidatesList() {
  const navigate = useNavigate();

  const [isOpenDeleteModal, setIsOpenDeleteModal] =
    useState(false);

  const closeDeleteModal = () => setIsOpenDeleteModal(false);

  const deleteCandidate = async () => {
    await axios.delete(`http://localhost/api/candidate/${selectedRow?.id}`);
    closeDeleteModal();
    getCandidates();
  }
  interface DataType {
    name: string,
    email: string,
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
    {
      dataIndex: 'name', key: 'name',
      title: 'Candidate', render: (_, record) => {
        return <div className="flex">
          <img src={`assets/users-${(record.id % 4) + 1}.png`} className="mr-2" />
          <div className="flex flex-column">
            <span>
              <b>
                {record.name}
              </b>
            </span>
            <span>
              {record.email}
            </span>
          </div>
        </div>
      }
    },
    { dataIndex: 'phone', title: 'Phone' },
    { dataIndex: 'disposition', title: 'Disposition' },
    { dataIndex: 'hire_type', title: 'Hire Type' },
    { dataIndex: 'fee', title: 'Fee', render: (_, record) => {
      return record.fee ? `$ ${record.fee}` : ''
    } },
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
          }} placement="bottomRight" trigger={['click']}>
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
        return navigate(`/candidate/${selectedRow?.id}`);
      case 'set-disposition':
        return navigate(`/disposition/${selectedRow?.disposition_id}`);
      case 'delete':
        return setIsOpenDeleteModal(true);
    }
  }

  const getCandidates = async () => {
    const candidatesResponse = await axios.get('http://localhost/api/candidate/');
    const candidatesData = candidatesResponse.data;
    setCandidates(candidatesData?.data || []);
  }

  useEffect(() => {
    getCandidates();
  }, []);


  return (
    <>
      <Table columns={columns} dataSource={candidates} onChange={onChange} />
      <DeleteModal isOpen={isOpenDeleteModal}
        closeModal={closeDeleteModal}
        handleDelete={deleteCandidate} />
    </>
  )
}
