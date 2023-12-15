
import { NoDataImg } from '@/assets/images'
import baseUrl from '@/utils/Custom/Custom'
import { useState } from 'react'
import { toast } from 'react-toastify'
interface IProps {
  location?: string
  handleClose: () => void
  itemId?:number
  refetch?:any
}



const NoData = ({ location, handleClose ,itemId,refetch}: IProps) => {

  const [Loading, setLoading] = useState(false)
console.log(refetch);
console.log(itemId);

  const deleteCategory = () => {
    setLoading(true)
    return baseUrl.delete(`/api/v1/${location==="category"?"Category":location==="Users"? "Users": "Recipe"}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
      .then((res) => {
        console.log(res)
        toast.success(` ${location==="category"?"Category": location==="Users"? "Users":"Recipe"} Deleted successfully`, {
          autoClose: 2000,
          theme: "colored",
        })
        handleClose()
        refetch()
        setLoading(false)
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        })
        setLoading(false)
      })
  }



  return <>
    <div className='text-center '>
      <img src={NoDataImg} alt="noData-img" />
      <h4 className='pt-1 mb-0'>{location === "category" || location === "recipes" ||location==="Users" ? "Delete This Item ?" : "No Data !"}</h4>
      {location === "category" || location === "recipes"|| location==="Users" ? <div>
        <p className='mutedColor'>are you sure you want to delete this item ? if you are sure just <br /> click on delete it</p>
        <button onClick={deleteCategory} disabled={Loading} className=" btn btn-outline-danger">{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Delete This Item"} </button>
        
      </div>
        : null}
    </div>
  </>
}

export default NoData