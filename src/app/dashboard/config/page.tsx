import { db } from "@/db";
import { siteSettings, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ConfigForm from "./ConfigForm";

export default async function ConfigPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }

    const [settings] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
    const [user] = await db.select().from(users).where(eq(users.email, session.user?.email || "")).limit(1);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
                <p className="text-muted-foreground">Gerencie as informações da plataforma e seu perfil.</p>
            </div>

            <ConfigForm initialSettings={settings} initialUser={user} />
        </div>
    );
}
