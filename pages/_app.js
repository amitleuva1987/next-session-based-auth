import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap.bundle.min");
  },[])
  return( 
      <Layout>
         <Component {...pageProps} />
       </Layout>  
  )
}     

export default MyApp
