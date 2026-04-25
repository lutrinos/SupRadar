import { boolean, doublePrecision, index, integer, json, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { type InferSelectModel, relations } from 'drizzle-orm';

export const departements = pgTable('departements', {
	code: text().primaryKey(),
	nom: text().notNull()
});

export const regions = pgTable('regions', {
	code: integer().primaryKey(),
	nom: text().notNull()
});

export const academies = pgTable('academies', {
	code: integer().primaryKey(),
	nom: text().notNull()
});

export const statuts = pgTable('statuts', {
	code: integer().primaryKey(),
	nom: text().notNull()
});

export const filiere1 = pgTable('filiere1', {
	code: integer().primaryKey(),
	nom: text().notNull(),
	slug: text().notNull()
});

export const filiere2 = pgTable('filiere2', {
	code: integer().primaryKey(),
	nom: text().notNull(),
	slug: text().notNull()
});

export const filiere3 = pgTable('filiere3', {
	code: integer().primaryKey(),
	nom: text().notNull(),
	slug: text().notNull()
});

export const etablissements = pgTable('etablissements', {
	uai: text().primaryKey(),// code_uai
	nom: text().notNull(),// etablissement
	statutCode: integer().references(() => statuts.code),// statut

	regionCode: integer().references(() => regions.code),
	academieCode: integer().references(() => academies.code),
	departementCode: text().references(() => departements.code),// code_departement
	commune: text(),// nom_commune

	formationsCount: integer().notNull(),

	longitude: doublePrecision(),// gps
	latitude: doublePrecision()// gps
});

export const formations = pgTable('formations', {
	id: integer().primaryKey(),
	etablissementUai: text().notNull().references(() => etablissements.uai),// code_uai
	nom: text().notNull(),// filière

	selective: boolean(),// selectivite
	capacite: integer(),// capacite

	filiere1: integer().notNull().references(() => filiere1.code),
	filiere2: integer().notNull().references(() => filiere2.code),
	filiere3: integer().notNull().references(() => filiere3.code),

	detailForma: text().notNull(),
	detailForma2: text().notNull(),

	recherche: text().notNull(),
}, (table) => [
	index("formations_search_idx").using(
		"gist",
		table.recherche.op("gist_trgm_ops")
	)
]);

export const statistiques = pgTable('statistiques', {
	session: integer().notNull(),// session
	formationId: integer().notNull().references(() => formations.id),

	stats: json().$type<(number | null)[]>().notNull()
}, (table) => [
	primaryKey({ columns: [table.formationId, table.session] })
]);

export const etablissementRelations = relations(etablissements, ({ many, one }) => ({
	formations: many(formations),
	departement: one(departements, {
		fields: [etablissements.departementCode],
		references: [departements.code]
	}),
	region: one(regions, {
		fields: [etablissements.regionCode],
		references: [regions.code]
	}),
	academie: one(academies, {
		fields: [etablissements.academieCode],
		references: [academies.code]
	}),
	statut: one(statuts, {
		fields: [etablissements.statutCode],
		references: [statuts.code]
	})
}));

export const formationsRelations = relations(formations, ({ many, one }) => ({
	statistiques: many(statistiques),
	etablissement: one(etablissements, {
		fields: [formations.etablissementUai],
		references: [etablissements.uai]
	})
}));

export const statistiquesRelations = relations(statistiques, ({ one }) => ({
	formation: one(formations, {
		fields: [statistiques.formationId],
		references: [formations.id]
	})
}))

export type Etablissement = InferSelectModel<typeof etablissements>;
export type Departement = InferSelectModel<typeof departements>;
export type Academie = InferSelectModel<typeof academies>;
export type Region = InferSelectModel<typeof regions>;
export type Formation = InferSelectModel<typeof formations>;
export type Statut = InferSelectModel<typeof statuts>;
export type Statistiques = InferSelectModel<typeof statistiques>;
export type Filiere1 = InferSelectModel<typeof filiere1>;
export type Filiere2 = InferSelectModel<typeof filiere2>;
export type Filiere3 = InferSelectModel<typeof filiere3>;