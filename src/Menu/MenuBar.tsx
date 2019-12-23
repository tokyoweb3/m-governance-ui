import React, {useState} from 'react';
import { Menu, Icon, Input, MenuItemProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function MenuBar() {
  const [activeItem, setActiveItem] = useState<string>('');
  const handleItemClick = (e: any,  { name }: MenuItemProps) => setActiveItem(name!);

  return(
    <Menu fluid widths={6}>
      <Menu.Item 
      as={Link} to='/' name='home'
      active={activeItem === 'home'}
      onClick={handleItemClick}
      >
          <Icon name='home' />
          Home
      </Menu.Item>
        <Menu.Item 
        as={Link} to='/vote' name='vote'
        active={activeItem === 'vote'}
        onClick={handleItemClick}>
            <Icon name='th' />
            Vote
        </Menu.Item>
        <Menu.Item 
        as={Link} to='/ballot' name='ballot'
        active={activeItem === 'ballot'}
        onClick={handleItemClick}>
            <Icon name='inbox' />
            Ballot
        </Menu.Item>
        <Menu.Item 
        as={Link} to='/transfer' name='transfer'
        active={activeItem === 'transfer'}
        onClick={handleItemClick}>
            <Icon name='paper plane' />
            Transfer
        </Menu.Item>
        <Menu.Item 
        as={Link} to='/certificate' name='certificate'
        active={activeItem === 'certificate'}
        onClick={handleItemClick}>
            <Icon name='certificate' />
            Certificate
        </Menu.Item>

        <Menu.Item>
          <Input icon='search' placeholder='Vote ID...' />
        </Menu.Item>
    </Menu>
  );
}