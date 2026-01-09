import { Lightbulb, Target, Rocket, LineChart } from "lucide-react";

export function ServiceProcess() {
    const steps = [
        { text: "Entendimento do seu negócio e objetivo", icon: Lightbulb },
        { text: "Definição de estratégia de anúncios", icon: Target },
        { text: "Criação das campanhas", icon: Rocket },
        { text: "Monitoramento e otimização constante", icon: LineChart }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-12 text-slate-900">
                        Como funciona nosso trabalho
                    </h2>
                    <div className="space-y-8 flex flex-col items-center">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-6 max-w-xl w-full">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                                    {index + 1}
                                </div>
                                <p className="text-xl text-slate-700 font-medium text-left">{step.text}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-12 text-muted-foreground font-medium">
                        Transparência total sobre o que está sendo feito.
                    </p>
                </div>
            </div>
        </section>
    );
}
