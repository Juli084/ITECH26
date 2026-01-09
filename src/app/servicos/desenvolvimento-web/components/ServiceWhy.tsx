export function ServiceWhy() {
    const points = [
        "Soluções personalizadas (nada de templates genéricos)",
        "Foco em performance e SEO",
        "Código moderno e escalável",
        "Comunicação direta durante todo o projeto",
        "Pensado para crescer junto com o seu negócio"
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-900">
                        Por que desenvolver com a iTech?
                    </h2>
                    <div className="space-y-6 flex flex-col items-center text-left">
                        {points.map((point, index) => (
                            <div key={index} className="flex items-start gap-4 max-w-xl w-full">
                                <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-3" />
                                <p className="text-xl text-slate-700 font-medium">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
