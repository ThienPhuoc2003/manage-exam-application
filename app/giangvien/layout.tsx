import GiangvienNav from "../ components/giangvien/GiangvienNav";


export const metadata={
    title:'Giangvien',
    description:'LuxeGlobal Admin Dashboard'
}
const GiangvienLayout = ({children}:{children:React.ReactNode}) => {
    return ( <div>
      <GiangvienNav/>
        {children}
    </div> );
}
 
export default GiangvienLayout;