import { Laptop, Layout, Cpu, Database, Settings, Globe } from "lucide-react";
import Image from "next/image";

export function ServiceWhatWeBuild() {
    const solutions = [
        { title: "Sites Institucionais", description: "Design premium que fortalece sua marca.", icon: Globe },
        { title: "Landing Pages", description: "Focadas em alta conversão e vendas.", icon: Layout },
        { title: "SaaS & Web Apps", description: "Sistemas complexos na nuvem.", icon: Laptop },
        { title: "Dashboards", description: "Painéis de controle administrativos.", icon: Database },
        { title: "Sistemas Internos", description: "Automação de processos empresariais.", icon: Settings },
        { title: "APIs e Integrações", description: "Conecte seus sistemas.", icon: Cpu }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    <div className="flex-1 order-2 lg:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {solutions.map((item, index) => (
                                <div key={index} className="flex gap-4 p-5 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-purple-500/20 hover:shadow-purple-500/5 transition-all group">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full relative order-1 lg:order-2">
                        <h2 className="text-3xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            Transformamos ideias complexas em <span className="text-purple-600">software poderoso.</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            Nossa stack de tecnologia é moderna e escalável. Utilizamos Next.js, React e Node.js para entregar performance de elite.
                        </p>

                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700">
                            <Image
                                src="/images/service_webdev.png"
                                alt="Modern Dashboard Development"
                                fill
                                className="object-cover"
                            />
                            {/* Overlay content */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent" />
                        </div>

                        {/* Tech stack badge */}
                        <div className="min-w-max absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4 animate-float hidden md:flex">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        Code
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-semibold text-slate-700">
                                +100 Projetos<br />Entregues
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
