import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Container = styled.div`
  background-color: lightgrey;
  height: 70px;
  margin: 0 -4px;
`;

const Announcement = styled.div`
  background-color: #585858;
  height: 35px;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  margin: 0 -4px;

`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  position: relative;
`;

const Title = styled.div`
  font-size: 30px;
  margin-left: 2px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 5px;
  position: absolute;
  top: 0px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  top: 15px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 300px;
  margin-right: 5px;
  padding-right: 7px;
  position: absolute;
  top: 0;
`;

const Icon = styled.div`
  position: absolute;
  right: 10px;
`;

const Input = styled.input`
  border: none;
  height: 100%;
  width: 300px;
  padding-left: 10px;
  font-size: 20px;
`;

const Results = styled.div`
  margin-top: 35px;
  margin-right: 16.5px;
  width: 300px;
  height: 300px;
  background-color: gray;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Item = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  color: black;
  padding: 10px;

  &:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;
const Logo = styled.img`
  width: 60px;
  height: 60px;
  margin: 7px;
`;

const Index = ({ changeCurrentProduct }) => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState("");

  // API FETCH
  const fetchAllProducts = () => {
    axios
      .get(`/API/products?count=1000`)
      .then((allProducts) => {
        setProducts(allProducts.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleFilter = (e) => {
    const searchTerm = e.target.value;
    setValue(searchTerm)
    const newProductList = products.filter((product) => {
      return Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      setSearchResults(newProductList);
    }
  };

  const changeCurrentItem = (itemId) => {
    changeCurrentProduct(itemId);
    setSearchResults([]);
    setValue("");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Logo src="./img/logo.png" />
            <Title>NAME OF OUR SITE</Title>
          </Left>
          <Right>
            <SearchBar>
              <Input
                type="text"
                placeholder="search..."
                onChange={handleFilter}
                value={value}
              />
              <Icon>
                <FaSearch />
              </Icon>
            </SearchBar>
            {searchResults.length !== 0 && (
              <Results>
                {searchResults.slice(0, 20).map((product, key) => {
                  return (
                    <Item
                      key={key}
                      onClick={() => changeCurrentItem(product.id)}
                    >
                      {product.name}
                    </Item>
                  );
                })}
              </Results>
            )}
          </Right>
        </Wrapper>
      </Container>
      <Announcement>FREE SHIPPING WITH $50 PURCHASE</Announcement>
    </>
  );
};

export default Index;
