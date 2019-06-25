<template>
    <div class="row">
        <div class="col s6">
            <Exame :locais="locais" :tipos="tiposEx"/>
        </div>
        <div class="col s6">
            <Encaminhamento :locaisEnc="locais" :especialidades="especialidades"/>
        </div>
         <div class="fixed-action-btn" v-if="this.$store.getters.user.user_type == '2'">
            <a class="btn-floating btn-large blue">
                <i class="large material-icons">settings</i>
            </a>
            <ul>
                <li><a class="btn-floating blue modal-trigger" href="#modalSettingsExam"><i class="fas fa-file-medical-alt"></i></a></li>
                <li><a class="btn-floating blue modal-trigger" href="#modalSettingsEnc"><i class="fas fa-clinic-medical"></i></a></li>
            </ul>
        </div>

        <!-- Modal para configurar exames -->
        <ModalExame :locais="locais" :tipos="tiposEx"/>
        <ModalEncaminhamento :locais="locais" :especialidades="especialidades"/>
    </div>
</template>

<script>
import Exame from './ExamesEncaminhamentos/Exame'
import ModalExame from './ExamesEncaminhamentos/ModalExame'
import Encaminhamento from './ExamesEncaminhamentos/Encaminhamento'
import ModalEncaminhamento from './ExamesEncaminhamentos/ModalEncaminhamento'
import { materializeFloating , materializeModal, materializeModalClose, materializeTextFields } from '../materialize'

export default {
    components: {
        Exame,
        Encaminhamento,
        ModalExame,
        ModalEncaminhamento
    },
    data() {
        return {
            qntdVagasEx: 0,
            qntdVagasEnc: 0,
            locais: ["H. Nossa Senhora do Ó", "Unimed Ilha do Leite", "H. Tricentenário"],
            tiposEx: [{nome: "Sangue", vagas: 2}, {nome: "Fezes", vagas: 19}, {nome: "Urina", vagas: 16}],
            especialidades: [{nome: "Oftalmologista", vagas: 5}, {nome: "Pediatra", vagas: 9}, {nome: "Ginecologista", vagas: 17}]
        }
    },
    created: function() {
        this.qntdVagasEx = this.totalVagasEx
        this.qntdVagasEnc = this.totalVagasEnc
    },
    mounted: function() {
        materializeFloating()
        materializeModal()
    },
    updated: function() {
        materializeTextFields()
    }
}
</script>

<style scoped>
.input-group {
    display: table;
}
</style>
