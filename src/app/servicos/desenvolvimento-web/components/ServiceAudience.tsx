import { CheckCircle2 } from "lucide-react";

export function ServiceAudience() {
    const audiencies = [
        "Precisa de um site profissional para sua empresa",
        "Quer gerar leads pela internet",
        "Precisa de um sistema simples para organizar seu negócio",
        "Busca performance, segurança e escalabilidade"
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-900">
                        Esse serviço é ideal para você que:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {audiencies.map((point, index) => (
                            <div key={index} className="flex flex-col items-center gap-4 p-5 bg-white rounded-2xl border shadow-sm text-center">
                                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                                <p className="text-lg text-slate-700 font-medium">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
