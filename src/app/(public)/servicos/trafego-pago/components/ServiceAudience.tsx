import { Target, TrendingUp, AlertCircle, DollarSign } from "lucide-react";

export function ServiceAudience() {
    const points = [
        { text: "Quer gerar leads qualificados", icon: Target },
        { text: "Precisa aumentar vendas ou pedidos de orçamento", icon: TrendingUp },
        { text: "Já tentou anunciar e não teve resultado", icon: AlertCircle },
        { text: "Quer parar de gastar dinheiro sem estratégia", icon: DollarSign }
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-900">
                        Esse serviço é ideal para você que:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {points.map((point, index) => (
                            <div key={index} className="flex flex-col items-center gap-4 p-5 bg-white rounded-2xl border shadow-sm text-center">
                                <point.icon className="h-6 w-6 text-primary shrink-0" />
                                <p className="text-lg text-slate-700 font-medium">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
