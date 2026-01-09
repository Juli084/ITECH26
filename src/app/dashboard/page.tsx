import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
export const dynamic = 'force-dynamic';
import { Users, FileText, BarChart3, MessageSquare, ArrowRight, Package } from "lucide-react";
import { getLeads } from "@/app/actions/leads";
import { getPosts } from "@/app/actions/blog";
import { getProducts } from "@/app/actions/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
    const leads = await getLeads();
    const posts = await getPosts();
    const products = await getProducts(true); // include inactive
    const recentLeads = leads.slice(0, 5);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Bem-vindo ao centro de controle da iTech.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leads.length}</div>
                        <p className="text-xs text-muted-foreground">Contatos recebidos</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Produtos em Loja</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products.length}</div>
                        <p className="text-xs text-muted-foreground">{products.filter(p => p.stockQuantity === 0).length} itens sem estoque</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Posts no Blog</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{posts.length}</div>
                        <p className="text-xs text-muted-foreground">Conteúdos publicados</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Leads Recentes</CardTitle>
                        <CardDescription>Você recebeu {leads.filter(l => l.status === 'NEW').length} novos contatos recentemente.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentLeads.map((lead) => (
                                <div key={lead.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{lead.name}</p>
                                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                                    </div>
                                    <div className="text-xs font-medium bg-muted px-2 py-1 rounded">
                                        {lead.serviceInterest}
                                    </div>
                                </div>
                            ))}
                            {leads.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">Nenhum lead recebido ainda.</p>
                            )}
                        </div>
                        {leads.length > 5 && (
                            <div className="mt-4 pt-4 border-t">
                                <Link href="/dashboard/leads">
                                    <Button variant="ghost" size="sm" className="w-full gap-2">
                                        Ver todos os leads <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
