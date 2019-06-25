<template>
    <div id="modalSettingsEnc" class="modal">
            <div class="modal-header">
                <div class="row">
                    <div class="col s11"><h4>Configurar Encaminhamentos</h4></div>
                    <div class="col s1">
                        <a href="#!" id="modal-close" @click="close()"><i class="tiny material-icons">close</i></a></div>
                </div>
                <hr/>
            </div>
            <div class="modal-content">
                <div class="row">
                    <div class="col s6" id="enc-div">
                        <div class="row" v-if="!editEncCheck && !addEncCheck">
                            <h6>Encaminhamentos</h6>
                            <table class="centered">
                                <thead>
                                <tr>
                                    <th>Tipo de Encaminhamento</th>
                                    <th>Vagas</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="enc in especialidades" :key="enc.nome">
                                        <td>{{ enc.nome }}</td>
                                        <td>{{ enc.vagas }}</td>
                                        <td><a @click="editEnc(enc)"><i class="tiny material-icons">edit</i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <a href="#!" class="btn" @click="addEnc()">Adicionar Especialidade</a>
                        </div>
                        <div class="row" v-else>
                            <div class="row">
                                <h6 v-if="editEncCheck">Editar Especialidade</h6>
                                <h6 v-else>Adicionar Especialidade</h6>
                                <div class="col s1"></div>
                                <div class="input-field input-group col s6">
                                    <input id="nameEx" type="text" class="validate" v-model="newEnc.nome">
                                    <label for="nameEx">Tipo de Encaminhamento</label>
                                </div>
                                <div class="input-field input-group col s4">
                                    <input id="vagasEx" type="number" v-model="newEnc.vagas"/>
                                    <label for="vagasEx">Vagas</label>
                                </div>
                                <div class="col s1"></div>
                            </div>
                            <a href="#!" class="waves-effect btn red" @click="cancelEdit('enc')">Cancelar</a>
                            <a href="#!" class="waves-effect btn" @click="saveEnc()">Salvar</a>
                        </div>
                    </div>
                    <div class="col s6" id="local-div">
                        <div class="row" v-if="!editLocalCheck && !addLocalCheck">
                            <h6>Locais de Encaminhamentos</h6>
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
    props: ["locais", "especialidades"],
    data() {
        return {
            newEnc: {},
            newLocal: '',
            editEncCheck: false,
            addEncCheck: false,
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
        saveEnc: function() {
            if (this.editEncCheck) {
                this.editEncCheck = false
                this.especialidades[this.index] = this.newEnc
                this.newEnc = {}
                this.index = -1
                // Salvar o exame atualizado no bd
                // Novo request do bd
            } else {
                this.addEncCheck = false
                this.especialidades.push(this.newEnc)
                this.newEnc = {}
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
        editEnc: function(enc) {
            this.newEnc = Object.assign({}, enc)
            this.index = this.especialidades.indexOf(enc)
            this.editEncCheck = true
        },
        editLocal: function(local) {
            this.newLocal = local
            this.index = this.locais.indexOf(local)
            this.editLocalCheck = true
        },
        addEnc: function() {
            this.addEncCheck = true
        },
        addLocal: function() {
            this.addLocalCheck = true
        },
        cancelEdit: function(col) {
            if (col === 'enc') {
                this.editEncCheck = false
                this.addEncCheck = false
                this.newEnc = {}
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

#enc-div {
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

