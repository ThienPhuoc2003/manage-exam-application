import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../ components/Container";

import LoginForm from "./LoginForm";
import FormWrap from "../ components/FormWrap";
import NullData from "../ components/NullData";

const Giangvienlogin = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser||currentUser.role != 'GIANGVIEN')
    {

        return <NullData title='Rất tiếc!Quyền truy cập bị từ chối'/>;

    }
    return ( <div className="pt-8"><Container>
        <FormWrap>
        <LoginForm currentUser = {currentUser}/>
        </FormWrap>
    </Container> 
    /</div>);
}
export default Giangvienlogin;