'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import Container from "../Container";
import GiangvienNavItem from "./GiangvienNavItem";
const GiangvienNav = () => {
    const pathname=usePathname()
    return ( <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
        <Container>
            <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
        {/* <Link href='/admin'> 
        <GiangvienNavItem label="1" icon={MdDashboard} selected={pathname==" /admin"}/></Link> */}
        <Link href='/giangvien/themdethi'>
        <GiangvienNavItem label="Thêm đề thi" icon={MdLibraryAdd} selected={pathname=="/giangvien/themdethi"}/></Link>
        <Link href='/admin/manage-products'>
        <GiangvienNavItem label="2" icon={MdDns} selected={pathname=="/admin/manage-products"}/></Link>
        <Link href='/admin/manage-orders'>
        <GiangvienNavItem  label="3" icon={MdFormatListBulleted} selected={pathname=="/admin/manage-orders"}/></Link>
            </div>
        </Container>
    </div> );
}
 
export default GiangvienNav;