<template>
    <div>
        <h5>Encaminhamentos</h5>
        <h5>Vagas Disponíveis: {{ qntdVagas }}</h5>
        <label v-for="encaminhamento in especialidades" :key="encaminhamento.nome">{{encaminhamento.nome}}: {{encaminhamento.vagas}} vagas   |   </label>
        <div class="encaminhamentos">
            <div class="row">
                <div class="col s5">
                    <div class="input-field">
                        <input id="pacientNameEnc" type="text" v-model="pacientNameEnc"/>
                        <label for="pacientNameEnc">Nome do Paciente</label>
                    </div>
                </div>
                <div class="col s4">
                    <div class="input-field">
                        <input id="idProntuarioEnc" type="text" v-model="idProntuarioEnc"/>
                        <label for="idProntuarioEnc">Número do Prontuário</label>
                    </div>
                </div>
                <div class="col s3">
                    <div class="input-field">
                        <input id="cartaoSUSEnc" type="text" v-model="cartaoSUSEnc"/>
                        <label for="cartaoSUSEnc">Cartão SUS</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s8" id="customDatepickers">
                    <VueCtk id="dataEncaminhamento" format="DD/MM/YYYY" formatted="DD/MM/YYYY" label="Data do Encaminhamento" 
                        :minDate="minDate.toISOString()" :disabledWeekly="[0,6]" :noClearButton=true 
                        :noButtonNow=true :noButton=true :only-date=true v-model="dateEnc" :autoClose=true />
                </div>
                <div class="col s4">                  
                    <VueCtk id="horaEncaminhamento" format="HH:mm" formatted="HH:mm" :only-time=true v-model="timeEnc"
                        :noClearButton=true label="Hora do Encaminhamento" />
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select @change="setEspecialidade($event)" id="especialidade">
                        <option value="" disabled selected>Especialidade</option>
                        <option v-for="especialidade in especialidades" :value="especialidade.nome" :key="especialidade.nome">{{ especialidade.nome }}</option>
                    </select>
                    <label>Especialidade</label>
                </div>
                <div class="input-field col s6">
                    <select @change="setLocal($event)">
                        <option value="" disabled selected>Local</option>
                        <option v-for="local in locaisEnc" :value="local" :key="local">{{ local }}</option>
                    </select>
                    <label>Local do Encaminhamento</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="motivo" class="materialize-textarea" v-model="motivo"></textarea>
                            <label for="motivo">Motivo</label>
                        </div>
                    </div>
                </div>
                <div class="input-field col s6">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="obsEnc" class="materialize-textarea" v-model="observacaoEnc"></textarea>
                            <label for="obsEnc">Observação</label>
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
    props: ["locaisEnc", "especialidades"],
    components: {
        VueCtk
    },
    data() {
        return {
            pacientNameEnc: '',
            idProntuarioEnc: '',
            cartaoSUSEnc: '',
            minDate: new Date(),
            dateEnc: new Date().toLocaleDateString(),
            timeEnc: new Date().toLocaleTimeString(),
            localSelected: '',
            especialidadeSelected: '',
            motivo: '',
            observacaoEnc: '',
            encaminhamentos: [],
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
            this.especialidades.forEach(element => {
                this.totalVagas += element.vagas
            });
            this.qntdVagas = this.totalVagas - this.encaminhamentos.length
        },
        setEspecialidade: function(event) {
            this.especialidadeSelected = event.target.value
        },
        setLocal: function(event) {
            this.localSelected = event.target.value
        },
        checkInfos: function() {
            if (this.pacientNameEnc !== '' && this.idProntuarioEnc !== '' && this.cartaoSUSEnc !== '' && this.dateEnc !== undefined && 
                this.timeEnc !== undefined && this.especialidadeSelected !== '' && this.localSelected !== '' && this.motivo !== '') {
                    this.generatePDF()
                    this.encaminhamentos.push(this.especialidadeSelected)
                    this.qntdVagas = this.totalVagas - this.encaminhamentos.length
                    var index = this.tipos.map((element) => { return element.nome }).indexOf(this.exameSelected)
                    if (index != -1) this.tipos[index].vagas -= 1
                    this.clearAll()
            } else {
                notificationError('Todos os campos devem estar preenchidos.')
            }
        },
        clearAll: function() {
            this.pacientNameEnc = ''
            this.idProntuarioEnc = ''
            this.cartaoSUSEnc = ''
            this.dateEnc = new Date()
            this.timeEnc = ''
            this.especialidadeSelected = ''
            this.localSelected = ''
            this.motivo = ''
            this.observacaoEnc = ''
            var x = document.querySelector('#especialidade')
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
            doc.text('Solicitação de Encaminhamento', 60, 55);
            doc.line(10, 65, 200, 65);

            doc.setFontSize(12);
            doc.setFontStyle('bold');
            doc.text('Paciente:', 20, 75);
            doc.setFontStyle('normal');
            doc.text(this.pacientNameEnc, 40, 75)
            doc.setFontStyle('bold');
            doc.text('Prontuário:', 20, 80);
            doc.setFontStyle('normal');
            doc.text(this.idProntuarioEnc, 44, 80);
            doc.setFontStyle('bold');
            doc.text('Cartão SUS:', 20, 85);
            doc.setFontStyle('normal');
            doc.text(this.cartaoSUSEnc, 47, 85);

            doc.setFontStyle('bold');
            doc.text('Data:', 20, 100);
            doc.setFontStyle('normal');
            doc.text(this.dateEnc, 33, 100);
            doc.setFontStyle('bold');
            doc.text('Hora:', 70, 100);
            doc.setFontStyle('normal');
            doc.text(this.timeEnc, 83, 100);
            doc.setFontStyle('bold');
            doc.text('Local:', 20, 105);
            doc.setFontStyle('normal');
            doc.text(this.localSelected, 34, 105);
            doc.setFontStyle('bold');
            doc.text('Especialidade:', 20, 110);
            doc.setFontStyle('normal');
            doc.text(this.especialidadeSelected, 51, 110);

            doc.setFontStyle('bold');
            doc.text('Motivo:', 20, 125);
            doc.setFontStyle('normal');
            doc.text(this.motivo, 30, 130);
            doc.setFontStyle('bold');
            doc.text('Observação:', 20, 155);
            doc.setFontStyle('normal');
            doc.text(this.observacaoEnc, 30, 160);

            doc.line(70, 250, 150, 250);
            doc.setFontSize(10);
            doc.text(`Médico: Fulano de Tal`, 94, 255);
            doc.text(`CRM: 19823`, 100, 260);

            doc.save('encaminhamento.pdf')
        }
    }
}
</script>

<style>
.encaminhamentos {
    margin: auto;
    width: 80%;
    padding: 10px;
}

#dataEncaminhamento {
    float: left;
}

.field {
    max-height: 53px;
}

#horaEncaminhamento, #dataEncaminhamento {
    color: black;
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
