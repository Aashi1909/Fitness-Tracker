"use client";
import React from "react";
import logo from "@/assets/logo.png";
import { IoIosBody } from "react-icons/io";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";
import AuthPopup from "../AuthPopup/AuthPopup";
import { useUserContext } from "@/components/context/UserContext";

const Navbar = () => {
  const { login, logout, isLoggedIn } = useUserContext();
  const [showpopup, setShowPopup] = React.useState<boolean>(false);

  const checklogin = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/checklogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.ok) {
          login();
        } else {
          logout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    checklogin();
  }, [showpopup]);

  return (
    <nav>
      <Image src={logo} alt="logo" />
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>About</Link>
      <Link href={"/profile"}>
        <IoIosBody />
      </Link>
      {isLoggedIn ? (
        <button onClick={() => { 
          logout(); 
          setShowPopup(false); 
        }}>Logout</button> 
      ) : (
        <button onClick={() => setShowPopup(true)}>Login</button>
      )}
      {showpopup && <AuthPopup setShowPopup={setShowPopup} />}
    </nav>
  );
};

export default Navbar;
