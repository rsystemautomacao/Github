"""Gera as falas da narração dos Reels com o Kokoro (voz neural offline, pt-BR).

Chamado pelo gerar.js; não precisa rodar à mão.
Uso: python narrar.py pedido.json resposta.json

pedido.json:  {"voz": "pm_alex", "velocidade": 1.08, "modelos": "...", "cache": "...",
               "falas": [{"chave": "abc123", "texto": "Olá!"}, ...]}
resposta.json: {"abc123": 1.84, ...}   (duração de cada fala em segundos)

Cada fala vira cache/<chave>.wav; se o arquivo já existe, não é gerado de novo.
"""

import json
import os
import sys

import soundfile as sf
from kokoro_onnx import Kokoro


def main():
    with open(sys.argv[1], encoding="utf-8") as f:
        pedido = json.load(f)
    os.makedirs(pedido["cache"], exist_ok=True)

    kokoro = None
    duracoes = {}
    for fala in pedido["falas"]:
        wav = os.path.join(pedido["cache"], fala["chave"] + ".wav")
        if not os.path.exists(wav):
            if kokoro is None:
                kokoro = Kokoro(
                    os.path.join(pedido["modelos"], "kokoro-v1.0.onnx"),
                    os.path.join(pedido["modelos"], "voices-v1.0.bin"),
                )
            audio, taxa = kokoro.create(fala["texto"], voice=pedido["voz"], speed=pedido["velocidade"], lang="pt-br")
            sf.write(wav, audio, taxa)
        info = sf.info(wav)
        duracoes[fala["chave"]] = info.frames / info.samplerate

    with open(sys.argv[2], "w", encoding="utf-8") as f:
        json.dump(duracoes, f)


if __name__ == "__main__":
    main()
