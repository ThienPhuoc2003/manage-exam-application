import React from 'react';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '../ components/NullData';
import GiangvienClient from './layout';


const GiangvienPage: React.FC = () => {
  const checkAccess = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser || currentUser.role !== "GIANGVIEN") {
        return <NullData title="Không thể truy cập" />;
      }
      return (
        <div className="p-8">
          <GiangvienClient>
            <div>
              {/* Nội dung của GiangvienClient */}
            
            </div>
          </GiangvienClient>
        </div>
      );
    } catch (error) {
      console.error('Lỗi khi kiểm tra quyền truy cập:', error);
      return <NullData title="Rất tiếc! Quyền truy cập bị từ chối" />;
    }
  };

  return checkAccess();
};

export default GiangvienPage;
