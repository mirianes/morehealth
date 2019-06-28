<template>
    <div class="container">
        <h5>Perguntas Frequentes</h5>
        <ul class="collapsible">
            <li v-for="faq in faqs" :key="faq.pergunta">
                <div class="collapsible-header">{{ faq.pergunta }}<i class="material-icons" id="icon-collapsible">arrow_drop_down</i></div>
                <div class="collapsible-body"><span>{{ faq.resposta }}</span></div>
            </li>
        </ul>

        <footer class="page-footer">
          <div class="container">
            <div class="row">
                <h5>Fale Conosco</h5>
                <div class="col l4 offset-l2 s14">
                    <div class="contact valign-wrapper"><i class="material-icons valign-wrapper" id="icon">email</i> contato@morehealth.com.br</div>
                </div>
                <div class="col l4 s14">
                    <div class="contact valign-wrapper"><i class="material-icons valign-wrapper" id="icon">local_phone</i> (81)99726-1202</div>
                </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2019 MoreHealth, Todos os direitos reservados.
            </div>
          </div>
        </footer>
    </div>
</template>

<script>
import { faqs } from '../faq'
import { materializeCollapsible } from '../materialize'

export default {
    data() {
        return {
            faqs: faqs
        }
    },
    mounted: function() {
        materializeCollapsible()
    }
}
</script>


<style scoped>
.container {
    background: white;
}

.page-footer, .footer-copyright {
    background: white;
    color: black;
}

.btn {
    background-color: #0288d1 !important;
}

h5 {
    margin-bottom: 3%;
    color: black;
}

hr {
    margin-top: 3%;
    margin-bottom: 3%;
}

.contact {
    padding: 1rem;
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
}

#icon {
    padding-right: 5%;
    width: 35px;
}

#icon-collapsible {
    margin-left: auto;
}

</style>
