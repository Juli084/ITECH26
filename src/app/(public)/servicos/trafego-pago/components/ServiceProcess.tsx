import { Search, Map, Zap, TrendingUp } from "lucide-react";

export function ServiceProcess() {
    const steps = [
        {
            title: "1. Análise de Viabilidade",
            description: "Estudamos seu mercado, concorrentes e margem p/ definir se o tráfego pago é para você agora.",
            icon: Search,
        },
        {
            title: "2. Estratégia",
            description: "Definimos canais (Google/Meta), verba inicial e funil de vendas ideal para o seu produto.",
            icon: Map,
        },
        {
            title: "3. Execução e Testes",
            description: "Criação de anúncios, landind pages e setup de rastreamento (Pixel/API) para mensurar tudo.",
            icon: Zap,
        },
        {
            title: "4. Escala Inteligente",
            description: "Otimizamos o que funciona e aumentamos o investimento conforme o retorno (ROI) aparece.",
            icon: TrendingUp,
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-900">
                        Como funciona o processo
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Sem "mágica". Um método validado de 4 etapas para transformar cliques em clientes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative p-6 pt-12 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-500/30 hover:shadow-lg transition-all group">
                            {/* Number watermark */}
                            <div className="absolute top-4 right-4 text-6xl font-black text-slate-200/50 group-hover:text-green-500/10 transition-colors pointer-events-none select-none">
                                {index + 1}
                            </div>

                            <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <step.icon className="h-6 w-6" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
