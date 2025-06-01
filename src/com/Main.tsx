import React from 'react'
import {useUrl} from 'react-confection'


export default function Main() {
  const { pathname } = useUrl();

  return <main>
    <h1>Main</h1>
  </main>
}