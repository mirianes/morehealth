<template>
    <div class="container">
        <h5>{{ day }}</h5>
        <h5>Quantidade de Vagas: {{ qntdVagas }}</h5>
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
                <tr v-for="consulta in consultas" :key="consulta.idProntuario">
                    <td>{{ consulta.pacientName }}</td>
                    <td>{{ consulta.idProntuario }}</td>
                    <td>{{ consulta.date }}</td>
                    <td>
                        <p><label>
                            <input type="checkbox" :checked="markFinished(consulta.finished)"/>
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
                            <input id="idProntuario" type="number" v-model="idProntuario"/>
                            <label for="idProntuario">Número do Prontuário</label>
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
                <a href="#!" class="waves-effect btn" @click="addConsulta()">Salvar</a>
            </div>
        </div>
    </div>
</template>

<script>
import { materializeFloating, materializeModal, materializeTextFields, materializeModalClose } from '../materialize'
import { notificationError, notificationSuccess } from '../notifications'

export default {
    data() {
        return {
            day: new Date().toLocaleDateString(),
            qntdVagas: 0,
            totalVagas: 24,
            newTotalVagas: 0,
            consultas: [{idProntuario: '124124', pacientName: 'Miriane', date: new Date().toLocaleDateString(), finished: false}],
            idProntuario: '',
            pacientName: '',
            finished: false
        }
    },
    created: function() {
        // await this.fetchConsultas()
        console.log(this.$store.getters.user)
        this.qntdVagas = this.totalVagas - this.consultas.length
    },
    mounted: function() {
        materializeFloating()
        materializeModal()
        materializeTextFields()
    },
    methods: {
        fetchConsultas: async function() {

        },
        openSettingsModal: function() {
            this.newTotalVagas = this.totalVagas
        },
        setTotalVagas: function() {
            if (this.newTotalVagas < this.consultas.length) {
                notificationError('O número total de vagas não pode ser menor que a quantidade de consultas já agendadas.')
            } else {
                notificationSuccess('Total de vagas alterado com sucesso.')
                materializeModalClose()
                this.totalVagas = this.newTotalVagas
            }
        },
        addConsulta() {
            if (this.idProntuario !== '' && this.pacientName !== '') {
                // await this.sendConsulta()
                // await this.fetchConsultas()
                materializeModalClose()
                notificationSuccess('Consulta agendada com sucesso.')
                this.idProntuario = ''
                this.pacientName = ''
            } else {
                notificationError('Todos os campos devem ser preenchidos.')
            }
        },
        sendConsulta() {

        },
        markFinished(finished) {
            if (finished) return 'checked'
            return undefined
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
