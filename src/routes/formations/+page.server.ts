import { db } from "$lib/server/db";
import { formations } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./[id]/$types";

const pageSize = 15;

export const load: PageServerLoad = async ({ url }) => {
    const q = url.searchParams.get('q')?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() ?? '';
    const p = parseInt(url.searchParams.get('p') ?? '0') || 0;

    if (!q || q.length === 0) {
        return {
            formation: []
        };
    }

    const data = await db.select({
        formation: formations,
        totalCount: sql<number>`cast(count(*) OVER() as integer)`
    })
        .from(formations)
        .where(sql`${q} <% ${formations.recherche}`)
        .orderBy(sql`similarity(${q}, ${formations.recherche}) DESC`)
        .offset(pageSize * p)
        .limit(pageSize);

    return {
        formations: data.map((row) => row.formation),
        total: data[0]?.totalCount ?? 0
    }
};