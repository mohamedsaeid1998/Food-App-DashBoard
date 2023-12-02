import { NoDataImg } from '@/assets/images';
import { FaEdit, FaTrash } from "react-icons/fa";
import { NoData } from '..';
interface Props {
  showDeleteModal: (id: number) => void
  showEditModal: (id: number, name: string) => void
  location: string,
  tableData?: any,
  setSearchParams:React.Dispatch<React.SetStateAction<{
    pageNumber: number;
    name: string;
}>>
,searchParams:{
  pageNumber: number;
  name: string;
}

}

const TableData = ({ showDeleteModal, showEditModal, location, tableData, setSearchParams,searchParams}: Props) => {
  //! عملت الفانكشن دي بس علشان في ايرور في التايب سكربت
  const handleClose = () => {

  }

  //?  **********Get Categories And Recipes**********//

  const getNameValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      pageNumber: 1,
      name: e.target.value,
    })
  }

  return <>
    {tableData ?
      <div>
        <input onChange={getNameValue} type="search" className='form-control my-2' placeholder='Search by Category Name...' />
        <table className="table">

          <thead>
            <tr>
              <th>Id</th>
              <th>{location === "recipes" ? "Recipe" : "Category"} Name</th>

              {location === "recipes" ? <>
                <th>Price</th>
                <th>Image</th>
                <th>Description</th>
                <th>Category</th>
                <th>Tag</th>
              </> : null}
              <th>Actions</th>

            </tr>
          </thead>

          <tbody className=''>
            {tableData?.data.length > 0 ? tableData?.data.map((data: any, index: number) => <tr key={data?.id} >
              <th data-cell="id">{index + 1}</th>
              <td data-cell="name">{data?.name}</td>
              {location === "recipes" ? <>
                <td data-cell="price">{data?.price}</td>
                <td data-cell="image">{data?.imagePath === "" ? <img className='w-25' src={NoDataImg} alt="image" /> : <img className='w-50' src={`https://upskilling-egypt.com:443/` + data?.imagePath} alt="image" />}</td>
                <td data-cell="description">{data?.description}</td>
                <td data-cell="category">{data?.category[0] === undefined ? "No Category" : data?.category[0]?.name}</td>
                <td data-cell="tag">{data?.tag?.name}</td>
              </> : null}
              <td data-cell="actions" className='action d-flex align-items-center gap-3'>
                <div className="edit text-info pointer">
                  <FaEdit onClick={() => showEditModal(data.id, data.name)} size={'20px'} />
                </div>
                <div className="delete text-danger pointer" >
                  <FaTrash onClick={() => showDeleteModal(data.id)} size={'20px'} />
                </div>
              </td>
            </tr>
              //   //! عملت الفانكشن دي بس علشان في ايرور في التايب سكربت
            ) : <NoData handleClose={handleClose} />}
          </tbody>

        </table>

        <nav aria-label="...">
          <ul className="pagination pagination-sm">
            {Array(tableData?.totalNumberOfPages).fill(0).map((_, i) => i + 1).map((pageNo) =>
              <li key={pageNo} onClick={() => setSearchParams({ ...searchParams, pageNumber: pageNo })} className="page-item">
                <a className="page-link">
                  {pageNo}
                </a>
              </li>
            )}


          </ul>
        </nav>

      </div>

      : <div className=' loading w-100 '>
        <i className='fa fa-spin fa-spinner fa-7x icon'></i>
      </div>}
  </>
}

export default TableData






// {tableData? <div>
//   {allData?.length > 0 ? <DataGrid
//     className='px-4 mt-2 dataGrid '
//     rows={allData}
//     columns={location === "category" ? CategoryColumns : RecipesColumns}
//     initialState={{
//       pagination: {
//         paginationModel: {
//           pageSize: 4,
//         },
//       },
//     }}
//     slots={{ toolbar: GridToolbar }}
//     slotProps={{
//       toolbar: {
//         showQuickFilter: true,
//         quickFilterProps: { debounceMs: 500 },
//       }
//     }}
//     pageSizeOptions={[5]}
//     checkboxSelection
//     disableRowSelectionOnClick
//     disableColumnFilter
//     disableDensitySelector
//     disableColumnSelector

//   /> : <NoData handleClose={handleClose} />}
//   </div>:<div className=' loading '>
//     <i className='fa fa-spin fa-spinner fa-7x icon'></i>
//     </div>}



// const CategoryColumns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 90, editable: false },
//   {
//     field: 'name',
//     headerName: 'Category Name',
//     width: 300,
//     editable: false,
//   },
//   {
//     field: "action",
//     headerName: "Action",
//     width: 200,
//     renderCell: (params) => {
//       const { id, name } = params.row;


//       return (<>
//         <div className="action d-flex align-items-center gap-3 ">
//           <div className="edit text-info pointer">
//             <FaEdit onClick={() => showEditModal(id, name)} size={'20px'} />
//           </div>
//           <div className="delete text-danger pointer" >
//             <FaTrash onClick={() => showDeleteModal(id)} size={'20px'} />
//           </div>
//         </div>

//       </>
//       );
//     },
//   },
// ];


// const RecipesColumns: GridColDef[] = [
//   {
//     field: 'id', headerName: 'ID', width: 90, editable: false, renderCell: (params) => {
//       return params.id
//     },
//   },
//   {
//     field: 'name',
//     headerName: 'Recipes Name',
//     width: 150,
//     editable: false,
//   },
//   {
//     field: 'price',
//     headerName: 'Price',
//     width: 150,
//     editable: false,
//   },
//   {
//     field: 'imagePath',
//     headerName: 'Image',
//     width: 150,
//     editable: false,
//     renderCell: (params) => {
//       return (params.formattedValue === "" ? <img className='w-25' src={NoDataImg} alt="image" /> : <img className='w-25' src={`https://upskilling-egypt.com:443/` + params.row.imagePath} alt="image" />)
//     },
//   },
//   {
//     field: 'description',
//     headerName: 'Description',
//     width: 150,
//     editable: false,
//   },
//   {
//     field: 'category',
//     headerName: 'Category',
//     width: 150,
//     editable: false,
//     renderCell: (params) => {
//       return (params?.row?.category[0] === undefined ? "No Category" : params?.row?.category[0]?.name)
//     },
//   },
//   {
//     field: 'tag',
//     headerName: 'Tag',
//     width: 150,
//     editable: false,
//     renderCell: (params) => {
//       return params?.row?.tag?.name

//     },
//   },
//   {
//     field: "action",
//     headerName: "Action",
//     width: 100,
//     renderCell: (params) => {
//       const { id, name } = params.row;


//       return (<>
//         <div className="action d-flex align-items-center gap-3 ">
//           <div className="edit text-info pointer">
//             <FaEdit onClick={() => showEditModal(id, name)} size={'20px'} />
//           </div>
//           <div className="delete text-danger pointer" >
//             <FaTrash onClick={() => showDeleteModal(id)} size={'20px'} />
//           </div>
//         </div>

//       </>
//       );
//     },
//   },
// ];