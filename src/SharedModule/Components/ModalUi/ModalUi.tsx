
import { ChangePass } from "@/AuthModule/Components";
import baseUrl from "@/utils/Custom/Custom";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { NoData } from "..";
import { UseAuthenticatedQuery } from "@/utils";

// defaultValue في مشكله  في حتت اني استدعي الفانكشن اللي بتجيب الداتا من الاول لل component ده علشان تعمل update للداتا بعد ما اعمل اي معامله سواء عملية update او delete  وده بسبب التايب سكريبت  



interface IProps {
  modalState: string
  setModalState: React.Dispatch<React.SetStateAction<string>>
  itemId?: number
  itemName?: string | undefined
  title?: string
}

interface IFormInputs {
  name: string
  price?: number
  tagId?: number
  categoriesIds?: number
  description?: string
  recipeImage: string
}


const ModalUi = ({ setModalState, modalState, itemId, itemName, title }: IProps) => {
  // console.log(itemName);

  const [Loading, setLoading] = useState(false)
  const handleClose = () => setModalState("close");

  const { handleSubmit, register, formState: { errors }, reset } = useForm<IFormInputs>()


  //TODO  **********Create New Category**********//
  const onSubmit = (data: IFormInputs) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Category`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
      .then((res) => {
        console.log(res)
        toast.success(' Added Category successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose()
        reset()
        setLoading(false)
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      })
  }

  //!  **********Update Category**********//
  const onSubmitEdit = (data: IFormInputs) => {
    setLoading(true)
    return baseUrl.put(`/api/v1/Category/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
      .then((res) => {
        console.log(res)
        toast.success(' Category Updated successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose()
        setLoading(false)
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      })
  }

  //TODO  **********Create New Recipes**********//
  const onSubmitRecipes = (data: IFormInputs) => {

    console.log(data);
    setLoading(true)
    return baseUrl.post(`/api/v1/Recipe`, { ...data, recipeImage: data.recipeImage[0] }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        console.log(res)
        toast.success('Added Recipes successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose()
        setLoading(false)
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      })

  }

  //?  **********Get Tags**********//
  const { data: tags } = UseAuthenticatedQuery({
    queryKey: [`getTags`],
    url: `http://upskilling-egypt.com:3002/api/v1/tag`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }
  })

  //?  **********Get categories**********//
  const { data: categories } = UseAuthenticatedQuery({
    queryKey: [`getCategory`],
    url: `http://upskilling-egypt.com:3002/api/v1/Category/?pageSize=50&pageNumber=1`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }

  })







  const createNewRecipes = <form onSubmit={handleSubmit(onSubmitRecipes)}>
    <h4 className="text-center">Add New Recipes</h4>
    <input {...register("name", {
      required: "This Field is required"
    })} className="form-control w-100 mt-3 mb-1" type="text" placeholder="Recipes Name" />
    {errors?.name ? <span className='text-danger'>{errors?.name?.message}</span> : null}

    <input {...register("price", {
      required: "This Field is required",
      valueAsNumber: true
    })} className="form-control w-100 mt-3 mb-1" type="number" placeholder="Price" />
    {errors?.price ? <span className='text-danger'>{errors?.price?.message}</span> : null}


    <select {...register("tagId", {
      required: "This Field is required",
      valueAsNumber: true
    })} className="form-control w-100 mt-3 mb-1" placeholder="TagId" >
      {tags?.map((tag: any) =>
        <option key={tag.id} value={tag.id}>{tag.id}</option>
      )}
    </select>
    {errors?.tagId ? <span className='text-danger'>{errors?.tagId?.message}</span> : null}




    <select {...register("categoriesIds", {
      required: "This Field is required",
    })} className="form-control w-100 mt-3 mb-1" placeholder="CategoryId" >
      {categories?.data?.map((category: any) =>
        <option key={category.id} value={category.id}>{category.name}</option>
      )}
    </select>
    {errors?.categoriesIds ? <span className='text-danger'>{errors?.categoriesIds?.message}</span> : null}


    <textarea {...register("description", {
      required: "This Field is required"
    })} className="form-control w-100 mt-3 mb-1" placeholder="Description" >

    </textarea>
    {errors?.description ? <span className='text-danger'>{errors?.description?.message}</span> : null}

    <input {...register("recipeImage", {
    })} className="form-control w-100 mt-3 mb-1" type="file" placeholder="add Image" />

    {Loading ? <button type='button' disabled className='btn btn-success w-100 mt-2 fw-bold'><i className='fa fa-spin fa-spinner'></i></button> : <button type='submit' className=' mt-2 btn btn-success w-100  fw-bold'>Add Recipes</button>}
  </form>

  const createNewCategory = <form onSubmit={handleSubmit(onSubmit)}>
    <h4> Add New Category </h4>
    <input {...register("name", {
      required: "This Field is required"
    })} className="form-control w-100 mt-3 mb-1" type="text" placeholder="New Category" />
    {errors?.name ? <span className='text-danger'>{errors?.name?.message}</span> : null}
    {Loading ? <button type='button' disabled className='btn btn-success w-100 mt-2 fw-bold'><i className='fa fa-spin fa-spinner'></i></button> : <button type='submit' className=' mt-2 btn btn-success w-100  fw-bold'>Add Category</button>}
  </form>

  // defaultValue في مشكله هنا في 
  const UpdateCategory = <form onSubmit={handleSubmit(onSubmitEdit)}>
    <h4> Update Category </h4>
    <input {...register("name", {
      required: "This Field is required",
    })} defaultValue={itemName} className="form-control w-100 mt-3 mb-1" type="text" placeholder="New Category" />
    {errors?.name ? <span className='text-danger'>{errors?.name?.message}</span> : null}
    {Loading ? <button type='button' disabled className='btn btn-success w-100 mt-2 fw-bold'><i className='fa fa-spin fa-spinner'></i></button> : <button type='submit' className=' mt-2 btn btn-success w-100  fw-bold'>Add Category</button>}
  </form>



  const render = modalState === 'Add' ? title === "Recipes" ? createNewRecipes : createNewCategory : modalState === 'ChangePass' ? <ChangePass /> : modalState === "Delete" &&  title==="Categories" ? <NoData location='category' itemId={itemId} handleClose={handleClose} /> : modalState === "Delete" &&  title==="Recipes" ? <NoData location='recipes' itemId={itemId} handleClose={handleClose} /> : UpdateCategory


  return <>

    <Modal show={modalState === "Add" || modalState === "Edit" || modalState === "Delete" || modalState === "ChangePass"} onHide={handleClose}>
      <Modal.Body>{render}</Modal.Body>
    </Modal>

  </>
}

export default ModalUi