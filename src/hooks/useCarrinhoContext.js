import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function mudarQuantidade(id, quantidade) {
    carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(
      (itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
    );

    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }

    const carrinhoAtulizado = mudarQuantidade(novoProduto.id, 1);

    setCarrinho([...carrinhoAtulizado]);
  }

  function removerProduto(idProduto) {
    const temOProduto = carrinho.find((itemDoCarrinho) => {
      return itemDoCarrinho.id === idProduto;
    });

    if (temOProduto && idProduto.quantidade === 1) {
      return setCarrinho((carrinhoAnterior) => [
        carrinhoAnterior.filter(
          (itemDoCarrinho) => itemDoCarrinho.id !== idProduto
        ),
      ]);
    }

    const carrinhoAtulizado = mudarQuantidade(idProduto.id, -1);

    setCarrinho([...carrinhoAtulizado]);
  }

  return { carrinho, setCarrinho, adicionarProduto, removerProduto };
};
