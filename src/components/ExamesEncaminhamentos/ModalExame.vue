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
                                        <td>{{ exam._source.type }}</td>
                                        <td>{{ exam._source.vagas }}</td>
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
                                    <input id="nameEx" type="text" class="validate" v-model="newExam.type">
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
                                    <tr v-for="local in locais" :key="local._source.name">
                                        <td>{{ local._source.name }}</td>
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
                                    <input id="nameEx" type="text" class="validate" v-model="newLocal.name">
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
import { elasticAPI } from '../../config.js'
import { materializeModal, materializeModalClose, materializeTextFields } from '../../materialize'
import { notificationError, notificationSuccess } from '../../notifications'
import axios from 'axios'

export default {
    data() {
        return {
            locais: [],
            tipos: [],
            newExam: {},
            newLocal: {},
            editExamCheck: false,
            addExamCheck: false,
            editLocalCheck: false,
            addLocalCheck: false,
            count: 0
        }
    },
    created: async function() {
        try {
            await this.fetchTipos()
            await this.fetchLocais()
        } catch (error) {
            notificationError('Erro interno no servidor. Por favor, contate um administrador.')                            
        }
    },
    mounted: function() {
        materializeModal()
    },
    updated: function() {
        materializeTextFields()
    },
    methods: {
        fetchTipos: async function() {
            this.tipos = []
            let result = await axios.get(`${elasticAPI.host}/examRouting/1`)
            this.tipos = result.data
        },
        fetchLocais: async function() {
            this.locais = []
            let result = await axios.get(`${elasticAPI.host}/places`)
            this.locais = result.data
        },
        saveExam: async function() {
            try {
                if (this.editExamCheck) {
                    let result = await axios.put(`${elasticAPI.host}/examRouting/${this.newExam.id}`, {
                        type: this.newExam.type,
                        vagas: parseInt(this.newExam.vagas),
                        indicator: 1
                    })

                    this.tipos = result.data
                    await this.fetchTipos()

                    notificationSuccess('Exame atualizado com sucesso.')
                } else {
                    let result = await axios.post(`${elasticAPI.host}/examRouting`, {
                        type: this.newExam.type,
                        vagas: parseInt(this.newExam.vagas),
                        indicator: 1
                    })

                    this.tipos = result.data
                    await this.fetchTipos()

                    notificationSuccess('Exame inserido com sucesso.')
                }
                this.editExamCheck = false
                this.addExamCheck = false
                this.newExam = {}
                this.updateParent()
            } catch (error) {
                notificationError('Erro interno no servidor. Por favor, contate um administrador.')                
            }
        },
        updateLocal: async function() {
            try {
                if (this.editLocalCheck) {
                    let result = await axios.put(`${elasticAPI.host}/places/${this.newLocal.id}`, {
                        name: this.newLocal.name
                    })
    
                    this.locais = result.data
                    await this.fetchLocais()

                    notificationSuccess('Local atualizado com sucesso.')
                } else {
                    let result = await axios.post(`${elasticAPI.host}/places`, {
                        name: this.newLocal.name
                    })
    
                    this.locais = result.data
                    await this.fetchLocais()

                    notificationSuccess('Local inserido com sucesso.')    
                }
    
                this.newLocal = {}
                this.editLocalCheck = false
                this.addLocalCheck = false
                this.updateParent()
            } catch (error) {
                notificationError('Erro interno no servidor. Por favor, contate um administrador.')                                
            }
        },
        editExam: function(exam) {
            this.newExam = Object.assign({}, exam._source)
            this.newExam.id = exam._id
            this.editExamCheck = true
        },
        editLocal: function(local) {
            this.newLocal = Object.assign({}, local._source)
            this.newLocal.id = local._id
            this.editLocalCheck = true
        },
        addExam: function() {
            this.newExam = {}
            this.addExamCheck = true
        },
        addLocal: function() {
            this.newLocal = {}
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
        },
        updateParent: function() {
            this.count += 1
            this.$emit('needUpdateExame', {
                needUpdate: this.count
            })
        }
    }
}
</script>


<style scoped>
.btn {
    background-color: #0288d1 !important;
}

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

