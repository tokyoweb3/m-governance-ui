import React, { useState } from 'react'
import { Menu, MenuItemProps } from 'semantic-ui-react'

export default function SideBar({activeItem,  setActiveItem}: any) {
  const handleItemClick = (e: any, { name }: MenuItemProps) => setActiveItem(name!);

    return (
      <Menu vertical>
        <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={handleItemClick}
        />

        <Menu.Item>
          <Menu.Header>Preparation</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='create account'
              active={activeItem === 'create account'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
 
        <Menu.Item>
          <Menu.Header>Vote</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='create your first vote'
              active={activeItem === 'create your first vote'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='create a vote with CA certificate'
              active={activeItem === 'create a vote with CA certificatehon'}
              onClick={handleItemClick}
              />
            <Menu.Item
              name='create a quadratic vote'
              active={activeItem === 'create a quadratic vote'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Ballot</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='cast your first ballot'
              active={activeItem === 'cast your first ballot'}
              onClick={handleItemClick}
              />
            <Menu.Item
              name='cast a lockvote'
              active={activeItem === 'cast a lockvote'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
          
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Certificate</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='register your account'
              active={activeItem === 'register your account'}
              onClick={handleItemClick}
            />

            <Menu.Item
              name='register new CA'
              active={activeItem === 'register new CA'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item
              name='FAQ'
              active={activeItem === 'FAQ'}
              onClick={handleItemClick}
        />
      </Menu>
    );
}
