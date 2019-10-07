import React, { useContext, useState } from 'react';
import { Container, Header, Content, List, ListItem, CheckBox, Text, Body } from 'native-base';
import AppContext from '../contexts/AppContext.js'


const Filter = () => {
  // const {articles, setArticles} = useContext(AppContext);
  // const {categories, setCategories} = useContext(AppContext);
  const cats = {}
  const [selectedCategories, setSelectedCategories] = useState([]);

  const addCategory = (cat, catlist) => {
    const addCat = catlist.push(cat);
    setSelectedCategories(addCat);
    console.log(addCat);
  };
  const removeCategory = (cat, catlist) => {
    const removeCat = catlist.filter(!cat)
    if(removeCat.lenght < 1){
      setSelectedCategories([]);
    }else{
      setSelectedCategories(removeCat);
    }
    console.log(removeCat);
  };
  return (
    <Container>
      <Header />
      <Content>
        <List>
          <ListItem>
            <CheckBox checked={this.checked} value = {cats.arduino} onPress = {() => {
              if(!arduino.checked){
                console.log(ADD);
                checked = true;
                addCategory('arduino', selectedCategories);
              }else{
                console.log(REMOVE);
                checked = false;
                removeCategory('arduino', selectedCategories);
              }
            }} />
            <Body>
              <Text>Daily Stand Up</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} value={cats.automation} />
            <Body>
              <Text>Discussion with Client</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} value={cats.electronics} color="green" />
            <Body>
              <Text>Finish list Screen</Text>
            </Body>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}
export default Filter;
