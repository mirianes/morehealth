<template>
    <div>
        <h5>Encaminhamentos</h5>
        <h5 v-if="getUpdate">Vagas Disponíveis: {{ totalVagas || 0 }}</h5>
        <label v-for="encaminhamento in especialidades" :key="encaminhamento._source.type">{{encaminhamento._source.type}}: {{encaminhamento._source.vagas}} vagas   |   </label>
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
                        <option v-for="especialidade in especialidades" :value="`${especialidade._source.type} ${especialidade._id}`" :key="especialidade._source.type">{{ especialidade._source.type }}</option>
                    </select>
                    <label>Especialidade</label>
                </div>
                <div class="input-field col s6">
                    <select @change="setLocal($event)">
                        <option value="" disabled selected>Local</option>
                        <option v-for="local in locaisEnc" :value="local._source.name" :key="local._source.name">{{ local._source.name }}</option>
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
import { elasticAPI, mongoAPI } from '../../config.js'
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
            pacientNameEnc: '',
            idProntuarioEnc: '',
            cartaoSUSEnc: '',
            minDate: new Date(),
            dateEnc: new Date().toLocaleDateString(),
            timeEnc: new Date().toLocaleTimeString(),
            localSelectedEnc: '',
            especialidadeSelected: {},
            locaisEnc: [],
            especialidades: [],
            motivo: '',
            observacaoEnc: '',
            totalVagas: 0,
            usf: this.$store.getters.usf,
            doctor: this.$store.getters.doctor
        }
    },
    created: async function() {
        try {
            await this.fetchEspecialidades()
            await this.fetchLocais()
            this.minDate.setDate(this.minDate.getDate() - 1)
            this.setTotalVagas()
        } catch (error) {
            console.log(error)
            notificationError('Erro interno no servidor. Por favor, contate um administrador.')
        }
    },
    updated: function() {
        materializeSelect()
        materializeTextFields()
    },
    methods: {
        fetchLocais: async function() {
            this.locaisEnc = []
            let result = await axios.get(`${elasticAPI.host}/places`)
            this.locaisEnc = result.data
        },
        fetchEspecialidades: async function() {
            this.especialidades = []
            let result = await axios.get(`${elasticAPI.host}/examRouting/2`)
            this.especialidades = result.data
        },
        setTotalVagas: function() {
            this.especialidades.forEach(element => {
                this.totalVagas += element._source.vagas
            });
        },
        setEspecialidade: function(event) {
            let especialidade = event.target.value.split(' ')
            this.especialidadeSelected = {
                name: especialidade[0],
                id: especialidade[1]
            }
        },
        setLocal: function(event) {
            this.localSelectedEnc = event.target.value
        },
        checkInfos: function() {
            if (this.pacientNameEnc !== '' && this.idProntuarioEnc !== '' && this.cartaoSUSEnc !== '' && this.dateEnc !== undefined && 
                this.timeEnc !== undefined && this.especialidadeSelected !== {} && this.localSelectedEnc !== '' && this.motivo !== '') {
                    let index = this.especialidades.map((element) => { return element._source.type }).indexOf(this.especialidadeSelected.name)
                    if (this.especialidades[index]._source.vagas > 0) {
                        this.saveRouting()
                    } else {
                        notificationError('Não há mais vagas para a especialidade escolhida.')
                    }
            } else {
                notificationError('Todos os campos devem estar preenchidos.')
            }
        },
        saveRouting: async function() {
            try {
                await axios.post(`${elasticAPI.host}/routing`, {
                    prontuarioID: this.idProntuarioEnc,
                    pacientName: this.pacientNameEnc,
                    date: this.dateEnc,
                    specialty: this.especialidadeSelected.name,
                    place: this.localSelectedEnc,
                    idExamRouting: this.especialidadeSelected.id
                })
                this.generatePDF()
                this.clearAll()
            } catch (error) {
                console.log(error)
                notificationError('Erro interno no servidor. Por favor, contate um administrador.')
            }
        },
        clearAll: function() {
            this.pacientNameEnc = ''
            this.idProntuarioEnc = ''
            this.cartaoSUSEnc = ''
            this.dateEnc = new Date().toLocaleDateString()
            this.timeEnc = new Date().toLocaleTimeString()
            this.especialidadeSelected = ''
            this.localSelected = ''
            this.motivo = ''
            this.observacaoEnc = ''
            var x = document.querySelector('#especialidade')
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
            doc.text(this.localSelectedEnc, 34, 105);
            doc.setFontStyle('bold');
            doc.text('Especialidade:', 20, 110);
            doc.setFontStyle('normal');
            doc.text(this.especialidadeSelected.name, 51, 110);

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
            doc.text(`Médico: ${this.doctor.name}`, 94, 255);
            doc.text(`CRM: ${this.doctor.crm}`, 100, 260);

            doc.save('encaminhamento.pdf')
        }
    },
    computed: {
        getUpdate: async function() {
            let count = this.needUpdate
            await this.fetchEspecialidades()
            await this.fetchLocais()
            return this.needUpdate
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
