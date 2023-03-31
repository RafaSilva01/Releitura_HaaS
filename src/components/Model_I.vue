<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">

                <b-icon id="icons-action" class="icon-btn" icon="search" aria-hidden="true" variant="dark" v-bind="attrs"
                    v-on="on">

                </b-icon>

            </template>
            <v-card>
                <v-card color="#B0BEC5" height="50">
                    <v-container>
                        <span class="text-h5">
                            Editar IC
                        </span>
                    </v-container>
                </v-card>
                <v-card-title>
                    <span class="text-h5">Formulario</span>
                    <v-spacer></v-spacer>

                    <v-btn :to="'localhost:8080/detalhe'" icon color="black">
                        <v-icon>mdi-arrow-left-top</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Classe" :value="classe.no_classe" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Hash" :value="id" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Dt.Ultimo Inventario" :value="dt_ultimo_inventario"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Nu_dia_Inventario" :value="nu_dia_inventariado"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import api from '@/services/api';

export default {
    data: () => ({
        dialog: false,
    }),
    methods: {
        postHistorico() {
            api.post(`/hub/dados/item/inventario/historico/`, {

            })
                .then(() => {

                })
                .catch(error => {
                    console.log(error);
                });


        }
    },
    props: {
        classe: Object,
        id: String,
        dt_ultimo_inventario: String,
        nu_dia_inventariado: Number
    }

}
</script>
