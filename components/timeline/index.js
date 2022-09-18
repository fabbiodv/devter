import Link from 'next/link'
import AppLayout from '../AppLayout'

export default function Timeline () {
  return (
    <>
      <AppLayout>
        <h1>This is the timeline</h1>
        <Link href='/'>
          <a>
            Go home
          </a>
        </Link>
      </AppLayout>
      <style jsx>{`
        h1 {
          font-size: 36px;
          color: red;
        }
      `}</style>
    </>
  )
}

Timeline.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
}
