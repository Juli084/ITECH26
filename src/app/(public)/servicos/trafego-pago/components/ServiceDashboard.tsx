import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

export function ServiceDashboard() {
    return (
        <section className="py-20 bg-zinc-950 relative overflow-hidden -mt-10 md:-mt-20 z-20">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">

                <div className="relative max-w-5xl mx-auto">
                    {/* Glowing effect behind dashboard */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-500/10 rounded-full blur-[100px]" />

                    {/* Dashboard Container */}
                    <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8">

                        {/* Fake Header of dashboard */}
                        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                            </div>
                            <div className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Growth Dashboard • Live Data</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {/* KPI Cards */}
                            <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                                    <DollarSign className="h-4 w-4" /> Investimento
                                </div>
                                <div className="text-2xl font-bold text-white">R$ 15.240</div>
                                <div className="text-xs text-green-500 mt-1 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> +12% mês
                                </div>
                            </div>

                            <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                                    <Target className="h-4 w-4" /> ROAS
                                </div>
                                <div className="text-2xl font-bold text-green-400">8.4x</div>
                                <div className="text-xs text-green-500 mt-1 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> Recorde Histórico
                                </div>
                            </div>

                            <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                                    <Users className="h-4 w-4" /> Leads Qualificados
                                </div>
                                <div className="text-2xl font-bold text-white">482</div>
                                <div className="text-xs text-zinc-500 mt-1">
                                    Custo/Lead: R$ 4,50
                                </div>
                            </div>

                            <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                                    <DollarSign className="h-4 w-4" /> Receita Gerada
                                </div>
                                <div className="text-2xl font-bold text-white">R$ 128.016</div>
                                <div className="text-xs text-green-500 mt-1 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> Meta Batida
                                </div>
                            </div>
                        </div>

                        {/* Chart Area Simulation */}
                        <div className="h-64 w-full bg-zinc-950/30 rounded-xl border border-zinc-800/50 relative flex items-end justify-between px-4 pb-0 pt-8 gap-2 overflow-hidden">
                            {/* Grid Lines */}
                            <div className="absolute inset-x-0 top-0 h-px bg-zinc-800/30" />
                            <div className="absolute inset-x-0 top-1/4 h-px bg-zinc-800/30" />
                            <div className="absolute inset-x-0 top-2/4 h-px bg-zinc-800/30" />
                            <div className="absolute inset-x-0 top-3/4 h-px bg-zinc-800/30" />

                            {/* Fake Bars with animation */}
                            {[40, 65, 55, 80, 70, 90, 85, 95, 120, 110, 130, 150].map((height, i) => (
                                <div key={i} className="w-full bg-gradient-to-t from-green-900/20 to-green-500/50 rounded-t-sm hover:from-green-600 hover:to-green-400 transition-all duration-500 cursor-crosshair relative group" style={{ height: `${height * 0.5}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        R$ {height * 100},00
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-zinc-500 text-sm max-w-2xl mx-auto">
                            * Dashboards como este fazem parte da nossa rotina de otimização. Você vê para onde seu dinheiro está indo. Sem caixas pretas.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
