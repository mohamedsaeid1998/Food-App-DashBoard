import { UseAuthenticatedQuery } from '@/utils';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from "react-icons/fa";
import { NoData } from '..';
import emptyData from '@/assets/images/NoData-Img.png'
interface Props {
  showDeleteModal: (id: number) => void
  showEditModal: (id: number, name: string) => void
  location: string
}

const TableData = ({ showDeleteModal, showEditModal, location }: Props) => {
  //! عملت الفانكشن دي بس علشان في ايرور في التايب سكربت
  const handleClose = () => {

  }

  //?  **********Get Categories And Recipes**********//
  const { data } = UseAuthenticatedQuery({
    queryKey: [`get${location === "category" ? "Category" : "Recipes"}`],
    url: `https://upskilling-egypt.com:443
/api/v1/${location === "category" ? "Category" : "Recipe"}/?pageSize=50&pageNumber=1`,
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      }
    }
  })

  const allData = data?.data
  // console.log(allData);
  // ! Error Here 
  const RecipesColumns: GridColDef[] = [
    {
      field: 'id', headerName: 'ID', width: 90, editable: false, renderCell: (params) => {
        return params.id
      },
    },
    {
      field: 'name',
      headerName: 'Recipes Name',
      width: 150,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      editable: false,
    },
    {
      field: 'imagePath',
      headerName: 'Image',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return ( params.formattedValue === "" ? <img className='w-25' src={emptyData} alt="image" /> : <img className='w-25' src={`https://upskilling-egypt.com:443/` + params.row.imagePath} alt="image" /> )

        // <img className='w-25' src={`https://upskilling-egypt.com:443/` + params.row.imagePath} alt="image" />;
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (params?.row?.category[0]===undefined?"No Category":params?.row?.category[0]?.name)
        
        // params?.row?.category[0]?.name
      },
    },
    {
      field: 'tag',
      headerName: 'Tag',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params?.row?.tag?.name

      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const { id, name } = params.row;


        return (<>
          <div className="action d-flex align-items-center gap-3 ">
            <div className="edit text-info pointer">
              <FaEdit onClick={() => showEditModal(id, name)} size={'20px'} />
            </div>
            <div className="delete text-danger pointer" >
              <FaTrash onClick={() => showDeleteModal(id)} size={'20px'} />
            </div>
          </div>

        </>
        );
      },
    },
  ];


  const CategoryColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'name',
      headerName: 'Category Name',
      width: 300,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const { id, name } = params.row;


        return (<>
          <div className="action d-flex align-items-center gap-3 ">
            <div className="edit text-info pointer">
              <FaEdit onClick={() => showEditModal(id, name)} size={'20px'} />
            </div>
            <div className="delete text-danger pointer" >
              <FaTrash onClick={() => showDeleteModal(id)} size={'20px'} />
            </div>
          </div>

        </>
        );
      },
    },
  ];


  return <>
    {allData?.length > 0 ? <DataGrid
      className='px-4 mt-2 dataGrid '
      rows={allData}
      columns={location === "category" ? CategoryColumns : RecipesColumns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 4,
          },
        },
      }}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        }
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnFilter
      disableDensitySelector
      disableColumnSelector
    //! عملت الفانكشن دي بس علشان في ايرور في التايب سكربت
    /> : <NoData handleClose={handleClose} />}

  </>
}

export default TableData