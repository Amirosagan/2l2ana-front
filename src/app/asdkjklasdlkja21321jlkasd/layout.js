import '@/src/app/globals.css';

export const metadata = {
  title: 'Admin Dashboard',
  description: '2l2ana Admin Dashboard',
}

export default function AdminLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
