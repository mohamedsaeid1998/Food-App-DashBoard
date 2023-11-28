import noData from '@/assets/images/NoData-Img.png'
import baseUrl from '@/utils/Custom/Custom'
import { toast } from 'react-toastify'
interface IProps {
  location?: string
  handleClose: () => void
  itemId?:number
}



const NoData = ({ location, handleClose ,itemId}: IProps) => {
console.log(location);

  const deleteCategory = () => {
    return baseUrl.delete(`/api/v1/${location==="category"?"Category":"Recipe"}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
      .then((res) => {
        console.log(res)
        toast.success(`  ${location==="category"?"Category":"Recipe"} Deleted successfully`, {
          autoClose: 2000,
          theme: "colored",
        });
        handleClose()
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          autoClose: 2000,
          theme: "colored",
        });
      })
  }






  return <>
    <div className='text-center'>
      <img src={noData} alt="noData-img" />
      <h4 className='pt-1 mb-0'>{location === "category" || location === "recipes" ? "Delete This Item ?" : "No Data !"}</h4>
      {location === "category" || location === "recipes" ? <div>
        <p className='mutedColor'>are you sure you want to delete this item ? if you are sure just <br /> click on delete it</p>
        <button onClick={deleteCategory} className=" btn btn-outline-danger">Delete This Item </button>
      </div>
        : null}
    </div>
  </>
}

export default NoData