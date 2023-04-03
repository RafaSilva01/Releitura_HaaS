<template>
    <div>
        <v-container>
            <v-banner outlined single-line>
                <v-card color="#B0BEC5">
                    <v-card-title>
                        Inventario - Items de configuração
                        <v-spacer></v-spacer>
                        <v-btn :to="'/'" icon color="black">
                            <v-icon>mdi-arrow-left-top</v-icon>
                        </v-btn>
                    </v-card-title>
                </v-card>
                <template>
                    <div>
                        <v-data-table :headers="headers" :items="desserts" :hide-default-footer="true">

                            <template v-slot:[`item.no_classe`]="{ item }">
                                <v-chip :color="getColor(item.no_classe)" dark>
                                    {{ item.no_classe }}
                                </v-chip>
                            </template>

                        </v-data-table>
                    </div>
                </template>
            </v-banner>
            <!---->
        </v-container>
    </div>
</template>
  
<script>
import api from '../services/api'

export default {
    data() {
        return {
            headers: [
                { text: 'Codigo', value: 'id' },
                { text: 'Nome', value: 'no_item' },
                { text: 'Responsavel', value: 'carbs' },
                { text: 'Classe', value: 'classe_e' },
                { text: 'Relevancia(Tipo)', value: 'tp_relevancia' },
                { text: 'Relevancia', value: 'ds_relevancia' },
                { text: 'Regra de Cobrança', value: 'tp_regra_cobranca' },
                { text: 'Valor', value: 'nu_dia_regra_cobranca' },
                { text: 'Vlr. Unitario', value: 'vl_item' },
                { text: 'Rastreabilidade', value: 'bo_rastreabilidade' },
                { text: 'Entrada', value: 'no_classe' },
                { text: 'Situação', value: 'bo_ativo' },
            ],
            desserts: [],
            parametroid: this.$route.params.id,
        }
    },
    methods: {
        getInventario() {
            api.get(`/cliente/item-configuracao/buscar/${this.parametroid}`)
                .then(response => {
                    const resultado = response.data.results
                    for (let i = 0; i < resultado.length; i = i + 1) {
                        //Classe(entrada)
                        resultado[i].classe_e = resultado[i].classe.no_classe;
                        resultado[i].classe = {
                            no_classe: resultado[i].classe.no_classe,
                            bo_manual: resultado[i].classe.bo_manual
                        }
                        //Entrada(utilizando o campo de classe)
                        if (resultado[i].bo_hibrido === true) {
                            resultado[i].no_classe = "Hibrido";
                        }
                        else if (resultado[i].classe.bo_manual === true) {
                            resultado[i].no_classe = "Manual";
                        }
                        else {
                            resultado[i].no_classe = "Automatico";
                        }
                        //Relevancia
                        resultado[i].grupo = "peso", resultado[i].relevancia.ds_relevancia;

                        //Regra de negocio
                        resultado[i].tp_regra_cobranca = "Nr. Dias p/Faturar";

                        //Rastreabilidade
                        if (resultado[i].bo_rastreabilidade == true) {
                            resultado[i].bo_rastreabilidade = "Sim"
                        }
                        else {
                            resultado[i].bo_rastreabilidade = "Não"
                        }

                        //console.log({ ...response.data })

                        //Ativo
                        if (resultado[i].bo_ativo === true) {
                            resultado[i].bo_ativo = "Ativo"
                        }
                        else {
                            resultado[i].bo_ativo = "Inativo"
                        }
                        this.desserts = resultado;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getColor(no_classe) {
            if (no_classe === "Hibrido") return 'red'
            else if (no_classe === "Manual") return 'orange'
            else return 'green'
        },
    },
    mounted() {
        this.getInventario()
        //console.log(this.parametroid)
    }
}
</script>