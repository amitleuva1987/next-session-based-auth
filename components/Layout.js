import Navbar from "./Navbar";

function layout({children}){
    return(
        <>
        <Navbar/>
        <div className="container my-5">
            {children}
        </div>
        </>
    )
}

export default layout;