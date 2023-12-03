import { useLocation } from "react-router-dom"

interface Props {
  showAddModal: ()=>void
}

const TableDetailsSec = ({showAddModal}:Props) => {
  const { pathname } = useLocation()

  const title = pathname === '/dashboard/users' ? 'Users' : pathname === '/dashboard/recipes' ? 'Recipe' : 'Category'
  return <>

    <section>
      <div className="row mt-2 align-items-center">

        <div className="col-md-6">
          <div>
            <h5 className="m-0">{title} Table Details</h5>
            <span>You can check all details</span>
          </div>
        </div>

        {pathname === '/dashboard/users' ? null : <div className="col-md-6">
          <div className="text-end">
            <button onClick={showAddModal} className="btn btn-success px-3 py-2 fw-bold">Add New {title}</button>
          </div>
        </div>}

      </div>
    </section>
  </>
}

export default TableDetailsSec