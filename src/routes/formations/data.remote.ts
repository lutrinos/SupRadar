import * as v from "valibot";
import { query } from "$app/server";
import { db } from "$lib/server/db";
import { formations } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";

export const getFormations = query(v.string(), async (q) => {

    const data = await db.select()
        .from(formations)
        .where(sql`immutable_unaccent(lower(${q})) <% immutable_unaccent(lower(${formations.recherche}))`)
        .orderBy(
            sql`similarity(immutable_unaccent(lower(${q})), immutable_unaccent(lower(${formations.recherche}))) DESC`
        )
        .limit(10);

    return data;
});