'use client';

import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import NullData from "../ components/NullData";
import Heading from "../ components/Heading";
import Button from "../ components/Button";
import Input from "../ components/inputs/Input";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const TruongBoMonLogin: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (currentUser && currentUser.role === "TRUONGBOMON") {
      router.push('/truongbomon');
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        axios.get('/api/User')
          .then((response) => {
            const role = response.data.role;
            if (role === 'TRUONGBOMON') {
              router.push('/truongbomon');
              router.refresh();
              toast.success('Đăng nhập');
            } else {
              toast.error('Rất tiếc! Quyền truy cập bị từ chối');
            }
          })
          .catch((error) => {
            console.error('Error fetching user info:', error);
            toast.error('Lỗi khi lấy thông tin người dùng');
          });
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser && currentUser.role !== "TRUONGBOMON") {
    return <NullData title="Rất tiếc! Quyền truy cập bị từ chối" />;
  }

  if (currentUser) {
    return <p className="text-center">Đã đăng nhập. Chuyển hướng...</p>;
  }

  return (
    <>
          <Heading title="Xin mời Trưởng bộ môn đăng nhập:" />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Mật khẩu"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button label={isLoading ? "Loading" : 'Đăng nhập'} onClick={handleSubmit(onSubmit)} />
      <p className="text-sm">Bạn chưa có tài khoản?{" "} <Link className="underline" href='/register'>Đăng ký</Link></p>
    </>
  );
};

export default TruongBoMonLogin;