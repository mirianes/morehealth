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
                                    <tr v-for="enc in especialidades" :key="enc._source.type">
                                        <td>{{ enc._source.type }}</td>
                                        <td>{{ enc._source.vagas }}</td>
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
                                    <input id="nameEnc" type="text" class="validate" v-model="newEnc.type">
                                    <label for="nameEnc">Tipo de Encaminhamento</label>
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
                                    <input id="nameEnc" type="text" class="validate" v-model="newLocal.name">
                                    <label for="nameEnc">Nome Local</label>
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
            especialidades: [],
            newEnc: {},
            newLocal: {},
            editEncCheck: false,
            addEncCheck: false,
            editLocalCheck: false,
            addLocalCheck: false,
            count : 0
        }
    },
    created: async function() {
        try {
            await this.fetchEspecialidades()
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
        fetchEspecialidades: async function() {
            this.especialidades = []
            let result = await axios.get(`${elasticAPI.host}/examRouting/2`)
            this.especialidades = result.data
        },
        fetchLocais: async function() {
            this.locais = []
            let result = await axios.get(`${elasticAPI.host}/places`)
            this.locais = result.data
        },
        saveEnc: async function() {
            try {
                if (this.editEncCheck) {
                    let result = await axios.put(`${elasticAPI.host}/examRouting/${this.newEnc.id}`, {
                        type: this.newEnc.type,
                        vagas: parseInt(this.newEnc.vagas),
                        indicator: 2
                    })

                    this.especialidades = result.data
                    await this.fetchEspecialidades()

                    notificationSuccess('Exame atualizado com sucesso.')
                } else {
                    let result = await axios.post(`${elasticAPI.host}/examRouting`, {
                        type: this.newEnc.type,
                        vagas: parseInt(this.newEnc.vagas),
                        indicator: 2
                    })

                    this.especialidades = result.data
                    await this.fetchEspecialidades()

                    notificationSuccess('Exame inserido com sucesso.')
                }
                this.editEncCheck = false
                this.addEncCheck = false
                this.newEnc = {}
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
        editEnc: function(enc) {
            this.newEnc = Object.assign({}, enc._source)
            this.newEnc.id = enc._id
            this.editEncCheck = true
        },
        editLocal: function(local) {
            this.newLocal = Object.assign({}, local._source)
            this.newLocal.id = local._id
            this.editLocalCheck = true
        },
        addEnc: function() {
            this.newEnc = {}
            this.addEncCheck = true
        },
        addLocal: function() {
            this.newLocal = {}
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
        },
        updateParent: function() {
            this.count += 1
            this.$emit('needUpdateEncaminhamento', {
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

