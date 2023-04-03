<template>
    <v-card>
        <v-card color="#B0BEC5">
            <v-card-title>
                Total: {{ count }}
            </v-card-title>
            <v-card-title color="#B0BEC5">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                    hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn elevation="2" color="#4DF566">
                    <img src="https://cdn-icons-png.flaticon.com/512/1994/1994302.png" width="20">
                    Nova Condicional</v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="desserts" :search="search">
                <template v-slot:[`item.action_s`]>
                    <b-icon id="icons-action" class="icon-btn" icon="trash" aria-hidden="true" variant="dark"></b-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-card>
</template>

<script>
import api from '@/services/api';

export default {
    name: "Tabela_Inven",
    data() {
        return {
            search: '',
            count: 0,
            headers: [
                { text: 'Nome da Condicional', value: 'no_condicional' },
                { text: 'Justificativa', value: 'ds_justificativa' },
                { text: 'Aplicar Regra', value: 'bo_aplica_regra' },
                { text: 'Dt. Inicio da duração da Condicional', value: 'protein' },
                { text: 'Dt. Termino da duração da Condicional', value: 'iron' },
                { text: 'Usuario', value: 'no_usuario' },
                { text: 'Dt. Cadastro', value: 'dt_cadastro' },
                { text: 'Ação', value: "action_s", sortable: false },
            ],
            desserts: [],
            parametroid: this.$route.params.id,
        }
    },
    methods: {
        getCondicional() {
            api.get(`/cliente/item-configuracao-condicional/${this.parametroid}`)
                .then(response => {
                    const soma = response.data.results
                    for (let i = 0; i < soma.length; i = i + 1) {
                        if (soma[i].bo_aplica_regra == true) {
                            soma[i].bo_aplica_regra = "Sim"
                        }
                        else {
                            soma[i].bo_aplica_regra = "Não"
                        }
                    }
                    this.desserts = response.data.results
                    this.count = response.data.count

                    console.log(response.data)
                }).catch(error => {
                    console.log(error);
                });

        }
    },
    mounted() {
        this.getCondicional()
        console.log(this.parametroid)
    }
}
</script>