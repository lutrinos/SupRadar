
export const IndiceStats = {
  // Capacités et Vœux [cite: 61]
  capa_fin: 0,
  voe_tot: 1,
  voe_tot_f: 2,
  nb_VOE_PP: 3,
  nb_VOE_PP_internat: 4,
  nb_VOE_PP_BG: 5,
  nb_VOE_PP_BG_brs: 6,
  nb_VOE_PP_BT: 7,
  nb_VOE_PP_BT_brs: 8,
  nb_VOE_PP_BP: 9,
  nb_VOE_PP_BP_brs: 10,
  nb_VOE_PP_at: 11,
  nb_VOE_PC: 12,
  nb_VOE_PC_BG: 13,
  nb_VOE_PC_BT: 14,
  nb_VOE_PC_BP: 15,
  nb_VOE_PC_at: 16,

  // Classements [cite: 62]
  nb_cla_PP: 17,
  nb_cla_PC: 18,
  nb_cla_pp_internat: 19,
  nb_cla_pp_pasinternat: 20,
  nb_cla_pp_BG: 21,
  nb_cla_pp_BG_brs: 22,
  nb_cla_pp_BT: 23,
  nb_cla_pp_BT_brs: 24,
  nb_cla_pp_BP: 25,
  nb_cla_pp_BP_brs: 26,
  nb_cla_pp_at: 27,

  // Admis et Propositions [cite: 63]
  Prop_tot: 28,
  Acc_tot: 29,
  Acc_tot_f: 30,
  Acc_PP: 31,
  Acc_PC: 32,
  acc_debutpp: 33,
  acc_datebac: 34,
  acc_finpp: 35,
  Acc_internat: 36,
  Acc_brs: 37,
  Acc_neobac: 38,
  Acc_BG: 39,
  Acc_BT: 40,
  Acc_BP: 41,
  Acc_at: 42,

  // Mentions et Origines [cite: 64]
  Acc_mention_nonrenseig_nee: 43,
  Acc_sansmention: 44,
  Acc_ab: 45,
  Acc_b: 46,
  Acc_tb: 47,
  Acc_tbf: 48,
  acc_BG_mention: 49,
  acc_BT_mention: 50,
  acc_BP_mention: 51,
  Acc_term: 52,
  Acc_term_f: 53,
  Acc_aca_orig: 54,
  Acc_aca_orig_idf: 55,

  // Pourcentages [cite: 65]
  pct_f: 56,
  pct_aca_orig: 57,
  pct_aca_orig_idf: 58,
  pct_etab_orig: 59,
  pct_bours: 60,
  pct_acc_debutpp: 61,
  pct_acc_datebac: 62,
  pct_acc_finpp: 63,
  pct_neobac: 64,
  pct_mention_nonrenseig_nee: 65,
  pct_sansmention: 66,
  pct_AB: 67,
  pct_B: 68,
  pct_TB: 69,
  pct_TBF: 70,
  pct_BG: 71,
  pct_BG_mention: 72,
  pct_BT: 73,
  pct_BT_mention: 74,
  pct_BP: 75,
  pct_BP_mention: 76,

  // Détails Propositions par Terminale [cite: 63]
  prop_tot_BG: 77,
  prop_tot_BG_brs: 78,
  prop_tot_BT: 79,
  prop_tot_BT_brs: 80,
  prop_tot_BP: 81,
  prop_tot_BP_brs: 82,
  prop_tot_at: 83,

  // Rangs et Indicateurs finaux [cite: 66, 67]
  ran_grp1: 84,
  ran_grp2: 85,
  ran_grp3: 86,
  Taux_acces_ens: 87,
  part_acces_gen: 88,
  part_acces_tec: 89,
  part_acces_pro: 90
} as const;


/**
 * Type représentant une ligne du jeu de données Parcoursup 2025.
 * Basé sur la méthodologie Open Data 2025 comprenant 115 variables[cite: 12].
 */
export type LigneCSV = {
  // Informations établissement
  session: string; // Session 2025 [cite: 60]
  contrat_etab: string; // Statut de l'établissement (Public/Privé) [cite: 60]
  cod_uai: string; // Identifiant UAI de l'établissement [cite: 60]
  G_EA_LIB_VX: string; // Libellé de l'établissement d'accueil [cite: 60]
  dep: string; // Code départemental [cite: 60]
  dep_lib: string; // Nom du département [cite: 60]
  region_etab_aff: string; // Région de l'établissement [cite: 60]
  acad_mies: string; // Académie de l'établissement [cite: 60]
  ville_etab: string; // Commune de l'établissement [cite: 60]

  // Informations Formation
  LIB_FOR_VOE_INS: string; // Filière de formation [cite: 60]
  select_form: string; // Sélectivité (0 ou 1) [cite: 60]
  Fili: string; // Filière de formation très agrégée [cite: 60]
  LIB_COMP_VOE_INS: string; // Filière de formation détaillée [cite: 60]
  form_lib_voe_acc: string; // Filière de formation (bis) [cite: 61]
  fil_lib_voe_acc: string; // Filière de formation détaillée bis [cite: 61]
  detail_forma: string; // Filière de formation très détaillée [cite: 60]
  G_olocalisation_des_formations: string; // Coordonnées GPS (ex: 48.53, 7.73) [cite: 61]
  capa_fin: string; // Capacité de l’établissement par formation [cite: 61]

  // Effectifs des vœux (Phase Principale)
  voe_tot: string; // Effectif total des candidats [cite: 61]
  voe_tot_f: string; // Dont candidates (femmes) [cite: 61]
  nb_VOE_PP: string; // Effectif total en phase principale [cite: 61]
  nb_VOE_PP_internat: string; // Dont vœux en internat [cite: 61]
  nb_VOE_PP_BG: string; // Néo bacheliers généraux [cite: 61]
  nb_VOE_PP_BG_brs: string; // Dont boursiers néo bacheliers généraux [cite: 61]
  nb_VOE_PP_BT: string; // Néo bacheliers technologiques [cite: 61]
  nb_VOE_PP_BT_brs: string; // Dont boursiers néo bacheliers technos [cite: 61]
  nb_VOE_PP_BP: string; // Néo bacheliers professionnels [cite: 61]
  nb_VOE_PP_BP_brs: string; // Dont boursiers néo bacheliers pros [cite: 62]
  nb_VOE_PP_at: string; // Autres candidats en phase principale [cite: 62]

  // Effectifs des vœux (Phase Complémentaire)
  nb_VOE_PC: string; // Effectif total en phase complémentaire [cite: 62]
  nb_VOE_PC_BG: string; // Néo bacheliers généraux PC [cite: 62]
  nb_VOE_PC_BT: string; // Néo bacheliers technos PC [cite: 62]
  nb_VOE_PC_BP: string; // Néo bacheliers pros PC [cite: 62]
  nb_VOE_PC_at: string; // Autres candidats PC [cite: 62]

  // Candidats classés
  nb_cla_PP: string; // Total classés en phase principale [cite: 62]
  nb_cla_PC: string; // Total classés en phase complémentaire [cite: 62]
  nb_cla_pp_internat: string; // Classés en internat (CPGE) [cite: 62]
  nb_cla_pp_pasinternat: string; // Classés hors internat (CPGE) [cite: 62]
  nb_cla_pp_BG: string; // Néo bacheliers généraux classés [cite: 62]
  nb_cla_pp_BG_brs: string; // Dont boursiers néo bacheliers généraux classés [cite: 62]
  nb_cla_pp_BT: string; // Néo bacheliers technos classés [cite: 62]
  nb_cla_pp_BT_brs: string; // Dont boursiers néo bacheliers technos classés [cite: 62]
  nb_cla_pp_BP: string; // Néo bacheliers pros classés [cite: 62]
  nb_cla_pp_BP_brs: string; // Dont boursiers néo bacheliers pros classés [cite: 62]
  nb_cla_pp_at: string; // Autres candidats classés [cite: 62]

  // Propositions et Admis
  Prop_tot: string; // Total candidats ayant reçu une proposition [cite: 63]
  Acc_tot: string; // Total admis (ayant accepté la proposition) [cite: 63]
  Acc_tot_f: string; // Dont candidates admises [cite: 63]
  Acc_PP: string; // Admis en phase principale [cite: 63]
  Acc_PC: string; // Admis en phase complémentaire [cite: 63]
  
  // Rythme des admissions
  acc_debutpp: string; // Admis ayant reçu proposition à l'ouverture [cite: 63]
  acc_datebac: string; // Admis ayant reçu proposition avant le bac [cite: 63]
  acc_finpp: string; // Admis ayant reçu proposition avant fin PP [cite: 64]
  Acc_internat: string; // Admis en internat [cite: 63]
  Acc_brs: string; // Admis boursiers néo bacheliers [cite: 63]

  // Profil des admis
  Acc_neobac: string; // Total admis néo bacheliers [cite: 64]
  Acc_BG: string; // Admis néo bacheliers généraux [cite: 64]
  Acc_BT: string; // Admis néo bacheliers technos [cite: 64]
  Acc_BP: string; // Admis néo bacheliers pros [cite: 64]
  Acc_at: string; // Autres candidats admis [cite: 64]

  // Mentions au baccalauréat
  Acc_mention_nonrenseignee: string; // Sans info mention [cite: 64]
  Acc_sansmention: string; // Sans mention [cite: 64]
  Acc_ab: string; // Mention Assez Bien [cite: 64]
  Acc_b: string; // Mention Bien [cite: 64]
  Acc_tb: string; // Mention Très Bien (16-18) [cite: 37, 64]
  Acc_tbf: string; // Mention Très Bien avec félicitations (>18) [cite: 37, 64]
  acc_BG_mention: string; // Admis généraux avec mention [cite: 64]
  acc_BT_mention: string; // Admis technos avec mention [cite: 64]
  acc_BP_mention: string; // Admis pros avec mention [cite: 64]

  // Origine établissement et académique
  Acc_term: string; // Admis issus du même établissement [cite: 64]
  Acc_term_f: string; // Dont admises issues du même établissement [cite: 64]
  Acc_aca_orig: string; // Admis de la même académie [cite: 64]
  Acc_aca_orig_idf: string; // Admis de l'académie (Zone IDF) [cite: 64]

  // Pourcentages (statistiques)
  pct_acc_debutpp: string; // % admis proposition ouverture [cite: 65]
  pct_acc_datebac: string; // % admis proposition avant bac [cite: 65]
  pct_acc_finpp: string; // % admis proposition avant fin PP [cite: 65]
  pct_f: string; // % d'admis dont filles [cite: 65]
  pct_aca_orig: string; // % admis même académie [cite: 65]
  pct_aca_orig_idf: string; // % admis même académie (IDF) [cite: 65]
  pct_etab_orig: string; // % admis même établissement [cite: 65]
  pct_bours: string; // % admis boursiers [cite: 65]
  pct_neobac: string; // % admis néo bacheliers [cite: 65]
  pct_mention_nonrenseignee: string; // % sans info mention [cite: 65]
  pct_sansmention: string; // % sans mention [cite: 65]
  pct_AB: string; // % mention Assez Bien [cite: 65]
  pct_B: string; // % mention Bien [cite: 65]
  pct_TB: string; // % mention Très Bien [cite: 65]
  pct_TBF: string; // % mention Très Bien avec félicitations [cite: 65]
  pct_BG: string; // % admis généraux [cite: 65]
  pct_BG_mention: string; // % admis généraux avec mention [cite: 65]
  pct_BT: string; // % admis technos [cite: 65]
  pct_BT_mention: string; // % admis technos avec mention [cite: 65]
  pct_BP: string; // % admis pros [cite: 65]
  pct_BP_mention: string; // % admis pros avec mention [cite: 65]

  // Détails propositions par bac (votre en-tête d'origine)
  prop_tot_BG: string; // Propositions généraux [cite: 63]
  prop_tot_BG_brs: string; // Dont boursiers généraux [cite: 63]
  prop_tot_BT: string; // Propositions technos [cite: 63]
  prop_tot_BT_brs: string; // Dont boursiers technos [cite: 63]
  prop_tot_BP: string; // Propositions pros [cite: 63]
  prop_tot_BP_brs: string; // Dont boursiers pros [cite: 63]
  prop_tot_at: string; // Propositions autres candidats [cite: 63]

  // Groupes d'appel et rangs [cite: 38]
  LIB_GRP1: string; // Libellé regroupement 1 [cite: 66]
  ran_grp1: string; // Rang dernier appelé groupe 1 [cite: 66]
  LIB_GRP2: string; // Libellé regroupement 2 [cite: 66]
  ran_grp2: string; // Rang dernier appelé groupe 2 [cite: 66]
  LIB_GRP3: string; // Libellé regroupement 3 [cite: 66]
  ran_grp3: string; // Rang dernier appelé groupe 3 [cite: 66]

  // Variables techniques et indicateurs
  list_com: string; // Indicateur listes communes d'appelés [cite: 39]
  tri: string; // Variable de tri (non détaillée dans la source mais présente)
  cod_aff_form: string; // Code affichage formation [cite: 67]
  detail_forma2: string; // Concours communs et banques d'épreuves [cite: 61]
  lien_form_psup: string; // Lien vers la fiche Parcoursup [cite: 61]
  
  // Indicateurs calculés
  Taux_acces_ens: string; // Taux d'accès 2025 [cite: 42, 66]
  part_acces_gen: string; // Part terminales générales en position reçevoir prop. [cite: 66]
  part_acces_tec: string; // Part terminales technos en position reçevoir prop. [cite: 67]
  part_acces_pro: string; // Part terminales pros en position reçevoir prop. [cite: 67]

  // Identifiants externes
  etablissement_id_paysage: string; // (Présent dans l'en-tête utilisateur)
  composante_id_paysage: string; // (Présent dans l'en-tête utilisateur)
};