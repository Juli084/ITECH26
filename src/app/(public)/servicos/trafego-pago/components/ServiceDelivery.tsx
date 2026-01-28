import { CheckCircle2, Target, Users, Search, TrendingUp, BarChart3 } from "lucide-react";

export function ServiceDelivery() {
    const deliverables = [
        { title: "Criação e gestão de campanhas no Google Ads", icon: Search },
        { title: "Campanhas no Instagram e Facebook (Meta Ads)", icon: Users },
        { title: "Estruturação de funil de leads", icon: Target },
        { title: "Otimização contínua das campanhas", icon: TrendingUp },
        { title: "Análise de métricas e performance", icon: BarChart3 }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-900">
                        O que entregamos no tráfego pago
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {deliverables.map((item, index) => (
                            <div key={index} className="p-6 rounded-2xl border bg-slate-50/50 hover:border-primary/50 transition-colors group flex flex-col items-center text-center">
                                <item.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-semibold text-slate-800 leading-tight">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-slate-500 italic max-w-2xl mx-auto">
                        * Cada campanha é pensada de acordo com o objetivo do negócio.
                    </p>
                </div>
            </div>
        </section>
    );
}
