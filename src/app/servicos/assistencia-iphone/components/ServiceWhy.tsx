export function ServiceWhy() {
    const points = [
        "Especialização em dispositivos Apple",
        "Atendimento direto e personalizado",
        "Transparência em cada etapa do serviço",
        "Foco em solução, não em empurrar troca desnecessária"
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-900">
                        Por que escolher a iTech?
                    </h2>
                    <div className="space-y-6 flex flex-col items-center">
                        {points.map((point, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                <p className="text-xl text-slate-700 font-medium">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
