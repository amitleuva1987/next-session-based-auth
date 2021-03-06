import { useState } from "react";
import useSWR from "swr";
import custom_axios from "../library/axios";

function Users(){
    const [pageIndex, setPageIndex] = useState(1);
    const { data:categories,error,mutate} = useSWR('/api/categories?page='+pageIndex,url => custom_axios.get(url).then(response => response.data.data))
        
    if(error){
        return(
            <div className="d-flex justify-content-center">
              <div className={'spinner-border text-info ' + styles.spinner} role="status">
                <span className="visually-hidden align-middle">Loading...</span>
              </div>
            </div>
        )
    }

    if(categories){
    const category_list = categories.data.map(category =>
        <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.status}</td>
        </tr>
    )
    return(
        <>
        <h1>List of Users</h1>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>NAME</td>
                    <td>STATUS</td>
                </tr>
            </thead>
            <tbody>
                {category_list}
            </tbody>
        </table>
        <button onClick={() => setPageIndex(1)} className="btn btn-primary me-2" disabled={pageIndex === 1 ? 'disabled':''}>First</button>
        <button onClick={() => setPageIndex(pageIndex - 1)} className="btn btn-primary me-2" disabled={pageIndex === 1 ? 'disabled':''}>Previous</button>
        <button onClick={() => setPageIndex(categories.current_page)} className="btn btn-primary" disabled="disabled">{categories.current_page}</button>
        {categories.current_page < categories.last_page == true &&
            <button onClick={() => setPageIndex(categories.current_page+1)} className="btn btn-primary ms-2">{categories.current_page+1}</button>
        }
        {categories.current_page+1 < categories.last_page == true &&
            <button onClick={() => setPageIndex(categories.current_page+2)} className="btn btn-primary ms-2">{categories.current_page+2}</button>
        }
        <button onClick={() => setPageIndex(pageIndex + 1)} className="btn btn-primary ms-2" disabled={categories.last_page === pageIndex ? 'disabled':''}>Next</button>
        <button onClick={() => setPageIndex(categories.last_page)} className="btn btn-primary ms-2" disabled={pageIndex === categories.last_page ? 'disabled':''}>Last</button>
        </>
    )
    }
}
export default Users;