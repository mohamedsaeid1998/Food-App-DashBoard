import { Header, ModalUi, TableData, TableDetailsSec } from "@/SharedModule/Components";
import { useState } from "react";


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

  const showEditModal = (id: number, name: string) => {
    setItemName(name)
    setItemId(id)
    setModalState("Edit")

  }


  return <>
    <ModalUi title="Categories" {...{ setModalState, modalState, itemId, itemName }} />
    <Header title="Categories" subTitle="Items" para="You can now add your items that any user can order it from" subPara="the Application and you can edit" />
    <TableDetailsSec showAddModal={showAddModal} />
    <TableData location="category" {...{ showDeleteModal, showEditModal }} />
  </>
}

export default CategoriesList