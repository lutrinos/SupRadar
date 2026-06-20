import { db } from "$lib/server/db";
import { etablissements } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";

const pageSize = 42;

export const load = async ({ url }) => {
    const q = url.searchParams.get('q')?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() ?? '';
    const p = parseInt(url.searchParams.get('p') ?? '0') || 0;

    if (!q || q.length === 0) {
        return {
            etablissements: [],
            total: 0,
            pageSize: pageSize,
            currentPage: 0,
            pageCount: 0

        };
    }

    const data = await db.select({
        etablissement: etablissements,
        totalCount: sql<number>`cast(count(*) OVER() as integer)`
    })
        .from(etablissements)
        .where(sql`${q} <% ${etablissements.recherche}`)
        .orderBy(sql`similarity(${q}, ${etablissements.recherche}) DESC`)
        .offset(pageSize * p)
        .limit(pageSize);

    return {
        etablissements: data.map((row) => row.etablissement),
        total: data[0]?.totalCount ?? 0,
        pageSize: pageSize,
        currentPage: p,
        pageCount: Math.ceil((data[0]?.totalCount ?? 0) / pageSize)
    }
};