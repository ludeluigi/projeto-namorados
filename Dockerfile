# Estágio 1: Usar uma imagem base leve com um servidor web (Nginx)
FROM nginx:1.25-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/share/nginx/html

# Remove o conteúdo padrão do Nginx
RUN rm -rf ./*

# Copia os arquivos do nosso site (da pasta 'site' local) para o diretório de trabalho do container
COPY docs/ .

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# O comando para iniciar o servidor quando o container for executado
CMD ["nginx", "-g", "daemon off;"]