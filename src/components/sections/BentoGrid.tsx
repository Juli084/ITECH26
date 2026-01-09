"use client";

import { ArrowUpRight, BarChart, Laptop, ShoppingBag, Smartphone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Assistência iPhone",
    description: "Especialistas em reparos Apple. Telas, baterias e placas com garantia.",
    icon: Smartphone,
    color: "bg-blue-500/10 text-blue-500",
    href: "/servicos/assistencia-iphone",
  },
  {
    title: "Desenvolvimento Web",
    description: "Sites e Web Apps modernos que convertem visitantes em clientes.",
    icon: Laptop,
    color: "bg-purple-500/10 text-purple-500",
    href: "/servicos/desenvolvimento-web",
  },
  {
    title: "Tráfego Pago",
    description: "Gestão estratégica de ADS para escalar suas vendas.",
    icon: BarChart,
    color: "bg-green-500/10 text-green-500",
    href: "/servicos/trafego-pago",
  },
  {
    title: "Loja de Acessórios",
    description: "Películas, cases e carregadores originais.",
    icon: ShoppingBag,
    color: "bg-orange-500/10 text-orange-500",
    href: "/acessorios",
  },
];

export function BentoGrid() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Nossas Soluções</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Um ecossistema completo de serviços digitais projetado para atender todas as necessidades da sua empresa e dispositivos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group relative overflow-hidden rounded-3xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col justify-between"
          >
            <div>
              <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-4", service.color)}>
                <service.icon className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>

            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  );
}
