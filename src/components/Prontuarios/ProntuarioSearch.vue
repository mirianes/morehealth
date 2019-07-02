<template>
    <div class="container" v-if="getProntuario">
         <div class="row" id="searchBar">
            <div class="row">
                <div class="input-field col s6 push-s3">
                <i class="material-icons prefix">search</i>
                <input class="form-control" id="search" type="text" v-model="filter">
                <label for="search">Nome do Paciente</label>
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
                <tr v-for="prontuario in prontuariosList" :key="prontuario.id" @click="openProntuario(prontuario)">
                    <td>{{ prontuario.nome }}</td>
                    <td>{{ prontuario.id }}</td>
                    <td>{{ prontuario.cartaoSUS }}</td>
                </tr>
            </tbody>
        </table>
         <div class="fixed-action-btn">
            <a class="btn-floating btn-large blue modal-trigger" href="#modalProntuarioAdd">
                <i class="large material-icons">add</i>
            </a>
        </div>

        <ProntuarioAdd :prontuario="prontuarioSelected" @prontuarioShow="prontuarioSelected=$event.prontuario"/>
    </div>
</template>

<script>
import { postgreSqlAPI } from '../../config'
import { notificationError, notificationSuccess } from '../../notifications'
import { materializeModalOpen } from '../../materialize'
import ProntuarioAdd from './ProntuarioAdd'
import axios from 'axios'

export default {
    components: {
        ProntuarioAdd
    },
    data() {
        return {
            prontuarios: [],
            prontuarioSelected: {},
            filter: ''
        }
    },
    created: async function() {
        try {
            this.prontuarioSelected = {}
            await this.fetchData()
        } catch (error) {
            notificationError('Erro interno no servidor. Por favor, contate um administrador.')
        }
    },
    methods: {
        fetchData: async function() {
            const result = await axios.get(`${postgreSqlAPI.host}/prontuario`)
            this.prontuarios = result.data
        },
        openProntuario: function(prontuario) {
            this.prontuarioSelected = Object.assign({}, prontuario)
            materializeModalOpen('#modalProntuarioAdd')
        }
    },
    computed: {
        getProntuario: function() {
            this.fetchData()
            return this.prontuarioSelected
        },
        prontuariosList: function() {
            if (this.filter == '') {
                return this.prontuarios.slice(0,10)
            }
            return this.prontuarios.filter((prontuario) => {
                return prontuario.nome.match(this.filter)
            })
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

#searchBar {
    margin-top: 3%;
}

</style>