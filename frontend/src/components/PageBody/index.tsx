import { ReactNode } from "react";

export default function PageBody({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', padding: "10px",
      backgroundColor: 'whitesmoke', minHeight: '100vh'
    }}>
      {children}
    </div>
  )
}
