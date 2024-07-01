import React, { ReactNode } from 'react';

import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '../ components/NullData';
import Container from '../ components/Container';
import FormWrap from '../ components/FormWrap';
import GiaovukhoaClient from './giaovukhoa';



const giaovukhoa = async() => {
  const currentUser = await getCurrentUser()
  if(!currentUser || currentUser.role !=="GIANGVIEN"){

      return <NullData title="Không thể truy cập"/>

      return <NullData title="Rất tiếc! Quyền truy cập bị từ chối "/>

  }
  return (  <div className="p-8 ">
  <Container>
      <FormWrap>
          <GiaovukhoaClient children={undefined}/>
      </FormWrap>
      </Container></div>);
}

export default giaovukhoa;
