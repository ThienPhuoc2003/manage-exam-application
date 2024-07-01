import React from 'react';
import Head from 'next/head';

interface GiaovukhoaClientProps {
  children: React.ReactNode;
}

const GiaovukhoaClient: React.FC<GiaovukhoaClientProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Trang web của tôi</title>
        <meta name="description" content="Mô tả trang web của bạn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {/* Đây là nơi bạn có thể đặt phần tiêu đề của trang, hoặc bất kỳ nội dung header nào khác */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Footer của bạn */}
      </footer>
    </div>
  );
};

export default GiaovukhoaClient;
