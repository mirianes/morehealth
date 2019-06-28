<template>
    <div>
        <ul id="menuPerfil" class="dropdown-content">
            <li><router-link to="/perfil" class="item-dropdown">Editar Perfil</router-link></li>
            <li class="divider"></li>
            <li><a class="item-dropdown" @click="logout()"><i class="material-icons left">exit_to_app</i>Sair</a></li>
        </ul>
        <nav>
            <div class="nav-wrapper row">
                <div class="col s11 push-s1">
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><router-link to="/consulta"><i class="material-icons left">today</i>Agendar Consulta</router-link></li>
                        <li><router-link to="/examesEncaminhamentos"><i class="material-icons left">assignment</i>Exames e Encaminhamentos</router-link></li>
                        <li><router-link to="/prontuario"><i class="material-icons left">search</i>Prontuários</router-link></li>
                        <li><router-link to="/faq"><i class="material-icons left">question_answer</i>Perguntas Frequentes</router-link></li>
                        <li><a class="dropdown-trigger" data-target="menuPerfil"><i class="material-icons left">person_pin</i>Perfil</a></li>
                    </ul>
                </div>
                <div class="col s1 pull-s11">
                    <img class="brand-logo" src="../assets/morehealth.png"/>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { materializeDropdown } from '../materialize'

export default {
    mounted: function() {
        materializeDropdown()
    },
    methods: {
        logout: function() {
            this.$store.dispatch('logout')
            this.$router.push({ path: '/' })
        }
    }
}
</script>


<style scoped>
nav {
    background-color: #0288d1;
}

.item-dropdown {
    color: #29b6f6;
}

.router-link-active {
    background-color: rgba(0,0,0,0.1)
}
</style>
