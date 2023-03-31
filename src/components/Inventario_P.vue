<template>
  <div class="mr-10">
    <v-container>
      <v-card color="#B0BEC5">
        <v-card-title>
          Inventario
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="desserts" :search="search" >
          <template v-slot:[`item.actions`]="{item}" >
            <RouterLink :to="{name:'detalhes', params:{id:item.id}}">
              <b-icon id="icons-action" class="icon-btn" icon="eye" aria-hidden="true" variant="dark"></b-icon>
            </RouterLink>
          </template>
           
            <template v-slot:[`item.entrada`]="{item}">
              <v-chip :color="getColor(item.entrada)" dark>
                  {{ item.entrada }}
              </v-chip>
            </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import { RouterLink } from 'vue-router'
import api from '../services/api'

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Codigo", value: "id" },
        { text: "Nome", value: "no_item" },
        { text: "Responsavel", value: "responsavel" },
        { text: "Classe", value: "classe_i" },
        { text: "relevancia", value: "nu_relevancia" },
        { text: "Regra de cobrança", value: "tp_regra_cobranca" },
        { text: "Valor", value: "nu_dia_regra_cobranca" },
        { text: "Vlr. Unitario", value: "vl_item" },
        { text: "Rastreabilidade", value: "bo_rastreabilidade" },
        { text: "Entrada", value: "entrada" },
        { text: "Situação", value: "bo_ativo" },
        { text: "Ação", value: "actions", sortable: false },
      ],
      desserts: [], 
      

    };
    
  },
  methods: {
    getInventario() {
      api.get("/cliente/item-configuracao")
        .then(response => {
          const results = response.data.results;
          for (let i = 0; i < results.length; i = i + 1) {
            console.log(results[2].classe.bo_manual);
            if (results[i].bo_rastreabilidade == true) {
              //Editando o campo de rastreabilidade
              results[i].bo_rastreabilidade = "Sim";
            }
            else {
              results[i].bo_rastreabilidade = "Não";
            }

            //Editando o campo do ativo
            if (results[i].bo_ativo == true) {
              results[i].bo_ativo = "Ativo";
            }
            else {
              results[i].bo_ativo = "Inativo";
            }

            //Editando o campo da classe
            results[i].classe_i = results[i].classe.no_classe;
            results[i].classe = { no_classe: results[i].classe.no_classe, bo_manual: results[i].classe.bo_manual };

            // Editando o campo da relevancia
            results[i].grupo = "peso", results[i].relevancia.nu_relevancia;

            //Editando o campo de regras de combranças
            results[i].tp_regra_cobranca = "Nr. Dias p/Faturar";
            
            //Editando o campo de Entrada
            if (results[i].bo_hibrido === true) {
              results[i].entrada = "Hibrido";
            }
            else if (results[i].classe.bo_manual === true) {
              results[i].entrada = "Manual";
            }
            else {
              results[i].entrada = "Automatico";
            }
            this.desserts = results;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getColor (entrada) {
        if (entrada === "Hibrido") return 'red'
        else if (entrada === "Manual") return 'orange'
        else return 'green'
      },

  },
  mounted() {
    this.getInventario();
  },
  components: { RouterLink }
  
}

</script>