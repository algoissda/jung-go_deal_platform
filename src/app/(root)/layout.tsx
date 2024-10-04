import { ReactNode } from "react";
import Header from "@/app/(root)/_components/Header"; // 공통 헤더 불러오기
import "../globals.css"; // 글로벌 CSS 적용

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        {/* 헤더 컴포넌트를 공통으로 포함 */}
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
