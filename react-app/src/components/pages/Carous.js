import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'prva.png',
    key: '1'
  },
  {
    src: 'druga.png',
    key: '2'
  },
  {
    src: 'treca.jpg',
    key: '3'
  },
];

const Carous = () => <UncontrolledCarousel items={items} />;

export default Carous;
