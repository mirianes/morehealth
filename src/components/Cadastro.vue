<template>
    <div class="container card-panel" id="cadastro">
        <div class="valign-wrapper row">
            <div class="col s7 push-s5">
                <div class="row">
                    <div class="col s12">
                        <ul class="tabs">
                            <li class="tab col s6"><a class="active" name="medico" @click="setUserType($event)">Médico</a></li>
                            <li class="tab col s6"><a name="enfermeiro" @click="setUserType($event)">Enfermeiro</a></li>
                        </ul>
                    </div>
                    <div class="col s12">
                        <div class="row">
                            <div class="input-field col s6">
                                <input type="text" id="name" :class="{valid: msgNameError == 'success', 
                                invalid: (msgNameError !== '' && msgNameError !== 'success')}" @change="checkName()" v-model="name"/>
                                <label for="name">Nome</label>
                                <span class="helper-text" :data-error="msgNameError" data-success=""></span>
                            </div>
                            <div class="input-field col s6">
                                <input type="text" id="last_name" :class="{valid: msgLastNameError == 'success', 
                                invalid: (msgLastNameError !== '' && msgLastNameError !== 'success')}" @change="checkLastName()" v-model="lastName"/>
                                <label for="last_name">Sobrenome</label>
                                <span class="helper-text" :data-error="msgLastNameError" data-success=""></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input type="text" id="codigo" :class="{valid: msgCodeError == 'success', 
                                invalid: (msgCodeError !== '' && msgCodeError !== 'success')}" @change="checkCode()" v-model="code"/>
                                <label for="codigo" v-if="userType=='medico'">CRM</label>
                                <label for="codigo" v-else>CRE</label>
                                <span class="helper-text" :data-error="msgCodeError" data-success=""></span>
                            </div>
                            <div class="input-field col s6">
                                <input type="text" id="phone" :class="{valid: msgPhoneError == 'success', 
                                invalid: (msgPhoneError !== '' && msgPhoneError !== 'success')}" @change="checkPhone()" v-model="phone"/>
                                <label for="phone">Telefone</label>
                                <span class="helper-text" :data-error="msgPhoneError" data-success=""></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input type="email" id="email" :class="{valid: msgEmailError == 'success', 
                                invalid: (msgEmailError !== '' && msgEmailError !== 'success')}" @change="checkEmail()" v-model="email"/>
                                <label for="email">E-mail</label>
                                <span class="helper-text" :data-error="msgEmailError" data-success=""></span>
                            </div>
                            <div class="input-field col s6">
                                <input type="password" id="password" :class="{valid: msgPasswordError == 'success', 
                                invalid: (msgPasswordError !== '' && msgPasswordError !== 'success')}" @change="checkPassword()" v-model="password"/>
                                <label for="password">Senha</label>
                                <span class="helper-text" :data-error="msgPasswordError" data-success=""></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m4 l2"/>
                            <div class="input-field col s12 m4 l8">
                                <select @change="setUsf($event)">
                                    <option value="" disabled selected>Escolha a USF</option>
                                    <option v-for="usf in usfs" :key="usf.cnes" :value="usf.cnes">{{ usf.name }}</option>
                                </select>
                                <label>Unidade de Saúde da Família</label>
                                <span class="helper-text" :data-error="usfSelectedError" data-success=""></span>
                            </div>
                            <div class="col s12 m4 l2"/>
                        </div>
                    </div>
                    <div class="col s6 offset-s6 right-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action" @click="checkUser()">Cadastrar
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col s5 pull-s7" id="left">
                <img src="../assets/morehealth-big.png"/>
                <h1 class="title">More Health</h1>
                <p class="text">Já possui uma conta? <router-link to="/" style="color: #b2ebf2;">Login</router-link></p>
                <p class="text">A USF que você trabalha não está cadastrada? <router-link to="/cadastrousf" style="color: #b2ebf2;">Cadastrar USF</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import materialize from '../materialize.js'
import { mongoAPI } from '../config.js'
import { notificationSuccess, notificationError } from '../notifications'
import axios from 'axios'

export default {
    name: "Cadastro",
    data() {
        return {
            usfs: [],
            usfSelected: '',
            usfSelectedError: '',
            name: '',
            msgNameError: '',
            lastName: '',
            msgLastNameError: '',
            code: '',
            msgCodeError: '',
            phone: '',
            msgPhoneError: '',
            email: '',
            msgEmailError: '',
            password: '',
            msgPasswordError: '',
            userType: 'medico',
        }
    },
    created: async function() {
        await this.fetchUSFs()
    },
    methods: {
        materializeInit: function() {
            materialize.materializeTabs()
            materialize.materializeSelect()
        },
        fetchUSFs: async function() {
            let usfs = axios.get(`${mongoAPI.host}/usf`).then(response => {
                this.usfs = response.data
            }).catch(err => {
                if (err.response) {
                    notificationError(err.response.data.error)
                } else if (err.request) {
                    notificationError('Não foi possível conectar ao servidor. Tente novamente mais tarde!')                    
                } else {
                    notificationError('Erro interno, por favor contate um administrador.')
                }
            })
        },
        setUserType: function(event) {
            this.userType = event.target.name
            if (this.msgCodeError !== '') {
                this.msgCodeError = this.userType == "medico"? "CRM inválido" : "CRE inválido" 
            }
        },
        setUsf: function(event) {
            this.usfSelected = event.target.value
        },
        checkName: function() {
            if (this.name == '') {
                this.msgNameError = "O campo Nome não pode ficar vazio"
                return false
            } else {
                this.msgNameError = "success"
                return true
            }
        },
        checkLastName: function () {
            if (this.lastName == '') {
                this.msgLastNameError = "O campo Sobrenome não pode ficar vazio"
                return false
            } else {
                this.msgLastNameError = "success"
                return true
            }
        },
        checkCode: function () {
            if (!/\d+/.test(this.code)) {
                this.msgCodeError = this.userType == "medico"? "CRM inválido" : "CRE inválido" 
                return false
            } else {
                this.msgCodeError = "success"
                return true
            }
        },
        checkPhone: function () {
            if (!/[(]\d{2,3}[)]\d{8,9}$/.test(this.phone) && !/\d{8,9}$/.test(this.phone)) {
                this.msgPhoneError = "Telefone inválido" 
                return false
            } else {
                this.msgPhoneError = "success"
                return true
            }
        },
        checkEmail: function () {
            if (!/^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]/.test(this.email)) {
                this.msgEmailError = "E-mail inválido"
                return false
            } else {
                this.msgEmailError = "success"
                return true
            }
        },
        checkPassword: function () {
            if (this.password == '') {
                this.msgPasswordError = "O campo Senha não pode ficar vazio"
                return false
            } else {
                this.msgPasswordError = "success"
                return true
            }
        },
        checkUser: function() {
            let nameBool = this.checkName()
            let lastNameBool = this.checkLastName()
            let codeBool = this.checkCode()
            let phoneBool = this.checkPhone()
            let emailBool = this.checkEmail()
            let passwordBool = this.checkPassword()
            if (nameBool && lastNameBool && codeBool && phoneBool && emailBool && passwordBool && this.usfSelected !== '') {
                this.sendUser()
            }
        },
        sendUser: function() {
            axios.post(`${mongoAPI.host}/user`, {
                name: `${this.name} ${this.lastName}`,
                code: this.code,
                phone: this.phone,
                email: this.email,
                password: this.password,
                user_type: this.userType == "medico"? "1" : "2",
                usf_id: this.usfSelected
            }).then(result => {
                let data = result.data
                if (data.auth) {
                    notificationSuccess('Usuário cadastrado com sucesso.')
                    this.$store.dispatch('login', {user: data.user, token: data.token})
                    if (this.$store.getters.isLogged) {
                        this.$router.push({ path: '/consulta' })
                    }
                }
            }).catch(err => {
                if (err.response) {
                    notificationError(err.response.data.error)
                } else if (err.request) {
                    notificationError('Não foi possível conectar ao servidor. Tente novamente mais tarde!')                    
                } else {
                    notificationError('Erro interno, por favor contate um administrador.')
                }
            })
        }
    },
    mounted: function() {
        this.materializeInit()
    },
    updated: function() {
        this.materializeInit()
    }
}
</script>

<style scoped>
/* #cadastro {
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
    /* #ef797d */
}

.text {
    color: #b2ebf2;
    font-size: smaller;
}

#left {
    border-right-color: black;
    border-right-style: inset;
    border-right-width: thin;
}

.row {
    margin: 3%;
}

button {
    background-color: white;
    color: #ef797d;
}

button:hover{
    color: white;
    background-color: #ef797d;
}

a {
    cursor: pointer;
}

/* label color */
.input-field label {
    color: #b2ebf2;
}
/* label focus color */
.input-field input[type=text]:focus + label {
    color: #b2ebf2;
}
/* label underline focus color */
.input-field input[type=text]:focus {
    border-bottom: 1px solid #b2ebf2;
    box-shadow: 0 1px 0 0 #b2ebf2;
}
/* label focus color */
.input-field input[type=password]:focus + label {
    color: #b2ebf2;
}
/* label underline focus color */
.input-field input[type=password]:focus {
    border-bottom: 1px solid #b2ebf2;
    box-shadow: 0 1px 0 0 #b2ebf2;
}
/* label focus color */
.input-field input[type=email]:focus + label {
    color: #b2ebf2;
}
/* label underline focus color */
.input-field input[type=email]:focus {
    border-bottom: 1px solid #b2ebf2;
    box-shadow: 0 1px 0 0 #b2ebf2;
}
.select-dropdown {
    color: #b2ebf2;
}
</style>
