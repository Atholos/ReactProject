import React, { useContext } from 'react';
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base';
import appContext from '../contexts/AppContext.js'


const Filter = () => {
  [articles, setArticles] = useContext(appContext);
  const cathegories = useState([]);


  const addCategory = (cat, catlist) => {
    const addCat = catlist.push(cat);

  };
  const removeCategory = (cat, catlist) => {
    const removeCat = catlist.filter()

  };
  return (
    <Container>
      <Header />
      <Content>
        <List>
          <ListItem>
            <CheckBox checked={false} value={arduino} />
            <Body>
              <Text>Daily Stand Up</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} value={automation} />
            <Body>
              <Text>Discussion with Client</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} value={electronics} color="green" />
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
