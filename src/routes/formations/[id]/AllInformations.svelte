<script lang="ts">
    import { getFiliere } from "$lib/data";


    let { formation } = $props();
</script>

<div class="card card-border bg-base-100 mb-8">
    <div class="card-body">
        <h2 class="card-title">Toutes les informations</h2>

        <!-- Formation -->
        <span class="font-medium">Informations sur la formation.</span>
        <div class="overflow-x-auto">
            <table class="table table-xs table-zebra">
                <thead>
                    <tr>
                        <th>Clé</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>nom</td>
                        <td>{ formation.nom }</td>
                    </tr>
                    <tr>
                        <td>selective</td>
                        <td>{formation.selective ? "formation sélective" : "formation non sélective"}</td>
                    </tr>
                    <tr>
                        <td>Filière de formation très agrégée</td>
                        <td>{getFiliere(1, formation.filiere1).nom}</td>
                    </tr>
                    <tr>
                        <td>Filière de formation</td>
                        <td>{getFiliere(2, formation.filiere2).nom}</td>
                    </tr>
                    <tr>
                        <td>Filière de formation détaillée bis</td>
                        <td>{getFiliere(3, formation.filiere3).nom}</td>
                    </tr>
                    <tr>
                        <td>Filière de formation très détaillée</td>
                        <td>{formation.detailForma}</td>
                    </tr>
                    <tr>
                        <td>Concours communs et banque d'épreuves</td>
                        <td>{formation.detailForma2}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Établissement -->
        <span class="font-medium">Informations sur l'établissement.</span>
        <div class="overflow-x-auto">
            <table class="table table-xs table-zebra">
                <thead>
                    <tr>
                        <th>Clé</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>uai</td>
                        <td>{formation.etablissement.uai}</td>
                    </tr>
                    <tr>
                        <td>nom</td>
                        <td>{formation.etablissement.nom}</td>
                    </tr>
                    <tr>
                        <td>region</td>
                        <td>{formation.etablissement.region?.nom ?? ""}</td
                        >
                    </tr>
                    <tr>
                        <td>département</td>
                        <td
                            >{formation.etablissement.departement?.nom ??
                                ""}</td
                        >
                    </tr>
                    <tr>
                        <td>academie</td>
                        <td
                            >{formation.etablissement.academie?.nom ??
                                ""}</td
                        >
                    </tr>
                    <tr>
                        <td>commune</td>
                        <td>{formation.etablissement.commune}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{formation.etablissement.longitude}</td>
                    </tr>
                    <tr>
                        <td>latitude</td>
                        <td>{formation.etablissement.latitude}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
