import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="bg-muted/50 border-t pt-16 pb-8 text-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-center">
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">{SITE_CONFIG.name}</h3>
                        <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                            O seu hub de tecnologia completo. Assistência, acessórios e estratégias digitais.
                        </p>
                        <div className="space-y-2 flex flex-col items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <span>{SITE_CONFIG.whatsapp}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <span>{SITE_CONFIG.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{SITE_CONFIG.location}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">Serviços</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><Link href="/servicos/assistencia-iphone" className="hover:text-primary transition-colors">Assistência iPhone</Link></li>
                            <li><Link href="/servicos/desenvolvimento-web" className="hover:text-primary transition-colors">Desenvolvimento Web</Link></li>
                            <li><Link href="/servicos/trafego-pago" className="hover:text-primary transition-colors">Tráfego Pago</Link></li>
                            <li><Link href="/acessorios" className="hover:text-primary transition-colors">Acessórios</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">Empresa</h4>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><Link href="/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">Redes Sociais</h4>
                        <div className="flex justify-center gap-4">
                            <Link href="#" className="p-2 bg-background border rounded-lg hover:border-primary/50 transition-colors">
                                <Instagram className="w-5 h-5 transition-colors" />
                            </Link>
                            <Link href="#" className="p-2 bg-background border rounded-lg hover:border-primary/50 transition-colors">
                                <Linkedin className="w-5 h-5 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8 text-center text-muted-foreground">
                    <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
