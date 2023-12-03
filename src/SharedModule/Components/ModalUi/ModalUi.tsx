import { ChangePass } from "@/AuthModule/Components";
import baseUrl from "@/utils/Custom/Custom";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { NoData } from "..";




interface IProps {
  modalState: string
  setModalState: React.Dispatch<React.SetStateAction<string>>
  itemId?: number
  itemName?: string | undefined
  title?: string
  categories?: any
  tags?: any
  refetch?:any
}

interface IFormInputs {
  name: string
  price?: number
  tagId?: number
  categoriesIds?: number
  description?: string
  recipeImage: string
}


const ModalUi = ({ setModalState, modalState, itemId, itemName, title, categories, tags ,refetch}: IProps) => {
  const required = "This Field is required"
  const [Loading, setLoading] = useState(false)
  const handleClose = () => setModalState("close");

  const { handleSubmit, register, formState: { errors }, reset } = useForm<IFormInputs>()
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const catchSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (file)
      setSelectedImage(URL.createObjectURL(file));
  }



  const onSubmitAdd = (data: IFormInputs) => {
    console.log(data);

    setLoading(true)

    return baseUrl.post(`/api/v1/Category`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
      .then((res) => {
        console.log(res)
        toast.success(' Added Category successfully', {
          autoClose: 2000,
          theme: "colored",
        });
        handleClose()
        reset()
        setLoading(false)
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        });
        setLoading(false)
      })
  }

  //!  **********Update Category**********//
  const onSubmitEdit = (data: IFormInputs) => {
    console.log(data);

    setLoading(true)
    return baseUrl.put(`/api/v1/Category/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
      .then((res) => {
        console.log(res)
        toast.success(' Category Updated successfully', {
          autoClose: 2000,
          theme: "colored",
        });
        handleClose()
        setLoading(false)
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        });
        setLoading(false)
      })
  }

  //TODO  **********Create New Recipes**********//
  const onSubmitRecipes = (data: IFormInputs ,e:any) => {
    const formDatas = new FormData(e.currentTarget)
    console.log(formDatas);
    
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
          autoClose: 2000,
          theme: "colored",
        });
        handleClose()
        setLoading(false)
        refetch()
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        });
        setLoading(false)
      })

  }





  const createNewRecipes = <form onSubmit={handleSubmit(onSubmitRecipes)}>
    <h4 className="text-center">Add New Recipes</h4>
    <input {...register("name", {
      required
    })} className="form-control w-100 mt-3 mb-1" type="text" placeholder="Recipes Name" />
    {errors?.name ? <span className='text-danger'>{errors?.name?.message}</span> : null}

    <input {...register("price", {
      required,
      valueAsNumber: true
    })} className="form-control w-100 mt-3 mb-1" type="number" placeholder="Price" />
    {errors?.price ? <span className='text-danger'>{errors?.price?.message}</span> : null}

    <select {...register("tagId", {
      required,
      valueAsNumber: true
    })} className="form-select w-100 mt-3 mb-1"  >
      <option className="text-muted">Select Tag</option>
      {tags?.map((tag: any) =>
        <option key={tag.id} value={tag.id}>{tag.name}</option>
      )}
    </select>
    {errors?.tagId ? <span className='text-danger'>{errors?.tagId?.message}</span> : null}

    <select {...register("categoriesIds", {
      required,
    })} className="form-select w-100 mt-3 mb-1" placeholder="CategoryId" >
      <option className="text-muted" >Select Category</option>
      {categories?.data?.map((category: any) =>
        <option key={category.id} value={category.id}>{category.name}</option>
      )}
    </select>
    {errors?.categoriesIds ? <span className='text-danger'>{errors?.categoriesIds?.message}</span> : null}

    <textarea {...register("description", {
      required,
    })} className="form-control w-100 mt-3 mb-1" placeholder="Description" >

    </textarea>
    {errors?.description ? <span className='text-danger'>{errors?.description?.message}</span> : null}

    <div className="d-flex ">
      {selectedImage ? <img className='selectedImage me-2' src={selectedImage} alt="selectedImage" /> : null}
      <input {...register("recipeImage", {
      })} className="form-lable mt-3 mb-1 " onChange={catchSelectedImage} type="file" placeholder="add Image" />
    </div>

    <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-2 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Add Recipes"}</button>

  </form>

  const createNewCategory = <form onSubmit={handleSubmit(onSubmitAdd)}>
    <h4> Add New Category </h4>
    <input {...register("name", {
      required,
    })} className="form-control w-100 mt-3 mb-1" type="text" placeholder="New Category" />
    {errors?.name ? <span className='text-danger'>{errors?.name?.message}</span> : null}
    <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-2 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Add Category"}</button>

  </form>


  const UpdateCategory = <form onSubmit={handleSubmit(onSubmitEdit)}>
    <h4> Update Category </h4>
    <input {...register("name", {
      required,
    })} defaultValue={itemName} className="form-control w-100 mt-3 mb-1" type="text" placeholder="New Category" />
    {errors?.name ? <span className='text-danger'>{errors?.name?.message}</span> : null}
    <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-2 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Update Category"}</button>

  </form>



  const render = modalState === 'Add' && title === "Recipes" ? createNewRecipes : modalState === 'Add' && title === "Categories" ? createNewCategory : modalState === 'ChangePass' ? <ChangePass /> : modalState === "Delete" && title === "Categories" ? <NoData location='category' refetch={refetch} itemId={itemId}  handleClose={handleClose} /> : modalState === "Delete" && title === "Recipes" ? <NoData location='recipes' itemId={itemId} refetch={refetch} handleClose={handleClose} /> :modalState === "Delete" && title === "Users"? <NoData location='Users' refetch={refetch} itemId={itemId}  handleClose={handleClose} />: UpdateCategory

  return <>

    <Modal show={modalState === "Add" || modalState === "Edit" || modalState === "Delete" || modalState === "ChangePass"} onHide={handleClose}>
      <Modal.Body>{render}</Modal.Body>
    </Modal>

  </>
}

export default ModalUi