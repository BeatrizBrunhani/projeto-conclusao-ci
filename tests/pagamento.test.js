import { strict as assert } from 'assert';
import ServicoDePagamento from '../src/pagamento.js';

describe('ServicoDePagamento', () => {
  let servico;

  beforeEach(() => {
    servico = new ServicoDePagamento();
  });

  describe('pagar()', () => {
    it('deve adicionar um pagamento com categoria "cara" quando valor > 100', () => {
      servico.pagar('0987-7656-3475', 'Samar', 156.87);
      const pagamento = servico.consultarUltimoPagamento();
      
      assert.equal(pagamento.categoria, 'cara');
    });

    it('deve adicionar um pagamento com categoria "padrão" quando valor <= 100', () => {
      servico.pagar('1234-5678-9012', 'Empresa A', 75.50);
      const pagamento = servico.consultarUltimoPagamento();
      
      assert.equal(pagamento.categoria, 'padrão');
    });

    it('deve armazenar as propriedades corretas do pagamento', () => {
      servico.pagar('0987-7656-3475', 'Samar', 156.87);
      const pagamento = servico.consultarUltimoPagamento();
      
      assert.equal(pagamento.codigoBarras, '0987-7656-3475');
      assert.equal(pagamento.empresa, 'Samar');
      assert.equal(pagamento.valor, 156.87);
    });
  });

  describe('consultarUltimoPagamento()', () => {
    it('deve retornar null quando não há pagamentos', () => {
      const resultado = servico.consultarUltimoPagamento();
      assert.equal(resultado, null);
    });

    it('deve retornar o último pagamento quando há múltiplos pagamentos', () => {
      servico.pagar('1111-1111-1111', 'Empresa A', 50);
      servico.pagar('2222-2222-2222', 'Empresa B', 150);
      servico.pagar('3333-3333-3333', 'Empresa C', 75);
      
      const ultimo = servico.consultarUltimoPagamento();
      assert.equal(ultimo.codigoBarras, '3333-3333-3333');
      assert.equal(ultimo.empresa, 'Empresa C');
    });
  });
});