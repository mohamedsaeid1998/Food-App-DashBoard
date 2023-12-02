import { Header, ModalUi, TableData, TableDetailsSec } from "@/SharedModule/Components"
import { UseAuthenticatedQuery } from "@/utils"
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

  //?  **********Get Tags**********//
  const { data: tags } = UseAuthenticatedQuery({
    queryKey: [`getTags`],
    url: `https://upskilling-egypt.com:443
/api/v1/tag`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }
  })

  //?  **********Get categories**********//
  const { data: categories } = UseAuthenticatedQuery({
    queryKey: [`getCategory`],
    url: `https://upskilling-egypt.com:443
/api/v1/Category/`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      },
      params: {
        pageSize: 1000,
        pageNumber: 1
      }
    }
  })




  const [searchParams, setSearchParams] = useState({
    pageNumber: 1,
    name: '',
  });
  const { data: tableData } = UseAuthenticatedQuery({
    queryKey: [`getRecipes`],
    url: `https://upskilling-egypt.com:443
/api/v1/Recipe/`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      params: {
        pageSize: 5,
        pageNumber: searchParams.pageNumber
      }
    }
  })


  return <>
    <ModalUi key={Math.random()} title="Recipes" {...{ setModalState, modalState, itemId, itemName, categories, tags }} />
    <Header title="Recipes" subTitle="Items" para="You can now add your items that any user can order it from" subPara="the Application and you can edit" />
    <TableDetailsSec {...{ showAddModal }} />
    <TableData key={Math.random()} location="recipes" {...{ showDeleteModal, showEditModal, tableData, setSearchParams, searchParams }} />

  </>
}

export default RecipesList