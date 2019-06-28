<template>
    <div class="container">
        <h5>{{ day }}</h5>
        <h5>Quantidade de Vagas: {{ vagas.totalVagas - vagas.vagasOcupadas || 0 }}</h5>
        <hr/>
        <table class="centered">
            <thead>
            <tr>
                <th>Nome do Paciente</th>
                <th>Prontuário</th>
                <th>Data</th>
                <th>Consulta Concluída?</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="consulta in consultas" :key="consulta.prontuarioID">
                    <td>{{ consulta.pacientName }}</td>
                    <td>{{ consulta.prontuarioID }}</td>
                    <td>{{ consulta.date }}</td>
                    <td>
                        <p><label>
                            <input type="checkbox" :checked="isCompleted(consulta.completed)" @click="markCompleted(consulta)"/>
                            <span></span>  
                        </label></p>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="fixed-action-btn" v-if="this.$store.getters.user.user_type == '2'">
            <a class="btn-floating btn-large blue">
                <i class="large material-icons">mode_edit</i>
            </a>
            <ul>
                <li><a class="btn-floating blue modal-trigger" href="#modalSettings"><i class="material-icons" @click="openSettingsModal()">settings</i></a></li>
                <li><a class="btn-floating blue modal-trigger" href="#modalAdd"><i class="material-icons">add</i></a></li>
            </ul>
        </div>

        <!-- Modal para configurar quantidade total de vagas -->
        <div id="modalSettings" class="modal">
            <div class="modal-content">
                <h4>Configurar Total de Vagas</h4>
                <hr/>
                <div class="row">
                    <div class="col s12 m4 l4"/>
                    <div class="input-field col s12 m4 l4">
                        <input id="totalVagas" type="number" v-model="newTotalVagas"/>
                        <label for="totalVagas">Total de vagas</label>
                    </div>
                    <div class="col s12 m4 l4"/>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="waves-effect btn red" @click="cancel('exam')">Cancelar</a>
                <a href="#!" class="waves-effect btn" @click="setTotalVagas()">Salvar</a>
            </div>
        </div>

        <!-- Modal para agendar consulta -->
        <div id="modalAdd" class="modal">
            <div class="modal-content">
                <h4>Agendar Consulta</h4>
                <hr/>
                <div class="row">
                    <div class="col s12">
                        <div class="input-field">
                            <input id="prontuarioID" type="number" v-model="prontuarioID"/>
                            <label for="prontuarioID">Número do Prontuário</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <div class="input-field">
                            <input id="pacientName" type="text" v-model="pacientName"/>
                            <label for="pacientName">Nome do Paciente</label>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <input disabled id="dateConsult" type="text" v-model="day"/>
                            <label for="dateConsult">Data</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" class="waves-effect btn red" @click="cancel('exam')">Cancelar</a>
                <a href="#!" class="waves-effect btn" @click="addConsulta()">Salvar</a>
            </div>
        </div>
    </div>
</template>

<script>
import { elasticAPI } from '../config.js'
import { materializeFloating, materializeModal, materializeTextFields, materializeModalClose } from '../materialize'
import { notificationError, notificationSuccess } from '../notifications'
import axios from 'axios'

export default {
    data() {
        return {
            day: new Date().toLocaleDateString(),
            vagas: {},
            consultas: [],
            prontuarioID: '',
            pacientName: '',
            completed: false,
            newTotalVagas: 0
        }
    },
    created: async function() {
        try {
            await this.fetchVagas()
            await this.fetchConsultas()
        } catch (error) {
            notificationError('Erro interno no servidor. Por favor, contate um administrador.')
        }
    },
    mounted: function() {
        materializeFloating()
        materializeModal()
        materializeTextFields()
    },
    methods: {
        fetchVagas: async function() {
            let dateController = new Date().toLocaleDateString().slice(0, 10).split('/').reverse().join('-')
            let result = await axios.get(`${elasticAPI.host}/vacancies/${dateController}`)

            if (result.data.length == 0) {
                let insert = await axios.post(`${elasticAPI.host}/vacancies`, {
                    date: dateController,
                    totalVagas: 24,
                    vagasOcupadas: 0
                })

                this.vagas = insert.data[0]._source
                this.vagas.id = insert.data[0]._id
            } else {
                this.vagas = result.data[0]._source
                this.vagas.id = result.data[0]._id
            }
        },
        fetchConsultas: async function() {
            this.consultas = []

            let dateController = new Date().toLocaleDateString().slice(0, 10).split('/').reverse().join('-')
            let consultas = await axios.get(`${elasticAPI.host}/consult/${dateController}`)
            // consultas.data.sort((a, b) => { return a._source.date - b._source.date})

            consultas.data.forEach(element => {
                this.consultas.push({
                    date: element._source.date.slice(0, 10).split('-').reverse().join('/'),
                    pacientName: element._source.pacientName,
                    prontuarioID: element._source.prontuarioID,
                    completed: element._source.completed,
                    id: element._id
                })
            })
        },
        openSettingsModal: function() {
            this.newTotalVagas = this.vagas.totalVagas
        },
        setTotalVagas: async function() {
            if (this.newTotalVagas < this.consultas.length) {
                notificationError('O número total de vagas não pode ser menor que a quantidade de consultas já agendadas.')
            } else {
                let dateController = new Date().toLocaleDateString().slice(0, 10).split('/').reverse().join('-')

                let result = await axios.put(`${elasticAPI.host}/vacancies/${this.vagas.id}`, {
                    totalVagas: parseInt(this.newTotalVagas),
                    date: dateController
                })

                this.vagas = result.data[0]._source
                this.vagas.id = result.data[0]._id

                notificationSuccess('Total de vagas alterado com sucesso.')
                materializeModalClose()
            }
        },
        addConsulta: async function() {
            let vagasDisponiveis = this.vagas.totalVagas - this.vagas.vagasOcupadas
            if (vagasDisponiveis > 0) {
                if (this.prontuarioID !== '' && this.pacientName !== '') {
                    await this.sendConsulta()
                } else {
                    notificationError('Todos os campos devem ser preenchidos.')
                }
            } else {
                notificationError('Todas as vagas já foram ocupadas.')
            }
        },
        sendConsulta: async function() {
            try {
                let dateController = new Date().toLocaleDateString().slice(0, 10).split('/').reverse().join('-')
                let result = await axios.post(`${elasticAPI.host}/consult`, {
                    prontuarioID: this.prontuarioID,
                    pacientName: this.pacientName,
                    date: dateController,
                    completed: false,
                    idVaga: this.vagas.id
                })

                this.consultas = []
                result.data.forEach(element => {
                    this.consultas.push({
                        date: element._source.date.slice(0, 10).split('-').reverse().join('/'),
                        pacientName: element._source.pacientName,
                        prontuarioID: element._source.prontuarioID,
                        completed: element._source.completed,
                        id: element._id
                    })
                })

                this.fetchVagas()
                materializeModalClose()
                notificationSuccess('Consulta agendada com sucesso.')
                this.prontuarioID = ''
                this.pacientName = ''
            } catch (error) {
                notificationError('Erro interno no servidor. Por favor, contate um administrador.')                
            }
        },
        markCompleted: async function(consulta) {
            let result = await axios.put(`${elasticAPI.host}/consult/${consulta.id}`)
            consulta.completed = true
        },
        isCompleted: function(completed) {
            if (completed) return 'checked'
            return undefined
        },
        cancel: function() {
            materializeModalClose()
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

#modalSettings {
    width: 35%;
}

.modal-footer {
    padding-right: 24px;
}
</style>
