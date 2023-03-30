<template>
    <v-card color="#B0BEC5">
        <v-card-title>
            Total: 
        </v-card-title>
        <v-card-title>
            <v-text-field 
                v-model="search" 
                append-icon="mdi-magnify" 
                label="Search" 
                single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn elevation="2" color="#4DF566">
                    <img src="https://cdn-icons-png.flaticon.com/512/1994/1994302.png" width="20">
                    Nova Diversidade</v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="desserts" :search="search" >
            <template v-slot:[`item.action_s`]>
                    <b-icon id="icons-action" class="icon-btn" icon="trash" aria-hidden="true" variant="dark"></b-icon>
                </template>
        </v-data-table>
    </v-card>
</template>

<script>
import api from '@/services/api';



export default {
    name: "Tabela_Inventario_D",
    data() {
        return {
            search: '',
            headers: [
                { text: 'Grupo', value: 'no_grupo' },
                { text: 'Atributo', value: 'no_atributo' },
                { text: 'Descrição', value: 'js_item' },
                { text: 'Ação', value: "action_s", sortable: false },
            ],
            desserts: [],
            parametroid: this.$route.params.id,
        }
    },
    methods:{
        getDiversidade(){
            api.get(`/cliente/item-configuracao-diversidade/${this.parametroid}`)
            .then(response => {
                this.desserts = response.data.results
                this.count = response.data.count
                console.log(response)

            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.getDiversidade()
        console.log(this.parametroid)
    }
}
</script>