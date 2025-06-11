#!/bin/bash

# --- SCRIPT PARA PROCESSAR E RENOMEAR IMAGENS PARA O PROJETO ---

# Define a pasta onde estão as imagens originais
DIRETORIO_IMAGENS="site/images"

# Define o nome base para os novos arquivos
NOME_BASE="presente-para-meu-amor"

# Inicia um contador para numerar as imagens
contador=1

echo "Iniciando processamento de imagens em: $DIRETORIO_IMAGENS"

# Loop que procura por todas as imagens com as extensões comuns
for arquivo_original in "$DIRETORIO_IMAGENS"/*.{jpg,jpeg,JPG,JPEG,gif,bmp,webp}; do

  # Checa se encontrou algum arquivo para evitar erros
  if [ -f "$arquivo_original" ]; then

    # Cria o novo nome para o arquivo com o contador e a extensão .png
    novo_nome="$NOME_BASE-$contador.png"

    # Define o caminho completo de saída para o novo arquivo
    caminho_saida="$DIRETORIO_IMAGENS/$novo_nome"

    # O COMANDO MÁGICO: usa o 'convert' do ImageMagick
    convert "$arquivo_original" "$caminho_saida"

    # Informa ao usuário o que foi feito
    echo "  -> Processado: '$arquivo_original' virou '$novo_nome'"

    # (Opcional) Se quiser apagar o arquivo original, remova o '#' da linha abaixo.
    # rm "$arquivo_original"

    # Incrementa o contador para a próxima imagem
    contador=$((contador + 1))
  fi
done

echo "Processamento concluído!"