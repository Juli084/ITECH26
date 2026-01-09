import { getLeads } from "@/app/actions/leads";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function LeadsPage() {
    const leads = await getLeads();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
                <p className="text-muted-foreground">
                    Gerencie os contatos recebidos através do site.
                </p>
            </div>

            <div className="grid gap-4">
                {leads.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-muted-foreground">Nenhum lead encontrado.</p>
                        </CardContent>
                    </Card>
                ) : (
                    leads.map((lead) => (
                        <Card key={lead.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle>{lead.name}</CardTitle>
                                    <CardDescription>{lead.email} {lead.phone && `• ${lead.phone}`}</CardDescription>
                                </div>
                                <div className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                    {lead.status}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Interesse</span>
                                        <p className="text-sm font-medium">{lead.serviceInterest}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mensagem</span>
                                        <p className="text-sm text-foreground bg-muted/30 p-3 rounded-md border italic">
                                            "{lead.message}"
                                        </p>
                                    </div>
                                    <div className="text-xs text-muted-foreground italic">
                                        Recebido em: {lead.createdAt?.toLocaleString('pt-BR')}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
