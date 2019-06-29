<template>
    <div class="container">
         <div class="row">
            <div class="row">
                <div class="input-field col s6 push-s3">
                <i class="material-icons prefix">search</i>
                <input id="icon_prefix" type="text">
                <label for="icon_prefix2">Nome do Paciente</label>
                </div>
            </div>
        </div>
        <table class="centered">
            <thead>
            <tr>
                <th>Nome do Paciente</th>
                <th>Prontuário</th>
                <th>Cartão do SUS</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="prontuario in prontuarios" :key="prontuario.prontuarioID" @click="openProntuario(prontuario)">
                    <td>{{ prontuario.pacientName }}</td>
                    <td>{{ prontuario.id }}</td>
                    <td>{{ prontuario.sus }}</td>
                </tr>
            </tbody>
        </table>
         <div class="fixed-action-btn">
            <a class="btn-floating btn-large blue modal-trigger" href="#modalProntuarioAdd">
                <i class="large material-icons">add</i>
            </a>
        </div>

        <ProntuarioAdd/>
    </div>
</template>

<script>
import ProntuarioAdd from './ProntuarioAdd'

export default {
    components: {
        ProntuarioAdd
    },
    data() {
        return {
            prontuarios: [{
                pacientName: 'mamsa',
                id: '1131031',
                sus: '1201920'
            }]
        }
    },
    methods: {
        openProntuario: function(prontuario) {
            console.log(prontuario)
        }
    }
}
</script>


<style scoped>
.container {
    background: white;
}

.btn {
    background-color: #0288d1 !important;
}

hr {
    margin-top: 3%;
    margin-bottom: 3%;
}

</style>