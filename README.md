# My Ufms Services

## Introdução

Este projeto foi construído para simular a comunicação entre micro serviços rodando em um cluster de containers docker com docker swarm. Foi criado um cluster com docker swarm contendo 3 nodes, porem o ambiente funciona em apenas uma maquina perfeitamente. Foram criados dois micro serviços, um de autenticação e manipulação do usuário e outro para criação de posts como em um rede social.

### Descrição do projeto

A descrição do projeto, junto ao documento de requisitos, se encontra no wiki deste repositório do github.

### Documentação

Na raiz do projeto, há uma pasta nomeada `documentation` que contem uma documentação da api no formato OpenAPI 3.0 e o modelo do banco de dados que pode ser aberto no aplicativo drawio.

## Pre Requisitos

* Docker
* Docker Compose
* NodeJs

## Instruções

Após ter instalado docker em sua máquina, execute o docker em modo swarm para poder utilizar dos recursos do cluster, com o comando: 

> docker swarm init

Caso esteja utilizando o linux, lembre-se de colocar antes de cada comando mostrado, o comando `sudo`. 

Depois para realizar o build da imagem das aplicações vá até a raiz do projeto clonado do github e execute comando:

> docker-compose -f ./docker/production/services.yaml build

Em seguida para criar os painéis de monitoramento do swarmpit utilize o comando:

> docker stack deploy --compose-file ./docker/production/monitor.yaml monitor

E por fim utilize o comando abaixo para criar os serviços referente a aplicação que foi buildada anteriormente.

> docker stack deploy --compose-file ./docker/production/services.yaml myufms

Caso algum dos serviços de algum problema ou não execute corretamente tente executar novamente o ultimo comando, ao invés de ser criado novamente, o docker swarm apenas realizará um update dos serviços.

A partir de agora o serviço de usuário está disponível em` <IP_LOCAL_MAQUINA>:3333` e o serviço de posts está disponível na porta `4444` para ser testado com alguma interface que realize requisições HTTP.

Lembrando que as rotas estão presentes na documentação da raiz do código.