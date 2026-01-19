import { CheckCircle2, Battery, Smartphone, Wifi, Camera, CreditCard } from "lucide-react";
import Image from "next/image";

export function ServiceProblems() {
    const problems = [
        { name: "Troca de Tela / Display", icon: Smartphone },
        { name: "Troca de Bateria", icon: Battery },
        { name: "Reparo de Câmeras", icon: Camera },
        { name: "Recuperação de Face ID", icon: CheckCircle2 },
        { name: "Problemas de Placa", icon: Wifi },
        { name: "Carcaça e Tampa Traseira", icon: CreditCard },
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            Resolvemos qualquer problema <br />
                            <span className="text-primary">do seu iPhone.</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            Do vidro quebrado ao problema na placa mãe. Nossa equipe é treinada para diagnosticar e resolver falhas complexas com precisão cirúrgica.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {problems.map((problem, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all group">
                                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <problem.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium text-slate-700">{problem.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full relative">
                        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/images/service_iphone.png"
                                alt="iPhone Repair Technician"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white p-4 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20">
                                <div className="font-semibold text-lg">Laboratório Próprio</div>
                                <div className="text-sm text-gray-200">Equipamentos de última geração para micro-soldagem.</div>
                            </div>
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 h-28 w-28 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce-slow hidden md:flex">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">90</div>
                                <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Dias de<br />Garantia</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
