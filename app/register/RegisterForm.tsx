'use client';

import { useEffect, useState } from "react";
import { FieldValues, useForm ,SubmitHandler} from "react-hook-form";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn} from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import Button from "../ components/Button";
import Input from "../ components/inputs/Input";
import Heading from "../ components/Heading";
import Select from "../ components/Select";

interface RegisterFormProps
{
    currentUser:SafeUser |null;
}
const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
    const [isLoading,setIsLoading]=useState(false)
    const {register,handleSubmit,formState:{errors},} = useForm<FieldValues>({defaultValues:{
        name: "", 
        email: "",
        password: "",
    }});

    const router = useRouter()
    useEffect(()=>{if(currentUser){router.push('/cart');
  router.refresh();
}},[]);

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{setIsLoading(true);
    setIsLoading(true);
        axios
        .post("/api/register",data)
        .then(()=>{

            toast.success('Tài khoản đã được tạo');

            signIn("credentials",{
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback)=> {
                if(callback?.ok) {
                    router.push("/cart");
                    router.refresh();
                    toast.success('Đăng nhập');
                }
                if(callback?.error)
                {
                    toast.error(callback.error);
                }
            });
        }).catch(()=> toast.error("Đã xảy ra lỗi")).finally(()=>{
            setIsLoading(false)
        })
    };
    if(currentUser)
    {

        return <p className="text-center">Đã đăng nhập. Đang chuyển hướng...</p>

    }
    return (  <>
    <Heading title="Đăng ký thành viên LuxeGlobal"/>
    <Button 
    outline
    label="Đăng nhập với Google"
    icon={AiOutlineGoogle}
    onClick={() => {signIn('google') }}/>
    <hr className="bg-slate-300 w-full h-px"/>
    <Input id="name"
    label="Tên người dùng"
    disabled={isLoading} 
    register={register}
    errors={errors}
    required/>
    <Input id="email"
    label="Email"
    disabled={isLoading} 
    register={register}
    errors={errors}
    required/>
    <Input id="password"
    label="Mật khẩu"
    disabled={isLoading} 
    register={register}
    errors={errors}
    required
    type="password"/>
        <Select
                id="role"
                label="Chức vụ"
                disabled={isLoading}
                register={register}
                errors={errors}
                options={[
                    { value: "GIANGVIEN", label: "Giáo viên" },
                    { value: "TRUONGBOMON", label: "Trưởng bộ môn" },
                    { value: "GIAOVUKHOA", label: "Giáo vụ khoa" },
                ]}
                required
            />
    <Button label={isLoading?"Loading":'Đăng ký'} onClick={handleSubmit(onSubmit)}/>
    <p className="text-sm">Bạn đã sẵn sàng tạo tài khoản chưa?{""} <Link className="underline" href='/login'>Log in

    </Link>
        </p>
    </>);
}
 
export default RegisterForm;