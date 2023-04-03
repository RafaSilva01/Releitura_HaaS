<template>
    <div>
        <v-container>
            <v-banner outlined single-line>
                <template>
                    <v-card>
                        <v-toolbar color="#000" dark flat>
                            <template>
                                <v-tabs v-model="tabs" centered>
                                    <v-tab>
                                        Inventario
                                    </v-tab>
                                    <v-tab>
                                        Condicional
                                    </v-tab>
                                    <v-tab>
                                        Diversidade
                                    </v-tab>
                                </v-tabs>
                            </template>
                        </v-toolbar>

                        <v-tabs-items v-model="tabs">

                            <v-tab-item>
                                <v-card flat>

                                    <!--Tabela-->
                                    <template>
                                        <v-expansion-panels>
                                            <v-expansion-panel v-for="(item, i) in 1" :key="i">
                                                <v-expansion-panel-header>
                                                    Selecionar Data
                                                </v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-row justify="space-between">
                                                        <div>
                                                            <v-date-picker v-model="value" :events="arrayEvents"
                                                                event-color="#0E1566" full-width
                                                                :landscape="$vuetify.breakpoint.smAndUp" class="mt-4"
                                                                locale="pt-br" color="#78909C">
                                                            </v-date-picker>
                                                        </div>
                                                    </v-row>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                        <v-card color="#B0BEC5">
                                            <v-card-title>
                                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"
                                                    single-line hide-details></v-text-field>
                                            </v-card-title>
                                            <v-data-table :headers="headers" :items="desserts" :search="search">

                                                <template v-slot:[`item.historico`]="{ item }">

                                                    <Model_I :id="item.hash"
                                                        :dt_ultimo_inventario="item.dt_ultimo_inventario"
                                                        :nu_dia_inventariado="item.nu_dia_inventariado"
                                                        :classe="classe_d[0]" />

                                                </template>
                                                <!--Icones de lupa, lapis e chave-->
                                                <template v-slot:[`item.action`]>

                                                    <b-icon id="icons-action" class="icon-btn" icon="pencil"
                                                        aria-hidden="true" variant="dark">

                                                    </b-icon>
                                                    <v-spacer></v-spacer>
                                                    <b-icon id="icons-action" class="icon-btn" icon="wrench"
                                                        aria-hidden="true" variant="dark">
                                                    </b-icon>
                                                </template>
                                            </v-data-table>
                                        </v-card>
                                    </template>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <v-card color="#B0BEC5">
                                        <Condicional_Invent />
                                    </v-card>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card flat>
                                    <Diversidade_Invent />
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </template>
            </v-banner>

        </v-container>

    </div>
</template>

<script>

import api from '../services/api';

import Diversidade_Invent from './Diversidade_Invent.vue';
import Model_I from './Model_I.vue'
import Condicional_Invent from './Condicional_Invent.vue';

export default {
    components: {Diversidade_Invent, Model_I, Condicional_Invent },

    data() {
        return {
            search: '',
            filter: {},
            cor_data: '',
            count: 0,
            headers: [],
            classe_d: [],
            desserts: [],
            parametroid: this.$route.params.id,
            arrayEvents: null,
            value: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            //Inicio do campo do inventario/Condicional/Diversidade
            tabs: null,
            //Fim do campo do inventario/Condicional/Diversidade
        }
    },
    watch: {
        value: function () {
            this.getInventario()

        }
    },
    methods: {
        getInventario() {
            const current = new Date()
            const month = current.getMonth() < 10 ? `${current.getMonth()}` : current.getMonth();
            const year = current.getFullYear();
            const day = current.getDate();
            const currentDate = `${year}-${month}-${day}`

            const api_defull = `/hub/dados/inventario/${this.parametroid}`
            const calen_api = this.value ? `${api_defull}/${this.value}/20/1` : `${api_defull}/${currentDate}/20/1`

            api.get(calen_api)
                .then(response => {
                    this.classe_d = response.data.results.classe
                    const rows = response.data.results.rows
                    const arr = response.data.results.columns
                    const historico = { text: "Historico", value: "historico" }
                    this.headers.push(historico)


                    for (let i = 0; i < arr.length; i++) {

                        const cabecalho = { text: arr[i].ds_titulo, value: arr[i].no_atributo }
                        this.headers.push(cabecalho)


                    }
                    const acao = { text: "Ação", value: "action" }
                    console.log(this.headers)
                    this.headers.push(acao)

                    this.desserts = rows
                    this.count = response.data.count
                    this.statusapi = false

                })
                .catch(error => {
                    console.log(error);
                });
        },
        getData_Inventario() {
            api.get(`/hub/dados/frequencia-inventario-datas/${this.parametroid}`)
                .then(response => {
                    const resul_cor = response.data.results
                    this.arrayEvents = resul_cor.map((item) => {
                        return item.data
                    })
                }).catch(error => {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.getData_Inventario()
    },
}
</script>