import React, { useState } from 'react';
import { Segment, Container, Grid, Header, List, Icon } from 'semantic-ui-react';

import SideBar from './SideBar';

// documents
import Home from './Docs/Home';

export default function Tutorial() {
  const [activeItem, setActiveItem] = useState<string>('home');

  const getDoc = () => {
    switch (activeItem){
      case 'home': return <Home />;
      default: return activeItem;
    }
  }
  return(
    <Segment>
      <Grid>
        <Grid.Row>

        <Grid.Column width={3}>
          <SideBar setActiveItem={setActiveItem} activeItem={activeItem}/>
        </Grid.Column>

        <Grid.Column width={10}>
          <Container>
            {getDoc()}
          </Container>
        </Grid.Column>

      </Grid.Row>
      </Grid>

    </Segment>
  );
}