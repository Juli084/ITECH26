import { Laptop, Layout, Cpu, Database, Settings, Globe } from "lucide-react";

export function ServiceWhatWeBuild() {
    const solutions = [
        { title: "Sites institucionais profissionais", icon: Globe },
        { title: "Landing pages focadas em conversão", icon: Layout },
        { title: "Aplicações web sob medida", icon: Laptop },
        { title: "Painéis administrativos (dashboards)", icon: Database },
        { title: "Sistemas internos simples", icon: Settings },
        { title: "Integrações com APIs e serviços externos", icon: Cpu }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-900">
                        O que podemos desenvolver para você
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 text-left">
                        {solutions.map((item, index) => (
                            <div key={index} className="p-6 rounded-2xl border bg-slate-50/50 hover:border-primary/50 transition-colors group">
                                <item.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-slate-500 italic max-w-2xl mx-auto">
                        * Cada projeto é planejado de acordo com a necessidade real do cliente.
                    </p>
                </div>
            </div>
        </section>
    );
}
