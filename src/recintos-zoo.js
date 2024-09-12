class RecintosZoo {
    constructor() {
        // Definindo os recintos e os animais
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: ['MACACO'], espacoOcupado: 5 },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [], espacoOcupado: 2 },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: ['GAZELA'], espacoOcupado: 5 },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [], espacoOcupado: 3 },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: ['LEAO'], espacoOcupado: 3 }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    // Função principal que analisa os recintos
    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }

        const dadosAnimal = this.animais[animal];
        const espacoNecessario = dadosAnimal.tamanho * quantidade;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const biomasRecinto = recinto.bioma.split(' e '); // Suporta múltiplos biomas
            const biomaValido = biomasRecinto.some(bioma => dadosAnimal.bioma.includes(bioma));

            if (!biomaValido) {
                continue; // Se o bioma não é adequado, pula para o próximo recinto
            }

            const espacoDisponivel = recinto.tamanhoTotal - recinto.espacoOcupado;

            if (dadosAnimal.carnivoro && recinto.animaisExistentes.length > 0) {
                const temOutroCarnivoro = recinto.animaisExistentes.some(a => this.animais[a].carnivoro && a !== animal);
                if (temOutroCarnivoro) {
                    continue;
                }
            }

            if (espacoDisponivel >= espacoNecessario) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoDisponivel - espacoNecessario,
                    tamanhoTotal: recinto.tamanhoTotal
                });
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        // Ordena os recintos viáveis pelo espaço livre disponível (descendente)
        recintosViaveis.sort((a, b) => b.espacoLivre - a.espacoLivre);

        // Formata os recintos viáveis no padrão esperado
        return {
            recintosViaveis: recintosViaveis.map(
                r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanhoTotal})`
            )
        };
    }
}

export { RecintosZoo as RecintosZoo };
