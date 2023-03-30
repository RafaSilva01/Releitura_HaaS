<template>
    <div>
        <b-icon 
            id="icons-action" 
            class="icon-btn" 
            icon="search" 
            aria-hidden="true" 
            variant="dark" 
            @click="$bvModal.show('modal-'+id)">Launch
            demo modal</b-icon>

            <b-modal :id="idmodal(id)" title="BootstrapVue">
                <p class="my-4" >{{ id }}Hello from modal!</p>
            </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
           
        }
    },
    props:{
        id: String
    },
    methods:{
        idmodal(id){
            
            return "modal-"+id
            
        }
    },
    

}
</script>