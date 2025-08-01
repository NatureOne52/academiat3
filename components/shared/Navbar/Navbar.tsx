"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BellRing, LogIn, Search } from "lucide-react";

export function Navbar(){
    return(
        <div className="flex justify-between p-4 border-b bg-white h-16">
            <SidebarTrigger/>
            <div className="flex gap-4 items-center">

                <div className="flex w-full max-w-sm items-center border-gray-300 rounded-lg px-2.5 py-0.5">
                <Search className="h-4 w-4 mr-2.5" />
                <Input className="w-full border-0" type="search" placeholder="Buscar..."/>
                </div>
                <Button variant="outline">
                    <BellRing/>
                </Button>
                <SignedOut>
                    <SignInButton>
                        <Button>
                            <LogIn/>
                            Iniciar sesion

                        </Button>
                    </SignInButton>
                </SignedOut>
                    <SignedIn>
                            <UserButton/>
                    </SignedIn>    
            </div>
        </div>
    )
}