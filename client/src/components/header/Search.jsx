import { useState, useEffect } from 'react';
import { InputBase, Box, styled, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import{Link} from 'react-router-dom';

const SearchContainer = styled(Box)`
  background: #fff;
  width: 38%;
  border-radius: 2px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  position: relative;   /* IMPORTANT */
`;

const InputSearchBase = styled(InputBase)`
  padding-left: 20px;
  width: 100%;
`;

const SearchIconWrapper = styled(Box)`
  color: #2874f0;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledListItem = styled(ListItem)`
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const ListWrapper = styled(List)`
  position: absolute;
  top: 100%;              /* THIS IS THE FIX */
  left: 0;
  width: 100%;
  background: #ffffff;
  color: #000;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;



const Search = () => {

  const [text, setText] = useState('');
  const { products = [] } = useSelector(state => state.products); // FIX this based on your reducer name
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filteredProducts = text
    ? products.filter(product =>
        product.title.longTitle
          .toLowerCase()
          .includes(text.toLowerCase())
      )
    : [];

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products, brands and more"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      {text && filteredProducts.length > 0 && (
        <ListWrapper>
          {filteredProducts.slice(0, 8).map(product => (
            <StyledListItem key={product.id}>
              <Link to={`/product/${product.id}`}
              onClick={() => setText('')}
              style={{ textDecoration: 'none', color: 'inherit' }} > {/* Clear search on click */}
                {product.title.longTitle}
              </Link>
            
            </StyledListItem>
          ))}
        </ListWrapper>
      )}
    </SearchContainer>
  );
};

export default Search;