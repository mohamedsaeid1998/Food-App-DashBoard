import { Header, ModalUi, TableData, TableDetailsSec } from "@/SharedModule/Components";
import { useEffect, useState } from "react";
import { UseAuthenticatedQuery } from '@/utils';

const CategoriesList = () => {
  const [modalState, setModalState] = useState("close")
  const [itemId, setItemId] = useState(0)
  const [itemName, setItemName] = useState<string | undefined>("")



  const showAddModal = () => {
    setModalState("Add")
  }
  const showDeleteModal = (id: number) => {
    setItemId(id)
    setModalState("Delete")

  }

  const showEditModal = (data:any) => {
    setItemName(data.name)
    setItemId(data.id)
    setModalState("Edit")
  }

  const [searchParams, setSearchParams] = useState({
    pageNumber: 1,
    name: '',
  });

  const { data: tableData , refetch } = UseAuthenticatedQuery({
    queryKey: [`getCategory`],
    url: `https://upskilling-egypt.com:443
/api/v1/Category/`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      params:{
        pageSize:3,
        pageNumber:searchParams?.pageNumber,
        name:searchParams?.name
      }
    }
  })

  useEffect(() => {
    refetch()
  }, [searchParams]);

console.log(searchParams);

  return <>
    <ModalUi key={Math.random()} title="Categories" {...{ setModalState, modalState, itemId, itemName, refetch }} />
    <Header title="Categories" subTitle="Items" para="You can now add your items that any user can order it from" subPara="the Application and you can edit" />
    <TableDetailsSec showAddModal={showAddModal} />
    <TableData key={Math.random()} location="category" {...{ showDeleteModal, showEditModal,tableData,setSearchParams,searchParams }} />
  </>
}

export default CategoriesList