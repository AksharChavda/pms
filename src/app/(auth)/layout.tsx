"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { QueryProvider } from "@/components/query-provider";
interface AuthLayoutProps {
    children: React.ReactNode;
    }
const AuthLayout = ({ children }: AuthLayoutProps) => {
    const pathname = usePathname();
    return (
    <main className="bg-neutral-100 min-h-screen">
        <div className="mx-auto max-w-screen-2xl">
        <nav className="flex items-center justify-between">
                <Image src="/ngo-logo.svg" alt="logo" width={152} height={156} />
                
                <Button asChild variant="secondary">
                   <Link href={pathname === "/sign-in"?"sign-up":"sign-in"}> {pathname === "/sign-in" ? "Sign Up" : "Login"}</Link>
                </Button>
                
        </nav> 
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
            <QueryProvider>{children}</QueryProvider>
        </div>
        </div>
    </main>
    );
    }
export default AuthLayout;