import { CheckCircle2, TrendingUp, ShieldCheck, MonitorSmartphone } from "lucide-react";

export function ServiceAudience() {
    const audience = [
        {
            text: "Precisa de um site profissional para sua empresa",
            icon: MonitorSmartphone,
        },
        {
            text: "Quer gerar leads e vendas pela internet",
            icon: TrendingUp,
        },
        {
            text: "Precisa de um sistema simples ou personalizado para organizar seu negócio",
            icon: CheckCircle2,
        },
        {
            text: "Busca performance, segurança e escalabilidade",
            icon: ShieldCheck,
        },
    ];

    return (
        <section className="py-24 bg-white border-y border-slate-100">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-16 text-slate-900">
                    Esse serviço é ideal para você que:
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {audience.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="h-16 w-16 mb-6 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <p className="text-lg font-medium text-slate-700 max-w-xs">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
