import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../ components/Container";

import LoginForm from "./LoginForm";
import FormWrap from "../ components/FormWrap";

const Login = async () => {
    const currentUser = await getCurrentUser()
    return ( <Container>
        <FormWrap>
        <LoginForm currentUser = {currentUser}/>
        </FormWrap>
    </Container> );
}
 
export default Login;