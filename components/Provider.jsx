"use client";
import { SessionProvider } from 'next-auth/react'

//this is going to be the higher order components we're going to wrap other components inside of it
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
       {children}
    </SessionProvider>
  )
}

export default Provider
