<template>
    <div id="modalSettingsExam" class="modal">
            <div class="modal-header">
                <div class="row">
                    <div class="col s11"><h4>Configurar Exames</h4></div>
                    <div class="col s1">
                        <a href="#!" id="modal-close" @click="close()"><i class="tiny material-icons">close</i></a></div>
                </div>
                <hr/>
            </div>
            <div class="modal-content">
                <div class="row">
                    <div class="col s6" id="exam-div">
                        <div class="row" v-if="!editExamCheck && !addExamCheck">
                            <h6>Exames</h6>
                            <table class="centered">
                                <thead>
                                <tr>
                                    <th>Tipo de Exame</th>
                                    <th>Vagas</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="exam in tipos" :key="exam.nome">
                                        <td>{{ exam.nome }}</td>
                                        <td>{{ exam.vagas }}</td>
                                        <td><a @click="editExam(exam)"><i class="tiny material-icons">edit</i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <a href="#!" class="btn" @click="addExam()">Adicionar Exame</a>
                        </div>
                        <div class="row" v-else>
                            <div class="row">
                                <h6 v-if="editExamCheck">Editar Exame</h6>
                                <h6 v-else>Adicionar Exame</h6>
                                <div class="col s2"></div>
                                <div class="input-field input-group col s4">
                                    <input id="nameEx" type="text" class="validate" v-model="newExam.nome">
                                    <label for="nameEx">Tipo de Exame</label>
                                </div>
                                <div class="input-field input-group col s4">
                                    <input id="vagasEx" type="number" v-model="newExam.vagas"/>
                                    <label for="vagasEx">Vagas</label>
                                </div>
                                <div class="col s2"></div>
                            </div>
                            <a href="#!" class="waves-effect btn red" @click="cancelEdit('exam')">Cancelar</a>
                            <a href="#!" class="waves-effect btn" @click="saveExam()">Salvar</a>
                        </div>
                    </div>
                    <div class="col s6" id="local-div">
                        <div class="row" v-if="!editLocalCheck && !addLocalCheck">
                            <h6>Locais de Exames</h6>
                            <table class="centered">
                                <thead>
                                <tr>
                                    <th>Local</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="local in locais" :key="local">
                                        <td>{{ local }}</td>
                                        <td><a @click="editLocal(local)"><i class="tiny material-icons">edit</i></a></td>                                
                                    </tr>
                                </tbody>
                            </table>
                            <a href="#!" class="btn" @click="addLocal()">Adicionar Local</a>
                        </div>
                        <div class="row" v-else>
                            <div class="row">
                                <h6 v-if="editLocalCheck">Editar Local</h6>
                                <h6 v-else>Adicionar Local</h6>
                                <div class="col s2"></div>
                                <div class="input-field input-group col s8">
                                    <input id="nameEx" type="text" class="validate" v-model="newLocal">
                                    <label for="nameEx">Nome Local</label>
                                </div>
                                <div class="col s2"></div>
                            </div>
                            <a href="#!" class="waves-effect btn red" @click="cancelEdit('local')">Cancelar</a>
                            <a href="#!" class="waves-effect btn" @click="updateLocal()">Salvar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { materializeModal, materializeModalClose, materializeTextFields } from '../../materialize'

export default {
    props: ["locais", "tipos"],
    data() {
        return {
            newExam: {},
            newLocal: '',
            editExamCheck: false,
            addExamCheck: false,
            editLocalCheck: false,
            addLocalCheck: false,
            index : -1
        }
    },
    mounted: function() {
        materializeModal()
    },
    updated: function() {
        materializeTextFields()
    },
    methods: {
        saveExam: function() {
            if (this.editExamCheck) {
                this.editExamCheck = false
                this.tipos[this.index] = this.newExam
                this.newExam = {}
                this.index = -1
                // Salvar o exame atualizado no bd
                // Novo request do bd
            } else {
                this.addExamCheck = false
                this.tipos.push(this.newExam)
                this.newExam = {}
            }
        },
        updateLocal: function() {
            if (this.editLocalCheck) {
                this.editLocalCheck = false
                this.locais[this.index] = this.newLocal
                this.index = -1
                // Salvar o exame atualizado no bd
                // Novo request do bd
            } else {
                this.addLocalCheck = false
                this.locais.push(this.newLocal)
            }
        },
        editExam: function(exam) {
            this.newExam = Object.assign({}, exam)
            this.index = this.tipos.indexOf(exam)
            this.editExamCheck = true
        },
        editLocal: function(local) {
            this.newLocal = local
            this.index = this.locais.indexOf(local)
            this.editLocalCheck = true
        },
        addExam: function() {
            this.addExamCheck = true
        },
        addLocal: function() {
            this.addLocalCheck = true
        },
        cancelEdit: function(col) {
            if (col === 'exam') {
                this.editExamCheck = false
                this.addExamCheck = false
                this.newExam = {}
            } else {
                this.editLocalCheck = false
                this.addLocalCheck = false
                this.newLocal = ''
            }
        },
        close: function() {
            materializeModalClose()
        }
    }
}
</script>


<style scoped>
.input-group {
    display: table;
}

#modal-close {
    color: black !important;
}

.modal-header {
    margin-top: 3%;
}

table {
    margin-bottom: 5%;
}

h6 {
    font-weight: 600;
}

#exam-div {
    padding-right: 3%;
}

#local-div {
    padding-left: 3%;
}

td a {
    cursor: pointer;
}
</style>

<style>

</style>

