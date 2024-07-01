import React, { ReactNode } from 'react';

import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '../ components/NullData';
import Container from '../ components/Container';
import FormWrap from '../ components/FormWrap';
import TruongbomonClient from './truongbomon';


const truongbomon  = async() => {
  const currentUser = await getCurrentUser()
  if(!currentUser || currentUser.role !=="TRUONGBOMON"){

      return <NullData title="Không thể truy cập"/>

      return <NullData title="Rất tiếc! Quyền truy cập bị từ chối "/>

  }
  return (  <div className="p-8 ">
  <Container>
      <FormWrap>
          <TruongbomonClient children={undefined}/>
      </FormWrap>
      </Container></div>);
}

export default truongbomon;
