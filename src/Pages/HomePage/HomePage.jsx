import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../components/Cart/CartContextProvider";
import { TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const API = " http://localhost:8000/products";
  const [products, setProducts] = useState([]);
  const { addProductToCart } = useCart();

  const navigate = useNavigate();
  //временный render продуктов!

  async function render() {
    let { data } = await axios(`${API}/${window.location.search}`);
    setProducts([...data]);
  }

  // функционал живого поиска (временно будет здесь)
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q"));

  useEffect(() => {
    render();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);

  return (
    <>
      <TextField
        type="text"
        onChange={e => setSearch(e.target.value)}
        value={search}
        required
      />
      <button onClick={() => navigate("/cart")}>Visit cart</button>

      {products.map(item => (
        <h2 key={item.id}>
          {item.name}{" "}
          <button onClick={() => addProductToCart(item)}>Add to CArt</button>
        </h2>
      ))}
    </>
  );
};

export default HomePage;
