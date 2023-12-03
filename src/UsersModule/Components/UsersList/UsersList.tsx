import { Header, ModalUi, TableData, TableDetailsSec } from "@/SharedModule/Components";
import { useEffect, useState } from "react";
import { UseAuthenticatedQuery } from '@/utils';

const UsersList = () => {
  const [modalState, setModalState] = useState("close")
  const [itemId, setItemId] = useState(0)




  const showAddModal = () => {
    setModalState("Add")
  }
  const showDeleteModal = (id: number) => {
    setItemId(id)
    setModalState("Delete")

  }

  const showEditModal = () => {

  }


  const [searchParams, setSearchParams] = useState({
    pageNumber: 1,
    userName: "",
    email: "",
    country:  "",
    groups: [],
  });
  const { data: tableData, refetch } = UseAuthenticatedQuery({
    queryKey: [`getUsers`],
    url: `https://upskilling-egypt.com:443
/api/v1/Users/`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      params: {
        pageSize: 3,
        pageNumber: searchParams.pageNumber,
        userName: searchParams.userName,
        email: searchParams.email,
        country: searchParams.country,
        groups: searchParams.groups,
      }
    }
  })
  useEffect(() => {
    refetch()
  }, [searchParams]);







  return <>
    <ModalUi key={Math.random()} title="Users" {...{ setModalState, modalState, itemId }} />
    <Header title="Users" subTitle="List" para="You can now add your items that any user can order it from " subPara="the Application and you can edit" />
    <TableDetailsSec showAddModal={showAddModal} />
    <TableData key={Math.random()} location="Users" {...{ showDeleteModal, showEditModal,tableData,setSearchParams,searchParams }} />
  </>
}

export default UsersList