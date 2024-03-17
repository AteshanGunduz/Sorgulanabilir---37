import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className='logo-container'>
        <img className='logo-image' src='/images/icons/brain.svg' />
        <h1>Tartışmalı</h1>
      </div>
      <div className='header-links-container'>
      <Link href="/login">Log in</Link>
      <Link href="/signup">Sign up</Link>
      </div>
    </header>
  )
}
