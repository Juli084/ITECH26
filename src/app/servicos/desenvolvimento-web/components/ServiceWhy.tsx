import { CheckCircle2 } from "lucide-react";

export function ServiceWhy() {
    const points = [
        "Soluções personalizadas (nada de templates genéricos)",
        "Foco em performance, SEO e usabilidade",
        "Código moderno, organizado e escalável",
        "Comunicação direta durante todo o projeto",
        "Projetos pensados para crescer junto com o seu negócio"
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-900">
                        Por que desenvolver com a iTech Soluções Digitais?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left">
                        {points.map((point, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-purple-500/30 transition-colors">
                                <CheckCircle2 className="h-6 w-6 text-purple-600 shrink-0 mt-0.5" />
                                <p className="text-lg text-slate-700 font-medium leading-relaxed">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
