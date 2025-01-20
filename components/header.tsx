'use client'

import Link from "next/link";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/auth/authStore";
import Image from "next/image";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const navItems = [
  {
    title: "Início",
    href: "/",
  },
];

const loginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Header: React.FC = () => {
  const { isLogged, setIsLogged } = useAuthStore();

  useEffect(() => {
    setIsLogged(localStorage.getItem("Logged"));
  }, []);

  const loggedUser = "teste@teste.com.br";
  const nameUser = "Marcelo Moraes";
  const loggedPassword = "123456";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignIn = (data: LoginFormData) => {
    const { email, password } = data;

    if (email === loggedUser && password === loggedPassword) {
      localStorage.setItem("Logged", "isLogged");
      toast({
        title: "Sucesso!",
        description: "Login efetuado com sucesso!",
      });
      window.location.href = window.location.href;
    } else {
      toast({
        title: "Error!",
        description: "Email ou senha inválidos!",
      });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("Logged");
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 justify-around bg-red-700 w-full h-24 p-8">
      <Link
        href={"/"}
      >
        <Image
          src={"/logo.png"}
          alt={"logo"}
          width={200}
          height={200}
        />
      </Link>
      <div className="flex gap-4 items-center">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-base text-white font-bold"
          >
            {item.title}
          </Link>
        ))}
        <Link
          href={"/cart"}
          className="text-base text-white font-bold"
        >
          <ShoppingCart color="white" size={20} />
        </Link>
        <Dialog>
          <DialogTrigger className="cursor-pointer">
            <CircleUserRound color="white" size={20} />
          </DialogTrigger>
          <DialogContent>
            {isLogged ? (
              <DialogHeader>
                <DialogTitle>Bem vindo</DialogTitle>
                <DialogDescription>{nameUser}</DialogDescription>
                <Button onClick={handleSignOut}>Sair</Button>
              </DialogHeader>
            ) : (
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                  <form onSubmit={handleSubmit(handleSignIn)}>
                    <div>
                      <label htmlFor="Email">Email</label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Digite seu email..."
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="Password">Senha</label>
                      <Input
                        {...register("password")}
                        type="password"
                        placeholder="Digite sua senha..."
                        className={errors.password ? "border-red-500" : ""}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  <Button type="submit">Entrar</Button>
                </form>
              </DialogHeader>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
