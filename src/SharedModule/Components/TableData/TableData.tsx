import { NoDataImg } from '@/assets/images';
import { FaEdit, FaTrash } from "react-icons/fa";
import { NoData } from '..';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';


interface Props {
  showDeleteModal: (id: number) => void
  showEditModal: (data:any) => void
  location: string,
  tableData?: any,
  setSearchParams: any
  searchParams: any
  categories?: any
  tags?: any

}

const TableData = ({ showDeleteModal, showEditModal, location, tableData, setSearchParams, searchParams, tags, categories }: Props) => {

  const {pathname} = useLocation()

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [tableData]);
  
  //! عملت الفانكشن دي بس علشان في ايرور في التايب سكربت
  const handleClose = () => {

  }

  // const [loading, setLoading] = useState(false)

  const getUserNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {

    setSearchParams({
      ...searchParams,
      pageNumber: 1,
      userName: e.target.value,
    });

  }

  const getRoleValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      pageNumber: 1,
      groups: e.target.value,
    });
  }


  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setLoading(true)

    setSearchParams({
      ...searchParams,
      pageNumber: 1,
      name: e.target.value,
    });

  }

  const getTagValue = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setSearchParams({
      ...searchParams,
      pageNumber: 1,
      tagId: +e.target.value,
    });
  }

  const getCategoryValue = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setSearchParams({
      ...searchParams,
      pageNumber: 1,
      categoryId: +e.target.value,
    });
  }



  return <>
    {location === "recipes" ? <div className="row d-flex align-items-center filtration my-2">
      <div className="col-md-5">
        <input ref={searchInputRef} onChange={getNameValue} value={searchParams.name} type="search" className='form-control my-2' placeholder={`Search by ${location === "recipes" ? "Recipe " : "Category "}Name...`} />
      </div>
      <div className="col-md-3">
        <select onChange={getTagValue} value={searchParams.tagId} className="form-select "  >
          <option value={0} className="text-muted">Select Tag</option>
          {tags?.map((tag: any) =>
            <option key={tag.id} value={tag.id}>{tag.name}</option>

          )}
        </select>
      </div>
      <div className="col-md-3">
        <select onChange={getCategoryValue} value={searchParams.categoryId} className="form-select " placeholder="CategoryId" >
          <option value={0} className="text-muted" >Select Category</option>
          {categories?.data?.map((category: any) =>
            <option key={category.id} value={category.id}>{category.name}</option>
          )}
        </select>
      </div>

    </div> :



      location === "Users" ? <div className="row d-flex align-items-center my-2 ">
        <div className="col-md-6">
          <input ref={searchInputRef} onChange={getUserNameValue} value={searchParams.userName} type="search" className='form-control my-2' placeholder={`Search by User Name...`} />
        </div>
        <div className="col-md-6">
          <select onChange={getRoleValue} value={searchParams?.groups} className="form-select " >
            <option value="" className="text-muted">Select Role</option>
            <option value={["1"]}>Admin</option>
            <option value={["2"]}>User</option>
          </select>

        </div>
      </div>



        : <input ref={searchInputRef} onChange={getNameValue} value={searchParams.name} type="search" className='form-control my-3' placeholder={`Search by Category Name...`} />
    }

    {tableData ? <>
      {tableData?.data.length > 0 ? <>
        <table className="table  table-striped ">

          <thead className={`${pathname === "/dashboard/recipes" ? 'red' :pathname === "/dashboard/users"?"blue":"green"}`}>
            <tr >
              <th>Id</th>
              <th>{location === "recipes" ? "Recipe" : location === "Users" ? "Users" : "Categories"} Name</th>

              {location === "Users" ? <>
                <th>Image</th>
                {/* <th>email</th> */}
                {/* <th>PhoneNumber</th> */}
                <th>country</th>
                <th>groups</th>
              </>
                : null}

              {location === "recipes" ? <>
                <th>Price</th>
                <th>Image</th>
                <th>Description</th>
                <th>Tag</th>
                <th>Category</th>
              </> : null}
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
          {tableData?.data.map((data: any, index: number) => 
            <tr key={data?.id} >
              <td data-cell="id ">{index + 1}</td>
              <td data-cell="name ">{location === "Users" ? data?.userName : data?.name}</td>
              {location === "Users" ? <>
                <td data-cell="image">{data?.imagePath === null ? <img className='img-table' src={NoDataImg} alt="image" /> : <img className='img-table ' src={`https://upskilling-egypt.com:443/` + data?.imagePath} alt="image" />}</td>
                {/* <td data-cell="email">{data.email}</td> */}
                {/* <td data-cell="phoneNumber">{data.phoneNumber}</td> */}
                <td data-cell="country ">{data.country}</td>
                <td data-cell="group ">{data.group.name}</td>
              </>
                : null}
              {location === "recipes" ? <>
                <td data-cell="price ">{data?.price}</td>
                <td data-cell="image ">{data?.imagePath === "" ? <img className='img-table' src={NoDataImg} alt="image" /> : <img className=' img-table' src={`https://upskilling-egypt.com:443/` + data?.imagePath} alt="image" />}</td>
                <td data-cell="description ">{data?.description}</td>
                <td data-cell="tag ">{data?.tag?.name}</td>
                <td data-cell="category ">{data?.category[0] === undefined ? "No Category" : data?.category[0]?.name}</td>
              </> : null}
              <td data-cell="actions " className='action  align-items-center gap-3   '>
              <span className="delete text-danger pointer  text-center" >
                  <FaTrash onClick={() => showDeleteModal(data.id)} size={'20px'} />
                </span>

                {location !== "Users" ? <span className="edit text-info pointer d-inline-block  ms-2 text-center">
                  <FaEdit onClick={() => showEditModal(data)} size={'20px'} />
                  
                  
                </span> : null}


              </td>
            </tr>)}

          </tbody>

        </table>

        <nav className='page' aria-label="Page navigation example">
          <ul className="pagination">
          <li className={`page-item ${searchParams.pageNumber <= 1 ? 'disabled' : ''}`}>
      <a className="page-link" onClick={() => setSearchParams({ ...searchParams, pageNumber: Math.max(1, searchParams.pageNumber - 1) })}>
        Previous
      </a>
    </li>
    {Array(tableData?.totalNumberOfPages).fill(0).map((_, i) => i + 1).map((pageNo) =>
      <li key={pageNo} onClick={() => setSearchParams({ ...searchParams, pageNumber: pageNo })} className='page-item'>
        <a className={`page-link ${searchParams.pageNumber === pageNo ? 'activePage' : ''}`}>
          {pageNo}
        </a>
      </li>
    )}
    <li className={`page-item ${searchParams.pageNumber >= (tableData?.totalNumberOfPages || 1) ? 'disabled' : ''}`} >
      <a className="page-link" onClick={() => setSearchParams({ ...searchParams, pageNumber: Math.min(tableData?.totalNumberOfPages || 1, searchParams.pageNumber + 1) })}>
        Next
      </a>
    </li>
      
          </ul>
        </nav>

      </> : <NoData handleClose={handleClose} />}

    </> : <div className=' loading w-100 '>
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