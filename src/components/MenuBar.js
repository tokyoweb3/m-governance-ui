import React from 'react';
import { Menu, Icon, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function MenuBar() {
  return(
    <Menu>
      <Link to="/">
        <Menu.Item name='home'>
            <Icon name='home' />
            Home
        </Menu.Item>
      </Link>
      <Link to="/vote">
        <Menu.Item name='vote'>
            <Icon name='th' />
            Vote
        </Menu.Item>
      </Link>
      <Link to="/ballot">
        <Menu.Item name='ballot'>
            <Icon name='inbox' />
            Ballot
        </Menu.Item>
      </Link>
      <Link to="/transfer">
        <Menu.Item name='transfer'>
            <Icon name='paper plane' />
            Transfer
        </Menu.Item>
      </Link>
      <Link to="/certificate">
        <Menu.Item name='ca'>
            <Icon name='certificate' />
            Certificate
        </Menu.Item>
      </Link>

        <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Vote ID...' />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
  );
}