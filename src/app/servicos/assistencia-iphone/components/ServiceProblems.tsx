import { CheckCircle2 } from "lucide-react";

export function ServiceProblems() {
    const problems = [
        "Troca de tela",
        "Troca de bateria",
        "Diagnóstico técnico",
        "Problemas de carregamento",
        "Manutenção preventiva",
        "Outros reparos sob consulta"
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-8 text-slate-900">
                        Resolvemos os principais problemas do seu iPhone
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                        {problems.map((problem, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 rounded-2xl border bg-slate-50/50">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-lg text-slate-700">{problem}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-slate-500 italic mx-auto">
                        * Cada serviço é avaliado individualmente, com diagnóstico antes da execução.
                    </p>
                </div>
            </div>
        </section>
    );
}
