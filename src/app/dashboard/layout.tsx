"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Loader2, Package } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Basic Sidebar Links
    const links = [
        { href: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
        { href: "/dashboard/leads", label: "Leads", icon: Users },
        { href: "/dashboard/produtos", label: "Produtos", icon: Package },
        { href: "/dashboard/posts", label: "Blog", icon: FileText },
        { href: "/dashboard/config", label: "Configurações", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r z-20 hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
                        <span className="flex h-6 w-6 rounded-full bg-primary" />
                        <span>iTech Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 mb-4 px-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {session?.user?.name?.[0] || "A"}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{session?.user?.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full justify-start" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
