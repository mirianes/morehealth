<template>
    <div class="row">
        <div class="col s6">
            <Exame :needUpdate="needUpdateExam"/>
        </div>
        <div class="col s6">
            <Encaminhamento :needUpdate="needUpdateEnc"/>
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

        <!-- Modal para configurar exames e encaminhamentos -->
        <ModalExame @needUpdateExame="needUpdateExam = $event.needUpdate"/>
        <ModalEncaminhamento @needUpdateEncaminhamento="needUpdateEnc = $event.needUpdate"/>
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
            needUpdateExam: 0,
            needUpdateEnc: 0
        }
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
