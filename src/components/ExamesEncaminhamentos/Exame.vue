<template>
    <div>
        <h5>Exames</h5>
        <h5>Vagas Disponíveis: {{ qntdVagas }}</h5>
        <label v-for="exame in tipos" :key="exame.nome">{{ exame.nome }}: {{ exame.vagas }} vagas   |   </label>
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
                        <option v-for="tipo in tipos" :value="tipo.nome" :key="tipo.nome">{{ tipo.nome }}</option>
                    </select>
                    <label>Tipo de Exame</label>
                </div>
                <div class="input-field col s6">
                    <select @change="setLocal($event)">
                        <option value="" disabled selected>Local</option>
                        <option v-for="local in locais" :value="local" :key="local">{{ local }}</option>
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
import { materializeSelect, materializeTextFields } from '../../materialize'
import { notificationError } from '../../notifications'
import { imgData } from '../../config'
import VueCtk from 'vue-ctk-date-time-picker'
import jsPDF from 'jspdf'

export default {
    props: ["locais", "tipos"],
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
            exameSelected: '',
            // locais: [],
            preparacao: '',
            observacao: '',
            exames: [],
            totalVagas: 0,
            qntdVagas: 0
        }
    },
    created: function() {
        this.minDate.setDate(this.minDate.getDate() - 1)
        this.setTotalVagas()
    },
    mounted: function() {
        materializeSelect()
        materializeTextFields()
    },
    methods: {
        fetchLocais: function() {
            // Request bd
        },
        fetchTipos: function() {
            // Request bd
        },
        setTotalVagas: function() {
            this.tipos.forEach(element => {
                this.totalVagas += element.vagas
            });
            this.qntdVagas = this.totalVagas - this.exames.length
        },
        setExame: function(event) {
            this.exameSelected = event.target.value
            // var index = this.tipos.map((element) => { return element.nome }).indexOf(this.exameSelected)
            // this.locais = this.tipos[index].locais
        },
        setLocal: function(event) {
            this.localSelected = event.target.value
        },
        checkInfos: function() {
            if (this.pacientName !== '' && this.idProntuario !== '' && this.cartaoSUS !== '' && this.date !== undefined && 
                this.time !== undefined && this.exameSelected !== '' && this.localSelected !== '' && this.preparacao !== '') {
                    this.generatePDF()
                    this.exames.push(this.exameSelected)
                    this.qntdVagas = this.totalVagas - this.exames.length
                    var index = this.tipos.map((element) => { return element.nome }).indexOf(this.exameSelected)
                    if (index != -1) this.tipos[index].vagas -= 1
                    this.clearAll()
            } else {
                notificationError('Todos os campos devem estar preenchidos.')
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
            var doc = new jsPDF()

            doc.addImage(imgData, 'PNG', 25, 20, 40, 15);
            doc.setFontSize(20);
            doc.text('Unidade de Saúde da Família', 83, 20);
            doc.text('Quirino Ribeiro de Queiroz', 87, 30);
            doc.setFontSize(12);
            doc.text('(81)3436-3280 | Paulista, PE', 105, 40);
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
            doc.text(`Médico: Fulano de Tal`, 94, 255);
            doc.text(`CRM: 19823`, 100, 260);

            doc.save('exame.pdf')
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
