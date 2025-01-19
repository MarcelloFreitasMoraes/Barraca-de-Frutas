'use client'
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/auth/authStore";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

const navItems = [
  {
    title: "Início",
    href: "/",
  },
  {
    title: "Nav 2",
    href: "/nav2",
  },
  {
    title: "Nav 3",
    href: "/nav3",
  },
];

const Header: React.FC = () => {
  const { isLogged, setIsLogged } = useAuthStore()
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  console.log(isLogged, 'isLogged');


  useEffect(() => {
    return setIsLogged(localStorage.getItem('Logged'))
  }, [])


  const loggedUser = 'teste@teste.com.br'
  const nameUser = 'Marcelo Moraes'
  const loggedPassword = '123456'

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault()

    if (user === loggedUser && password === loggedPassword) {
      localStorage.setItem('Logged', 'isLogged')
      toast({
        title: "Sucesso!",
        description: "Login efetuado com sucesso!",
      })
      window.location.href = window.location.href
    } else {
      toast({
        title: "Error!",
        description: "Email ou senha invalidos!",
      })
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('Logged')
    window.location.reload()
  }

  return (
    <div className="flex items-center gap-2 justify-between bg-red-700 w-full h-24 p-8">
      <div>
        <Image
          src={"/logo.png"}
          alt={"logo"}
          width={200}
          height={200}
          className="w-full h-full object-fill"
        /></div>
      <div className="flex gap-2">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href} className="text-xl text-white font-bold">
            {item.title}
          </Link>
        ))}
      </div>
      <Dialog>
        <DialogTrigger className="cursor-pointer"> <CircleUserRound color="white" size={30} /></DialogTrigger>
        <DialogContent>
          {isLogged ? (
            <DialogHeader>
              <DialogTitle>Bem vindo</DialogTitle>
              <DialogDescription>
                {nameUser}
              </DialogDescription>
              <Button onClick={handleSignOut}>
                Sair
              </Button>
            </DialogHeader>
          ) : (
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <div>
                <label htmlFor="Email">Email</label>
                <Input type="email" value={user} placeholder="Digite seu email..."
                  onChange={(
                    e: ChangeEvent<HTMLInputElement>
                  ) => setUser(e.target.value)} />
              </div>
              <div>
                <label htmlFor="Password">Senha</label>
                <Input type="password" value={password} placeholder="Digite sua senha..."
                  onChange={(
                    e: ChangeEvent<HTMLInputElement>
                  ) => setPassword(e.target.value)} />
              </div>
              <Button onClick={handleSignIn}>
                Entrar
              </Button>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
