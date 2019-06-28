<template>
    <div>
        <h5>Exames</h5>
        <h5 v-if="getUpdate">Vagas Disponíveis: {{ totalVagas || 0 }}</h5>
        <label v-for="exame in tipos" :key="exame._source.type">{{ exame._source.type }}: {{ exame._source.vagas }} vagas   |   </label>
        <div class="exames">
            <div class="row">
                <div class="col s5">
                    <div class="input-field">
                        <input id="pacientName" type="text" v-model="pacientName"/>
                        <label for="pacientName">Nome do Paciente</label>
                    </div>
                </div>
                <div class="col s4">
                    <div class="input-field">
                        <input id="idProntuario" type="text" v-model="idProntuario"/>
                        <label for="idProntuario">Número do Prontuário</label>
                    </div>
                </div>
                <div class="col s3">
                    <div class="input-field">
                        <input id="cartaoSUS" type="text" v-model="cartaoSUS"/>
                        <label for="cartaoSUS">Cartão SUS</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s8" id="customDatepickers">
                    <VueCtk id="dataExame" format="DD/MM/YYYY" formatted="DD/MM/YYYY" label="Data do Exame" :minDate="minDate.toISOString()" :disabledWeekly="[0,6]" :noClearButton=true :noButtonNow=true :noButton=true :only-date=true v-model="date" :autoClose=true />
                </div>
                <div class="col s4">
                    <VueCtk id="horaExame" format="HH:mm" formatted="HH:mm" :only-time=true v-model="time"
                        :noClearButton=true :noButton=true label="Hora do Exame" />
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select @change="setExame($event)">
                        <option value="" disabled selected>Exame</option>
                        <option v-for="tipo in tipos" :value="`${tipo._source.type} ${tipo._id}`" :key="tipo._source.type">{{ tipo._source.type }}</option>
                    </select>
                    <label>Tipo de Exame</label>
                </div>
                <div class="input-field col s6">
                    <select @change="setLocal($event)">
                        <option value="" disabled selected>Local</option>
                        <option v-for="local in locais" :value="local._source.name" :key="local._source.name">{{ local._source.name }}</option>
                    </select>
                    <label>Local do Exame</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="preparacao" class="materialize-textarea" v-model="preparacao"></textarea>
                            <label for="preparacao">Preparação</label>
                        </div>
                    </div>
                </div>
                <div class="input-field col s6">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="obs" class="materialize-textarea" v-model="observacao"></textarea>
                            <label for="obs">Observação</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s4 offset-s4">
                    <button class="btn waves-effect waves-light" type="submit" name="action" @click="checkInfos()">Gerar PDF
                        <i class="material-icons right">picture_as_pdf</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { elasticAPI } from '../../config.js'
import { materializeSelect, materializeTextFields } from '../../materialize'
import { notificationError } from '../../notifications'
import { imgData } from '../../config'
import VueCtk from 'vue-ctk-date-time-picker'
import axios from 'axios'
import jsPDF from 'jspdf'

export default {
    props: ['needUpdate'],
    components: {
        VueCtk
    },
    data() {
        return {
            pacientName: '',
            idProntuario: '',
            cartaoSUS: '',
            minDate: new Date(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            localSelected: '',
            exameSelected: {},
            locais: [],
            tipos: [],
            preparacao: '',
            observacao: '',
            totalVagas: 0,
            usf: this.$store.getters.usf,
            doctor: this.$store.getters.doctor
        }
    },
    created: async function() {
        try {
            await this.fetchTipos()
            await this.fetchLocais()
            this.minDate.setDate(this.minDate.getDate() - 1)
            this.setTotalVagas()
        } catch (error) {
            notificationError('Erro interno no servidor. Por favor, contate um administrador.')            
        }
    },
    updated: function() {
        materializeSelect()
        materializeTextFields()
    },
    methods: {
        fetchLocais: async function() {
            this.locais = []
            let result = await axios.get(`${elasticAPI.host}/places`)
            this.locais = result.data
        },
        fetchTipos: async function() {
            this.tipos = []
            let result = await axios.get(`${elasticAPI.host}/examRouting/1`)
            this.tipos = result.data
        },
        setTotalVagas: function() {
            this.tipos.forEach(element => {
                this.totalVagas += element._source.vagas
            })
        },
        setExame: function(event) {
            let exame = event.target.value.split(' ')
            this.exameSelected = {
                name: exame[0],
                id: exame[1]
            }
        },
        setLocal: function(event) {
            this.localSelected = event.target.value
        },
        checkInfos: function() {
            if (this.pacientName !== '' && this.idProntuario !== '' && this.cartaoSUS !== '' && this.date !== undefined && 
                this.time !== undefined && this.exameSelected !== {} && this.localSelected !== '' && this.preparacao !== '') {
                    let index = this.tipos.map((element) => { return element._source.type }).indexOf(this.exameSelected.name)
                    if (this.tipos[index]._source.vagas > 0) {
                        this.saveExam()
                    } else {
                        notificationError('Não há mais vagas para o exame escolhido.')
                    }
            } else {
                notificationError('Todos os campos devem estar preenchidos.')
            }
        },
        saveExam: async function() {
            try {
                await axios.post(`${elasticAPI.host}/exam`, {
                    prontuarioID: this.idProntuario,
                    pacientName: this.pacientName,
                    date: this.date,
                    exam: this.exameSelected,
                    place: this.localSelected
                })
                this.generatePDF()
                this.clearAll()
            } catch (error) {
                
            }
        },
        clearAll: function() {
            this.pacientName = ''
            this.idProntuario = ''
            this.cartaoSUS = ''
            this.date = new Date().toLocaleDateString()
            this.time = new Date().toLocaleTimeString()
            this.exameSelected = ''
            this.localSelected = ''
            this.preparacao = ''
            this.observacao = ''
        },
        generatePDF: function() {
            let phone = this.usf.phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3')
            var doc = new jsPDF()

            doc.addImage(imgData, 'PNG', 25, 20, 40, 15);
            doc.setFontSize(20);
            doc.text('Unidade de Saúde da Família', 83, 20);
            doc.text(this.usf.name, 87, 30);
            doc.setFontSize(12);
            doc.text(`${phone} | ${this.usf.city}, ${this.usf.state.slice(0,2).toUpperCase()}`, 105, 40);
            doc.setFontSize(20);
            doc.text('Solicitação de Exame', 70, 55);
            doc.line(10, 65, 200, 65);
            doc.setFontSize(12);
            doc.setFontStyle('bold');
            doc.text('Paciente:', 20, 75);
            doc.setFontStyle('normal');
            doc.text(this.pacientName, 40, 75)
            doc.setFontStyle('bold');
            doc.text('Prontuário:', 20, 80);
            doc.setFontStyle('normal');
            doc.text(this.idProntuario, 44, 80);
            doc.setFontStyle('bold');
            doc.text('Cartão SUS:', 20, 85);
            doc.setFontStyle('normal');
            doc.text(this.cartaoSUS, 47, 85);

            doc.setFontStyle('bold');
            doc.text('Data:', 20, 100);
            doc.setFontStyle('normal');
            doc.text(this.date, 33, 100);
            doc.setFontStyle('bold');
            doc.text('Hora:', 70, 100);
            doc.setFontStyle('normal');
            doc.text(this.time, 83, 100);
            doc.setFontStyle('bold');
            doc.text('Local:', 20, 105);
            doc.setFontStyle('normal');
            doc.text(this.localSelected, 34, 105);
            doc.setFontStyle('bold');
            doc.text('Exame:', 20, 110);
            doc.setFontStyle('normal');
            doc.text(this.exameSelected, 37, 110);

            doc.setFontStyle('bold');
            doc.text('Preparação:', 20, 125);
            doc.setFontStyle('normal');
            doc.text(this.preparacao, 30, 130);
            doc.setFontStyle('bold');
            doc.text('Observação:', 20, 155);
            doc.setFontStyle('normal');
            doc.text(this.observacao, 30, 160);

            doc.line(70, 250, 150, 250);
            doc.setFontSize(10);
            doc.text(`Médico: ${this.doctor.name}`, 94, 255);
            doc.text(`CRM: ${this.doctor.crm}`, 100, 260);

            doc.save('exame.pdf')
        }
    },
    computed: {
        getUpdate: async function() {
            let count = this.needUpdate
            await this.fetchTipos()
            await this.fetchLocais()
            return this.needUpdate
        }
    }
}
</script>

<style>
.exames {
    margin: auto;
    width: 80%;
    padding: 10px;
}

.field {
    max-height: 53px;
}

#horaExame, #dataExame {
    color: black;
}

.datepicker, .datepicker-container {
    width: 100% !important;
    max-width: 100% !important;
    margin-bottom: 20px !important;
}
</style>

<style scoped>
.btn, .btn:hover {
    background-color: #ef797d !important;
    color: white !important;
}

#customDatepickers {
    margin-bottom: 20px;
}
</style>
