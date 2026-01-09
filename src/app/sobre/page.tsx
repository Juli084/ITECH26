export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-6">Sobre a iTech Soluções</h1>
                <p className="text-xl text-muted-foreground">
                    Nossa missão é simplificar a tecnologia para pessoas e empresas.
                </p>
            </div>

            <div className="grid gap-12">
                <section>
                    <h2 className="text-2xl font-bold mb-4">Quem Somos</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        A iTech nasceu da paixão por tecnologia e da necessidade de oferecer um serviço transparente e de alta qualidade.
                        Começamos como uma assistência técnica especializada em Apple e expandimos para nos tornarmos um hub completo de soluções digitais.
                        Hoje, não apenas consertamos dispositivos, mas construímos presenças digitais através de desenvolvimento web e levamos
                        marcas ao seu público ideal com tráfego pago.
                    </p>
                </section>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-muted/30 rounded-xl">
                        <h3 className="font-semibold mb-2">Excelência</h3>
                        <p className="text-sm text-muted-foreground">Não aceitamos o "mais ou menos". Buscamos a perfeição em cada reparo e linha de código.</p>
                    </div>
                    <div className="p-6 bg-muted/30 rounded-xl">
                        <h3 className="font-semibold mb-2">Transparência</h3>
                        <p className="text-sm text-muted-foreground">Você acompanha cada etapa do processo. Sem letras miúdas ou taxas surpresa.</p>
                    </div>
                    <div className="p-6 bg-muted/30 rounded-xl">
                        <h3 className="font-semibold mb-2">Inovação</h3>
                        <p className="text-sm text-muted-foreground">Estamos sempre estudando as novas tecnologias para oferecer o que há de mais moderno.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
