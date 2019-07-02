<template>
    <div id="modalProntuarioAdd" class="modal" v-if="getProntuario">
        <div class="modal-header">
            <div class="row">
                <div class="col s10 push-s1" v-if="prontuario.id"><h4>Prontuário {{ prontuario.id }}</h4></div>
                <div class="col s10 push-s1" v-else><h4>Adicionar Prontuário</h4></div>
                <div class="col s1 push-s1">
                    <a href="#!" id="modal-close" @click="close()"><i class="tiny material-icons">close</i></a></div>
            </div>
            <hr/>
        </div>
        <div class="modal-content">
            <div class="row">
                <div class="col s6" id="customDatepickers">
                    <VueCtk id="dataAtt" format="DD/MM/YYYY" formatted="DD/MM/YYYY" label="Data do Último Atendimento" 
                        :minDate="filterDate.toISOString()" :disabledWeekly="[0,6]" :noClearButton=true :noButtonNow=true 
                        :noButton=true :only-date=true v-model="dateAtt" :autoClose=true :disabled=true />
                </div>
                <div class="input-field col s4 push-s2">
                    <input type="text" id="sus" v-model="sus"/>
                    <label for="sus">Cartão do SUS</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" id="name" v-model="name"/>
                    <label for="name">Nome Completo</label>
                </div>
            </div>
            <div class="row">
                <div class="col s6" id="customDatepickers">
                    <VueCtk id="dataNasc" format="DD/MM/YYYY" formatted="DD/MM/YYYY" label="Data de Nascimento" 
                        :maxDate="filterDate.toISOString()" :noClearButton=true :noButtonNow=true :noButton=true 
                        :only-date=true v-model="dateNasc" :autoClose=true />
                </div>
                <div class="input-field col s3">
                    <input type="text" id="raca" v-model="raca"/>
                    <label for="raca">Raça</label>
                </div>
                <div class="input-field col s3">
                    <input type="text" id="sexo" v-model="sexo"/>
                    <label for="sexo">Sexo</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input type="text" id="ecivil" v-model="ecivil"/>
                    <label for="ecivil">Estado Cívil</label>
                </div>
                <div class="input-field col s6">
                    <input type="text" id="instrucao" v-model="instrucao"/>
                    <label for="instrucao">Grau de Instrução</label>
                </div>
            </div>
            <hr id="sectionSeparator"/>
            <h6 id="sectionTitle">Moléstia Atual</h6>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" id="queixa" v-model="queixa"/>
                    <label for="queixa">Queixa Principal</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="historico" class="materialize-textarea" v-model="historico"></textarea>
                    <label for="historico">História Clínica</label>
                </div>
            </div>
            <hr id="sectionSeparator"/>
            <h6 id="sectionTitle">História Pregressa</h6>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="doencas" class="materialize-textarea" v-model="doencas"></textarea>
                    <label for="doencas">Doenças e Internações Anteriores</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="alergias" class="materialize-textarea" v-model="alergias"></textarea>
                    <label for="alergias">História de Alergia/Intolerância</label>
                </div>
            </div>
            <div class="row">
                 <div class="input-field col s4 push-s2">
                    <select @change="selectDoador($event, 'orgao')" v-model="doadorOrgao">
                        <option value="" disabled :selected="doadorOrgao == '' || doadorOrgao == undefined">Escolha sua Opção</option>
                        <option value="Sim" :selected="doadorOrgao == 'Sim'">Sim</option>
                        <option value="Não" :selected="doadorOrgao == 'Não'">Não</option>
                    </select>
                    <label>Doador de Órgãos?</label>
                </div>
                 <div class="input-field col s4 push-s2">
                    <select @change="selectDoador($event, 'sangue')">
                        <option value="" disabled selected>Escolha sua Opção</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    <label>Doador de Sangue?</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="outrasInfos" class="materialize-textarea" v-model="outrasInfos"></textarea>
                    <label for="outrasInfos">Outras Informações</label>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" class="waves-effect btn" v-if="prontuario.id" @click="updateProntuario()">Salvar</a>
            <a href="#!" class="waves-effect btn" v-else @click="addProntuario()">Salvar</a>
        </div>
    </div>
</template>

<script>
import { postgreSqlAPI } from '../../config'
import { notificationError, notificationSuccess } from '../../notifications'
import { materializeModal, materializeModalClose, materializeTextFields, materializeSelect } from '../../materialize'
import axios from 'axios'
import VueCtk from 'vue-ctk-date-time-picker'

export default {
    props: ["prontuario"],
    components: {
        VueCtk
    },
    data() {
        return {
            filterDate: new Date(),
            dateAtt: new Date().toLocaleDateString(),
            dateNasc: new Date().toLocaleDateString(),
            sus: '',
            name: '',
            raca: '',
            sexo: '',
            ecivil: '',
            instrucao: '',
            queixa: '',
            historico: '',
            doencas: '',
            alergias: '',
            doadorOrgao: '',
            doadorSangue: '',
            outrasInfos: ''
        }
    },
    mounted: function() {
        materializeModal()
        materializeTextFields()
        materializeSelect()
    },
    updated: function() {
        materializeTextFields()
    },
    methods: {
        close: function() {
            materializeModalClose()
            this.updateParent()
        },
        addProntuario: async function() {
            try {
                const prontuario = await axios.post(`${postgreSqlAPI.host}/prontuario`, {
                    dataAtt: this.dateAtt,
                    cartaoSUS: this.sus,
                    nome: this.name,
                    dataNasc: this.dateNasc,
                    raca: this.raca,
                    sexo: this.sexo,
                    estCivil: this.ecivil,
                    grauInst: this.instrucao,
                    queixa: this.queixa,
                    historico: this.historico,
                    doencas: this.doencas,
                    alergias: this.alergias,
                    doadorOrgao: this.doadorOrgao,
                    doadorSangue: this.doadorSangue,
                    outrasInfo: this.outrasInfo
                })

                notificationSuccess('Prontuário cadastrado com sucesso.')
                materializeModalClose()
            } catch (error) {
                if (error.response) {
                    notificationError(error.response.data.error)
                } else {
                    notificationError('Erro interno, por favor contate um administrador.')                
                }
            }
        },
        updateProntuario: async function() {
            try {
                const prontuario = await axios.put(`${postgreSqlAPI.host}/prontuario/${this.prontuario.id}`, {
                    prontuario: {
                        dataAtt: this.dateAtt,
                        cartaoSUS: this.sus,
                        nome: this.name,
                        dataNasc: this.dateNasc,
                        raca: this.raca,
                        sexo: this.sexo,
                        estCivil: this.ecivil,
                        grauInst: this.instrucao,
                        queixa: this.queixa,
                        historico: this.historico,
                        doencas: this.doencas,
                        alergias: this.alergias,
                        doadorOrgao: this.doadorOrgao,
                        doadorSangue: this.doadorSangue,
                        outrasInfo: this.outrasInfo
                    }
                })

                notificationSuccess('Prontuário atualizado com sucesso.')
                materializeModalClose()
                this.updateParent()
            } catch (error) {
                if (error.response) {
                    notificationError(error.response.data.error)
                } else {
                    notificationError('Erro interno, por favor contate um administrador.')                
                }
            }
        },
        selectDoador: function(event, label) {
            if (label === 'orgao') {
                this.doadorOrgao = event.target.value
            } else if (label === 'sangue') {
                this.doadorSangue = event.target.value
            }
        },
        updateParent: function() {
            this.$emit('prontuarioShow', {
                prontuario: {}
            })
        }
    },
    computed: {
        getProntuario: function() {
            this.dataAtt = this.prontuario.dateAtt
            this.sus = this.prontuario.cartaoSUS
            this.name = this.prontuario.nome
            this.dataNasc = this.prontuario.dateNasc
            this.raca = this.prontuario.raca
            this.sexo = this.prontuario.sexo
            this.ecivil = this.prontuario.estCivil
            this.instrucao = this.prontuario.grauInst
            this.queixa = this.prontuario.queixa
            this.historico = this.prontuario.historico
            this.doencas = this.prontuario.doencas
            this.alergias = this.prontuario.alergias
            this.doadorOrgao = this.prontuario.doadorOrgao || ""
            this.doadorSangue = this.prontuario.doadorSangue
            this.outrasInfo = this.prontuario.outrasInfo

            return this.prontuario
        }
    }
}
</script>

<style>

.datepicker, .datepicker-container {
    width: 100% !important;
    max-width: 100% !important;
    margin-bottom: 20px !important;
}
</style>


<style scoped>
.btn {
    background-color: #0288d1 !important;
}

#modal-close {
    color: black !important;
}

.modal-header {
    margin-top: 3%;
}

.modal-footer {
    padding-right: 24px;
}

#customDatepickers {
    margin-bottom: 20px;
}

.row {
    margin-bottom: 0px;
}

#sectionTitle {
    margin-top: 3%;
    /* margin-bottom: 3%; */
}

#dataAtt, #dataNasc {
    color: black;
}

#sectionSeparator {
    border-style: dashed;
}
</style>
