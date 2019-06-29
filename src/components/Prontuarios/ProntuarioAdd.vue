<template>
    <div id="modalProntuarioAdd" class="modal">
        <div class="modal-header">
            <div class="row">
                <div class="col s10 push-s1"><h4>Adicionar Prontuário</h4></div>
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
                    <input type="text" id="sus" :class="{valid: msgSusError == 'success', 
                        invalid: (msgSusError !== '' && msgSusError !== 'success')}" v-model="sus"/>
                    <label for="sus">Cartão do SUS</label>
                    <span class="helper-text" :data-error="msgSusError" data-success=""></span>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" id="name" :class="{valid: msgNameError == 'success', 
                        invalid: (msgNameError !== '' && msgNameError !== 'success')}" v-model="name"/>
                    <label for="name">Nome Completo</label>
                    <span class="helper-text" :data-error="msgNameError" data-success=""></span>
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
            <hr/>
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
            <hr/>
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
                    <select @change="selectDoador($event, 'orgao')">
                        <option value="" disabled selected>Escolha sua Opção</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
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
            <a href="#!" class="waves-effect btn" @click="addProntuario()">Salvar</a>
        </div>
    </div>
</template>

<script>
import { materializeModal, materializeModalClose, materializeTextFields, materializeSelect } from '../../materialize'
import VueCtk from 'vue-ctk-date-time-picker'

export default {
    components: {
        VueCtk
    },
    data() {
        return {
            filterDate: new Date(),
            dateAtt: new Date().toLocaleDateString(),
            dateNasc: new Date().toLocaleDateString(),
            sus: '',
            msgSusError: '',
            name: '',
            msgNameError: '',
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
    methods: {
        close: function() {
            materializeModalClose()
        },
        addProntuario: function() {

        },
        selectDoador: function(event, label) {
            if (label === 'orgao') {
                this.doadorOrgao = event.target.value
            } else if (label === 'sangue') {
                this.doadorSangue = event.target.value
            }
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
</style>
