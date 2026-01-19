"use client";

import { ArrowUpRight, BarChart, Laptop, ShoppingBag, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Tráfego Pago (Google Ads e Meta Ads)",
    description: "Planejamento, criação e gestão de campanhas de anúncios focadas em leads qualificados, vendas e retorno sobre investimento para negócios locais e digitais.",
    icon: BarChart,
    href: "/servicos/trafego-pago",
    image: "/images/service_marketing.png",
  },
  {
    title: "Desenvolvimento Web e Web Apps",
    description: "Criação de sites institucionais, landing pages e web apps modernos, rápidos e responsivos, desenvolvidos com foco em usabilidade, SEO e conversão.",
    icon: Laptop,
    href: "/servicos/desenvolvimento-web",
    image: "/images/service_webdev.png",
  },
  {
    title: "Assistência Técnica Especializada em iPhone",
    description: "Serviço de manutenção e reparo de iPhones em Sorocaba, incluindo troca de tela, bateria, diagnóstico avançado e soluções em placa, com garantia e atendimento transparente.",
    icon: Smartphone,
    href: "/servicos/assistencia-iphone",
    image: "/images/service_iphone.png",
  },
  {
    title: "Loja de Acessórios para iPhone",
    description: "Venda de películas, capas, carregadores e acessórios compatíveis com dispositivos Apple, priorizando qualidade, proteção e durabilidade.",
    icon: ShoppingBag,
    href: "/acessorios",
    image: "/images/service_accessories.png",
  },
];

export function BentoGrid() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Nossas Soluções em Tecnologia e Marketing Digital</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Serviços pensados para atender desde necessidades técnicas até estratégias de crescimento digital. <br className="hidden md:block" />
          Atuamos de forma integrada para garantir qualidade técnica, presença online profissional e resultados reais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group relative overflow-hidden rounded-3xl border bg-card h-[400px] flex flex-col justify-end p-6 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col items-start text-left">
              <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl mb-3 backdrop-blur-md bg-white/10 text-white border border-white/20")}>
                <service.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold mb-2 text-white leading-tight">{service.title}</h3>
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                {service.description}
              </p>

              <div className="mt-4 flex items-center text-primary-foreground/80 text-sm font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Saiba mais <ArrowUpRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
