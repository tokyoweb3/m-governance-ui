import React from 'react';
import { Segment, Container, Grid, Header, List, Icon } from 'semantic-ui-react';

export default function Footer() {
  return(
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              <List.Item as='a'>Sitemap</List.Item>
              <List.Item as='a'>Contact Us</List.Item>
              <List.Item as='a'>Religious Ceremonies</List.Item>
              <List.Item as='a'>Gazebo Plans</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Sources' />
            <List link inverted>
              <List.Item as='a' href='https://github.com/MasakiMinamide/M-Governance'>
              <List.Icon name='github' size='large' verticalAlign='middle' />M-Governance</List.Item>
              <List.Item as='a' href='https://github.com/MasakiMinamide/m-governance-ui'>
              <List.Icon name='github' size='large' verticalAlign='middle' />UI</List.Item>
              <List.Item as='a' href='https://github.com/paritytech/polkadot'>
              <List.Icon name='github' size='large' verticalAlign='middle' />Polkadot</List.Item>
              <List.Item as='a' href='https://github.com/paritytech/substrate'>
              <List.Icon name='github' size='large' verticalAlign='middle' />Substrate</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' inverted>
              Creator: Masaki Minamide
            </Header>
            <p><Icon name='github'/><a href='https://github.com/MasakiMinamide'>Github</a></p>
            <p><Icon name='twitter'/><a href='https://twitter.com/masakiminamide'>Twitter</a></p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
  );
}