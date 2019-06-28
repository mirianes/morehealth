<template>
    <div class="container">
        <h5>Editar Perfil</h5>
        <hr/>
        <div class="row">
            <div class="input-field col s4 push-s2">
                <input type="text" id="name" :class="{valid: msgNameError == 'success', 
                invalid: (msgNameError !== '' && msgNameError !== 'success')}" v-model="name"/>
                <label for="name">Nome</label>
                <span class="helper-text" :data-error="msgNameError" data-success=""></span>
            </div>
            <div class="input-field col s4 push-s2">
                <input type="text" id="last_name" :class="{valid: msgLastNameError == 'success', 
                invalid: (msgLastNameError !== '' && msgLastNameError !== 'success')}" v-model="lastName"/>
                <label for="last_name">Sobrenome</label>
                <span class="helper-text" :data-error="msgLastNameError" data-success=""></span>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s4 push-s2">
                <input type="text" id="codigo" :class="{valid: msgCodeError == 'success', 
                invalid: (msgCodeError !== '' && msgCodeError !== 'success')}" v-model="user.code"/>
                <label for="codigo">CRM/CRE</label>
                <span class="helper-text" :data-error="msgCodeError" data-success=""></span>
            </div>
            <div class="input-field col s4 push-s2">
                <input type="text" id="phone" :class="{valid: msgPhoneError == 'success', 
                invalid: (msgPhoneError !== '' && msgPhoneError !== 'success')}" v-model="phone"/>
                <label for="phone">Telefone</label>
                <span class="helper-text" :data-error="msgPhoneError" data-success=""></span>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s4 push-s4">
                <button class="btn waves-effect waves-light" type="submit" name="action" @click="checkUser()">Salvar</button>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s4 push-s4">
                <a class="btn waves-effect waves-light modal-trigger" href="#modalChangePassword">Alterar Senha</a>
            </div>
        </div>

        <div id="modalChangePassword" class="modal">
            <div class="modal-content">
                <h4>Alterar Senha</h4>
                <hr/>
                <div class="row">
                    <div class="input-field col s4 push-s4">
                        <input type="password" id="password" :class="{valid: msgPasswordError == 'success', 
                        invalid: (msgPasswordError !== '' && msgPasswordError !== 'success')}" v-model="password"/>
                        <label for="password">Senha</label>
                        <span class="helper-text" :data-error="msgPasswordError" data-success=""></span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s4 push-s2">
                        <input type="password" id="password" :class="{valid: msgNewPasswordError == 'success', 
                        invalid: (msgNewPasswordError !== '' && msgNewPasswordError !== 'success')}" v-model="newPassword"/>
                        <label for="password">Nova Senha</label>
                        <span class="helper-text" :data-error="msgNewPasswordError" data-success=""></span>
                    </div>
                    <div class="input-field col s4 push-s2">
                        <input type="password" id="password" :class="{valid: msgNewPasswordErrorCopy == 'success', 
                        invalid: (msgNewPasswordErrorCopy !== '' && msgNewPasswordErrorCopy !== 'success')}" v-model="newPasswordCopy"/>
                        <label for="password">Confirmar Nova Senha</label>
                        <span class="helper-text" :data-error="msgNewPasswordErrorCopy" data-success=""></span>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <a href="#!" class="waves-effect btn red" @click="cancel()">Cancelar</a>
                <a href="#!" class="waves-effect btn" @click="changePassword()">Salvar</a>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { materializeTextFields, materializeModal, materializeModalClose } from '../materialize.js'
import { mongoAPI } from '../config.js'
import { notificationSuccess, notificationError } from '../notifications'
import axios from 'axios'

export default {
    name: "EditarPerfil",
    data() {
        return {
            name: '',
            msgNameError: 'success',
            lastName: '',
            msgLastNameError: 'success',
            msgCodeError: 'success',
            phone: '',
            msgPhoneError: 'success',
            password: '',
            msgPasswordError: 'success',
            newPassword: '',
            msgNewPasswordError: 'success',
            newPasswordCopy: '',
            msgNewPasswordErrorCopy: 'success',
            user: this.$store.getters.user
        }
    },
    created: async function() {
        this.name = this.user.name.split(' ')[0]
        this.lastName = this.user.name.split(' ')[1]
        this.phone = this.user.phone.replace(/(\d{5})(\d{4})/, '$1-$2')
    },
    mounted: function() {
        materializeTextFields()
        materializeModal()
    },
    updated: function() {
        materializeTextFields()
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
            if (!/\d+/.test(this.user.code)) {
                this.msgCodeError = "CRM/CRE inválido" 
                return false
            } else {
                this.msgCodeError = "success"
                return true
            }
        },
        checkPhone: function () {
            let phoneController = this.phone.replace('-', '')
            if (!/[(]\d{2,3}[)]\d{8,9}$/.test(phoneController) && !/\d{8,9}$/.test(phoneController)) {
                this.msgPhoneError = "Telefone inválido" 
                return false
            } else {
                this.msgPhoneError = "success"
                return true
            }
        },
        checkPassword: function () {
            let passwordBool, newPasswordBool, newPasswordCopyBool

            if (this.password == '') {
                this.msgPasswordError = "O campo Senha não pode ficar vazio"
                passwordBool = false
            } else {
                this.msgPasswordError = "success"
                passwordBool = true
            }

            if (this.newPassword == '') {
                this.msgNewPasswordError = "O campo Nova Senha não pode ficar vazio"
                newPasswordBool = false
            } else {
                this.msgNewPasswordError = "success"
                newPasswordBool = true
            }

            if (this.newPasswordCopy == '') {
                this.msgNewPasswordErrorCopy = "O campo Confirmar Nova Senha não pode ficar vazio"
                newPasswordCopyBool = false
            } else {
                this.msgNewPasswordErrorCopy = "success"
                newPasswordCopyBool = true
            }

            return (passwordBool && newPasswordBool && newPasswordCopyBool)
        },
        checkUser: function() {
            let nameBool = this.checkName()
            let lastNameBool = this.checkLastName()
            let codeBool = this.checkCode()
            let phoneBool = this.checkPhone()
            if (nameBool && lastNameBool && codeBool && phoneBool) {
                this.updateUser()
            }
        },
        updateUser: async function() {
            try {
                let phoneController = this.phone.replace('-', '')
                let result = await axios.put(`${mongoAPI.host}/user/${this.user._id}`, {
                    name: `${this.name} ${this.lastName}`,
                    code: this.user.code,
                    phone: phoneController
                })
                let data = result.data
                notificationSuccess('Usuário atualizado com sucesso.')
                this.$store.dispatch('setUser', data)
            } catch (error) {
                if (error.response) {
                    notificationError(error.response.data.error)
                } else if (error.request) {
                    notificationError('Não foi possível conectar ao servidor. Tente novamente mais tarde!')                    
                } else {
                    notificationError('Erro interno, por favor contate um administrador.')
                }   
            }
        },
        changePassword: async function () {
            try {
                if (this.checkPassword() && (this.newPassword === this.newPasswordCopy)) {
                    let result = await axios.put(`${mongoAPI.host}/user/${this.user._id}/changePassword`, {
                        password: this.password,
                        newPassword: this.newPassword
                    })
                    let data = result.data
                    notificationSuccess('Senha alterada com sucesso.')
                    materializeModalClose()
                } else if (this.newPassword !== this.newPasswordCopy) {
                    this.msgNewPasswordError = "As senhas não conferem"
                    this.msgNewPasswordErrorCopy = "As senhas não conferem"
                }
            } catch (error) {
                if (error.response) {
                    if (!error.response.auth) {
                        this.msgPasswordError = "Senha incorreta"
                    } else {
                        notificationError(error.response.data.error)
                    }
                } else if (error.request) {
                    notificationError('Não foi possível conectar ao servidor. Tente novamente mais tarde!')                    
                } else {
                    notificationError('Erro interno, por favor contate um administrador.')
                }  
            }
        },
        cancel: function() {
            materializeModalClose()
        }
    }
}
</script>

<style scoped>
.container {
    background: white;
}

.btn {
    background-color: #0288d1 !important;
}

hr {
    margin-top: 3%;
    margin-bottom: 3%;
}

.modal-footer {
    padding-right: 24px;
}

</style>
