import { Header, ModalUi, TableData, TableDetailsSec } from "@/SharedModule/Components";
import { UseAuthenticatedQuery } from '@/utils';
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

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

  const showEditModal = (id: number) => {
    setItemId(id)
    setModalState("Edit")
  }

  const [searchParams, setSearchParams] = useState({
    pageNumber: 1,
    userName: "",
    email: "",
    country: "",
    groups: [],
  });
  const { data: tableData, refetch } = UseAuthenticatedQuery({
    queryKey: [`getUsers`],
    url: `https://upskilling-egypt.com:3006
/api/v1/Users/`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      params: {
        pageSize: 7,
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




  const { data: role } = UseAuthenticatedQuery({
    queryKey: [`getUserDetails`],
    url: `https://upskilling-egypt.com:3006/api/v1/Users/currentUser`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      }
    }
  })


  return <>
    <Helmet>
      <title> Users • Food App</title>
    </Helmet>
    <ModalUi key={Math.random()} title="Users" {...{ setModalState, modalState, itemId, refetch, role }} />
    <Header title="Users" subTitle="List" para="You can now add your items that any user can order it from " subPara="the Application and you can edit" />
    <TableDetailsSec showAddModal={showAddModal} />
    <TableData key={Math.random()} location="Users" {...{ showDeleteModal, showEditModal, tableData, setSearchParams, searchParams }} />
  </>
}

export default UsersList