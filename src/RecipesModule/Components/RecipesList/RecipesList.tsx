import { Header, ModalUi, TableData, TableDetailsSec } from "@/SharedModule/Components"
import { useState } from "react"

const RecipesList = () => {

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
    <ModalUi key={Math.random()} title="Recipes" {...{ setModalState, modalState, itemId, itemName }} />
    <Header title="Recipes" subTitle="Items" para="You can now add your items that any user can order it from" subPara="the Application and you can edit" />
    <TableDetailsSec {...{ showAddModal }} />
    <TableData key={Math.random()} location="recipes" {...{ showDeleteModal, showEditModal }} />

  </>
}

export default RecipesList