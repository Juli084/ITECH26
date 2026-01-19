
import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-50 border-t pt-20 pb-10 text-sm font-sans">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mb-20 items-start">

                    {/* Column 1: Brand & Contacts */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-8">
                        <div className="h-10 flex items-center"> {/* Fixed height for baseline alignment */}
                            <h3 className="font-bold text-xl tracking-tight text-slate-900">
                                iTech <span className="text-primary">Soluções</span>
                            </h3>
                        </div>
                        <p className="text-slate-500 leading-relaxed max-w-xs">
                            Seu hub completo de tecnologia, assistência Apple e estratégias digitais de alto nível.
                        </p>

                        <div className="space-y-4 w-full">
                            <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-600 group">
                                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 flex-shrink-0">
                                    <Phone className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span className="font-medium text-[13px]">(15) 99753-4529</span>
                            </div>

                            <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-600 group">
                                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 flex-shrink-0">
                                    <Mail className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span className="font-medium text-[13px] break-all">contato@itechsolucoesdigitais.com</span>
                            </div>

                            <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-600 group">
                                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 flex-shrink-0">
                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span className="font-medium text-[13px]">Sorocaba – SP</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <div className="h-10 flex items-center mb-6"> {/* Matches Column 1 header height */}
                            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[11px]">Serviços</h4>
                        </div>
                        <ul className="space-y-4 text-slate-500 font-medium">
                            <li><Link href="/servicos/trafego-pago" className="hover:text-primary transition-colors">Tráfego Pago</Link></li>
                            <li><Link href="/servicos/desenvolvimento-web" className="hover:text-primary transition-colors">Desenvolvimento Web</Link></li>
                            <li><Link href="/servicos/assistencia-iphone" className="hover:text-primary transition-colors">Assistência iPhone</Link></li>
                            <li><Link href="/acessorios" className="hover:text-primary transition-colors">Acessórios Premium</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <div className="h-10 flex items-center mb-6">
                            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[11px]">Empresa</h4>
                        </div>
                        <ul className="space-y-4 text-slate-500 font-medium">
                            <li><Link href="/sobre" className="hover:text-primary transition-colors">Sobre a iTech</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & Conteúdo</Link></li>
                            <li><Link href="/contato" className="hover:text-primary transition-colors">Fale Conosco</Link></li>
                            <li><Link href="/dashboard" className="hover:text-primary transition-colors italic opacity-70">Painel Admin</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Social */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <div className="h-10 flex items-center mb-6">
                            <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[11px]">Redes Sociais</h4>
                        </div>
                        <p className="text-slate-500 mb-8 text-xs leading-relaxed max-w-[200px]">Siga-nos para dicas técnicas e novidades do mundo digital.</p>
                        <div className="flex gap-4">
                            <Link href="#" className="h-11 w-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="h-11 w-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
                    <p className="text-[11px] font-medium tracking-tight">© 2026 iTech Soluções Digitais. Todos os direitos reservados.</p>
                    <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
                        <Link href="#" className="hover:text-slate-900 transition-colors">Privacidade</Link>
                        <Link href="#" className="hover:text-slate-900 transition-colors">Termos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
