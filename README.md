# MoreHealth

Projeto criado para a cadeira de _Desenvolvimento de Aplicações Nativas da Nuvem com Arquitetura Baseada em Microservices_, __MoreHealth__ surge da descoberta da _Unidade de Saúde da Família (USF)_ e dos seus processos e da necessidade de automatizar muitos dos processos existentes no local. Este projeto deve ajudar no melhor controle e gerenciamento dos atendimentos diários no local, facilitando o trabalho do médico e do enfermeiro chefe e gerando antedimentos com maior qualidade.

MoreHealth é um sistema onde é possível criar, manter e armazenar prontuários, realizar o agendamento de consulta de forma automatizada (facilitando o gerenciamento das vagas), receitar exames, medicamentos e encaminhamentos e gerar relatórios ao clique de um botão.

# Problema

Uma Unidade de Saúde da Família (USF) é composta por um médico, um enfermeiro, técnicos de enfermagem e agentes de saúde. Em uma USF não são realizados exames, ficando sob sua responsabilidade apenas os atendimentos básicos. Caso seja necessário a realização de exames, um encaminhamento para um hospital deve ser feito.

Analisando os processos existentes em uma USF, foi possível identificar vários problemas que envolvem o atendimento. Esse processo é feito completamente de forma manual, desde o agendamento da consulta, até a criação, manutenção e armazenamento dos prontuários e elaboração de relatórios. Portanto, sabendo da importância do serviço oferecido pela USF, o número de pessoas que contam com os serviços prestados e o grande número de tarefas que precisam ser realizadas com o fim de prestar um serviço de qualidade, MoreHealth tem como objetivo ajudar a USF a tornar seus processos mais ágeis, facilitando o atendimento dos pacientes e melhorando a qualidade desses atendimentos.

# Composição

MoreHealth é composto por 4 microserviços: um microserviço que é responsável pelas telas do sistema; um microserviço para o agendamento e gerenciamento de consultas; um microserviço para criação, manutenção e gerenciamento de prontuários; um microserviço responsável pelos relatórios e por receitar exames, medicamentos e encaminhamentos.

# Técnologias

Para construção do MoreHealth foi utilizado Mongo, ElasticSearch, Express, Vue e NodeJS.
