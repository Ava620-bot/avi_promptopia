"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                className="rounded-full"
                width={30}
                height={30}
                alt="user profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              className="rounded-full"
              width={30}
              height={30}
              alt="user profile"
              onClick={()=>{setToggleDropDown((prev)=>!prev)}}
            />
            {toggleDropDown && (
                <div className="dropdown">
                 <Link href='/profile' className="dropdown_link" onClick={()=>setToggleDropDown(false)}>
                    My Profile
                 </Link>
                 <Link href='/create-prompt' className="dropdown_link" onClick={()=>setToggleDropDown(false)}>
                    Create Prompt
                 </Link>
                 <button className="black_btn mt-5 w-full" type="button" onClick={()=>{setToggleDropDown(false); signOut();}}>SignOut</button>
                </div>
            )}
          </div>
        ) : (
          <>
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  SignIn
                </button>
              ))}
          </>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
