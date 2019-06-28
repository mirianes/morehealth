<template>
    <!-- class  card-panel e/ou hoverable-->
    <div class="container card-panel" id="login">
        <div class="valign-wrapper row">
            <div class="col s6">
                <img src="../assets/morehealth-big.png"/>
            </div>
            <div class="col s6">
                <h1 class="title">More Health</h1>
                <input placeholder="E-mail" v-model="email"/>
                <input placeholder="Senha" type="password" v-model="password"/>
                <div class="row">
                    <p class="text col s6 left-align">Esqueci minha senha</p>
                </div>
                <button class="waves-effect waves-light btn" @click="login()">Entrar</button>
                <router-link to="/cadastro">
                    <p class="text">Cadastre-se</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mongoAPI } from '../config.js'
import { notificationError } from '../notifications'
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: async function() {
            try {
                const result = await axios.post(`${mongoAPI.host}/user/login`, {
                    email: this.email,
                    password: this.password
                })
                let data = result.data
                if (data.auth) {
                    this.$store.dispatch('login', {user: data.user, token: data.token})
                    if (this.$store.getters.isLogged) {
                        const infos = await axios.get(`${mongoAPI.host}/usf/getData/${this.$store.getters.user.usf_id}`)
                        this.$store.dispatch('setInfo', {usf: infos.data.usf, doctor: infos.data.doctor})
                        this.$router.push({ path: '/consulta' })
                    }
                }
            } catch (error) {
                if (err.response) {
                    if (!err.response.auth) {
                        notificationError('Usuário ou Senha incorretos.')
                    } else {
                        notificationError(err.response.data.error)
                    }
                } else if (err.request) {
                    notificationError('Não foi possível conectar ao servidor. Tente novamente mais tarde!')                    
                } else {
                    notificationError('Erro interno, por favor contate um administrador.')
                }
            }
        }
    }
}
</script>


<style scoped>
/* #login {
    margin: auto;
    width: 80%;
    padding: 10px;
    background-color: #0288d1;
    border-radius: 50px;
} */

.title {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-style: italic;
    font-weight: bold;
    color: #b2ebf2;
    text-shadow: 2px 2px 2px #ff0072;
}

.text {
    color: #b2ebf2;
    font-size: smaller;
}

button {
    background-color: #29b6f6;
}

button:hover {
    background-color: #039be5;
}
</style>

