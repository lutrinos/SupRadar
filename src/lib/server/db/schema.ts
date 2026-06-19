import { boolean, doublePrecision, index, integer, json, pgTable, primaryKey, text, varchar } from "drizzle-orm/pg-core";
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
	nom: text().notNull(),
});

export const secteurs = pgTable('secteurs', {
	code: integer().primaryKey(),
	nom: text().notNull()
});

export const comptes = pgTable('comptes', {
	uai: text().notNull(),
	type: text().notNull(),
	valeur: text().notNull()
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
	// Informations officielles
	id: text(),// identifiant interne à l'éducation nationale (?)
	uai: text().primaryKey(),// code_uai
	nom: text().notNull(),// etablissement
	sigle: text(),// sigle
	site: text(),// site web
	creation: text(),// Date de création, format aaaa-mm-jj
	reference: text(),// Texte créant l'établissement
	referenceUrl: text(),// Lien de ce texte (legifrance)
	statutCode: integer().references(() => statuts.code),

	// Informations de contact
	pays: integer(),
	adresse: text(),
	lieuDit: text(),
	boitePostale: text(),
	codePostal: text(),
	localite: text(),
	telephone: text(),

	// Informations pratiques
	type: integer(),// université, école d'ingé...
	typologie: integer(),// type en plus précis
	secteur: integer().references(() => secteurs.code),// statut public/privé
	vague: integer(),// vague A, B, C, D, E de contractualisation

	// Localisation
	regionCode: integer().references(() => regions.code),
	academieCode: integer().references(() => academies.code),
	departementCode: text().references(() => departements.code),// code_departement
	commune: text(),// nom_commune
	urbaine: text(),// code de la zone urbaine
	longitude: doublePrecision(),// gps
	latitude: doublePrecision(),// gps

	// Pratique
	formationsCount: integer().notNull(),
	article: text(),

	// Informations annexe
	anciens_uai: json().$type<string[]>(),
	siret: varchar({ length: 14 }),// Système d'Identification du Répertoire des ÉTablissements
	siren: varchar({ length: 9 }),// Système d'Identification du Répertoire des ENtreprises
	rna: text(),// répertoire national des associations
	wikidata: text(),
	idref: varchar({ length: 9 }),// identifiant des bibliothèques de l'enseignement supérieur
	eter: text(),// European Tertiary Education Register
	ror: text(),// Research Organization Registry
	pic: varchar({ length: 9 }),// Participant Identification Code
	isni: varchar({ length: 16 }),// International Standard Name Identifier
	orgref: integer(),// Organization Reference
	fundingId: text(),// Source du financement (moins utilisé que le ROR)
	scanr: text(),
	hal: text(),
	mooc: text(),
});



export const formations = pgTable('formations', {
	id: integer().primaryKey(),
	etablissementUai: text().notNull().references(() => etablissements.uai),// code_uai
	nom: text().notNull(),// filière
	
	regionCode: integer().references(() => regions.code),
	academieCode: integer().references(() => academies.code),
	departementCode: text().references(() => departements.code),// code_departement
	commune: text(),// nom_commune
	longitude: doublePrecision(),// gps
	latitude: doublePrecision(),// gps

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
	secteur: one(secteurs, {
		fields: [etablissements.secteur],
		references: [secteurs.code]
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
	}),
	departement: one(departements, {
		fields: [formations.departementCode],
		references: [departements.code]
	}),
	region: one(regions, {
		fields: [formations.regionCode],
		references: [regions.code]
	}),
	academie: one(academies, {
		fields: [formations.academieCode],
		references: [academies.code]
	}),
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
export type Secteur = InferSelectModel<typeof secteurs>;
export type Statistiques = InferSelectModel<typeof statistiques>;
export type Filiere1 = InferSelectModel<typeof filiere1>;
export type Filiere2 = InferSelectModel<typeof filiere2>;
export type Filiere3 = InferSelectModel<typeof filiere3>;
export type Statut = InferSelectModel<typeof statuts>;