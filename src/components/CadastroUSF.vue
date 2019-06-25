<template>
        <div class="container card-panel" id="cadastrousf">
        <div class="valign-wrapper row">
            <div class="col s7 push-s5">
                <div class="row">
                    <div class="col s12">
                        <h5>Cadastrar Unidade de Saúde da Família</h5>
                        <div class="row">
                            <div class="input-field col s6">
                                <input type="text" id="name" :class="{valid: msgNameError == 'success', 
                                invalid: (msgNameError !== '' && msgNameError !== 'success')}" @change="checkName()" v-model="name"/>
                                <label for="name">Nome</label>
                                <span class="helper-text" :data-error="msgNameError" data-success=""></span>
                            </div>
                            <div class="input-field col s6">
                                <input type="text" id="cnes" :class="{valid: msgCnesError == 'success', 
                                invalid: (msgCnesError !== '' && msgCnesError !== 'success')}" @change="checkCnes()" v-model="cnes"/>
                                <label for="cnes">CNES</label>
                                <span class="helper-text" :data-error="msgCnesError" data-success=""></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input type="text" id="phone" :class="{valid: msgPhoneError == 'success', 
                                invalid: (msgPhoneError !== '' && msgPhoneError !== 'success')}" @change="checkPhone()" v-model="phone"/>
                                <label for="phone">Telefone</label>
                                <span class="helper-text" :data-error="msgPhoneError" data-success=""></span>
                            </div>
                            <div class="input-field col s6">
                                <input type="text" id="city" :class="{valid: msgCityError == 'success', 
                                invalid: (msgCityError !== '' && msgCityError !== 'success')}" @change="checkCity()" v-model="city"/>
                                <label for="city">Cidade</label>
                                <span class="helper-text" :data-error="msgCityError" data-success=""></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m4 l2"/>
                            <div class="input-field col s12 m4 l8">
                                <input type="text" id="state" :class="{valid: msgStateError == 'success', 
                                invalid: (msgStateError !== '' && msgStateError !== 'success')}" @change="checkState()" v-model="state"/>
                                <label for="state">Estado</label>
                                <span class="helper-text" :data-error="msgStateError" data-success=""></span>
                            </div>
                            <div class="col s12 m4 l2"/>
                        </div>
                    </div>
                    <div class="col s6 offset-s6 right-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action" @click="checkUsf()">Cadastrar
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    
                </div>
            </div>
            <div class="col s5 pull-s7" id="left">
                <img src="../assets/morehealth-big.png"/>
                <h1 class="title">More Health</h1>
                <p class="text">Já possui uma conta? <router-link to="/" style="color: #b2ebf2;">Login</router-link></p>
                <p class="text">A USF que você trabalha já está cadastrada? <router-link to="/cadastro" style="color: #b2ebf2;">Cadastrar Usuário</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
import { mongoAPI } from '../config.js'
import axios from 'axios'
import { notificationSuccess, notificationError } from '../notifications'

export default {
    data() {
        return {
            name: '',
            msgNameError: '',
            cnes: '',
            msgCnesError: '',
            phone: '',
            msgPhoneError: '',
            city: '',
            msgCityError: '',
            state: '',
            msgStateError: ''
        }
    },
    methods: {
        checkName: function() {
            if (this.name == '') {
                this.msgNameError = "O campo Nome não pode ficar vazio"
                return false
            } else {
                this.msgNameError = "success"
                return true
            }
        },
        checkCnes: function() {
            if (this.cnes == '') {
                this.msgCnesError = "O campo CNES não pode ficar vazio"
                return false
            } else if (!/\d+/.test(this.cnes)) {
                this.msgCnesError = "CNES inválido"
                return false
            } else {
                this.msgCnesError = "success"
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
        checkCity: function() {
            if (this.city == '') {
                this.msgCityError = "O campo Cidade não pode ficar vazio"
                return false
            } else {
                this.msgCityError = "success"
                return true
            }
        },
        checkState: function() {
            if (this.state == '') {
                this.msgStateError = "O campo Nome não pode ficar vazio"
                return false
            } else {
                this.msgStateError = "success"
                return true
            }
        },
        checkUsf: function() {
            let nameBool = this.checkName()
            let cnesBool = this.checkCnes()
            let phoneBool = this.checkPhone()
            let cityBool = this.checkCity()
            let stateBool = this.checkState()
            if (nameBool && cnesBool && phoneBool && cityBool && stateBool) {
                this.sendUsf()
            }
        },
        sendUsf: function() {
            axios.post(`${mongoAPI.host}/usf`, {
                name: this.name,
                cnes: this.cnes,
                phone: this.phone,
                city: this.city,
                state: this.state
            }).then(result => {
                if (result.data) {
                    notificationSuccess('USF criada com sucesso!')
                    this.$router.push({ path: '/cadastro' })
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
    }
}
</script>


<style scoped>
h5 {
    font-weight: 500;
    color: #b2ebf2;
}

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